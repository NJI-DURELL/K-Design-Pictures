import AdminCollection from '../../components/admin/AdminCollection'
import { SERVICES } from '../../data/content'

const seed = SERVICES.map((s) => ({
  id: s.slug,
  title: s.title,
  summary: s.summary,
  description: s.description,
  features: s.features.join(', '),
}))

export default function AdminServices() {
  return (
    <AdminCollection
      title="Services"
      description="Manage the services offered across the site."
      seed={seed}
      columns={[
        { key: 'title', label: 'Service', width: '1.2fr' },
        { key: 'summary', label: 'Summary', width: '2fr' },
        { key: 'features', label: 'Features', width: '1.5fr' },
      ]}
      fields={[
        { name: 'title', label: 'Title', placeholder: 'Service name' },
        { name: 'summary', label: 'Summary', placeholder: 'One-line summary' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'features', label: 'Features', placeholder: 'Comma separated' },
      ]}
      renderItem={(item, key) => {
        if (key === 'summary' || key === 'features')
          return <span className="block truncate text-mist-400">{item[key]}</span>
        return undefined
      }}
    />
  )
}
