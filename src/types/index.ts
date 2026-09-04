import type { ReactNode } from 'react'

export interface Task {
  id: string
  task_id: string
  consultant: string
  client: string
  programmer?: string
  type: 'Bugs' | 'Improvements'
  screen_report: string
  request: string
  status: 'Open' | 'Assign' | 'In Progress' | 'QC' | 'Hold' | 'Reopen' | 'Reject' | 'Done'
  sql_server?: string
  database_name?: string
  target_date?: string
  notes?: string
  created_at: string
  updated_at: string
  archived: boolean
}

export interface Attachment {
  id: string
  task_id: string
  file_url: string
  file_name: string
  uploaded_at: string
}

export interface MasterItem {
  id: string
  name: string
  active: boolean
  created_at: string
}

export interface NavItem {
  to: string
  label: string
  icon: ReactNode
}
