import { seedProducts } from '../data/seed'
import { buyerComponentsSum } from './pricing'
import { isSafeImageSrc } from './images'
import type { CategoryId, Language, OfferAttempt, Order, OrderStatus, Product } from '../types/models'
import { CATEGORY_IDS, ORDER_STATUSES } from '../types/models'

const KEYS = {
  products: 'kale-kaayaka.products.v1',
  orders: 'kale-kaayaka.orders.v1',
  offers: 'kale-kaayaka.offers.v1',
  prefs: 'kale-kaayaka.prefs.v1',
} as const

const PENDING_OFFER = 'kale-kaayaka.pending-offer'

function memoryAvailable(): boolean {
  return typeof localStorage !== 'undefined'
}

function readJson(key: string): unknown {
  if (!memoryAvailable()) return null
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    return JSON.parse(raw) as unknown
  } catch {
    return null
  }
}

export function writeJson(key: string, value: unknown): boolean {
  if (!memoryAvailable()) return false
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

function isCategory(value: unknown): value is CategoryId {
  return typeof value === 'string' && CATEGORY_IDS.includes(value as CategoryId)
}

function isStatus(value: unknown): value is OrderStatus {
  return typeof value === 'string' && ORDER_STATUSES.includes(value as OrderStatus)
}

function isProduct(value: unknown): value is Product {
  if (!value || typeof value !== 'object') return false
  const product = value as Product
  if (!product.price || typeof product.price !== 'object') return false
  return (
    typeof product.id === 'string' &&
    typeof product.name === 'string' &&
    typeof product.makerName === 'string' &&
    typeof product.region === 'string' &&
    isCategory(product.category) &&
    typeof product.imageSrc === 'string' &&
    isSafeImageSrc(product.imageSrc) &&
    typeof product.description === 'string' &&
    typeof product.materials === 'string' &&
    typeof product.craftStory === 'string' &&
    typeof product.videoUrl === 'string' &&
    typeof product.madeToOrder === 'boolean' &&
    typeof product.quantity === 'number' &&
    (product.fulfilmentDays === null || typeof product.fulfilmentDays === 'number') &&
    typeof product.offersEnabled === 'boolean' &&
    typeof product.minimumPrice === 'number' &&
    typeof product.published === 'boolean' &&
    typeof product.sample === 'boolean' &&
    typeof product.price.listedPrice === 'number' &&
    Number.isFinite(product.price.listedPrice) &&
    buyerComponentsSum(product.price) === product.price.listedPrice
  )
}

function isOrder(value: unknown): value is Order {
  if (!value || typeof value !== 'object') return false
  const order = value as Order
  return (
    typeof order.id === 'string' &&
    typeof order.reference === 'string' &&
    typeof order.productId === 'string' &&
    typeof order.productName === 'string' &&
    typeof order.quantity === 'number' &&
    typeof order.agreedUnitPrice === 'number' &&
    typeof order.total === 'number' &&
    order.total === order.agreedUnitPrice * order.quantity &&
    typeof order.fromOffer === 'boolean' &&
    isStatus(order.status) &&
    !!order.priceSnapshot &&
    buyerComponentsSum(order.priceSnapshot) === order.priceSnapshot.listedPrice
  )
}

function isAttempt(value: unknown): value is OfferAttempt {
  if (!value || typeof value !== 'object') return false
  const attempt = value as OfferAttempt
  return (
    typeof attempt.id === 'string' &&
    typeof attempt.productId === 'string' &&
    typeof attempt.productName === 'string' &&
    typeof attempt.amount === 'number' &&
    (attempt.outcome === 'accepted' || attempt.outcome === 'rejected') &&
    typeof attempt.createdAt === 'string'
  )
}

export function loadProducts(): { products: Product[]; recovered: boolean } {
  const parsed = readJson(KEYS.products)
  if (parsed === null) return { products: seedProducts(), recovered: false }
  if (!Array.isArray(parsed)) return { products: seedProducts(), recovered: true }
  const products = parsed.filter(isProduct)
  if (products.length === 0) return { products: seedProducts(), recovered: true }
  return { products, recovered: false }
}

export function loadOrders(): Order[] {
  const parsed = readJson(KEYS.orders)
  if (!Array.isArray(parsed)) return []
  return parsed.filter(isOrder)
}

export function loadOfferAttempts(): OfferAttempt[] {
  const parsed = readJson(KEYS.offers)
  if (!Array.isArray(parsed)) return []
  return parsed.filter(isAttempt)
}

export function loadLanguage(): Language {
  const parsed = readJson(KEYS.prefs)
  if (!parsed || typeof parsed !== 'object') return 'en'
  const language = (parsed as { language?: unknown }).language
  return language === 'kn' ? 'kn' : 'en'
}

export function saveCatalog(products: Product[], orders: Order[], attempts: OfferAttempt[], language: Language): boolean {
  const productsOk = writeJson(KEYS.products, products)
  const ordersOk = writeJson(KEYS.orders, orders)
  const offersOk = writeJson(KEYS.offers, attempts)
  const prefsOk = writeJson(KEYS.prefs, { language })
  return productsOk && ordersOk && offersOk && prefsOk
}

export function savePendingOffer(productId: string, offerPrice: number): void {
  if (typeof sessionStorage === 'undefined') return
  try {
    sessionStorage.setItem(PENDING_OFFER, JSON.stringify({ productId, offerPrice }))
  } catch {
    /* Checkout can still proceed from navigation state. */
  }
}

export function readPendingOffer(productId: string): number | null {
  if (typeof sessionStorage === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(PENDING_OFFER)
    if (!raw) return null
    const parsed = JSON.parse(raw) as { productId?: unknown; offerPrice?: unknown }
    if (parsed.productId !== productId || typeof parsed.offerPrice !== 'number') return null
    return parsed.offerPrice
  } catch {
    return null
  }
}

export function clearPendingOffer(): void {
  if (typeof sessionStorage === 'undefined') return
  try {
    sessionStorage.removeItem(PENDING_OFFER)
  } catch {
    /* Ignore a blocked session store. */
  }
}
