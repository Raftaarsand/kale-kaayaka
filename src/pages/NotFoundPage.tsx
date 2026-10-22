import { messages } from '../data/i18n'
import { useCatalog } from '../hooks/useCatalog'
import { usePageTitle } from '../hooks/usePageTitle'
import { Button } from '../components/ui/Button'

export function NotFoundPage() {
  const { language } = useCatalog()
  const t = messages[language]
  usePageTitle(t.notFoundTitle)
  return (
    <div className="mx-auto max-w-lg py-12">
      <h1 className="font-display text-4xl">{t.notFoundTitle}</h1>
      <p className="mt-3 text-muted">{t.notFoundBody}</p>
      <div className="mt-6">
        <Button to="/">{t.backDiscover}</Button>
      </div>
    </div>
  )
}
