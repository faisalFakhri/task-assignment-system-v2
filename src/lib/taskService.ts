// src/lib/taskService.ts — CRUD wrapper Supabase + Sheets sync (1 arah)
import { supabase } from './supabase'
import { notifySheets } from './sheetSync'
import type { Task } from '../types'
import type { MasterRecord } from '../types/master'

// --- MASTERS (Clients / Consultants / Programmers) ---
export type MasterEntityType = 'clients' | 'consultants' | 'programmers'

export async function fetchMasters(entity: MasterEntityType): Promise<MasterRecord[]> {
  const { data, error } = await supabase
    .from<MasterRecord>(entity)
    .select('*')
    .order('name', { ascending: true })

  if (error) {
    console.error(`fetchMasters[${entity}]`, error)
    return []
  }
  return data ?? []
}

export async function createMaster(
  entity: MasterEntityType,
  payload: Omit<MasterRecord, 'id'>,
): Promise<MasterRecord | null> {
  const { data, error } = await supabase
    .from(entity)
    .insert(payload)
    .select()
    .single()

  if (error) {
    console.error(`createMaster[${entity}]`, error)
    return null
  }
  return data
}

export async function updateMaster(
  entity: MasterEntityType,
  id: string,
  payload: Partial<MasterRecord>,
): Promise<MasterRecord | null> {
  const { data, error } = await supabase
    .from(entity)
    .update(payload)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error(`updateMaster[${entity}]`, error)
    return null
  }
  return data
}

export async function deleteMaster(
  entity: MasterEntityType,
  id: string,
): Promise<boolean> {
  const { error } = await supabase.from(entity).delete().eq('id', id)
  if (error) {
    console.error(`deleteMaster[${entity}]`, error)
    return false
  }
  return true
}

// --- TASKS ---
export async function fetchTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from<Task>('tasks')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('fetchTasks', error)
    return []
  }
  return data ?? []
}

export async function fetchTask(id: string): Promise<Task | null> {
  const { data, error } = await supabase
    .from<Task>('tasks')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('fetchTask', error)
    return null
  }
  return data
}

export async function createTask(payload: Omit<Task, 'id'>): Promise<Task | null> {
  const { data, error } = await supabase.from<Task>('tasks').insert(payload).select().single()

  if (error) {
    console.error('createTask', error)
    return null
  }

  // Best-effort Sheets sync — don't block UI on failure
  void notifySheets({
    action: 'create',
    taskId: data.task_id,
    row: {
      consultant: data.consultant,
      type: data.type,
      client: data.client,
      screenReport: data.screen_report,
      request: data.request,
      status: data.status,
      programmer: data.programmer ?? '',
      sqlServer: data.sql_server ?? '',
      database: data.database ?? '',
      targetDate: data.target_date ?? null,
      notes: data.keterangan ?? '',
    },
  })

  return data
}

export async function updateTask(id: string, payload: Partial<Task>): Promise<Task | null> {
  const { data, error } = await supabase
    .from<Task>('tasks')
    .update(payload)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('updateTask', error)
    return null
  }

  void notifySheets({
    action: 'update',
    taskId: data.task_id,
    ...(data.status && { status: data.status }),
  })

  return data
}

export async function archiveTask(id: string, task_id: string): Promise<boolean> {
  const { error } = await supabase
    .from<Task>('tasks')
    .update({ status: 'Done' })
    .eq('id', id)

  if (error) {
    console.error('archiveTask', error)
    return false
  }

  void notifySheets({ action: 'archive', taskId: task_id })
  return true
}
