export type SpeechLang = 'kn-IN' | 'en-IN'

export type SpeechErrorCode =
  | 'not-supported'
  | 'not-allowed'
  | 'no-speech'
  | 'audio-capture'
  | 'network'
  | 'unknown'

type SpeechAlternative = { transcript?: string }
type SpeechResult = { isFinal: boolean; 0?: SpeechAlternative }
type SpeechResultEvent = { resultIndex: number; results: ArrayLike<SpeechResult> }

type Recognition = {
  lang: string
  continuous: boolean
  interimResults: boolean
  maxAlternatives: number
  onresult: ((event: SpeechResultEvent) => void) | null
  onerror: ((event: { error?: string }) => void) | null
  onend: (() => void) | null
  onstart: (() => void) | null
  start: () => void
  stop: () => void
  abort: () => void
}

type RecognitionCtor = new () => Recognition

function getRecognitionCtor(): RecognitionCtor | null {
  if (typeof window === 'undefined') return null
  const host = window as Window & {
    SpeechRecognition?: RecognitionCtor
    webkitSpeechRecognition?: RecognitionCtor
  }
  return host.SpeechRecognition ?? host.webkitSpeechRecognition ?? null
}

export function speechRecognitionSupported(): boolean {
  return getRecognitionCtor() !== null
}

let active: Recognition | null = null

function mapError(code: string | undefined): SpeechErrorCode {
  switch (code) {
    case 'not-allowed':
    case 'service-not-allowed':
      return 'not-allowed'
    case 'no-speech':
      return 'no-speech'
    case 'audio-capture':
      return 'audio-capture'
    case 'network':
      return 'network'
    case 'language-not-supported':
      return 'not-supported'
    default:
      return 'unknown'
  }
}

export function createSpeechSession(options: {
  lang: SpeechLang
  onPartial: (text: string) => void
  onFinal: (text: string) => void
  onError: (code: SpeechErrorCode) => void
  onStart: () => void
  onEnd: () => void
}): { start: () => void; stop: () => void } {
  const Ctor = getRecognitionCtor()
  if (!Ctor) {
    return {
      start() {
        options.onError('not-supported')
      },
      stop() {
        options.onEnd()
      },
    }
  }

  const recognition = new Ctor()
  recognition.lang = options.lang
  recognition.continuous = false
  recognition.interimResults = true
  recognition.maxAlternatives = 1

  recognition.onstart = () => options.onStart()
  recognition.onend = () => {
    if (active === recognition) active = null
    options.onEnd()
  }
  recognition.onerror = (event) => {
    if (event.error === 'aborted') return
    options.onError(mapError(event.error))
  }
  recognition.onresult = (event) => {
    let finalText = ''
    let partial = ''
    for (let index = event.resultIndex; index < event.results.length; index += 1) {
      const result = event.results[index]
      const transcript = result?.[0]?.transcript ?? ''
      if (result?.isFinal) finalText += transcript
      else partial += transcript
    }
    if (partial.trim()) options.onPartial(partial.trim())
    if (finalText.trim()) options.onFinal(finalText.trim())
  }

  return {
    start() {
      try {
        active?.abort()
      } catch {
        /* The previous session may already have ended. */
      }
      active = recognition
      try {
        recognition.start()
      } catch {
        options.onError('unknown')
      }
    },
    stop() {
      try {
        recognition.stop()
      } catch {
        options.onEnd()
      }
    },
  }
}
