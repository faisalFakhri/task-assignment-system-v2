import type { NavItem } from '../types'

export const navItems: NavItem[] = [
  { to: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { to: '/tasks', label: 'Tasks', icon: '📝' },
  { to: '/master/clients', label: 'Clients', icon: '👥' },
  { to: '/master/consultants', label: 'Consultants', icon: '👤' },
  { to: '/master/programmers', label: 'Programmers', icon: '💻' },
  { to: '/import', label: 'Import / Export', icon: '📤' },
  { to: '/settings', label: 'Settings', icon: '⚙️' },
  { to: '/guide', label: 'Manual Book', icon: '📚' },
]
