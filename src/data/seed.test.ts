import { describe, expect, it } from 'vitest'
import { seedProducts } from './seed'
import { buyerComponentsSum, essentialOfferFloor } from '../services/pricing'

describe('seed products', () => {
  it('keeps every sample price and offer rule consistent', () => {
    const products = seedProducts()
    expect(products).toHaveLength(4)
    for (const product of products) {
      expect(buyerComponentsSum(product.price)).toBe(product.price.listedPrice)
      expect(product.price.makerEarnings).toBe(product.price.labourCost + product.price.craftPremium)
      if (product.offersEnabled) {
        expect(product.minimumPrice).toBeGreaterThanOrEqual(essentialOfferFloor(product.price))
        expect(product.minimumPrice).toBeLessThanOrEqual(product.price.listedPrice)
      }
    }
  })
})
