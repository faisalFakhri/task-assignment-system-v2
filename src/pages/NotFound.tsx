import React from 'react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
      <div className="text-4xl">🌀</div>
      <h1 className="text-lg font-medium font-mono text-slate-300">Page Not Found</h1>
      <p className="text-xs font-mono text-slate-500">Check the URL or use the sidebar.</p>
    </div>
  )
}