import { messages } from '../data/i18n'
import { useCatalog } from '../hooks/useCatalog'
import { usePageTitle } from '../hooks/usePageTitle'
import { OrderCard } from '../components/orders/OrderCard'
import { Button } from '../components/ui/Button'

export function OrdersPage() {
  const { orders, language } = useCatalog()
  const t = messages[language]
  usePageTitle(t.orders)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-4xl sm:text-5xl">{t.orders}</h1>
        <p className="mt-3 max-w-2xl text-muted">{t.ordersLead}</p>
      </div>
      {orders.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-surface px-4 py-10 text-center">
          <p>{t.noOrders}</p>
          <div className="mt-4">
            <Button to="/">{t.browseCrafts}</Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} messages={t} manage />
          ))}
        </div>
      )}
    </div>
  )
}
