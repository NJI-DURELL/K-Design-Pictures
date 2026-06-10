import { useRef, useState } from 'react'
import { UploadCloud, Image as ImageIcon, Film, Trash2, Copy, Check } from 'lucide-react'
import { supabase, isSupabaseReady } from '../../lib/supabase'

export default function AdminMedia() {
  const inputRef = useRef(null)
  const [items, setItems] = useState([])
  const [busy, setBusy] = useState(false)
  const [copied, setCopied] = useState(null)

  const handleFiles = async (files) => {
    const list = Array.from(files)
    if (!list.length) return
    setBusy(true)

    for (const file of list) {
      const localUrl = URL.createObjectURL(file)
      const isVideo = file.type.startsWith('video')
      let publicUrl = localUrl

      if (isSupabaseReady && supabase) {
        const path = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`
        const { error } = await supabase.storage.from('media').upload(path, file)
        if (!error) {
          const { data } = supabase.storage.from('media').getPublicUrl(path)
          publicUrl = data.publicUrl
        }
      }

      setItems((arr) => [
        { id: crypto.randomUUID(), name: file.name, url: publicUrl, isVideo, size: file.size },
        ...arr,
      ])
    }
    setBusy(false)
  }

  const copy = (url, id) => {
    navigator.clipboard.writeText(url)
    setCopied(id)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[1.75rem] glass p-8">
        <h1 className="font-display text-2xl font-semibold text-white">Media library</h1>
        <p className="mt-2 text-mist-400">
          Upload images and videos for your projects, team, and journal.
          {isSupabaseReady ? ' Files are stored in Supabase Storage.' : ' Connect Supabase to store files permanently.'}
        </p>
      </section>

      {/* Dropzone */}
      <section
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          handleFiles(e.dataTransfer.files)
        }}
        className="group cursor-pointer rounded-[1.75rem] border-2 border-dashed border-white/12 bg-ink-850/40 p-12 text-center transition-colors hover:border-gold-500/40"
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-white/10 bg-ink-800 text-gold-400 transition group-hover:scale-105">
          <UploadCloud size={28} strokeWidth={1.5} />
        </span>
        <p className="mt-5 font-display text-lg text-white">
          {busy ? 'Uploading...' : 'Drop files here, or click to browse'}
        </p>
        <p className="mt-1 text-sm text-mist-500">Images and video, up to your Supabase limit.</p>
      </section>

      {/* Grid */}
      {items.length > 0 && (
        <section className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((m) => (
            <div key={m.id} className="group relative overflow-hidden rounded-2xl glass">
              <div className="aspect-square">
                {m.isVideo ? (
                  <div className="grid h-full place-items-center bg-ink-800 text-gold-400">
                    <Film size={32} strokeWidth={1.4} />
                  </div>
                ) : (
                  <img src={m.url} alt={m.name} className="h-full w-full object-cover" />
                )}
              </div>
              <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-ink-950/90 via-transparent to-transparent p-3 opacity-0 transition group-hover:opacity-100">
                <div className="flex justify-end gap-1.5">
                  <button
                    onClick={() => copy(m.url, m.id)}
                    className="grid h-8 w-8 place-items-center rounded-lg glass text-white"
                    title="Copy URL"
                  >
                    {copied === m.id ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                  <button
                    onClick={() => setItems((arr) => arr.filter((i) => i.id !== m.id))}
                    className="grid h-8 w-8 place-items-center rounded-lg glass text-white hover:text-red-400"
                    title="Remove"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <p className="truncate text-2xs text-white">{m.name}</p>
              </div>
            </div>
          ))}
        </section>
      )}

      {items.length === 0 && (
        <p className="flex items-center justify-center gap-2 py-6 text-sm text-mist-600">
          <ImageIcon size={16} />
          No media uploaded in this session yet.
        </p>
      )}
    </div>
  )
}
