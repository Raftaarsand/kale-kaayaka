import { useEffect } from 'react'

export function usePageTitle(title: string): void {
  useEffect(() => {
    document.title = title ? `${title} · Kale Kaayaka` : 'Kale Kaayaka'
  }, [title])
}
