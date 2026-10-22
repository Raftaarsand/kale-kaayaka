/** Platform fee is a fixed rupee amount. The suggestion is this share of the pre-fee subtotal. */
export const PLATFORM_FEE_RATE = 0.08

export const PRICE_LIMITS = {
  maxHours: 400,
  maxWage: 5000,
  maxMoney: 200000,
} as const

export type PriceInput = {
  labourHours: number
  hourlyWage: number
  materialCost: number
  packagingCost: number
  craftPremium: number
  platformFee: number
}

export type PriceBreakdown = {
  labourHours: number
  hourlyWage: number
  labourCost: number
  materialCost: number
  packagingCost: number
  craftPremium: number
  platformFee: number
  makerEarnings: number
  listedPrice: number
}

export type PriceErrorCode = 'not-a-number' | 'negative' | 'too-high' | 'price-zero'

export type PriceResult =
  | { ok: true; price: PriceBreakdown }
  | { ok: false; errors: PriceErrorCode[] }

export function suggestedPlatformFee(subtotalBeforeFee: number): number {
  if (!Number.isFinite(subtotalBeforeFee) || subtotalBeforeFee <= 0) return 0
  return Math.round(subtotalBeforeFee * PLATFORM_FEE_RATE)
}

export function calculatePrice(input: PriceInput): PriceResult {
  const values = [
    input.labourHours,
    input.hourlyWage,
    input.materialCost,
    input.packagingCost,
    input.craftPremium,
    input.platformFee,
  ]

  if (values.some((value) => typeof value !== 'number' || !Number.isFinite(value))) {
    return { ok: false, errors: ['not-a-number'] }
  }

  const errors: PriceErrorCode[] = []
  if (values.some((value) => value < 0)) errors.push('negative')
  if (
    input.labourHours > PRICE_LIMITS.maxHours ||
    input.hourlyWage > PRICE_LIMITS.maxWage ||
    input.materialCost > PRICE_LIMITS.maxMoney ||
    input.packagingCost > PRICE_LIMITS.maxMoney ||
    input.craftPremium > PRICE_LIMITS.maxMoney ||
    input.platformFee > PRICE_LIMITS.maxMoney
  ) {
    errors.push('too-high')
  }
  if (errors.length > 0) return { ok: false, errors }

  const labourCost = Math.round(input.labourHours * input.hourlyWage)
  const materialCost = Math.round(input.materialCost)
  const packagingCost = Math.round(input.packagingCost)
  const craftPremium = Math.round(input.craftPremium)
  const platformFee = Math.round(input.platformFee)
  const makerEarnings = labourCost + craftPremium
  const listedPrice = makerEarnings + materialCost + packagingCost + platformFee

  if (!Number.isFinite(listedPrice) || listedPrice <= 0) {
    return { ok: false, errors: ['price-zero'] }
  }

  return {
    ok: true,
    price: {
      labourHours: input.labourHours,
      hourlyWage: Math.round(input.hourlyWage),
      labourCost,
      materialCost,
      packagingCost,
      craftPremium,
      platformFee,
      makerEarnings,
      listedPrice,
    },
  }
}

/** Labour, materials, packaging and the platform fee. The craft premium can be negotiated down. */
export function essentialOfferFloor(price: PriceBreakdown): number {
  return price.labourCost + price.materialCost + price.packagingCost + price.platformFee
}

/** Buyer-facing parts. These are mutually exclusive and must equal the listed price. */
export function buyerComponentsSum(price: PriceBreakdown): number {
  return price.makerEarnings + price.materialCost + price.packagingCost + price.platformFee
}
