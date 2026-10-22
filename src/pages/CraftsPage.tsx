import { useState } from 'react'
import { messages } from '../data/i18n'
import { fill, formatINR } from '../lib/format'
import { resetDemo, setPublished } from '../services/store'
import { useCatalog } from '../hooks/useCatalog'
import { usePageTitle } from '../hooks/usePageTitle'
import { OrderCard } from '../components/orders/OrderCard'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Overlay'
import { ProductImage } from '../components/ui/ProductImage'

export function CraftsPage() {
  const { products, orders, offerAttempts, language } = useCatalog()
  const t = messages[language]
  usePageTitle(t.dashboardTitle)
  const [resetOpen, setResetOpen] = useState(false)
  const [resetDone, setResetDone] = useState(false)
  const published = products.filter((product) => product.published).length

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-4xl sm:text-5xl">{t.dashboardTitle}</h1>
          <p className="mt-3 max-w-2xl text-muted">{t.dashboardLead}</p>
        </div>
        <Button to="/crafts/new">{t.addCraft}</Button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <p className="rounded-lg border border-border bg-surface px-4 py-4 font-display text-2xl">
          {fill(t.publishedCount, { count: published })}
        </p>
        <p className="rounded-lg border border-border bg-surface px-4 py-4 font-display text-2xl">
          {fill(t.orderCount, { count: orders.length })}
        </p>
      </div>
      {resetDone ? (
        <p className="rounded-md bg-success-surface px-4 py-3 text-sm text-success" role="status">
          {t.resetDone}
        </p>
      ) : null}
      <div className="flex">
        <Button variant="secondary" to="/">
          {t.backDiscover}
        </Button>
      </div>
      <section className="flex flex-col gap-4">
        {products.map((product) => (
          <article key={product.id} className="grid gap-4 rounded-lg border border-border bg-surface p-4 shadow-soft sm:grid-cols-[7rem_1fr]">
            <div className="aspect-square overflow-hidden rounded-md bg-muted-surface">
              <ProductImage src={product.imageSrc} alt="" />
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <h2 className="font-display text-2xl">{product.name}</h2>
                <p className="text-sm text-muted">{product.makerName}</p>
                <p className="mt-1 font-semibold">{formatINR(product.price.listedPrice)}</p>
                <p className="text-sm text-muted">
                  {product.offersEnabled ? `${t.offersOn} · ${fill(t.minimumOffer, { price: formatINR(product.minimumPrice) })}` : t.offersOff}
                  {product.published ? '' : ` · ${t.notForSale}`}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" to={`/crafts/${product.id}/edit`}>
                  {t.edit}
                </Button>
                <Button variant="ghost" onClick={() => setPublished(product.id, !product.published)}>
                  {product.published ? t.unpublish : t.publish}
                </Button>
                <Button variant="ghost" to={`/product/${product.id}`}>
                  {t.viewDetails}
                </Button>
              </div>
              <p className="text-sm text-muted">{t.changeOffers}</p>
            </div>
          </article>
        ))}
      </section>
      <section className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-3xl">{t.recentOrders}</h2>
          <Button variant="secondary" to="/orders">
            {t.viewAllOrders}
          </Button>
        </div>
        {orders.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border bg-surface px-4 py-8 text-muted">{t.noOrders}</p>
        ) : (
          orders.slice(0, 3).map((order) => <OrderCard key={order.id} order={order} messages={t} manage />)
        )}
      </section>
      <section className="flex flex-col gap-3">
        <h2 className="font-display text-3xl">{t.offerOutcomes}</h2>
        {offerAttempts.length === 0 ? (
          <p className="text-sm text-muted">{t.noOfferOutcomes}</p>
        ) : (
          <ul className="divide-y divide-border rounded-lg border border-border bg-surface">
            {offerAttempts.slice(0, 8).map((attempt) => (
              <li key={attempt.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm">
                <span>
                  {attempt.productName} · {formatINR(attempt.amount)}
                </span>
                <span className={attempt.outcome === 'accepted' ? 'font-semibold text-success' : 'font-semibold text-danger'}>
                  {attempt.outcome === 'accepted' ? t.offerAcceptedShort : t.offerRejectedShort}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
      <div>
        <Button variant="danger" onClick={() => setResetOpen(true)}>
          {t.resetDemo}
        </Button>
      </div>
      {resetOpen ? (
        <Modal title={t.resetTitle} closeLabel={t.close} onClose={() => setResetOpen(false)}>
          <p className="text-sm text-muted">{t.resetBody}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button
              variant="danger"
              onClick={() => {
                resetDemo()
                setResetOpen(false)
                setResetDone(true)
              }}
            >
              {t.resetConfirm}
            </Button>
            <Button variant="secondary" onClick={() => setResetOpen(false)}>
              {t.cancel}
            </Button>
          </div>
        </Modal>
      ) : null}
    </div>
  )
}
