import { createId, createOrderReference } from '../lib/format'
import type { Language, OfferAttempt, Order, OrderStatus, Product } from '../types/models'
import { evaluateOffer } from './offers'
import { seedProducts } from '../data/seed'
import {
  clearPendingOffer,
  loadLanguage,
  loadOfferAttempts,
  loadOrders,
  loadProducts,
  saveCatalog,
  savePendingOffer,
} from './storage'

export type CheckoutInput = {
  productId: string
  quantity: number
  offerPrice: number | null
  buyerName: string
  phone: string
  address: string
  city: string
  pincode: string
}

export type CheckoutResult =
  | { ok: true; order: Order }
  | { ok: false; error: 'unavailable' | 'stock' | 'offer' | 'storage' | 'details'; available?: number }

export type Snapshot = {
  products: Product[]
  orders: Order[]
  offerAttempts: OfferAttempt[]
  language: Language
  storageError: boolean
  recovered: boolean
}

const MAX_ATTEMPTS = 30
const MAX_ORDER_QTY = 5

let products: Product[]
let orders: Order[]
let offerAttempts: OfferAttempt[]
let language: Language
let storageError = false
let recovered = false
let snapshot: Snapshot

const listeners = new Set<() => void>()

function buildSnapshot(): Snapshot {
  return { products, orders, offerAttempts, language, storageError, recovered }
}

function persist(): boolean {
  const saved = saveCatalog(products, orders, offerAttempts, language)
  storageError = !saved
  return saved
}

function commit(): void {
  snapshot = buildSnapshot()
  listeners.forEach((listener) => listener())
}

function init(): void {
  const loaded = loadProducts()
  products = loaded.products
  recovered = loaded.recovered
  orders = loadOrders()
  offerAttempts = loadOfferAttempts()
  language = loadLanguage()
  if (!persist()) storageError = true
  snapshot = buildSnapshot()
}

init()

export function getSnapshot(): Snapshot {
  return snapshot
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function setLanguage(next: Language): void {
  language = next
  persist()
  commit()
}

export function dismissRecovery(): void {
  recovered = false
  commit()
}

export function resetDemo(): boolean {
  products = seedProducts()
  orders = []
  offerAttempts = []
  clearPendingOffer()
  const saved = persist()
  commit()
  return saved
}

export function rememberAcceptedOffer(productId: string, offerPrice: number): void {
  savePendingOffer(productId, offerPrice)
}

export function upsertProduct(product: Product): boolean {
  const index = products.findIndex((item) => item.id === product.id)
  products = index >= 0 ? products.map((item) => (item.id === product.id ? product : item)) : [product, ...products]
  const saved = persist()
  commit()
  return saved
}

export function setPublished(productId: string, published: boolean): void {
  products = products.map((product) =>
    product.id === productId ? { ...product, published, updatedAt: new Date().toISOString() } : product,
  )
  persist()
  commit()
}

export function recordOffer(product: Product, amount: number, outcome: 'accepted' | 'rejected'): void {
  const attempt: OfferAttempt = {
    id: createId('offer'),
    productId: product.id,
    productName: product.name,
    amount: Math.round(amount),
    outcome,
    createdAt: new Date().toISOString(),
  }
  offerAttempts = [attempt, ...offerAttempts].slice(0, MAX_ATTEMPTS)
  persist()
  commit()
}

export function placeOrder(input: CheckoutInput): CheckoutResult {
  const product = products.find((item) => item.id === input.productId)
  if (!product || !product.published) return { ok: false, error: 'unavailable' }

  const name = input.buyerName.trim()
  const phone = input.phone.trim()
  const address = input.address.trim()
  const city = input.city.trim()
  const pincode = input.pincode.trim()
  if (!name || !address || !city || !/^[6-9]\d{9}$/.test(phone) || !/^\d{6}$/.test(pincode)) {
    return { ok: false, error: 'details' }
  }

  const quantity = Math.round(input.quantity)
  if (!Number.isFinite(quantity) || quantity < 1 || quantity > MAX_ORDER_QTY) {
    return { ok: false, error: 'stock', available: product.madeToOrder ? MAX_ORDER_QTY : product.quantity }
  }
  if (!product.madeToOrder && quantity > product.quantity) {
    return { ok: false, error: 'stock', available: product.quantity }
  }

  let agreedUnitPrice = product.price.listedPrice
  let fromOffer = false
  if (input.offerPrice !== null) {
    const decision = evaluateOffer({
      offersEnabled: product.offersEnabled,
      minimumPrice: product.minimumPrice,
      listedPrice: product.price.listedPrice,
      offerPrice: input.offerPrice,
    })
    if (decision.status !== 'accepted') return { ok: false, error: 'offer' }
    agreedUnitPrice = decision.price
    fromOffer = true
  }

  const order: Order = {
    id: createId('order'),
    reference: createOrderReference(orders.map((item) => item.reference)),
    productId: product.id,
    productName: product.name,
    makerName: product.makerName,
    imageSrc: product.imageSrc,
    quantity,
    agreedUnitPrice,
    total: agreedUnitPrice * quantity,
    fromOffer,
    priceSnapshot: { ...product.price },
    buyerName: name,
    phone,
    address,
    city,
    pincode,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  }

  const previousProducts = products
  const previousOrders = orders
  if (!product.madeToOrder) {
    products = products.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity - quantity } : item,
    )
  }
  orders = [order, ...orders]
  if (!persist()) {
    products = previousProducts
    orders = previousOrders
    commit()
    return { ok: false, error: 'storage' }
  }
  clearPendingOffer()
  commit()
  return { ok: true, order }
}

export function advanceOrder(orderId: string): void {
  orders = orders.map((order) => {
    if (order.id !== orderId) return order
    const next: OrderStatus | null =
      order.status === 'confirmed' ? 'preparing' : order.status === 'preparing' ? 'ready' : null
    return next ? { ...order, status: next } : order
  })
  persist()
  commit()
}

export { MAX_ORDER_QTY }
