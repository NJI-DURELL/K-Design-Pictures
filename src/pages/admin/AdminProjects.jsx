import AdminCollection from '../../components/admin/AdminCollection'
import { PROJECTS, CATEGORIES } from '../../data/content'

const seed = PROJECTS.map((p) => ({
  id: p.slug,
  title: p.title,
  category: p.category,
  client: p.client,
  year: p.year,
  summary: p.summary,
  description: p.description,
  video: p.video,
  featured: p.featured,
  published: true,
}))

export default function AdminProjects() {
  return (
    <AdminCollection
      title="Projects"
      description="Create, edit, publish, and feature the work shown in your portfolio."
      seed={seed}
      columns={[
        { key: 'title', label: 'Title', width: '2fr' },
        { key: 'category', label: 'Category', width: '1fr' },
        { key: 'client', label: 'Client', width: '1fr' },
        { key: 'year', label: 'Year', width: '0.6fr' },
      ]}
      fields={[
        { name: 'title', label: 'Title', placeholder: 'Project title' },
        { name: 'category', label: 'Category', type: 'select', options: CATEGORIES.filter((c) => c !== 'All') },
        { name: 'client', label: 'Client', placeholder: 'Client name' },
        { name: 'year', label: 'Year', type: 'number', placeholder: '2025' },
        { name: 'summary', label: 'Summary', type: 'textarea', placeholder: 'One-line summary' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'video', label: 'Video URL', placeholder: 'YouTube or Facebook video link (optional)' },
        { name: 'cover', label: 'Cover image URL', placeholder: 'Paste an image URL or upload in Media' },
        { name: 'featured', label: 'Featured on home page', type: 'toggle' },
        { name: 'published', label: 'Published', type: 'toggle' },
      ]}
      renderItem={(item, key) => {
        if (key === 'category')
          return (
            <span className="inline-block rounded-full bg-white/[0.05] px-2.5 py-1 text-2xs text-mist-300">
              {item.category}
            </span>
          )
        if (key === 'title')
          return (
            <div>
              <span className="block truncate font-medium text-white">{item.title}</span>
              {item.featured && <span className="text-2xs text-gold-400">Featured</span>}
            </div>
          )
        return undefined
      }}
    />
  )
}
