export type OfferDecision =
  | { status: 'accepted'; price: number }
  | {
      status: 'rejected'
      reason: 'disabled' | 'invalid' | 'below-minimum' | 'above-list'
      minimum: number
      listedPrice: number
    }

export function evaluateOffer(args: {
  offersEnabled: boolean
  minimumPrice: number
  listedPrice: number
  offerPrice: number
}): OfferDecision {
  const minimum = args.minimumPrice
  const listedPrice = args.listedPrice

  if (!args.offersEnabled) {
    return { status: 'rejected', reason: 'disabled', minimum, listedPrice }
  }

  if (!Number.isFinite(args.offerPrice)) {
    return { status: 'rejected', reason: 'invalid', minimum, listedPrice }
  }

  const price = Math.round(args.offerPrice)
  if (price <= 0) {
    return { status: 'rejected', reason: 'invalid', minimum, listedPrice }
  }
  if (price > listedPrice) {
    return { status: 'rejected', reason: 'above-list', minimum, listedPrice }
  }
  if (price < minimum) {
    return { status: 'rejected', reason: 'below-minimum', minimum, listedPrice }
  }
  return { status: 'accepted', price }
}
