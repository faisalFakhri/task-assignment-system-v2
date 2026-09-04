import React from 'react'
import type { Task } from '../types'

export default function TaskTypeBadge({ type }: { type: Task['type'] }) {
  const color =
    type === 'Bugs'
      ? 'bg-rose-500/20 text-rose-300 border-rose-400/30'
      : 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30'

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border ${color}`}
    >
      {type}
    </span>
  )
}