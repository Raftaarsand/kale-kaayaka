import { QRCodeSVG } from 'qrcode.react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { messages } from '../data/i18n'
import { useCatalog } from '../hooks/useCatalog'
import { usePageTitle } from '../hooks/usePageTitle'
import { PriceBreakdown } from '../components/product/PriceBreakdown'
import { Button } from '../components/ui/Button'
import { ProductImage } from '../components/ui/ProductImage'
import { youtubeEmbed } from '../lib/video'

export function PassportPage() {
  const { productId } = useParams()
  const { products, language } = useCatalog()
  const t = messages[language]
  const product = products.find((item) => item.id === productId)
  usePageTitle(product ? `${product.name}` : t.missingTitle)
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle')

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

  const url = `${window.location.origin}/passport/${product.id}`
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  const embed = product.videoUrl ? youtubeEmbed(product.videoUrl) : null
  const available = product.published && (product.madeToOrder || product.quantity > 0)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    }
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <Link to={`/product/${product.id}`} className="inline-flex min-h-11 items-center text-sm font-semibold text-primary">
        {t.backToProduct}
      </Link>
      <article className="rounded-xl border border-border bg-surface p-5 shadow-raised sm:p-8">
        <p className="text-sm font-semibold tracking-wide text-highlight">{t.passportKicker}</p>
        <h1 className="mt-2 font-display text-4xl leading-tight">{product.name}</h1>
        <p className="mt-2 text-sm text-muted">
          {t.passportId}: {product.id}
        </p>
        <p className="mt-4 rounded-md border border-border bg-surface-sunken px-4 py-3 text-sm">{t.passportDisclaimer}</p>
        <div className="mt-6 aspect-[4/3] overflow-hidden rounded-lg bg-muted-surface">
          <ProductImage src={product.imageSrc} alt={product.name} />
        </div>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-semibold">{t.makerDeclared}</dt>
            <dd className="text-muted">{product.makerName}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold">{t.region}</dt>
            <dd className="text-muted">{product.region}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-semibold">{t.materials}</dt>
            <dd className="text-muted">{product.materials}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-semibold">{t.story}</dt>
            <dd className="whitespace-pre-wrap text-muted">{product.craftStory}</dd>
          </div>
        </dl>
        <section className="mt-6">
          <h2 className="font-display text-2xl">{t.makingVideo}</h2>
          {embed ? (
            <div className="mt-3 aspect-video overflow-hidden rounded-lg border border-border">
              <iframe title={t.makingVideo} src={embed} className="h-full w-full" allowFullScreen />
            </div>
          ) : product.videoUrl ? (
            <a href={product.videoUrl} className="mt-3 inline-flex min-h-11 items-center font-semibold text-primary underline">
              {t.watchVideo}
            </a>
          ) : (
            <p className="mt-2 text-sm text-muted">{t.noVideo}</p>
          )}
        </section>
        <section className="mt-8">
          <h2 className="font-display text-2xl">{t.whyPrice}</h2>
          <div className="mt-4">
            <PriceBreakdown price={product.price} messages={t} />
          </div>
        </section>
        <section className="mt-8 grid gap-4 border-t border-dashed border-border pt-6 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <h2 className="font-display text-2xl">{t.qrTitle}</h2>
            <p className="mt-2 break-all text-sm text-muted">{url}</p>
            {isLocal ? <p className="mt-2 text-sm text-muted">{t.qrLocalhost}</p> : null}
            <div className="mt-3">
              <Button variant="secondary" onClick={() => void copy()}>
                {t.copyLink}
              </Button>
            </div>
            <p role="status" className="mt-2 text-sm text-muted">
              {copyState === 'copied' ? t.copied : copyState === 'failed' ? t.copyFailed : ''}
            </p>
          </div>
          <div className="rounded-md border border-border bg-surface p-3">
            <QRCodeSVG value={url} size={168} level="M" bgColor="transparent" fgColor="currentColor" />
          </div>
        </section>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button variant="secondary" to={`/product/${product.id}`}>
            {t.backToProduct}
          </Button>
          {available ? (
            <Button to={`/checkout/${product.id}`} state={{ explicitList: true }}>
              {t.buyNow}
            </Button>
          ) : null}
        </div>
      </article>
    </div>
  )
}
