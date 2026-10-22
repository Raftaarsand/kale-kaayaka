import type { CategoryId, Product } from '../types/models'
import { CATEGORY_IDS } from '../types/models'
import { isHttpUrl } from '../lib/video'
import { isSafeImageSrc } from './images'
import { calculatePrice, essentialOfferFloor, PRICE_LIMITS, type PriceBreakdown } from './pricing'

export type CraftField =
  | 'name'
  | 'makerName'
  | 'region'
  | 'category'
  | 'imageSrc'
  | 'description'
  | 'materials'
  | 'craftStory'
  | 'videoUrl'
  | 'labourHours'
  | 'hourlyWage'
  | 'materialCost'
  | 'packagingCost'
  | 'craftPremium'
  | 'platformFee'
  | 'quantity'
  | 'fulfilmentDays'
  | 'minimumPrice'
  | 'confirmed'

export type FieldErrors = Partial<Record<CraftField, string>>

export type CraftDraft = {
  name: string
  makerName: string
  region: string
  category: CategoryId | ''
  imageSrc: string
  description: string
  materials: string
  craftStory: string
  videoUrl: string
  labourHours: string
  hourlyWage: string
  materialCost: string
  packagingCost: string
  craftPremium: string
  platformFee: string
  madeToOrder: boolean
  quantity: string
  fulfilmentDays: string
  offersEnabled: boolean
  minimumPrice: string
  confirmed: boolean
}

export const DETAIL_FIELDS: CraftField[] = [
  'name',
  'makerName',
  'region',
  'category',
  'imageSrc',
  'description',
  'materials',
  'craftStory',
  'videoUrl',
]

export const PRICE_FIELDS: CraftField[] = [
  'labourHours',
  'hourlyWage',
  'materialCost',
  'packagingCost',
  'craftPremium',
  'platformFee',
  'quantity',
  'fulfilmentDays',
  'minimumPrice',
]

const LIMITS = {
  name: 80,
  region: 80,
  description: 700,
  materials: 400,
  story: 1200,
  video: 300,
  maxStock: 99,
  maxDays: 180,
}

export function emptyDraft(): CraftDraft {
  return {
    name: '',
    makerName: '',
    region: '',
    category: '',
    imageSrc: '',
    description: '',
    materials: '',
    craftStory: '',
    videoUrl: '',
    labourHours: '',
    hourlyWage: '',
    materialCost: '',
    packagingCost: '',
    craftPremium: '',
    platformFee: '',
    madeToOrder: false,
    quantity: '1',
    fulfilmentDays: '',
    offersEnabled: false,
    minimumPrice: '',
    confirmed: false,
  }
}

export function draftFromProduct(product: Product): CraftDraft {
  return {
    name: product.name,
    makerName: product.makerName,
    region: product.region,
    category: product.category,
    imageSrc: product.imageSrc,
    description: product.description,
    materials: product.materials,
    craftStory: product.craftStory,
    videoUrl: product.videoUrl,
    labourHours: String(product.price.labourHours),
    hourlyWage: String(product.price.hourlyWage),
    materialCost: String(product.price.materialCost),
    packagingCost: String(product.price.packagingCost),
    craftPremium: String(product.price.craftPremium),
    platformFee: String(product.price.platformFee),
    madeToOrder: product.madeToOrder,
    quantity: product.madeToOrder ? '1' : String(product.quantity),
    fulfilmentDays: product.fulfilmentDays ? String(product.fulfilmentDays) : '',
    offersEnabled: product.offersEnabled,
    minimumPrice: String(product.minimumPrice),
    confirmed: false,
  }
}

function parseHours(raw: string): number | null {
  const trimmed = raw.trim()
  if (!/^\d+(\.\d)?$/.test(trimmed)) return null
  const value = Number(trimmed)
  return Number.isFinite(value) ? value : null
}

function parseMoney(raw: string): number | null {
  const trimmed = raw.trim()
  if (!/^\d+$/.test(trimmed)) return null
  return Number(trimmed)
}

function requiredText(value: string, max: number, errors: FieldErrors, field: CraftField): string {
  const trimmed = value.trim()
  if (!trimmed) errors[field] = 'errRequired'
  else if (trimmed.length > max) errors[field] = 'errTooLong'
  return trimmed
}

export type CraftAssessment = {
  errors: FieldErrors
  price: PriceBreakdown | null
  floor: number | null
}

