import type { PriceBreakdown } from '../services/pricing'

export type Language = 'en' | 'kn'

export type CategoryId = 'textile' | 'basketry' | 'coconut' | 'wood'

export type OrderStatus = 'confirmed' | 'preparing' | 'ready'

export type Product = {
  id: string
  name: string
  makerName: string
  region: string
  category: CategoryId
  imageSrc: string
  description: string
  materials: string
  craftStory: string
  videoUrl: string
  madeToOrder: boolean
  quantity: number
  fulfilmentDays: number | null
  price: PriceBreakdown
  offersEnabled: boolean
  minimumPrice: number
  published: boolean
  sample: boolean
  createdAt: string
  updatedAt: string
}

export type Order = {
  id: string
  reference: string
  productId: string
  productName: string
  makerName: string
  imageSrc: string
  quantity: number
  agreedUnitPrice: number
  total: number
  fromOffer: boolean
  priceSnapshot: PriceBreakdown
  buyerName: string
  phone: string
  address: string
  city: string
  pincode: string
  status: OrderStatus
  createdAt: string
}

export type OfferAttempt = {
  id: string
  productId: string
  productName: string
  amount: number
  outcome: 'accepted' | 'rejected'
  createdAt: string
}

export const CATEGORY_IDS: CategoryId[] = ['textile', 'basketry', 'coconut', 'wood']

export const ORDER_STATUSES: OrderStatus[] = ['confirmed', 'preparing', 'ready']
