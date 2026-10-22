import { useState } from 'react'

export function ProductImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(!src)

  if (!src || failed) {
    return (
      <div role="img" aria-label={alt} className="flex h-full w-full items-end bg-primary p-4">
        <p className="font-display text-2xl leading-tight text-primary-foreground">{alt}</p>
      </div>
    )
  }

  return <img src={src} alt={alt} className="h-full w-full object-cover" onError={() => setFailed(true)} />
}
