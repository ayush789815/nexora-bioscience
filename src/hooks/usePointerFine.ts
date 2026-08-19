import { useSyncExternalStore } from 'react'

const QUERY = '(pointer: fine) and (hover: hover)'

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY)
  mql.addEventListener('change', callback)
  return () => mql.removeEventListener('change', callback)
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches
}

/** True on devices with a precise hover-capable pointer (desktop mouse/trackpad). */
export function usePointerFine(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
