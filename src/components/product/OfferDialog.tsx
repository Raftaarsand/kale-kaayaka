import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Messages } from '../../data/i18n'
import { fill, formatINR } from '../../lib/format'
import { evaluateOffer } from '../../services/offers'
import { recordOffer, rememberAcceptedOffer } from '../../services/store'
import type { Product } from '../../types/models'
import { Button } from '../ui/Button'
import { textControlClass } from '../ui/Field'
import { Modal } from '../ui/Overlay'

export function OfferDialog({
  product,
  messages,
  onClose,
}: {
  product: Product
  messages: Messages
  onClose: () => void
}) {
  const navigate = useNavigate()
  const [amount, setAmount] = useState('')
  const [feedback, setFeedback] = useState<{ tone: 'success' | 'danger'; text: string; price?: number } | null>(null)

  const submit = () => {
    if (!/^\d+$/.test(amount.trim())) {
      setFeedback({ tone: 'danger', text: messages.offerInvalid })
      return
    }
    const offerPrice = Number(amount)
    const decision = evaluateOffer({
      offersEnabled: product.offersEnabled,
      minimumPrice: product.minimumPrice,
      listedPrice: product.price.listedPrice,
      offerPrice,
    })
    if (decision.status === 'accepted') {
      recordOffer(product, decision.price, 'accepted')
      setFeedback({
        tone: 'success',
        text: fill(messages.offerAccepted, { price: formatINR(decision.price) }),
        price: decision.price,
      })
      return
    }
    recordOffer(product, offerPrice, 'rejected')
    const text =
      decision.reason === 'below-minimum'
        ? fill(messages.offerTooLow, { minimum: formatINR(decision.minimum) })
        : decision.reason === 'above-list'
          ? fill(messages.offerTooHigh, { listed: formatINR(decision.listedPrice) })
          : messages.offerInvalid
    setFeedback({ tone: 'danger', text })
  }

  return (
    <Modal title={messages.offerTitle} closeLabel={messages.close} onClose={onClose}>
      <p className="text-sm text-muted">
        {fill(messages.offerHelp, {
          minimum: formatINR(product.minimumPrice),
          listed: formatINR(product.price.listedPrice),
        })}
      </p>
      <div className="mt-4 flex flex-col gap-1.5">
        <label htmlFor="offer-amount" className="text-sm font-semibold">
          {messages.offerAmount}
        </label>
        <input
          id="offer-amount"
          inputMode="numeric"
          value={amount}
          onChange={(event) => {
            setAmount(event.target.value)
            setFeedback(null)
          }}
          className={textControlClass(feedback?.tone === 'danger')}
          aria-describedby="offer-feedback"
        />
      </div>
      <p
        id="offer-feedback"
        role="status"
        className={feedback?.tone === 'danger' ? 'mt-3 text-sm text-danger' : 'mt-3 text-sm text-success'}
      >
        {feedback?.text ?? ''}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {feedback?.price ? (
          <Button
            onClick={() => {
              rememberAcceptedOffer(product.id, feedback.price as number)
              navigate(`/checkout/${product.id}`, { state: { offerPrice: feedback.price } })
            }}
          >
            {messages.continueCheckout}
          </Button>
        ) : (
          <Button onClick={submit}>{messages.submitOffer}</Button>
        )}
        <Button variant="secondary" onClick={onClose}>
          {messages.cancel}
        </Button>
      </div>
    </Modal>
  )
}
