import { buyerComponentsSum, calculatePrice, essentialOfferFloor, suggestedPlatformFee } from '../services/pricing'
import type { CategoryId, Product } from '../types/models'

type SeedInput = {
  id: string
  name: string
  makerName: string
  region: string
  category: CategoryId
  imageSrc: string
  description: string
  materials: string
  craftStory: string
  madeToOrder: boolean
  quantity: number
  fulfilmentDays: number | null
  labourHours: number
  hourlyWage: number
  materialCost: number
  packagingCost: number
  craftPremium: number
  offersEnabled: boolean
  minimumPrice?: number
  createdAt: string
}

function makeSample(input: SeedInput): Product {
  const subtotal =
    Math.round(input.labourHours * input.hourlyWage) +
    input.materialCost +
    input.packagingCost +
    input.craftPremium
  const platformFee = suggestedPlatformFee(subtotal)
  const result = calculatePrice({
    labourHours: input.labourHours,
    hourlyWage: input.hourlyWage,
    materialCost: input.materialCost,
    packagingCost: input.packagingCost,
    craftPremium: input.craftPremium,
    platformFee,
  })
  if (!result.ok) throw new Error(`Sample price failed for ${input.id}`)
  const floor = essentialOfferFloor(result.price)
  const minimumPrice = input.minimumPrice ?? floor
  if (buyerComponentsSum(result.price) !== result.price.listedPrice) {
    throw new Error(`Sample total mismatch for ${input.id}`)
  }
  if (input.offersEnabled && (minimumPrice < floor || minimumPrice > result.price.listedPrice)) {
    throw new Error(`Sample offer policy invalid for ${input.id}`)
  }

  return {
    id: input.id,
    name: input.name,
    makerName: input.makerName,
    region: input.region,
    category: input.category,
    imageSrc: input.imageSrc,
    description: input.description,
    materials: input.materials,
    craftStory: input.craftStory,
    videoUrl: '',
    madeToOrder: input.madeToOrder,
    quantity: input.madeToOrder ? 0 : input.quantity,
    fulfilmentDays: input.madeToOrder ? input.fulfilmentDays : null,
    price: result.price,
    offersEnabled: input.offersEnabled,
    minimumPrice: input.offersEnabled ? minimumPrice : floor,
    published: true,
    sample: true,
    createdAt: input.createdAt,
    updatedAt: input.createdAt,
  }
}

export function seedProducts(): Product[] {
  return [
    makeSample({
      id: 'sample-kasuti',
      name: 'Kasuti border runner',
      makerName: 'Savitri Patil',
      region: 'Dharwad, Karnataka',
      category: 'textile',
      imageSrc: '/images/kasuti.jpg',
      description:
        'A cotton runner with counted Kasuti borders in indigo, turmeric and maroon. The reverse stays nearly as neat as the front.',
      materials: 'Handloom cotton and silk thread in indigo, turmeric, maroon and leaf green.',
      craftStory:
        'Savitri counts the stitches on the cloth: straight runs, diagonals and small filled motifs, with almost no knots on the reverse. She says she learned the count from her grandmother in Dharwad. This text is her description of the piece for the demo. It is not a certificate that this cloth is GI-tagged.',
      madeToOrder: true,
      quantity: 0,
      fulfilmentDays: 21,
      labourHours: 18,
      hourlyWage: 120,
      materialCost: 480,
      packagingCost: 60,
      craftPremium: 350,
      offersEnabled: false,
      createdAt: '2026-01-12T09:00:00.000Z',
    }),
    makeSample({
      id: 'sample-basket',
      name: 'Coastal cane market basket',
      makerName: 'Lakshmi Naik',
      region: 'Kumta, Uttara Kannada',
      category: 'basketry',
      imageSrc: '/images/basket.jpg',
      description:
        'A tight cane basket sized for a weekly market load, with a wrapped handle that sits on the shoulder.',
      materials: 'Seasoned wild cane, gathered after the monsoon and dried in the shade.',
      craftStory:
        'Lakshmi weaves the base as a spiral, then turns the wall upward so the basket keeps its shape when it is full of flowers or dried fish. The handle is wrapped so the cane does not cut the hand. She takes offers down to the cost of her labour, cane, packing and the platform fee.',
      madeToOrder: false,
      quantity: 5,
      fulfilmentDays: null,
      labourHours: 6,
      hourlyWage: 110,
      materialCost: 220,
      packagingCost: 80,
      craftPremium: 90,
      offersEnabled: true,
      createdAt: '2026-02-02T09:00:00.000Z',
    }),
    makeSample({
      id: 'sample-coconut',
      name: 'Coconut-shell spice bowls',
      makerName: 'Ravi Shetty',
      region: 'Ullal, Mangaluru',
      category: 'coconut',
      imageSrc: '/images/coconut.jpg',
      description:
        'A nested set of three bowls turned from fallen coconut shell, sanded and rubbed with coconut oil.',
      materials: 'Fallen coconut shell from a neighbour’s grove, coconut oil, and cotton cloth for the finish.',
      craftStory:
        'Ravi cuts shells that have already dropped, sands the rim, and oils the surface. No two shells match, so the rims stay slightly different. The set is for salt, chilli and mustard. Offers are open, but only a little under the listed price.',
      madeToOrder: false,
      quantity: 4,
      fulfilmentDays: null,
      labourHours: 3.5,
      hourlyWage: 100,
      materialCost: 70,
      packagingCost: 40,
      craftPremium: 60,
      offersEnabled: true,
      minimumPrice: 530,
      createdAt: '2026-02-18T09:00:00.000Z',
    }),
    makeSample({
      id: 'sample-toy',
      name: 'Lacquer wood toy pair',
      makerName: 'Girija Rao',
      region: 'Channapatna, Ramanagara',
      category: 'wood',
      imageSrc: '/images/toy.jpg',
      description:
        'Two small lacquered wood toys, sanded smooth and coloured for a child’s hand.',
      materials: 'Turned hale wood, lac colour, and a final sanding cloth.',
      craftStory:
        'Girija turns the forms on a hand lathe in Channapatna and lays the colour in thin coats. The toys are meant to be held, so the edges are rounded and the finish is dry. She is not taking offers on this pair.',
      madeToOrder: false,
      quantity: 3,
      fulfilmentDays: null,
      labourHours: 8,
      hourlyWage: 140,
      materialCost: 240,
      packagingCost: 50,
      craftPremium: 180,
      offersEnabled: false,
      createdAt: '2026-03-04T09:00:00.000Z',
    }),
  ]
}
