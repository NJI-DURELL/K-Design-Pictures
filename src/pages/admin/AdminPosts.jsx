import AdminCollection from '../../components/admin/AdminCollection'
import { POSTS } from '../../data/content'
import { formatDate } from '../../lib/utils'

const seed = POSTS.map((p) => ({
  id: p.slug,
  title: p.title,
  category: p.category,
  date: p.date,
  readingTime: p.readingTime,
  excerpt: p.excerpt,
  body: p.body,
  published: true,
}))

export default function AdminPosts() {
  return (
    <AdminCollection
      title="Journal posts"
      description="Publish company updates, behind-the-scenes stories, and insights."
      seed={seed}
      columns={[
        { key: 'title', label: 'Title', width: '2fr' },
        { key: 'category', label: 'Category', width: '1fr' },
        { key: 'date', label: 'Date', width: '1fr' },
      ]}
      fields={[
        { name: 'title', label: 'Title', placeholder: 'Article title' },
        { name: 'category', label: 'Category', placeholder: 'Craft, Studio, Behind the scenes' },
        { name: 'date', label: 'Date', placeholder: 'YYYY-MM-DD' },
        { name: 'readingTime', label: 'Reading time', placeholder: '5 min' },
        { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
        { name: 'body', label: 'Body', type: 'textarea' },
        { name: 'cover', label: 'Cover image URL', placeholder: 'Paste an image URL or upload in Media' },
        { name: 'published', label: 'Published', type: 'toggle' },
      ]}
      renderItem={(item, key) => {
        if (key === 'date') return <span className="text-mist-400">{formatDate(item.date)}</span>
        if (key === 'category')
          return (
            <span className="inline-block rounded-full bg-white/[0.05] px-2.5 py-1 text-2xs text-mist-300">
              {item.category}
            </span>
          )
        return undefined
      }}
    />
  )
}
