import React, { useEffect, useState } from 'react'
import { fonts } from '../data/fonts'

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

  if (!enabled) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 glass-subtle rounded-full px-3 py-2 text-xs">
      <span role="img" aria-label="cat">🐱</span>
      <span className="font-mono text-slate-400">footer_walker ON</span>
      <button
        onClick={() => setEnabled(false)}
        className="font-mono text-slate-500 hover:text-slate-200"
        aria-label="disable walker"
      >
        ✕
      </button>
    </div>
  )
}