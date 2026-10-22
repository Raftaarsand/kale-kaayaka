import { describe, expect, it } from 'vitest'
import { evaluateOffer } from './offers'

const policy = {
  offersEnabled: true,
  minimumPrice: 1044,
  listedPrice: 1134,
}

describe('evaluateOffer', () => {
  it('accepts an offer between the minimum and the listed price', () => {
    expect(evaluateOffer({ ...policy, offerPrice: 1100 })).toEqual({
      status: 'accepted',
      price: 1100,
    })
  })

  it('rejects an offer below the maker minimum', () => {
    const decision = evaluateOffer({ ...policy, offerPrice: 900 })
    expect(decision.status).toBe('rejected')
    if (decision.status === 'rejected') expect(decision.reason).toBe('below-minimum')
  })

  it('rejects offers when the maker has turned negotiation off', () => {
    const decision = evaluateOffer({ ...policy, offersEnabled: false, offerPrice: 1100 })
    expect(decision.status).toBe('rejected')
    if (decision.status === 'rejected') expect(decision.reason).toBe('disabled')
  })

  it('rejects an offer above the listed price and a non-number', () => {
    expect(evaluateOffer({ ...policy, offerPrice: 2000 }).status).toBe('rejected')
    expect(evaluateOffer({ ...policy, offerPrice: Number.NaN }).status).toBe('rejected')
    expect(evaluateOffer({ ...policy, offerPrice: 0 }).status).toBe('rejected')
  })
})
