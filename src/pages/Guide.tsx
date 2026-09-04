import React from 'react'

export default function Guide() {
  return (
    <div className="space-y-4 max-w-4xl">
      <h1 className="text-lg font-medium font-mono text-slate-200">Manual Book</h1>
      <div className="glass-strong rounded-2xl p-4 text-xs font-mono text-slate-400 space-y-2">
        <p>• Dashboard — overview of task status counts.</p>
        <p>• Tasks — full task table with filter + export.</p>
        <p>• Master Data — Clients / Consultants / Programmers CRUD.</p>
        <p>• Import — paste TEAM ARI from Excel / import to Supabase.</p>
        <p>• Settings — font preferences, Footer Walker toggle.</p>
        <p>• Footer Walker — hidden by default. Enable in Settings.</p>
      </div>
    </div>
  )
}