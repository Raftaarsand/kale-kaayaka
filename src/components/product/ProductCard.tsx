import { Link } from 'react-router-dom'
import type { Messages } from '../../data/i18n'
import { formatINR } from '../../lib/format'
import type { Product } from '../../types/models'
import { Button } from '../ui/Button'
import { ProductImage } from '../ui/ProductImage'

export function ProductCard({
  product,
  messages,
  preview = false,
}: {
  product: Product
  messages: Messages
  preview?: boolean
}) {
  const available = product.madeToOrder || product.quantity > 0
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-soft">
      <div className="aspect-[4/5] overflow-hidden bg-muted-surface">
        {preview ? (
          <ProductImage src={product.imageSrc} alt={product.name} />
        ) : (
          <Link to={`/product/${product.id}`} className="block h-full" aria-label={product.name}>
            <ProductImage src={product.imageSrc} alt="" />
          </Link>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="text-sm text-muted">{product.makerName}</p>
          <h3 className="font-display text-2xl leading-tight text-foreground">
            {preview ? (
              product.name
            ) : (
              <Link to={`/product/${product.id}`} className="hover:text-primary">
                {product.name}
              </Link>
            )}
          </h3>
        </div>
        <p className="font-display text-2xl text-foreground">{formatINR(product.price.listedPrice)}</p>
        <div className="mt-auto flex flex-wrap gap-2">
          {preview ? (
            <>
              <Button variant="secondary" disabled>
                {messages.viewDetails}
              </Button>
              <Button disabled>{messages.buyNow}</Button>
            </>
          ) : (
            <>
              <Button variant="secondary" to={`/product/${product.id}`}>
                {messages.viewDetails}
              </Button>
              {available && product.published ? (
                <Button to={`/checkout/${product.id}`} state={{ explicitList: true }}>
                  {messages.buyNow}
                </Button>
              ) : (
                <Button disabled>{messages.soldOut}</Button>
              )}
            </>
          )}
        </div>
      </div>
    </article>
  )
}
