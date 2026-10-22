import { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { messages } from '../data/i18n'
import { fill, formatINR } from '../lib/format'
import { youtubeEmbed } from '../lib/video'
import { useCatalog } from '../hooks/useCatalog'
import { usePageTitle } from '../hooks/usePageTitle'
import { OfferDialog } from '../components/product/OfferDialog'
import { PriceBreakdown } from '../components/product/PriceBreakdown'
import { Button } from '../components/ui/Button'
import { Drawer } from '../components/ui/Overlay'
import { ProductImage } from '../components/ui/ProductImage'
import type { CategoryId } from '../types/models'

const categoryKey: Record<CategoryId, 'catTextile' | 'catBasketry' | 'catCoconut' | 'catWood'> = {
  textile: 'catTextile',
  basketry: 'catBasketry',
  coconut: 'catCoconut',
  wood: 'catWood',
}

export function ProductPage() {
  const { productId } = useParams()
  const location = useLocation()
  const { products, language } = useCatalog()
  const t = messages[language]
  const product = products.find((item) => item.id === productId)
  usePageTitle(product?.name ?? t.missingTitle)
  const [priceOpen, setPriceOpen] = useState(false)
  const [offerOpen, setOfferOpen] = useState(false)
  const banner = (location.state as { banner?: 'published' | 'updated' } | null)?.banner

  if (!product) {
    return (
      <div className="mx-auto max-w-lg py-10">
        <h1 className="font-display text-4xl">{t.missingTitle}</h1>
        <p className="mt-3 text-muted">{t.missingBody}</p>
        <div className="mt-6">
          <Button to="/">{t.backDiscover}</Button>
        </div>
      </div>
    )
  }

  const available = product.published && (product.madeToOrder || product.quantity > 0)
  const embed = product.videoUrl ? youtubeEmbed(product.videoUrl) : null

  return (
    <div className="flex flex-col gap-8">
      <Link to="/" className="inline-flex min-h-11 items-center text-sm font-semibold text-primary">
        {t.backDiscover}
      </Link>
      {banner ? (
        <p className="rounded-md bg-success-surface px-4 py-3 text-sm text-success" role="status">
          {banner === 'published' ? t.publishedBanner : t.updatedBanner}
        </p>
      ) : null}
      {!product.published ? (
        <p className="rounded-md bg-muted-surface px-4 py-3 text-sm" role="status">
          {t.notForSale}
        </p>
      ) : null}
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="overflow-hidden rounded-xl bg-muted-surface shadow-soft">
          <div className="aspect-[4/5]">
            <ProductImage src={product.imageSrc} alt={product.name} />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-sm font-semibold text-highlight">{t[categoryKey[product.category]]}</p>
            <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">{product.name}</h1>
            <p className="mt-2 text-muted">
              {product.makerName} · {product.region}
            </p>
            <p className="mt-4 font-display text-4xl">{formatINR(product.price.listedPrice)}</p>
          </div>
          <p className="text-base leading-relaxed">{product.description}</p>
          <div>
            <h2 className="text-sm font-semibold">{t.materials}</h2>
            <p className="mt-1 text-muted">{product.materials}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold">{t.availability}</h2>
            <p className="mt-1 text-muted">
              {product.madeToOrder
                ? `${t.madeToOrder} · ${fill(t.fulfilment, { days: product.fulfilmentDays ?? 0 })}`
                : product.quantity > 0
                  ? fill(t.inStock, { count: product.quantity })
                  : t.soldOut}
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <Button variant="secondary" onClick={() => setPriceOpen(true)}>
              {t.whyPrice}
            </Button>
            <Button variant="secondary" to={`/passport/${product.id}`}>
              {t.passportAction}
            </Button>
            {available ? (
              <Button to={`/checkout/${product.id}`} state={{ explicitList: true }}>
                {t.buyNow}
              </Button>
            ) : (
              <Button disabled>{product.published ? t.soldOut : t.notForSale}</Button>
            )}
            {available && product.offersEnabled ? (
              <Button variant="ghost" onClick={() => setOfferOpen(true)}>
                {t.makeOffer}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
      <section className="max-w-3xl">
        <h2 className="font-display text-3xl">{t.story}</h2>
        <p className="mt-3 whitespace-pre-wrap leading-relaxed text-muted">{product.craftStory}</p>
      </section>
      <section className="max-w-3xl">
        <h2 className="font-display text-3xl">{t.makingVideo}</h2>
        {embed ? (
          <div className="mt-4 aspect-video overflow-hidden rounded-lg border border-border bg-surface">
            <iframe
              title={t.makingVideo}
              src={embed}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : product.videoUrl ? (
          <p className="mt-3">
            <a href={product.videoUrl} className="font-semibold text-primary underline" target="_blank" rel="noreferrer">
              {t.watchVideo}
            </a>
          </p>
        ) : (
          <p className="mt-3 text-muted">{t.noVideo}</p>
        )}
      </section>
      {priceOpen ? (
        <Drawer title={t.whyPrice} closeLabel={t.close} onClose={() => setPriceOpen(false)}>
          <PriceBreakdown price={product.price} messages={t} />
        </Drawer>
      ) : null}
      {offerOpen ? <OfferDialog product={product} messages={t} onClose={() => setOfferOpen(false)} /> : null}
    </div>
  )
}
