export function formatINR(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.round(value))
}

export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ''))
}

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

export function createId(prefix: string): string {
  return `${prefix}-${crypto.randomUUID()}`
}

export function createOrderReference(existing: string[]): string {
  const year = new Date().getFullYear()
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const suffix = Math.floor(1000 + Math.random() * 9000)
    const reference = `KK-${year}-${suffix}`
    if (!existing.includes(reference)) return reference
  }
  return `KK-${year}-${crypto.randomUUID().slice(0, 4).toUpperCase()}`
}
