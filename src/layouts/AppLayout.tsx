import React, { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { navItems } from '../data/navItems'

export default function AppLayout() {
  const [walkerOn, setWalkerOn] = useState<boolean>(() => {
    try {
      const v = localStorage.getItem('footer_walker_enabled')
      return v === null ? false : v === '1'
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('footer_walker_enabled', walkerOn ? '1' : '0')
    } catch {}
    window.dispatchEvent(new Event('walker-toggle'))
  }, [walkerOn])

  return (
    <div className="flex h-screen bg-[#0a0f1a] text-slate-100 overflow-hidden">
      <aside className="hidden md:flex flex-col w-64 glass-strong shrink-0 overflow-y-auto">
        <div className="p-4 border-b border-white/10">
          <h1 className="text-sm font-mono font-semibold text-violet-300">Task Assignment</h1>
          <p className="text-[10px] font-mono text-slate-500">v2.0 clean rebuild</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-mono transition-all ${
                  isActive
                    ? 'bg-violet-500/20 text-violet-300 border border-violet-400/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex h-12 items-center justify-between gap-3 px-4 md:px-6 shrink-0 border-b border-white/5 glass-subtle">
          <div className="text-xs font-mono text-slate-400 truncate">
            Internal Task & Assignment Management
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}