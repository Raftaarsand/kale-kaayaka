import { useEffect, useRef, useState } from 'react'
import { createSpeechSession, speechRecognitionSupported, type SpeechErrorCode } from '../services/speech'
import type { Language } from '../types/models'

export type SpeechPhase = 'idle' | 'listening' | 'success' | 'error'

export function useSpeechInput(language: Language, onText: (text: string) => void) {
  const [phase, setPhase] = useState<SpeechPhase>('idle')
  const [error, setError] = useState<SpeechErrorCode | null>(null)
  const [partial, setPartial] = useState('')
  const onTextRef = useRef(onText)
  const stopRef = useRef<(() => void) | null>(null)
  onTextRef.current = onText

  const start = () => {
    setError(null)
    setPartial('')
    const session = createSpeechSession({
      lang: language === 'kn' ? 'kn-IN' : 'en-IN',
      onStart: () => setPhase('listening'),
      onPartial: (text) => setPartial(text),
      onFinal: (text) => {
        if (!text) return
        onTextRef.current(text)
        setPartial('')
        setPhase('success')
      },
      onError: (code) => {
        setError(code)
        setPartial('')
        setPhase('error')
      },
      onEnd: () => {
        setPhase((current) => (current === 'listening' ? 'idle' : current))
      },
    })
    stopRef.current = session.stop
    session.start()
  }

  const stop = () => {
    stopRef.current?.()
  }

  useEffect(() => () => stopRef.current?.(), [])

  return {
    phase,
    error,
    partial,
    supported: speechRecognitionSupported(),
    start,
    stop,
  }
}
