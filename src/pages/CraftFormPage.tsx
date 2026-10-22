import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { messages } from '../data/i18n'
import { useCatalog } from '../hooks/useCatalog'
import { usePageTitle } from '../hooks/usePageTitle'
import { fill, formatINR, cx } from '../lib/format'
import { messageFor } from '../lib/copy'
import { compressImageFile } from '../services/images'
import { PLATFORM_FEE_RATE, suggestedPlatformFee } from '../services/pricing'
import { upsertProduct } from '../services/store'
import {
  DETAIL_FIELDS,
  PRICE_FIELDS,
  WAGE_PRESETS,
  assessCraft,
  draftFromProduct,
  emptyDraft,
  productFromDraft,
  type CraftDraft,
  type CraftField,
} from '../services/validation'
import { ProductCard } from '../components/product/ProductCard'
import { PriceBreakdown } from '../components/product/PriceBreakdown'
import { VoiceField } from '../components/voice/VoiceField'
import { Button } from '../components/ui/Button'
import { CheckField, SelectField, textControlClass } from '../components/ui/Field'
import { ProductImage } from '../components/ui/ProductImage'
import type { CategoryId, Product } from '../types/models'

const steps = ['stepDetails', 'stepPrice', 'stepPreview'] as const

export function CraftFormPage() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { products, language } = useCatalog()
  const t = messages[language]
  const existing = productId ? products.find((product) => product.id === productId) : undefined
  usePageTitle(existing ? t.edit : t.addCraft)

  const [draft, setDraft] = useState<CraftDraft>(() => (existing ? draftFromProduct(existing) : emptyDraft()))
  const [feeMode, setFeeMode] = useState<'suggested' | 'custom'>(existing ? 'custom' : 'suggested')
  const [step, setStep] = useState(0)
  const [attempted, setAttempted] = useState(false)
  const [imageError, setImageError] = useState<string | null>(null)
  const [imageBusy, setImageBusy] = useState(false)

  useEffect(() => {
    setDraft(existing ? draftFromProduct(existing) : emptyDraft())
    setFeeMode(existing ? 'custom' : 'suggested')
    setStep(0)
    setAttempted(false)
  }, [productId])

  useEffect(() => {
    if (feeMode !== 'suggested') return
    const hours = /^\d+(\.\d)?$/.test(draft.labourHours.trim()) ? Number(draft.labourHours) : null
    const moneyFields = [draft.hourlyWage, draft.materialCost, draft.packagingCost, draft.craftPremium]
    if (hours === null || moneyFields.some((value) => !/^\d+$/.test(value.trim()))) return
    const subtotal =
      Math.round(hours * Number(draft.hourlyWage)) +
      Number(draft.materialCost) +
      Number(draft.packagingCost) +
      Number(draft.craftPremium)
    const nextFee = String(suggestedPlatformFee(subtotal))
    setDraft((current) => (current.platformFee === nextFee ? current : { ...current, platformFee: nextFee }))
  }, [draft.labourHours, draft.hourlyWage, draft.materialCost, draft.packagingCost, draft.craftPremium, feeMode])

  if (productId && !existing) {
    return (
      <div className="mx-auto max-w-lg py-10">
        <h1 className="font-display text-4xl">{t.missingTitle}</h1>
        <p className="mt-3 text-muted">{t.missingBody}</p>
        <div className="mt-6">
          <Button to="/crafts">{t.myCrafts}</Button>
        </div>
      </div>
    )
  }

  const assessment = assessCraft(draft, step === 2)
  const activeFields: CraftField[] = step === 0 ? DETAIL_FIELDS : step === 1 ? PRICE_FIELDS : ['confirmed']

  const errorText = (field: CraftField) => {
    if (!attempted) return undefined
    const code = assessment.errors[field]
    if (!code) return undefined
    return messageFor(t, code, { floor: formatINR(assessment.floor ?? 0) })
  }

  const patch = (partial: Partial<CraftDraft>, resetConfirm = false) => {
    setDraft((current) => ({
      ...current,
      ...partial,
      confirmed: resetConfirm ? false : (partial.confirmed ?? current.confirmed),
    }))
  }

  const goNext = () => {
    if (imageBusy) return
    if (activeFields.some((field) => assessment.errors[field])) {
      setAttempted(true)
      return
    }
    setAttempted(false)
    setStep((current) => Math.min(2, current + 1))
  }

  const publish = () => {
    const product = productFromDraft(draft, existing)
    if (!product) {
      setAttempted(true)
      return
    }
    const saved = upsertProduct(product)
    if (!saved) return
    navigate(`/product/${product.id}`, { state: { banner: existing ? 'updated' : 'published' } })
  }

  const onImage = async (file: File | undefined) => {
    if (!file) return
    setImageBusy(true)
    setImageError(null)
    const result = await compressImageFile(file)
    setImageBusy(false)
    if (!result.ok) {
      const code = result.reason === 'type' ? 'errImageType' : result.reason === 'large' ? 'errImageLarge' : 'errImageRead'
      setImageError(messageFor(t, code) ?? t.errImageRead)
      return
    }
    patch({ imageSrc: result.dataUrl }, true)
  }

  const suggestion = suggestedAmount(draft)

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <Link to="/crafts" className="inline-flex min-h-11 items-center text-sm font-semibold text-primary">
        {t.myCrafts}
      </Link>
      <div>
        <h1 className="font-display text-4xl">{existing ? t.edit : t.addCraft}</h1>
        <p className="mt-3 text-muted">{t.formLead}</p>
      </div>
      <ol className="grid grid-cols-3 gap-2">
        {steps.map((label, index) => (
          <li key={label}>
            <button
              type="button"
              onClick={() => {
                if (index < step) {
                  setAttempted(false)
                  setStep(index)
                }
              }}
              disabled={index > step}
              className={cx(
                'min-h-11 w-full rounded-md px-2 text-sm font-semibold',
                index === step ? 'bg-primary text-primary-foreground' : 'bg-surface text-foreground',
                index > step ? 'opacity-50' : 'border border-border',
              )}
            >
              {index + 1}. {t[label]}
            </button>
          </li>
        ))}
      </ol>
      <form
        className="flex flex-col gap-5"
        noValidate
        onSubmit={(event) => {
          event.preventDefault()
          if (step < 2) goNext()
          else publish()
        }}
      >
        {step === 0 ? (
          <DetailsStep
            draft={draft}
            patch={patch}
            errorText={errorText}
            language={language}
            imageBusy={imageBusy}
            imageError={imageError}
            onImage={(file) => void onImage(file)}
          />
        ) : null}
        {step === 1 ? (
          <PriceStep
            draft={draft}
            patch={patch}
            errorText={errorText}
            assessmentPrice={assessment.price}
            floor={assessment.floor}
            feeMode={feeMode}
            suggestion={suggestion}
            onFeeMode={setFeeMode}
          />
        ) : null}
        {step === 2 && assessment.price && draft.category ? (
          <PreviewStep
            draft={draft}
            existing={existing}
            price={assessment.price}
            onConfirm={(confirmed) => patch({ confirmed })}
            confirmError={errorText('confirmed')}
          />
        ) : null}
        <div className="flex flex-wrap gap-2">
          {step > 0 ? (
            <Button
              variant="secondary"
              onClick={() => {
                setAttempted(false)
                setStep((current) => current - 1)
              }}
            >
              {t.back}
            </Button>
          ) : null}
          <Button type="submit" disabled={imageBusy}>
            {step < 2 ? t.continue : existing ? t.saveListing : t.publishListing}
          </Button>
        </div>
      </form>
    </div>
  )
}

