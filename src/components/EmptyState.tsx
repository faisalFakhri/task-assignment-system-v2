import React from 'react'

export default function EmptyState({
  title = 'No data found',
  description = 'There are no records to show at the moment.',
}: {
  title?: string
  description?: string
}> {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
      <div className="text-4xl">📭</div>
      <h3 className="text-sm font-semibold text-slate-300">{title}</h3>
      <p className="text-xs text-slate-500 max-w-sm">{description}</p>
    </div>
  )
}
