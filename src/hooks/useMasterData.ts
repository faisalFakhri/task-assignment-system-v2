import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { MasterRecord } from '../types/master'

export type MasterEntityType = 'clients' | 'consultants' | 'programmers'

const TABLE_MAP: Record<MasterEntityType, string> = {
  clients: 'clients',
  consultants: 'consultants',
  programmers: 'programmers',
}

export function useMasterData(entity: MasterEntityType) {
  const [data, setData] = useState<MasterRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data: rows, error: err } = await supabase
        .from(TABLE_MAP[entity])
        .select('id, name, active')
        .order('name', { ascending: true })

      if (err) throw err
      setData(rows || [])
    } catch (err: any) {
      setError(err?.message || 'Gagal memuat data')
    } finally {
      setLoading(false)
    }
  }, [entity])

  const create = useCallback(async (name: string) => {
    const { error: err } = await supabase.from(TABLE_MAP[entity]).insert({ name })
    if (err) throw err
    await fetchData()
  }, [entity, fetchData])

  const update = useCallback(async (id: string, name: string, active?: boolean) => {
    const { error: err } = await supabase
      .from(TABLE_MAP[entity])
      .update({ name, active })
      .eq('id', id)
    if (err) throw err
    await fetchData()
  }, [entity, fetchData])

  const remove = useCallback(async (id: string) => {
    const { error: err } = await supabase.from(TABLE_MAP[entity]).delete().eq('id', id)
    if (err) throw err
    await fetchData()
  }, [entity, fetchData])

  useEffect(() => { fetchData() }, [fetchData])

  return { data, loading, error, refetch: fetchData, create, update, remove }
}