function suggestedAmount(draft: CraftDraft): number | null {
  const hours = /^\d+(\.\d)?$/.test(draft.labourHours.trim()) ? Number(draft.labourHours) : null
  const fields = [draft.hourlyWage, draft.materialCost, draft.packagingCost, draft.craftPremium]
  if (hours === null || fields.some((value) => !/^\d+$/.test(value.trim()))) return null
  return suggestedPlatformFee(
    Math.round(hours * Number(draft.hourlyWage)) +
      Number(draft.materialCost) +
      Number(draft.packagingCost) +
      Number(draft.craftPremium),
  )
}

function DetailsStep({
  draft,
  patch,
  errorText,
  language,
  imageBusy,
  imageError,
  onImage,
}: {
  draft: CraftDraft
  patch: (partial: Partial<CraftDraft>, resetConfirm?: boolean) => void
  errorText: (field: CraftField) => string | undefined
  language: 'en' | 'kn'
  imageBusy: boolean
  imageError: string | null
  onImage: (file: File | undefined) => void
}) {
  const t = messages[language]
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted">{t.voiceHint}</p>
      <p className="text-sm text-muted">{t.voiceDisclosure}</p>
      <VoiceField id="name" label={t.productName} value={draft.name} onChange={(name) => patch({ name })} language={language} messages={t} error={errorText('name')} />
      <VoiceField id="maker" label={t.makerName} value={draft.makerName} onChange={(makerName) => patch({ makerName })} language={language} messages={t} error={errorText('makerName')} />
      <VoiceField id="region" label={t.region} value={draft.region} onChange={(region) => patch({ region })} language={language} messages={t} error={errorText('region')} />
      <SelectField
        id="category"
        label={t.category}
        value={draft.category}
        error={errorText('category')}
        onChange={(event) => patch({ category: event.target.value as CategoryId | '' }, true)}
      >
        <option value="">{t.chooseCategory}</option>
        <option value="textile">{t.catTextile}</option>
        <option value="basketry">{t.catBasketry}</option>
        <option value="coconut">{t.catCoconut}</option>
        <option value="wood">{t.catWood}</option>
      </SelectField>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="craft-image" className="text-sm font-semibold">
          {t.productImage}
        </label>
        <input
          id="craft-image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) => onImage(event.target.files?.[0])}
          aria-invalid={errorText('imageSrc') || imageError ? true : undefined}
          aria-describedby="image-hint"
          className="block w-full text-sm"
        />
        <p id="image-hint" className="text-sm text-muted">
          {t.imageHint}
        </p>
        {imageBusy ? (
          <p role="status" className="text-sm text-muted">
            {t.preparingImage}
          </p>
        ) : null}
        {imageError ? <p className="text-sm text-danger">{imageError}</p> : null}
        {errorText('imageSrc') ? <p className="text-sm text-danger">{errorText('imageSrc')}</p> : null}
        {draft.imageSrc ? (
          <div className="aspect-[4/3] max-w-sm overflow-hidden rounded-md border border-border">
            <ProductImage src={draft.imageSrc} alt={draft.name || t.productImage} />
          </div>
        ) : null}
      </div>
      <VoiceField id="description" label={t.description} value={draft.description} onChange={(description) => patch({ description })} language={language} messages={t} error={errorText('description')} multiline />
      <VoiceField id="materials" label={t.materials} value={draft.materials} onChange={(materials) => patch({ materials })} language={language} messages={t} error={errorText('materials')} multiline />
      <VoiceField id="story" label={t.craftStory} value={draft.craftStory} onChange={(craftStory) => patch({ craftStory })} language={language} messages={t} error={errorText('craftStory')} multiline />
      <VoiceField
        id="video"
        label={t.videoUrl}
        value={draft.videoUrl}
        onChange={(videoUrl) => patch({ videoUrl })}
        language={language}
        messages={t}
        error={errorText('videoUrl')}
        hint={t.videoHint}
      />
    </div>
  )
}

