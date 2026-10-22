import type { Messages } from '../../data/i18n'
import { fill, formatINR } from '../../lib/format'
import { advanceOrder } from '../../services/store'
import type { Order, OrderStatus } from '../../types/models'
import { Button } from '../ui/Button'
import { ProductImage } from '../ui/ProductImage'

const statusKey: Record<OrderStatus, keyof Messages> = {
  confirmed: 'statusConfirmed',
  preparing: 'statusPreparing',
  ready: 'statusReady',
}

const nextStatus: Record<OrderStatus, OrderStatus | null> = {
  confirmed: 'preparing',
  preparing: 'ready',
  ready: null,
}

export function OrderCard({ order, messages, manage = false }: { order: Order; messages: Messages; manage?: boolean }) {
  const upcoming = nextStatus[order.status]
  return (
    <article className="grid gap-4 rounded-lg border border-border bg-surface p-4 shadow-soft sm:grid-cols-[7rem_1fr]">
      <div className="aspect-square overflow-hidden rounded-md bg-muted-surface">
        <ProductImage src={order.imageSrc} alt="" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="text-sm text-muted">{order.reference}</p>
            <h3 className="font-display text-2xl">{order.productName}</h3>
            <p className="text-sm text-muted">{order.makerName}</p>
          </div>
          <p className="rounded-md bg-muted-surface px-2 py-1 text-sm font-semibold">{messages[statusKey[order.status]]}</p>
        </div>
        <p className="text-sm">
          {order.quantity} × {formatINR(order.agreedUnitPrice)} · {messages.agreedTotal} {formatINR(order.total)}
        </p>
        <p className="text-sm text-muted">{order.fromOffer ? messages.fromOffer : messages.listedPurchase}</p>
        <p className="text-sm text-muted">
          {order.buyerName} · {order.city} · {order.pincode}
        </p>
        {manage && upcoming ? (
          <div>
            <Button variant="secondary" onClick={() => advanceOrder(order.id)}>
              {fill(messages.advanceStatus, { status: messages[statusKey[upcoming]] })}
            </Button>
          </div>
        ) : null}
      </div>
    </article>
  )
}
