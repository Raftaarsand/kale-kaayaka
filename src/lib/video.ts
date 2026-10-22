export function youtubeEmbed(url: string): string | null {
  try {
    const parsed = new URL(url)
    const host = parsed.hostname.replace(/^www\./, '')
    if (host === 'youtu.be') {
      const id = parsed.pathname.split('/').filter(Boolean)[0]
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null
    }
    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const fromQuery = parsed.searchParams.get('v')
      if (fromQuery) return `https://www.youtube-nocookie.com/embed/${fromQuery}`
      const parts = parsed.pathname.split('/').filter(Boolean)
      const embedAt = parts.indexOf('embed')
      if (embedAt >= 0 && parts[embedAt + 1]) {
        return `https://www.youtube-nocookie.com/embed/${parts[embedAt + 1]}`
      }
    }
    return null
  } catch {
    return null
  }
}

export function isHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value)
    return parsed.protocol === 'https:' || parsed.protocol === 'http:'
  } catch {
    return false
  }
}