function PriceStep({
  draft,
  patch,
  errorText,
  assessmentPrice,
  floor,
  feeMode,
  suggestion,
  onFeeMode,
}: {
  draft: CraftDraft
  patch: (partial: Partial<CraftDraft>, resetConfirm?: boolean) => void
  errorText: (field: CraftField) => string | undefined
  assessmentPrice: ReturnType<typeof assessCraft>['price']
  floor: number | null
  feeMode: 'suggested' | 'custom'
  suggestion: number | null
  onFeeMode: (mode: 'suggested' | 'custom') => void
}) {
  const { language } = useCatalog()
  const t = messages[language]
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted">{t.numbersTyped}</p>
      <MoneyLike
        id="hours"
        label={t.labourHours}
        value={draft.labourHours}
        error={errorText('labourHours')}
        onChange={(labourHours) => patch({ labourHours }, true)}
        inputMode="decimal"
      />
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          {WAGE_PRESETS.map((wage) => (
            <button
              key={wage}
              type="button"
              aria-pressed={draft.hourlyWage === String(wage)}
              onClick={() => patch({ hourlyWage: String(wage) }, true)}
              className={cx(
                'min-h-11 rounded-md border px-3 text-sm font-semibold',
                draft.hourlyWage === String(wage)
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-surface hover:bg-muted-surface',
              )}
            >
              {formatINR(wage)}
            </button>
          ))}
        </div>
        <MoneyLike
          id="wage"
          label={t.hourlyRate}
          value={draft.hourlyWage}
          error={errorText('hourlyWage')}
          hint={t.wageHint}
          onChange={(hourlyWage) => patch({ hourlyWage }, true)}
        />
      </div>
      <MoneyLike id="materials-cost" label={t.materialCost} value={draft.materialCost} error={errorText('materialCost')} onChange={(materialCost) => patch({ materialCost }, true)} />
      <MoneyLike id="packaging-cost" label={t.packagingCost} value={draft.packagingCost} error={errorText('packagingCost')} onChange={(packagingCost) => patch({ packagingCost }, true)} />
      <MoneyLike id="premium" label={t.craftPremium} value={draft.craftPremium} error={errorText('craftPremium')} hint={t.premiumHint} onChange={(craftPremium) => patch({ craftPremium }, true)} />
      <MoneyLike
        id="platform-fee"
        label={t.platformFee}
        value={draft.platformFee}
        error={errorText('platformFee')}
        hint={
          suggestion !== null
            ? fill(t.feeHint, { percent: Math.round(PLATFORM_FEE_RATE * 100), amount: formatINR(suggestion) })
            : undefined
        }
        onChange={(platformFee) => {
          onFeeMode('custom')
          patch({ platformFee }, true)
        }}
      />
      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="secondary"
          onClick={() => {
            onFeeMode('suggested')
          }}
        >
          {t.useSuggestedFee}
        </Button>
        {feeMode === 'custom' ? <p className="text-sm text-muted">{t.customFee}</p> : null}
      </div>
      <CheckField
        id="made-to-order"
        label={t.madeToOrder}
        checked={draft.madeToOrder}
        onChange={(madeToOrder) => patch({ madeToOrder }, true)}
      />
      {draft.madeToOrder ? (
        <MoneyLike
          id="days"
          label={t.fulfilmentDays}
          value={draft.fulfilmentDays}
          error={errorText('fulfilmentDays')}
          onChange={(fulfilmentDays) => patch({ fulfilmentDays }, true)}
        />
      ) : (
        <MoneyLike id="quantity" label={t.quantity} value={draft.quantity} error={errorText('quantity')} onChange={(quantity) => patch({ quantity }, true)} />
      )}
      <CheckField
        id="offers"
        label={t.enableOffers}
        checked={draft.offersEnabled}
        onChange={(offersEnabled) =>
          patch(
            {
              offersEnabled,
              minimumPrice: offersEnabled && !draft.minimumPrice && floor !== null ? String(floor) : draft.minimumPrice,
            },
            true,
          )
        }
      />
      {draft.offersEnabled ? (
        <>
          {floor !== null ? <p className="text-sm text-muted">{fill(t.floorExplain, { floor: formatINR(floor) })}</p> : null}
          <MoneyLike
            id="minimum"
            label={t.minimumPrice}
            value={draft.minimumPrice}
            error={errorText('minimumPrice')}
            onChange={(minimumPrice) => patch({ minimumPrice }, true)}
          />
        </>
      ) : null}
      {assessmentPrice ? (
        <div className="rounded-lg border border-border bg-surface p-4">
          <PriceBreakdown price={assessmentPrice} messages={t} />
        </div>
      ) : null}
    </div>
  )
}

