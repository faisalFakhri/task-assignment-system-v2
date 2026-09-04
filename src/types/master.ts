// Master entity type alias (matches Supabase table names)
export type MasterEntityType = 'clients' | 'consultants' | 'programmers'

export interface MasterRecord {
  id: string
  name: string
  active: boolean
}
