import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { messages } from '../data/i18n'
import { fill } from '../lib/format'
import { useCatalog } from '../hooks/useCatalog'
import { usePageTitle } from '../hooks/usePageTitle'
import { ProductCard } from '../components/product/ProductCard'
import { ProductImage } from '../components/ui/ProductImage'
import { Button } from '../components/ui/Button'
import type { CategoryId } from '../types/models'

const categories: Array<{ id: 'all' | CategoryId; label: 'allCrafts' | 'catTextile' | 'catBasketry' | 'catCoconut' | 'catWood' }> = [
  { id: 'all', label: 'allCrafts' },
  { id: 'textile', label: 'catTextile' },
  { id: 'basketry', label: 'catBasketry' },
  { id: 'coconut', label: 'catCoconut' },
  { id: 'wood', label: 'catWood' },
]

export function DiscoverPage() {
  const { products, language } = useCatalog()
  const t = messages[language]
  usePageTitle(t.discover)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<(typeof categories)[number]['id']>('all')

  const published = useMemo(
    () => products.filter((product) => product.published).sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [products],
  )
  const filtered = published.filter((product) => {
    const categoryOk = category === 'all' || product.category === category
    const haystack = `${product.name} ${product.makerName} ${product.description} ${product.materials}`.toLowerCase()
    const query = search.trim().toLowerCase()
    return categoryOk && (!query || haystack.includes(query))
  })
  const featured = published[0]

  return (
    <div className="flex flex-col gap-12">
      <section className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="text-sm font-semibold tracking-wide text-highlight">DevHost 2026 · Karnataka</p>
          <h1 className="mt-3 font-display text-5xl leading-tight text-foreground sm:text-6xl">Kale Kaayaka</h1>
          <p className="mt-4 max-w-xl text-lg text-muted">{t.heroSentence}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              onClick={() => {
                const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
                document.getElementById('collection')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
              }}
            >
              {t.browseCrafts}
            </Button>
            <Button variant="secondary" to="/crafts/new">
              {t.listCraft}
            </Button>
          </div>
        </div>
        {featured ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Link
              to={`/product/${featured.id}`}
              className="col-span-2 block aspect-[4/5] overflow-hidden rounded-xl shadow-raised sm:aspect-[3/4]"
            >
              <ProductImage src={featured.imageSrc} alt={featured.name} />
            </Link>
            <div className="col-span-2 grid grid-cols-2 gap-3 sm:col-span-1 sm:grid-cols-1">
              <div className="aspect-square overflow-hidden rounded-lg">
                <ProductImage src={published[1]?.imageSrc ?? featured.imageSrc} alt={published[1]?.name ?? featured.name} />
              </div>
              <div className="flex flex-col justify-end rounded-lg bg-primary p-4 text-primary-foreground">
                <p className="font-display text-2xl leading-tight">{fill(t.shelfCount, { count: published.length })}</p>
              </div>
            </div>
          </div>
        ) : null}
      </section>

      <section className="grid gap-4 border-y border-border py-6 md:grid-cols-3">
        <h2 className="font-display text-2xl md:col-span-3">{t.howTitle}</h2>
        {[t.howOne, t.howTwo, t.howThree].map((line, index) => (
          <p key={line} className="text-sm text-muted">
            <span className="mr-2 font-display text-xl text-highlight">{index + 1}</span>
            {line}
          </p>
        ))}
      </section>

      <section id="collection" className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="w-full max-w-md">
            <label htmlFor="craft-search" className="text-sm font-semibold">
              {t.searchLabel}
            </label>
            <input
              id="craft-search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t.searchPlaceholder}
              className="mt-1.5 min-h-11 w-full rounded-md border border-border bg-surface px-3 text-base outline-none focus-visible:border-primary"
            />
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label={t.allCrafts}>
            {categories.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={category === item.id}
                onClick={() => setCategory(item.id)}
                className={
                  category === item.id
                    ? 'min-h-11 rounded-md bg-primary px-3 text-sm font-semibold text-primary-foreground'
                    : 'min-h-11 rounded-md border border-border bg-surface px-3 text-sm font-semibold text-foreground hover:bg-muted-surface'
                }
              >
                {t[item.label]}
              </button>
            ))}
          </div>
        </div>
        <p role="status" className="text-sm text-muted">
          {fill(t.results, { count: filtered.length })}
        </p>
        {filtered.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-surface px-4 py-10 text-center">
            <p>{t.noResults}</p>
            <div className="mt-4">
              <Button
                variant="secondary"
                onClick={() => {
                  setSearch('')
                  setCategory('all')
                }}
              >
                {t.clearSearch}
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} messages={t} />
            ))}
          </div>
        )}
        <p className="max-w-3xl text-sm text-muted">{t.sampleNote}</p>
      </section>
    </div>
  )
}
