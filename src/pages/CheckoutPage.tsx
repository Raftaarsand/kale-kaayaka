import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { messages } from '../data/i18n'
import { fill, formatINR } from '../lib/format'
import { messageFor } from '../lib/copy'
import { evaluateOffer } from '../services/offers'
import { MAX_ORDER_QTY, placeOrder } from '../services/store'
import { clearPendingOffer, readPendingOffer } from '../services/storage'
import { useCatalog } from '../hooks/useCatalog'
import { usePageTitle } from '../hooks/usePageTitle'
import { Button } from '../components/ui/Button'
import { textControlClass } from '../components/ui/Field'
import { ProductImage } from '../components/ui/ProductImage'

type CheckoutState = { offerPrice?: number; explicitList?: boolean }

export function CheckoutPage() {
  const { productId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { products, language } = useCatalog()
  const t = messages[language]
  const product = products.find((item) => item.id === productId)
  usePageTitle(t.checkoutTitle)
  const routeState = (location.state as CheckoutState | null) ?? {}
  const [useListedPrice, setUseListedPrice] = useState(Boolean(routeState.explicitList))
  const [quantity, setQuantity] = useState('1')
  const [buyerName, setBuyerName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [pincode, setPincode] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (routeState.explicitList) clearPendingOffer()
  }, [routeState.explicitList])

  if (!product || !product.published) {
    return (
      <div className="mx-auto max-w-lg py-10">
        <h1 className="font-display text-4xl">{t.missingTitle}</h1>
        <p className="mt-3 text-muted">{t.errUnavailable}</p>
        <div className="mt-6">
          <Button to="/">{t.backDiscover}</Button>
        </div>
      </div>
    )
  }

  const requestedOffer = useListedPrice
    ? null
    : typeof routeState.offerPrice === 'number'
      ? routeState.offerPrice
      : readPendingOffer(product.id)
  const decision =
    requestedOffer === null
      ? null
      : evaluateOffer({
          offersEnabled: product.offersEnabled,
          minimumPrice: product.minimumPrice,
          listedPrice: product.price.listedPrice,
          offerPrice: requestedOffer,
        })
  const offerAccepted = decision?.status === 'accepted'
  const unitPrice = offerAccepted ? decision.price : product.price.listedPrice
  const invalidOffer = decision !== null && decision.status !== 'accepted'
  const maxQuantity = product.madeToOrder ? MAX_ORDER_QTY : Math.min(MAX_ORDER_QTY, product.quantity)
  const soldOut = !product.madeToOrder && product.quantity < 1

  const submit = () => {
    const nextErrors: Record<string, string> = {}
    if (!buyerName.trim()) nextErrors.buyerName = t.errRequired
    if (!/^[6-9]\d{9}$/.test(phone.trim())) nextErrors.phone = t.errPhone
    if (!address.trim()) nextErrors.address = t.errRequired
    if (!city.trim()) nextErrors.city = t.errRequired
    if (!/^\d{6}$/.test(pincode.trim())) nextErrors.pincode = t.errPincode
    const qty = Number(quantity)
    if (!Number.isInteger(qty) || qty < 1 || qty > maxQuantity) {
      nextErrors.quantity = fill(t.errStock, { count: maxQuantity })
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0 || soldOut) return

    setSubmitting(true)
    const result = placeOrder({
      productId: product.id,
      quantity: qty,
      offerPrice: offerAccepted ? unitPrice : null,
      buyerName,
      phone,
      address,
      city,
      pincode,
    })
    setSubmitting(false)
    if (!result.ok) {
      if (result.error === 'stock') setFormError(fill(t.errStock, { count: result.available ?? 0 }))
      else if (result.error === 'storage') setFormError(t.storageError)
      else if (result.error === 'offer') setFormError(t.errOfferCheckout)
      else setFormError(messageFor(t, 'errUnavailable') ?? t.errUnavailable)
      return
    }
    navigate(`/order/${result.order.id}`)
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <Link to={`/product/${product.id}`} className="inline-flex min-h-11 items-center text-sm font-semibold text-primary">
        {t.backToProduct}
      </Link>
      <div>
        <h1 className="font-display text-4xl">{t.checkoutTitle}</h1>
        <p className="mt-3 text-muted">{t.checkoutLead}</p>
      </div>
      {invalidOffer ? (
        <p className="rounded-md bg-danger-surface px-4 py-3 text-sm text-danger" role="status">
          {t.invalidOfferNotice}
        </p>
      ) : null}
      {soldOut ? (
        <p className="rounded-md bg-danger-surface px-4 py-3 text-sm text-danger" role="alert">
          {t.soldOut}
        </p>
      ) : null}
      <section className="grid gap-4 rounded-lg border border-border bg-surface p-4 sm:grid-cols-[8rem_1fr]">
        <div className="aspect-square overflow-hidden rounded-md bg-muted-surface">
          <ProductImage src={product.imageSrc} alt={product.name} />
        </div>
        <div>
          <h2 className="font-display text-2xl">{product.name}</h2>
          <p className="text-sm text-muted">{product.makerName}</p>
          <p className="mt-3 font-display text-3xl">{formatINR(unitPrice)}</p>
          <p className="text-sm text-muted">
            {offerAccepted ? fill(t.agreedOffer, { price: formatINR(unitPrice) }) : t.listedPurchase}
          </p>
          <p className="mt-2 text-sm text-muted">
            {product.madeToOrder ? t.madeToOrder : fill(t.inStock, { count: product.quantity })}
          </p>
          {offerAccepted ? (
            <div className="mt-3">
              <Button
                variant="ghost"
                onClick={() => {
                  setUseListedPrice(true)
                  clearPendingOffer()
                }}
              >
                {t.listedInstead}
              </Button>
            </div>
          ) : null}
        </div>
      </section>
      <form
        className="flex flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault()
          submit()
        }}
        noValidate
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="qty" className="text-sm font-semibold">
            {t.qtyLabel}
          </label>
          <input
            id="qty"
            inputMode="numeric"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            aria-invalid={errors.quantity ? true : undefined}
            aria-describedby={errors.quantity ? 'qty-error' : undefined}
            className={textControlClass(Boolean(errors.quantity))}
            disabled={soldOut}
          />
          <p className="text-sm text-muted">
            {product.madeToOrder
              ? fill(t.fulfilment, { days: product.fulfilmentDays ?? 0 })
              : fill(t.onlyLeft, { count: product.quantity })}
          </p>
          {errors.quantity ? (
            <p id="qty-error" className="text-sm text-danger">
              {errors.quantity}
            </p>
          ) : null}
        </div>
        <h2 className="font-display text-2xl">{t.deliveryDetails}</h2>
        <CheckoutField id="buyer-name" label={t.buyerName} value={buyerName} onChange={setBuyerName} error={errors.buyerName} autoComplete="name" />
        <CheckoutField id="phone" label={t.phone} value={phone} onChange={setPhone} error={errors.phone} autoComplete="tel" inputMode="numeric" />
        <CheckoutField id="address" label={t.address} value={address} onChange={setAddress} error={errors.address} autoComplete="street-address" />
        <CheckoutField id="city" label={t.city} value={city} onChange={setCity} error={errors.city} autoComplete="address-level2" />
        <CheckoutField id="pincode" label={t.pincode} value={pincode} onChange={setPincode} error={errors.pincode} autoComplete="postal-code" inputMode="numeric" />
        {formError ? (
          <p className="text-sm text-danger" role="alert">
            {formError}
          </p>
        ) : null}
        <p className="text-sm text-muted">{t.noPayment}</p>
        <Button type="submit" disabled={soldOut || submitting}>
          {submitting ? t.placeOrder : t.placeOrder}
        </Button>
      </form>
    </div>
  )
}

function CheckoutField({
  id,
  label,
  value,
  onChange,
  error,
  autoComplete,
  inputMode,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  autoComplete?: string
  inputMode?: 'numeric' | 'text'
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <input
        id={id}
        value={value}
        autoComplete={autoComplete}
        inputMode={inputMode}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={textControlClass(Boolean(error))}
      />
      {error ? (
        <p id={`${id}-error`} className="text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  )
}
