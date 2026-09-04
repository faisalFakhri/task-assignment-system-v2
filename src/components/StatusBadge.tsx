import React from 'react'
import type { Task } from '../types'

const statusColors: Record<NonNullable<Task['status']>, string> = {
  Open: 'bg-blue-400/10 text-blue-300 border-blue-400/20',
  Assign: 'bg-indigo-400/10 text-indigo-300 border-indigo-400/20',
  'In Progress': 'bg-amber-400/10 text-amber-300 border-amber-400/20',
  QC: 'bg-purple-400/10 text-purple-300 border-purple-400/20',
  Hold: 'bg-gray-400/10 text-gray-300 border-gray-400/20',
  Reopen: 'bg-rose-400/10 text-rose-300 border-rose-400/20',
  Reject: 'bg-red-400/10 text-red-300 border-red-400/20',
  Done: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/20',
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
