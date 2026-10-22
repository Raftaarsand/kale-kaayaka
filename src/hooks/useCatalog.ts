import { useSyncExternalStore } from 'react'
import { getSnapshot, subscribe } from '../services/store'

export function useCatalog() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}
