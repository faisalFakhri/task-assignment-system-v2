import React from 'react'
import { differenceInCalendarDays } from 'date-fns'

export default function DeadlineIndicator({
  targetDate,
  status,
}: {
  targetDate?: string
  status: string
}) {
  if (status === 'Done' || !targetDate) return null

  const daysLeft = differenceInCalendarDays(new Date(targetDate), new Date())
  const expired = daysLeft < 0
  const isCritical = daysLeft <= 3

  const bg = expired
    ? 'bg-red-500/15 border-red-400/20 text-red-300'
    : isCritical
      ? 'bg-amber-500/15 border-amber-400/20 text-amber-300'
      : 'bg-emerald-500/10 border-emerald-400/20 text-emerald-300'

  const label = expired ? `Overdue (${Math.abs(daysLeft)}d)` : `${daysLeft}d left`

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-medium border ${bg}`}
      title={`Target: ${targetDate}`}
    >
      {label}
    </span>
  )
}
