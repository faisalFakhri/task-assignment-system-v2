import React from 'react'

export default function Dashboard() {
  return (
    <div className="space-y-4 max-w-4xl">
      <h1 className="text-lg font-medium font-mono text-slate-200">Dashboard</h1>
      <p className="text-sm font-mono text-slate-500">
        Project v2 — clean rebuild in progress.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {['Open', 'In Progress', 'QC', 'Done'].map((s) => (
          <div key={s} className="glass-strong rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-slate-200 font-mono">0</div>
            <div className="text-xs text-slate-500 font-mono">{s}</div>
          </div>
        ))}
      </div>
    </div>
  )
}