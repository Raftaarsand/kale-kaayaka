import type { ReactNode, SelectHTMLAttributes } from 'react'
import { cx } from '../../lib/format'

const controlClass =
  'min-h-11 w-full rounded-md border bg-surface px-3 py-2 text-base text-foreground outline-none transition duration-200 focus-visible:border-primary'

export function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string
  label: string
  hint?: string
  error?: string
  children: ReactNode
}) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-foreground">
        {label}
      </label>
      <div data-hint={hintId} data-error={errorId}>
        {children}
      </div>
      {hint ? (
        <p id={hintId} className="text-sm text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-sm font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export function textControlClass(invalid?: boolean): string {
  return cx(controlClass, invalid ? 'border-danger' : 'border-border')
}

export function SelectField({
  id,
  label,
  hint,
  error,
  children,
  ...props
}: {
  id: string
  label: string
  hint?: string
  error?: string
  children: ReactNode
} & SelectHTMLAttributes<HTMLSelectElement>) {
  const describedBy = [hint ? `${id}-hint` : '', error ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined
  return (
    <Field id={id} label={label} hint={hint} error={error}>
      <select
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={textControlClass(Boolean(error))}
        {...props}
      >
        {children}
      </select>
    </Field>
  )
}

export function CheckField({
  id,
  label,
  checked,
  onChange,
  hint,
}: {
  id: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  hint?: string
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="flex min-h-11 items-center gap-3 text-sm font-semibold text-foreground">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="size-5 accent-primary"
        />
        {label}
      </label>
      {hint ? <p className="text-sm text-muted">{hint}</p> : null}
    </div>
  )
}
