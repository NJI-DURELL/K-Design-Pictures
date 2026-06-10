import AdminCollection from '../../components/admin/AdminCollection'
import StarRating from '../../components/ui/StarRating'
import { TESTIMONIALS } from '../../data/content'

const seed = TESTIMONIALS.map((t, i) => ({ id: `t-${i}`, ...t, published: true }))

export default function AdminTestimonials() {
  return (
    <AdminCollection
      title="Testimonials"
      description="Manage the client reviews shown across the site."
      seed={seed}
      columns={[
        { key: 'name', label: 'Name', width: '1fr' },
        { key: 'company', label: 'Company', width: '1fr' },
        { key: 'quote', label: 'Quote', width: '2fr' },
        { key: 'rating', label: 'Rating', width: '0.8fr' },
      ]}
      fields={[
        { name: 'name', label: 'Name', placeholder: 'Client name' },
        { name: 'role', label: 'Role', placeholder: 'Their role' },
        { name: 'company', label: 'Company', placeholder: 'Company (optional)' },
        { name: 'quote', label: 'Quote', type: 'textarea' },
        { name: 'rating', label: 'Rating (1-5)', type: 'number', placeholder: '5' },
        { name: 'published', label: 'Published', type: 'toggle' },
      ]}
      renderItem={(item, key) => {
        if (key === 'rating') return <StarRating rating={Number(item.rating) || 5} size={13} />
        if (key === 'quote') return <span className="block truncate text-mist-400">{item.quote}</span>
        return undefined
      }}
    />
  )
}
