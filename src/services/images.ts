const MAX_DATA_URL_LENGTH = 450_000
const MAX_EDGE = 960

export type ImageErrorCode = 'type' | 'read' | 'large'

export function compressImageFile(
  file: File,
): Promise<{ ok: true; dataUrl: string } | { ok: false; reason: ImageErrorCode }> {
  if (!file.type.startsWith('image/')) {
    return Promise.resolve({ ok: false, reason: 'type' })
  }

  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onerror = () => resolve({ ok: false, reason: 'read' })
    reader.onload = () => {
      const source = typeof reader.result === 'string' ? reader.result : ''
      const image = new Image()
      image.onload = () => {
        const scale = Math.min(1, MAX_EDGE / Math.max(image.width, image.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.max(1, Math.round(image.width * scale))
        canvas.height = Math.max(1, Math.round(image.height * scale))
        const context = canvas.getContext('2d')
        if (!context) {
          resolve({ ok: false, reason: 'read' })
          return
        }
        context.drawImage(image, 0, 0, canvas.width, canvas.height)
        let quality = 0.72
        let dataUrl = canvas.toDataURL('image/jpeg', quality)
        while (dataUrl.length > MAX_DATA_URL_LENGTH && quality > 0.42) {
          quality -= 0.08
          dataUrl = canvas.toDataURL('image/jpeg', quality)
        }
        if (dataUrl.length > MAX_DATA_URL_LENGTH) {
          resolve({ ok: false, reason: 'large' })
          return
        }
        resolve({ ok: true, dataUrl })
      }
      image.onerror = () => resolve({ ok: false, reason: 'read' })
      image.src = source
    }
    reader.readAsDataURL(file)
  })
}

export function isSafeImageSrc(src: string): boolean {
  return (
    src.startsWith('/images/') ||
    src.startsWith('data:image/jpeg') ||
    src.startsWith('data:image/png') ||
    src.startsWith('data:image/webp') ||
    src.startsWith('https://')
  )
}
