import { describe, expect, it } from 'vitest'
import {
  buyerComponentsSum,
  calculatePrice,
  essentialOfferFloor,
  suggestedPlatformFee,
} from './pricing'

const kasutiInput = {
  labourHours: 18,
  hourlyWage: 120,
  materialCost: 480,
  packagingCost: 60,
  craftPremium: 350,
  platformFee: 244,
}

describe('calculatePrice', () => {
  it('makes buyer-facing parts add up to the listed price', () => {
    const result = calculatePrice(kasutiInput)
    expect(result.ok).toBe(true)
    if (!result.ok) return

    expect(result.price.labourCost).toBe(2160)
    expect(result.price.makerEarnings).toBe(2510)
    expect(result.price.listedPrice).toBe(3294)
    expect(buyerComponentsSum(result.price)).toBe(result.price.listedPrice)
    expect(result.price.labourCost + result.price.craftPremium).toBe(result.price.makerEarnings)
    expect(
      result.price.labourCost +
        result.price.materialCost +
        result.price.packagingCost +
        result.price.craftPremium +
        result.price.platformFee,
    ).toBe(result.price.listedPrice)
  })

  it('rounds labour to the nearest rupee and does not count the premium twice', () => {
    const result = calculatePrice({
      labourHours: 1.5,
      hourlyWage: 100,
      materialCost: 10,
      packagingCost: 0,
      craftPremium: 0,
      platformFee: 0,
    })
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.price.labourCost).toBe(150)
    expect(result.price.makerEarnings).toBe(150)
    expect(result.price.listedPrice).toBe(160)
    expect(buyerComponentsSum(result.price)).toBe(160)
  })

  it('rejects non-finite, negative, and zero totals', () => {
    expect(
      calculatePrice({ ...kasutiInput, labourHours: Number.NaN }).ok,
    ).toBe(false)
    expect(calculatePrice({ ...kasutiInput, hourlyWage: -1 }).ok).toBe(false)
    expect(
      calculatePrice({
        labourHours: 0,
        hourlyWage: 0,
        materialCost: 0,
        packagingCost: 0,
        craftPremium: 0,
        platformFee: 0,
      }).ok,
    ).toBe(false)
  })

  it('sets the offer floor as every cost except the craft premium', () => {
    const result = calculatePrice({
      labourHours: 4,
      hourlyWage: 100,
      materialCost: 50,
      packagingCost: 20,
      craftPremium: 80,
      platformFee: 40,
    })
    if (!result.ok) throw new Error('expected a valid price')
    expect(essentialOfferFloor(result.price)).toBe(510)
    expect(result.price.listedPrice - essentialOfferFloor(result.price)).toBe(80)
  })
})

describe('suggestedPlatformFee', () => {
  it('is eight percent of the pre-fee subtotal, rounded to a rupee', () => {
    expect(suggestedPlatformFee(3050)).toBe(244)
    expect(suggestedPlatformFee(0)).toBe(0)
    expect(suggestedPlatformFee(Number.NaN)).toBe(0)
  })
})
