import React, { useState } from 'react'
import { useMasterData, type MasterEntityType } from '../hooks/useMasterData'

interface Props {
  entity: MasterEntityType
  title: string
  entityLabel: string
}

export default function MasterDataTable({ entity, title, entityLabel }: Props) {
  const { data, loading, error, create, update, remove } = useMasterData(entity)

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<MasterDataType | null>(null)
  const [formName, setFormName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = data.filter(
    (r) =>
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.name.toLowerCase().includes(search.toLowerCase())
  )

  const openCreate = () => {
    setEditing(null)
    setFormName('')
    setModalOpen(true)
  }
  const openEdit = (item: MasterDataType) => {
    setEditing(item)
    setFormName(item.name)
    setModalOpen(true)
  }

  const handleSubmit = async () => {
    if (!formName.trim()) return alert('Nama tidak boleh kosong')
    setSubmitting(true)
    try {
      if (editing) await update(editing.id, formName.trim())
      else await create(formName.trim())
      setModalOpen(false)
      setFormName('')
      setEditing(null)
    } catch (e: any) {
      alert(e?.message || 'Failed to save')
    } finally {
      setSubmitting(false)
    }
  }

  const handleToggle = async (item: MasterDataType) => {
    if (!confirm(`${item.active ? 'Deactivate' : 'Activate'} "${item.name}"?`)) return
    try {
      await update(item.id, item.name, !item.active)
    } catch (e: any) {
      alert(e?.message || 'Failed to update')
    }
  }

  const handleDelete = async (item: MasterDataType) => {
    if (!confirm(`Deactivate "${item.name}"? (soft delete)`)) return
    try {
      // @todo: soft delete later — for now, hard delete
      await remove(item.id)
    } catch (e: any) {
      alert(e?.message || 'Failed to delete')
    }
  }

  type MasterDataType = { id: string; name: string; active: boolean }

  if (loading) return <div className="p-6 text-sm font-mono text-slate-500">Loading {title}...</div>
  if (error) return <div className="p-6 text-sm font-mono text-red-300">Error: {error}</div>

  return (
    <div className="space-y-4 max-w-4xl">
      <div className="glass-strong rounded-2xl px-4 py-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-slate-200 font-mono">{title}</h2>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            {filtered.length} / {data.length} {entityLabel.toLowerCase()}s · including inactive
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-medium text-slate-900 hover:bg-white/90 font-mono shrink-0"
        >
          + Add {entityLabel}
        </button>
      </div>

      <div className="glass rounded-2xl p-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search ID / name ${entityLabel.toLowerCase()}...`}
          className="w-full max-w-sm rounded-xl glass-subtle px-3 py-2 text-xs font-mono placeholder:text-slate-500 text-slate-800 border border-slate-300 focus:outline-none focus:border-slate-400"
        />
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <table className="min-w-full divide-y divide-white/5 text-left text-xs font-mono">
          <thead className="bg-slate-800/50">
            <tr className="text-slate-400">
              <th className="px-4 py-2.5 font-medium">ID</th>
              <th className="px-4 py-2.5 font-medium">Name</th>
              <th className="px-4 py-2.5 font-medium">Status</th>
              <th className="px-4 py-2.5 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-slate-500">
                  Tidak ada data{search ? ` untuk "${search}"` : ''}.
                </td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr key={row.id} className={`hover:bg-white/[0.04] ${!row.active ? 'opacity-55' : ''}`}>
                  <td className="whitespace-nowrap px-4 py-2.5 text-slate-200 font-semibold">{row.id}</td>
                  <td className="px-4 py-2.5 text-slate-300">{row.name}</td>
                  <td className="whitespace-nowrap px-4 py-2.5">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium border ${
                        row.active
                          ? 'bg-emerald-400/15 text-emerald-300 border-emerald-400/20'
                          : 'bg-slate-700/30 text-slate-400 border-slate-600/30'
                      }`}
                    >
                      {row.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-right space-x-1">
                    <button
                      onClick={() => handleToggle(row)}
                      title={row.active ? 'Deactivate' : 'Activate'}
                      className="rounded-full glass-subtle px-2.5 py-1 text-[11px] text-slate-400 hover:text-slate-200 border border-slate-600"
                    >
                      {row.active ? '⏸ Off' : '▶ On'}
                    </button>
                    <button
                      onClick={() => openEdit(row)}
                      title="Edit"
                      className="rounded-full glass-subtle px-2.5 py-1 text-[11px] text-slate-400 hover:text-slate-200 border border-slate-600"
                    >
                      ✎ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(row)}
                      title="Delete"
                      className="rounded-full bg-red-500/15 border border-red-400/20 px-2.5 py-1 text-[11px] text-red-300 hover:bg-red-500/20"
                    >
                      ✕ Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl glass-strong p-5 shadow-2xl">
            <h3 className="text-sm font-semibold font-mono text-slate-200">
              {editing ? `Edit ${entityLabel}` : `Tambah ${entityLabel} Baru`}
            </h3>
            <label className="mt-4 block">
              <span className="text-xs font-mono text-slate-400">Nama *</span>
              <input
                autoFocus
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder={`Nama ${entityLabel.toLowerCase()}`}
                className="mt-1 w-full rounded-xl glass-subtle px-3 py-2.5 text-sm font-mono text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-slate-400 border border-slate-600"
              />
            </label>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-full glass-subtle px-4 py-1.5 text-xs font-mono text-slate-400 hover:text-slate-200 border border-slate-600"
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting || !formName.trim()}
                className="rounded-full bg-white px-4 py-1.5 text-xs font-mono font-semibold text-slate-900 hover:bg-white/90 disabled:opacity-50"
              >
                {submitting ? '...menyimpan' : editing ? 'Simpan' : 'Tambah'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
