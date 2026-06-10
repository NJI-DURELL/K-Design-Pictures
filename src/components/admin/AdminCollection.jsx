import { useState } from 'react'
import { Plus, Pencil, Trash2, Search, Eye, EyeOff } from 'lucide-react'
import Drawer from './Drawer'
import { cn } from '../../lib/utils'

/**
 * Generic admin CRUD manager. Pass a field schema and column definitions and
 * it renders a searchable list with a slide-over create/edit form. State is
 * in-memory for instant interactivity; swap the handlers for Supabase calls
 * (tables already exist in supabase/schema.sql) to persist.
 */
export default function AdminCollection({
  title,
  description,
  columns,
  fields,
  seed = [],
  renderItem,
}) {
  const [items, setItems] = useState(seed)
  const [query, setQuery] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({})

  const blank = () => Object.fromEntries(fields.map((f) => [f.name, f.type === 'toggle' ? false : '']))

  const openCreate = () => {
    setEditing(null)
    setForm(blank())
    setDrawerOpen(true)
  }
  const openEdit = (item) => {
    setEditing(item)
    setForm({ ...item })
    setDrawerOpen(true)
  }
  const remove = (item) => setItems((arr) => arr.filter((i) => i !== item))
  const togglePublish = (item) =>
    setItems((arr) => arr.map((i) => (i === item ? { ...i, published: !i.published } : i)))

  const save = (e) => {
    e.preventDefault()
    if (editing) {
      setItems((arr) => arr.map((i) => (i === editing ? { ...editing, ...form } : i)))
    } else {
      setItems((arr) => [{ id: crypto.randomUUID(), ...form }, ...arr])
    }
    setDrawerOpen(false)
  }

  const q = query.trim().toLowerCase()
  const filtered = q
    ? items.filter((i) => JSON.stringify(i).toLowerCase().includes(q))
    : items

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 rounded-[1.75rem] glass p-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-white">{title}</h1>
          {description && <p className="mt-2 text-mist-400">{description}</p>}
        </div>
        <button onClick={openCreate} className="btn-primary shrink-0">
          <Plus size={17} />
          Add new
        </button>
      </section>

      <section className="rounded-[1.75rem] glass p-4 sm:p-6">
        <div className="relative mb-5 max-w-xs">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-mist-600" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${title.toLowerCase()}`}
            className="w-full rounded-full border border-white/10 bg-ink-850/60 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-mist-600 focus:border-gold-500/50 focus:outline-none"
          />
        </div>

        {/* Table header (desktop) */}
        <div
          className="hidden gap-4 border-b border-white/[0.06] px-4 pb-3 text-2xs uppercase tracking-wide text-mist-600 md:grid"
          style={{ gridTemplateColumns: `${columns.map((c) => c.width || '1fr').join(' ')} 96px` }}
        >
          {columns.map((c) => (
            <span key={c.key}>{c.label}</span>
          ))}
          <span className="text-right">Actions</span>
        </div>

        <ul className="divide-y divide-white/[0.05]">
          {filtered.map((item, idx) => (
            <li
              key={item.id || idx}
              className="grid gap-3 px-4 py-4 transition-colors hover:bg-white/[0.02] md:items-center md:gap-4"
              style={{ gridTemplateColumns: '1fr' }}
            >
              <div
                className="grid gap-3 md:gap-4"
                style={{ gridTemplateColumns: `${columns.map((c) => c.width || '1fr').join(' ')} 96px` }}
              >
                {columns.map((c) => (
                  <div key={c.key} className="min-w-0 text-sm text-mist-300">
                    {renderItem?.(item, c.key) ?? (
                      <span className="block truncate">{String(item[c.key] ?? '')}</span>
                    )}
                  </div>
                ))}
                <div className="flex items-center justify-end gap-1.5">
                  {'published' in item && (
                    <button
                      onClick={() => togglePublish(item)}
                      className="grid h-9 w-9 place-items-center rounded-lg text-mist-400 transition hover:bg-white/[0.05] hover:text-gold-400"
                      title={item.published ? 'Unpublish' : 'Publish'}
                    >
                      {item.published ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  )}
                  <button
                    onClick={() => openEdit(item)}
                    className="grid h-9 w-9 place-items-center rounded-lg text-mist-400 transition hover:bg-white/[0.05] hover:text-white"
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => remove(item)}
                    className="grid h-9 w-9 place-items-center rounded-lg text-mist-400 transition hover:bg-red-500/10 hover:text-red-400"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="py-16 text-center text-mist-500">Nothing here yet. Add your first item.</li>
          )}
        </ul>
      </section>

      {/* Create / edit drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editing ? `Edit ${title.replace(/s$/, '')}` : `New ${title.replace(/s$/, '')}`}
        footer={
          <div className="flex gap-3">
            <button onClick={() => setDrawerOpen(false)} className="btn-dark flex-1">
              Cancel
            </button>
            <button onClick={save} className="btn-primary flex-1">
              {editing ? 'Save changes' : 'Create'}
            </button>
          </div>
        }
      >
        <form onSubmit={save} className="space-y-5">
          {fields.map((f) => (
            <FieldInput
              key={f.name}
              field={f}
              value={form[f.name]}
              onChange={(v) => setForm((s) => ({ ...s, [f.name]: v }))}
            />
          ))}
        </form>
      </Drawer>
    </div>
  )
}

function FieldInput({ field, value, onChange }) {
  if (field.type === 'toggle') {
    return (
      <label className="flex items-center justify-between rounded-xl border border-white/10 bg-ink-850/50 px-4 py-3">
        <span className="text-sm text-white">{field.label}</span>
        <button
          type="button"
          onClick={() => onChange(!value)}
          className={cn(
            'relative h-6 w-11 rounded-full transition-colors',
            value ? 'bg-gold-500' : 'bg-ink-600'
          )}
        >
          <span
            className={cn(
              'absolute top-1 h-4 w-4 rounded-full bg-white transition-transform',
              value ? 'translate-x-6' : 'translate-x-1'
            )}
          />
        </button>
      </label>
    )
  }

  return (
    <label className="block">
      <span className="field-label">{field.label}</span>
      {field.type === 'textarea' ? (
        <textarea
          rows={4}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          className="field resize-none"
          placeholder={field.placeholder}
        />
      ) : field.type === 'select' ? (
        <select value={value ?? ''} onChange={(e) => onChange(e.target.value)} className="field">
          <option value="" disabled>
            Select
          </option>
          {field.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={field.type === 'number' ? 'number' : 'text'}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          className="field"
          placeholder={field.placeholder}
        />
      )}
    </label>
  )
}
