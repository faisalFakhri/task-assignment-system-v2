import React from 'react'
import type { Task } from '../types'

const statusColors: Record<NonNullable<Task['status']>, string> = {
  Open: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
  Assign: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30',
  'In Progress': 'bg-amber-500/20 text-amber-300 border-amber-400/30',
  QC: 'bg-purple-500/20 text-purple-300 border-purple-400/30',
  Hold: 'bg-gray-500/20 text-gray-300 border-gray-400/30',
  Reopen: 'bg-rose-500/20 text-rose-300 border-rose-400/30',
  Reject: 'bg-red-500/20 text-red-300 border-red-400/30',
  Done: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
}

export default function StatusBadge({ status }: { status: NonNullable<Task['status']> }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${statusColors[status]}`}
    >
      {status}
    </span>
  )
}