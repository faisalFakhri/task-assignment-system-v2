import React, { useEffect, useState } from 'react'
import { fonts } from '../data/fonts'
import { applyFont, getFontById } from '../lib/fonts'

export default function FontPicker({ compact = false }: { compact?: boolean }) {
  const [selected, setSelected] = useState<string>(() => {
    try { return localStorage.getItem('font_preference') || '' } catch { return '' }
  })

  useEffect(() => {
    const h = () => {
      try { setSelected(localStorage.getItem('font_preference') || '') } catch {}
    }
    window.addEventListener('storage', h)
    return () => window.removeEventListener('storage', h)
  }, [])

  const onChange = (id: string) => {
    setSelected(id)
    applyFont(id)
  }

  if (compact) {
    return (
      <div className="flex items-center gap-1.5">
        <span className="hidden sm:inline text-[10px] font-mono text-slate-500">FONT</span>
        <select
          value={selected}
          onChange={(e) => onChange(e.target.value)}
          className="glass-subtle rounded-full px-2.5 py-1 text-[11px] font-mono text-slate-200 border border-slate-700 outline-none focus:border-slate-500 max-w-[160px]"
          title="Select font — saved in your browser"
        >
          <option value="">Default (Inter)</option>
          {fonts.map((f) => (
            <option key={f.value} value={f.value} style={{ fontFamily: f.value }} className="text-slate-100 bg-slate-900">
              {f.label} {f.category === 'Google' ? '· G' : f.category === 'Local' ? '· L' : '· S'}
            </option>
          ))}
        </select>
      </div>
    )
  }

  const current = selected ? fonts.find((f) => f.value === selected) : undefined

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-xs font-semibold text-slate-300 font-mono">FONT_PREFERENCES</div>
        <span className="text-[11px] font-mono text-slate-500">Per-browser · localStorage</span>
      </div>

      <div className="grid gap-3">
        <label className="block">
          <div className="text-[11px] font-mono text-slate-500 mb-1.5">Select Font</div>
          <select
            value={selected}
            onChange={(e) => onChange(e.target.value)}
            className="w-full glass-subtle rounded-xl px-3 py-2.5 text-xs font-mono text-slate-200 border border-slate-700 outline-none focus:border-violet-400/30"
          >
            <option value="">Default — Inter (default)</option>
            {fonts.map((f) => (
              <option key={f.value} value={f.value} style={{ fontFamily: f.value }}>
                {f.label} ({f.category})
              </option>
            ))}
          </select>
        </label>

        <div className="glass-subtle rounded-xl p-3 border border-slate-700">
          <div className="text-[11px] font-mono text-slate-500 mb-1">Preview — {current ? current.label : 'Inter (Default)'}</div>
          <div className="text-sm leading-6 text-slate-200" style={{ fontFamily: current ? current.value : undefined }}>
            The quick brown fox jumps over the lazy dog — 0123456789
          </div>
          <div className="text-xs leading-5 text-slate-400 mt-1" style={{ fontFamily: current ? current.value : undefined }}>
            Task Assignment System (Dark Glassmorphism)
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onChange('')}
            className="glass-subtle rounded-full px-3 py-1.5 text-xs font-mono text-slate-400 border border-slate-700 hover:text-slate-200"
          >
            Reset ke Default
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-2 pt-1">
        {fonts.map((f) => (
          <button
            key={f.value}
            onClick={() => onChange(f.value)}
            className={`text-left rounded-xl px-3 py-2 border transition-colors ${
              selected === f.value
                ? 'bg-violet-500/30 text-slate-100 border-violet-400/50 shadow-sm'
                : 'glass-subtle border-slate-700 text-slate-400 hover:bg-white/5 hover:text-slate-200'
            }`}
          >
            <div className="text-xs font-semibold" style={{ fontFamily: f.value }}>{f.label}</div>
            <div className="text-[11px] opacity-60 truncate" style={{ fontFamily: f.value }}>
              {f.category} · The quick brown fox
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}