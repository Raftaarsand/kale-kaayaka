import { Mic } from 'lucide-react'
import { useId } from 'react'
import type { Messages } from '../../data/i18n'
import { fill } from '../../lib/format'
import { useSpeechInput } from '../../hooks/useSpeechInput'
import type { Language } from '../../types/models'
import { textControlClass } from '../ui/Field'

const errorKey = {
  'not-supported': 'voiceUnsupported',
  'not-allowed': 'voiceDenied',
  'no-speech': 'voiceNoSpeech',
  'audio-capture': 'voiceNoMic',
  network: 'voiceNetwork',
  unknown: 'voiceUnknown',
} as const

export function VoiceField({
  id,
  label,
  value,
  onChange,
  language,
  messages,
  error,
  multiline = false,
  hint,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  language: Language
  messages: Messages
  error?: string
  multiline?: boolean
  hint?: string
}) {
  const statusId = useId()
  const speech = useSpeechInput(language, (spoken) => {
    const next = value.trim() ? `${value.trim()} ${spoken}` : spoken
    onChange(next)
  })
  const describedBy = [hint ? `${id}-hint` : '', error ? `${id}-error` : '', statusId].filter(Boolean).join(' ')
  const status =
    speech.phase === 'listening'
      ? speech.partial
        ? fill(messages.hearing, { text: speech.partial })
        : messages.listening
      : speech.phase === 'success'
        ? messages.voiceSuccess
        : speech.phase === 'error' && speech.error
          ? messages[errorKey[speech.error]]
          : speech.supported
            ? ''
            : messages.voiceUnsupported

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-semibold text-foreground">
          {label}
        </label>
        <button
          type="button"
          onClick={() => (speech.phase === 'listening' ? speech.stop() : speech.start())}
          aria-pressed={speech.phase === 'listening'}
          aria-label={speech.phase === 'listening' ? messages.stopListening : messages.speak}
          className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-surface px-3 text-sm font-semibold text-foreground hover:bg-muted-surface"
        >
          <Mic aria-hidden="true" size={16} />
          {speech.phase === 'listening' ? (
            <span className="inline-flex items-center gap-2">
              <span className="listening-dot size-2 rounded-full bg-accent" />
              {messages.listening}
            </span>
          ) : (
            messages.speak
          )}
        </button>
      </div>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          rows={4}
          className={textControlClass(Boolean(error))}
        />
      ) : (
        <input
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={textControlClass(Boolean(error))}
        />
      )}
      {hint ? (
        <p id={`${id}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      ) : null}
      <p id={statusId} role="status" className={speech.phase === 'error' ? 'text-sm text-danger' : 'text-sm text-muted'}>
        {status}
      </p>
      {error ? (
        <p id={`${id}-error`} className="text-sm font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  )
}
