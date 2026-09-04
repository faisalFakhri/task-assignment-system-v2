import React from 'react'
import FontPicker from '../components/FontPicker'
import FooterWalker from '../components/FooterWalker'

export default function Settings() {
  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-lg font-medium font-mono text-slate-200">Settings</h1>

      <div className="glass-strong rounded-2xl p-4">
        <FontPicker />
      </div>

      <div className="glass-strong rounded-2xl p-4">
        <h2 className="text-sm font-semibold font-mono text-slate-300 mb-2">Footer Walker</h2>
        <p className="text-xs font-mono text-slate-400 mb-3">
          Toggle a little cat at footer (OFF by default for performance).
        </p>
        <FooterWalker />
      </div>
    </div>
  )
}
