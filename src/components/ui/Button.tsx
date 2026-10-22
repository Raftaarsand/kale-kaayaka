import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cx } from '../../lib/format'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'border border-border bg-surface text-foreground hover:bg-muted-surface',
  ghost: 'bg-transparent text-primary hover:bg-muted-surface',
  danger: 'bg-danger text-primary-foreground hover:bg-danger/90',
}

type Props = {
  variant?: Variant
  to?: string
  state?: unknown
  children: ReactNode
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ variant = 'primary', to, state, className, children, type = 'button', ...props }: Props) {
  const classes = cx(
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-2 text-center text-sm font-semibold transition duration-200',
    'disabled:cursor-not-allowed disabled:opacity-50',
    variants[variant],
    className,
  )
  if (to) {
    return (
      <Link to={to} state={state} className={classes}>
        {children}
      </Link>
    )
  }
  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}
