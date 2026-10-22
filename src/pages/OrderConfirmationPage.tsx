import { useParams } from 'react-router-dom'
import { messages } from '../data/i18n'
import { formatINR } from '../lib/format'
import { useCatalog } from '../hooks/useCatalog'
import { usePageTitle } from '../hooks/usePageTitle'
import { PriceBreakdown } from '../components/product/PriceBreakdown'
import { Button } from '../components/ui/Button'

export function OrderConfirmationPage() {
  const { orderId } = useParams()
  const { orders, language } = useCatalog()
  const t = messages[language]
  const order = orders.find((item) => item.id === orderId)
  usePageTitle(order ? order.reference : t.orderMissing)

  if (!order) {
    return (
      <div className="mx-auto max-w-lg py-10">
        <h1 className="font-display text-4xl">{t.orderMissing}</h1>
        <div className="mt-6">
          <Button to="/orders">{t.viewOrder}</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <p className="text-sm font-semibold text-success">{t.orderPlaced}</p>
      <h1 className="font-display text-4xl sm:text-5xl">{order.reference}</h1>
      <p className="text-muted">{t.demoOnly}</p>
      <div className="rounded-lg border border-border bg-surface p-5">
        <p className="text-sm text-muted">{t.orderReference}</p>
        <p className="font-display text-3xl">{order.reference}</p>
        <p className="mt-4 font-semibold">{order.productName}</p>
        <p className="text-sm text-muted">{order.makerName}</p>
        <p className="mt-3">
          {order.quantity} × {formatINR(order.agreedUnitPrice)}
        </p>
        <p className="mt-1 font-display text-3xl">
          {t.agreedTotal} {formatINR(order.total)}
        </p>
        <p className="mt-2 text-sm text-muted">{order.fromOffer ? t.fromOffer : t.listedPurchase}</p>
        <p className="mt-3 text-sm">
          {order.buyerName}
          <br />
          {order.address}, {order.city} {order.pincode}
          <br />
          {order.phone}
        </p>
      </div>
      <section>
        <h2 className="font-display text-2xl">{t.breakdownAtPurchase}</h2>
        <div className="mt-4">
          <PriceBreakdown price={order.priceSnapshot} messages={t} agreedUnitPrice={order.agreedUnitPrice} />
        </div>
      </section>
      <div className="flex flex-wrap gap-2">
        <Button to="/">{t.backDiscover}</Button>
        <Button variant="secondary" to="/orders">
          {t.viewOrder}
        </Button>
      </div>
    </div>
  )
}
