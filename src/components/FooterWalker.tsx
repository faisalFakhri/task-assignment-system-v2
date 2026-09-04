import React, { useEffect, useState } from 'react'
import { fonts } from '../data/fonts'

// opt-in: OFF by default to avoid runtime hook issues
const STORAGE_KEY = 'footer_walker_enabled'

export default function FooterWalker() {
  const [enabled, setEnabled] = useState<boolean>(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY)
      return v === null ? false : v === '1'
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, enabled ? '1' : '0')
    } catch {}
    window.dispatchEvent(new Event('walker-toggle'))
  }, [enabled])

  // When disabled, render nothing — no DOM impact
  if (!enabled) return null

  // Minimal cat emoji — no canvas / animation complexity
  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 glass-subtle rounded-full px-3 py-2 text-xs">
      <span role="img" aria-label="cat">🐱</span>
      <span className="font-mono text-slate-500">footer_walker ON</span>
      <button
        onClick={() => setEnabled(false)}
        className="font-mono text-slate-400 hover:text-slate-200"
        aria-label="disable walker"
      >
        ✕
      </button>
    </div>
  )
}
