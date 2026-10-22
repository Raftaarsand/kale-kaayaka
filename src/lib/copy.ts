import { fill } from './format'
import type { Messages } from '../data/i18n'

export function messageFor(
  messages: Messages,
  code: string | undefined,
  vars?: Record<string, string | number>,
): string | undefined {
  if (!code) return undefined
  const template = messages[code as keyof Messages]
  if (typeof template !== 'string') return undefined
  return vars ? fill(template, vars) : template
}