function PreviewStep({
  draft,
  existing,
  price,
  onConfirm,
  confirmError,
}: {
  draft: CraftDraft
  existing?: Product
  price: NonNullable<ReturnType<typeof assessCraft>['price']>
  onConfirm: (confirmed: boolean) => void
  confirmError?: string
}) {
  const { language } = useCatalog()
  const t = messages[language]
  if (!draft.category) return null
  const preview: Product = {
    id: existing?.id ?? 'preview',
    name: draft.name.trim() || t.productName,
    makerName: draft.makerName.trim(),
    region: draft.region.trim(),
    category: draft.category,
    imageSrc: draft.imageSrc,
    description: draft.description,
    materials: draft.materials,
    craftStory: draft.craftStory,
    videoUrl: draft.videoUrl,
    madeToOrder: draft.madeToOrder,
    quantity: draft.madeToOrder ? 0 : Number(draft.quantity) || 0,
    fulfilmentDays: draft.madeToOrder ? Number(draft.fulfilmentDays) || null : null,
    price,
    offersEnabled: draft.offersEnabled,
    minimumPrice: Number(draft.minimumPrice) || price.listedPrice,
    published: false,
    sample: existing?.sample ?? false,
    createdAt: existing?.createdAt ?? new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  return (
    <div className="flex flex-col gap-4">
      <p className="text-muted">{t.previewLead}</p>
      <div className="max-w-sm">
        <ProductCard product={preview} messages={t} preview />
      </div>
      <p className="text-sm text-muted">{t.previewActions}</p>
      <PriceBreakdown price={price} messages={t} />
      <CheckField id="confirm-listing" label={fill(t.confirmListing, { price: formatINR(price.listedPrice) })} checked={draft.confirmed} onChange={onConfirm} />
      {confirmError ? <p className="text-sm text-danger">{confirmError}</p> : null}
    </div>
  )
}

function MoneyLike({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  inputMode = 'numeric',
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  hint?: string
  inputMode?: 'numeric' | 'decimal'
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <input
        id={id}
        inputMode={inputMode}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={hint || error ? `${id}-note` : undefined}
        className={textControlClass(Boolean(error))}
      />
      {hint ? (
        <p id={`${id}-note`} className="text-sm text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={hint ? undefined : `${id}-note`} className="text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  )
}
