import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { messages } from '../../data/i18n'
import { cx } from '../../lib/format'
import { dismissRecovery, setLanguage } from '../../services/store'
import { useCatalog } from '../../hooks/useCatalog'
import type { Language } from '../../types/models'

const links = [
  { to: '/', label: 'discover' as const, end: true },
  { to: '/crafts', label: 'myCrafts' as const, end: false },
  { to: '/orders', label: 'orders' as const, end: false },
]

export function AppShell() {
  const { language, storageError, recovered } = useCatalog()
  const t = messages[language]
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.lang = language === 'kn' ? 'kn' : 'en'
  }, [language])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="absolute left-4 top-4 z-50 -translate-y-24 rounded-md bg-surface px-3 py-2 text-foreground focus:translate-y-0"
      >
        {t.skip}
      </a>
      <header className="sticky top-0 z-40 border-b border-primary bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
          <Link to="/" aria-label={t.home} className="mr-auto inline-flex items-center gap-2 font-display text-xl">
            <Mark />
            Kale Kaayaka
          </Link>
          <nav className="hidden items-center gap-1 md:flex" aria-label={t.mainNav}>
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  cx(
                    'inline-flex min-h-11 items-center rounded-md px-3 text-sm font-semibold',
                    isActive ? 'bg-surface text-primary' : 'text-primary-foreground hover:bg-primary/70',
                  )
                }
              >
                {t[link.label]}
              </NavLink>
            ))}
          </nav>
          <LanguageToggle language={language} label={t.language} />
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md hover:bg-primary/70 md:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t.closeMenu : t.openMenu}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
        {menuOpen ? (
          <nav className="border-t border-primary-foreground/20 px-4 py-3 md:hidden" aria-label={t.mainNav}>
            <ul className="flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.end}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      cx(
                        'flex min-h-11 items-center rounded-md px-3 font-semibold',
                        isActive ? 'bg-surface text-primary' : 'text-primary-foreground',
                      )
                    }
                  >
                    {t[link.label]}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </header>
      {storageError ? (
        <p className="bg-danger-surface px-4 py-3 text-center text-sm text-danger" role="alert">
          {t.storageError}
        </p>
      ) : null}
      {recovered ? (
        <div className="bg-muted-surface px-4 py-3 text-center text-sm text-foreground" role="status">
          <p>{t.recoveredNote}</p>
          <button type="button" className="mt-2 min-h-11 px-3 font-semibold text-primary" onClick={dismissRecovery}>
            {t.close}
          </button>
        </div>
      ) : null}
      <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:py-10">
        <Outlet />
      </main>
      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-muted">
          <p>{t.footerNote}</p>
          <p>{t.photoCredit}</p>
        </div>
      </footer>
    </div>
  )
}

function LanguageToggle({ language, label }: { language: Language; label: string }) {
  return (
    <div role="group" aria-label={label} className="inline-flex rounded-md border border-primary-foreground/30">
      <LangButton active={language === 'en'} onClick={() => setLanguage('en')}>
        EN
      </LangButton>
      <LangButton active={language === 'kn'} onClick={() => setLanguage('kn')}>
        ಕನ್ನಡ
      </LangButton>
    </div>
  )
}

function LangButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cx(
        'min-h-11 px-3 text-sm font-semibold',
        active ? 'bg-surface text-primary' : 'text-primary-foreground hover:bg-primary/70',
      )}
    >
      {children}
    </button>
  )
}

function Mark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="size-8">
      <rect width="32" height="32" rx="8" fill="var(--color-surface)" />
      <path
        d="M7 23c4.2-7.2 6-7.2 8.2-7.2 2.4 0 3.6.4 9.8-8.8"
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M8 12.5h6.5M11.2 9.2v6.6" stroke="var(--color-highlight)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
