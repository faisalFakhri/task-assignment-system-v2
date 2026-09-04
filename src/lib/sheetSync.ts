// src/lib/sheetSync.ts — 1 arah: Web → Supabase Edge Function → Google Sheets
// Queue-based, fire-and-forget. Gagal tidak blokir UI.

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || ''
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''
const CUSTOM_URL = import.meta.env.VITE_SHEETS_SYNC_URL || ''
const TOKEN = import.meta.env.VITE_SHEETS_SYNC_TOKEN || ''

const QUEUE_KEY = 'sheets_sync_queue'
const MAX_QUEUE = 50

export interface SyncPayload {
  action: 'create' | 'update' | 'archive'
  taskId: string
  row?: Record<string, unknown>
  status?: string
}

// Ambil semua item dari queue
function getQueue(): SyncPayload[] {
  try {
    return JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]')
  } catch {
    return []
  }
}

// Simpan queue
function setQueue(items: SyncPayload[]) {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(items))
  } catch {
    /* storage full, ignore */
  }
}

// Tambahkan ke queue (trim kalau > MAX_QUEUE)
export function enqueueSheets(payload: SyncPayload) {
  const q = getQueue()
  q.push(payload)
  if (q.length > MAX_QUEUE) q.shift()
  setQueue(q)
}

// Flush queue — kirim semua ke Edge Function
export async function flushSheetsQueue(): Promise<{ sent: number; failed: number }> {
  const q = getQueue()
  if (q.length === 0) return { sent: 0, failed: 0 }

  const endpoint = CUSTOM_URL || `${SUPABASE_URL}/functions/v1/sync-to-sheets`
  let sent = 0
  let failed = 0
  const remaining: SyncPayload[] = []

  for (const item of q) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          apikey: ANON_KEY,
          Authorization: `Bearer ${ANON_KEY}`,
          ...(TOKEN ? { 'x-sheets-sync-token': TOKEN } : {}),
          'content-type': 'application/json',
        },
        body: JSON.stringify(item),
      })
      if (res.ok) {
        sent++
      } else {
        failed++
        remaining.push(item)
      }
    } catch {
      failed++
      remaining.push(item)
    }
  }

  setQueue(remaining)
  return { sent, failed }
}

// Fire-and-forget notify (enqueue + try flush)
export async function notifySheets(payload: SyncPayload) {
  enqueueSheets(payload)
  // Coba flush di background (best-effort)
  void flushSheetsQueue()
}
