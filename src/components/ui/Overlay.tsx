import { X } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'
import { cx } from '../../lib/format'

function useDismiss(onClose: () => void) {
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    panelRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseRef.current()
    }
    document.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus()
    }
  }, [])

  return panelRef
}

export function Modal({
  title,
  closeLabel,
  onClose,
  children,
}: {
  title: string
  closeLabel: string
  onClose: () => void
  children: ReactNode
}) {
  const panelRef = useDismiss(onClose)
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/45 p-4 sm:items-center" onMouseDown={onClose}>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="overlay-title"
        tabIndex={-1}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-surface p-5 shadow-raised outline-none"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id="overlay-title" className="font-display text-3xl text-foreground">
            {title}
          </h2>
          <CloseButton label={closeLabel} onClose={onClose} />
        </div>
        {children}
      </div>
    </div>
  )
}

export function Drawer({
  title,
  closeLabel,
  onClose,
  children,
}: {
  title: string
  closeLabel: string
  onClose: () => void
  children: ReactNode
}) {
  const panelRef = useDismiss(onClose)
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-foreground/45" onMouseDown={onClose}>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="overlay-title"
        tabIndex={-1}
        className="h-full w-full max-w-md overflow-y-auto bg-surface p-5 shadow-raised outline-none sm:p-6"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <h2 id="overlay-title" className="font-display text-3xl text-foreground">
            {title}
          </h2>
          <CloseButton label={closeLabel} onClose={onClose} />
        </div>
        {children}
      </div>
    </div>
  )
}

function CloseButton({ label, onClose }: { label: string; onClose: () => void }) {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label={label}
      className={cx(
        'inline-flex size-11 items-center justify-center rounded-md text-foreground',
        'hover:bg-muted-surface',
      )}
    >
      <X aria-hidden="true" size={20} />
    </button>
  )
}