export function assessCraft(draft: CraftDraft, requireConfirm: boolean): CraftAssessment {
  const errors: FieldErrors = {}
  requiredText(draft.name, LIMITS.name, errors, 'name')
  requiredText(draft.makerName, LIMITS.name, errors, 'makerName')
  requiredText(draft.region, LIMITS.region, errors, 'region')
  requiredText(draft.description, LIMITS.description, errors, 'description')
  requiredText(draft.materials, LIMITS.materials, errors, 'materials')
  requiredText(draft.craftStory, LIMITS.story, errors, 'craftStory')

  if (!draft.category || !CATEGORY_IDS.includes(draft.category)) errors.category = 'errCategory'
  if (!draft.imageSrc || !isSafeImageSrc(draft.imageSrc)) errors.imageSrc = 'errImage'

  const video = draft.videoUrl.trim()
  if (video && (video.length > LIMITS.video || !isHttpUrl(video))) errors.videoUrl = 'errVideo'

  const labourHours = parseHours(draft.labourHours)
  const hourlyWage = parseMoney(draft.hourlyWage)
  const materialCost = parseMoney(draft.materialCost)
  const packagingCost = parseMoney(draft.packagingCost)
  const craftPremium = parseMoney(draft.craftPremium)
  const platformFee = parseMoney(draft.platformFee)

  if (labourHours === null || labourHours > PRICE_LIMITS.maxHours) errors.labourHours = 'errHours'
  if (hourlyWage === null || hourlyWage > PRICE_LIMITS.maxWage) errors.hourlyWage = 'errMoney'
  if (materialCost === null) errors.materialCost = 'errMoney'
  if (packagingCost === null) errors.packagingCost = 'errMoney'
  if (craftPremium === null) errors.craftPremium = 'errMoney'
  if (platformFee === null) errors.platformFee = 'errMoney'

  let price: PriceBreakdown | null = null
  let floor: number | null = null
  if (
    labourHours !== null &&
    hourlyWage !== null &&
    materialCost !== null &&
    packagingCost !== null &&
    craftPremium !== null &&
    platformFee !== null &&
    !errors.labourHours &&
    !errors.hourlyWage
  ) {
    const result = calculatePrice({
      labourHours,
      hourlyWage,
      materialCost,
      packagingCost,
      craftPremium,
      platformFee,
    })
    if (!result.ok) {
      const code = result.errors.includes('too-high')
        ? 'errTooHigh'
        : result.errors.includes('price-zero')
          ? 'errPrice'
          : 'errMoney'
      errors.platformFee = errors.platformFee ?? code
    } else {
      price = result.price
      floor = essentialOfferFloor(result.price)
    }
  }

  if (draft.madeToOrder) {
    const days = parseMoney(draft.fulfilmentDays)
    if (days === null || days < 1 || days > LIMITS.maxDays) errors.fulfilmentDays = 'errFulfilment'
  } else {
    const quantity = parseMoney(draft.quantity)
    if (quantity === null || quantity < 1 || quantity > LIMITS.maxStock) errors.quantity = 'errQuantity'
  }

  if (draft.offersEnabled) {
    const minimum = parseMoney(draft.minimumPrice)
    if (minimum === null) errors.minimumPrice = 'errMoney'
    else if (floor !== null && price && minimum < floor) errors.minimumPrice = 'errMinFloor'
    else if (price && minimum > price.listedPrice) errors.minimumPrice = 'errMinList'
  }

  if (requireConfirm && !draft.confirmed) errors.confirmed = 'errConfirm'

  return { errors, price, floor }
}

export function productFromDraft(draft: CraftDraft, existing?: Product): Product | null {
  const assessment = assessCraft(draft, true)
  if (Object.keys(assessment.errors).length > 0 || !assessment.price || !assessment.floor) return null
  if (!draft.category) return null
  const now = new Date().toISOString()
  const quantity = draft.madeToOrder ? 0 : Number(draft.quantity)
  const minimum = draft.offersEnabled ? Number(draft.minimumPrice) : assessment.floor
  return {
    id: existing?.id ?? `craft-${crypto.randomUUID()}`,
    name: draft.name.trim(),
    makerName: draft.makerName.trim(),
    region: draft.region.trim(),
    category: draft.category,
    imageSrc: draft.imageSrc,
    description: draft.description.trim(),
    materials: draft.materials.trim(),
    craftStory: draft.craftStory.trim(),
    videoUrl: draft.videoUrl.trim(),
    madeToOrder: draft.madeToOrder,
    quantity,
    fulfilmentDays: draft.madeToOrder ? Number(draft.fulfilmentDays) : null,
    price: assessment.price,
    offersEnabled: draft.offersEnabled,
    minimumPrice: minimum,
    published: true,
    sample: existing?.sample ?? false,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  }
}

export const WAGE_PRESETS = [80, 100, 120, 150, 200]
