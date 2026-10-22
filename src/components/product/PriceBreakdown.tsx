import type { Messages } from '../../data/i18n'
import { fill, formatINR } from '../../lib/format'
import type { PriceBreakdown as Price } from '../../services/pricing'

export function PriceBreakdown({
  price,
  messages,
  agreedUnitPrice,
}: {
  price: Price
  messages: Messages
  agreedUnitPrice?: number
}) {
  const rows = [
    { label: messages.materials, amount: price.materialCost },
    { label: messages.packaging, amount: price.packagingCost },
    { label: messages.platformFee, amount: price.platformFee },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-md border border-border bg-surface-sunken p-4">
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-semibold">{messages.makerEarnings}</span>
          <span className="font-display text-xl">{formatINR(price.makerEarnings)}</span>
        </div>
        <ul className="mt-2 space-y-1 border-l border-border pl-3 text-sm text-muted">
          <li className="flex justify-between gap-4">
            <span>{fill(messages.labourLine, { hours: price.labourHours, wage: formatINR(price.hourlyWage) })}</span>
            <span>{formatINR(price.labourCost)}</span>
          </li>
          <li className="flex justify-between gap-4">
            <span>{messages.craftPremium}</span>
            <span>{formatINR(price.craftPremium)}</span>
          </li>
        </ul>
      </div>
      <ul className="space-y-2">
        {rows.map((row) => (
          <li key={row.label} className="flex items-baseline justify-between gap-4">
            <span>{row.label}</span>
            <span className="font-semibold">{formatINR(row.amount)}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-baseline justify-between gap-4 border-t border-border pt-3">
        <span className="font-semibold">{messages.listedPrice}</span>
        <span className="font-display text-3xl">{formatINR(price.listedPrice)}</span>
      </div>
      {agreedUnitPrice !== undefined && agreedUnitPrice !== price.listedPrice ? (
        <p className="text-sm font-semibold text-foreground">
          {messages.agreedTotal}: {formatINR(agreedUnitPrice)} {messages.perPiece}
        </p>
      ) : null}
      <p className="text-sm text-muted">{messages.pricePartsNote}</p>
      <p className="text-sm text-muted">{messages.priceDisclaimer}</p>
    </div>
  )
}
