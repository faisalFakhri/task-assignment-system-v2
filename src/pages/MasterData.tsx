import React from 'react'
import MasterDataTable from '../components/MasterDataTable'
import { useParams } from 'react-router-dom'
import type { MasterEntityType } from '../hooks/useMasterData'

const titles: Record<MasterEntityType, { title: string; label: string }> = {
  clients: { title: 'Clients', label: 'Client' },
  consultants: { title: 'Consultants', label: 'Consultant' },
  programmers: { title: 'Programmers', label: 'Programmer' },
}

export default function MasterData() {
  const { type } = useParams<{ type: string }>()
  const validTypes: MasterEntityType[] = ['clients', 'consultants', 'programmers']
  const entity = validTypes.includes(type as MasterEntityType)
    ? (type as MasterEntityType)
    : 'clients'
  const cfg = titles[entity]

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-medium font-mono text-slate-200">{cfg.title}</h1>
      <MasterDataTable entity={entity} title={cfg.title} entityLabel={cfg.label} />
    </div>
  )
}
