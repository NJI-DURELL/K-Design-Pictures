import AdminCollection from '../../components/admin/AdminCollection'
import Avatar from '../../components/ui/Avatar'
import { TEAM } from '../../data/content'

const seed = TEAM.map((m, i) => ({ id: `m-${i}`, ...m }))

export default function AdminTeam() {
  return (
    <AdminCollection
      title="Team"
      description="Manage the people shown on the About page."
      seed={seed}
      columns={[
        { key: 'name', label: 'Name', width: '1.4fr' },
        { key: 'role', label: 'Role', width: '1fr' },
        { key: 'bio', label: 'Bio', width: '2fr' },
      ]}
      fields={[
        { name: 'name', label: 'Name', placeholder: 'Full name' },
        { name: 'role', label: 'Role', placeholder: 'Their role' },
        { name: 'bio', label: 'Bio', type: 'textarea' },
        { name: 'photo', label: 'Photo URL', placeholder: 'Paste an image URL or upload in Media' },
      ]}
      renderItem={(item, key) => {
        if (key === 'name')
          return (
            <div className="flex items-center gap-3">
              <Avatar name={item.name} src={item.photo} size={36} />
              <span className="truncate font-medium text-white">{item.name}</span>
            </div>
          )
        if (key === 'bio') return <span className="block truncate text-mist-400">{item.bio}</span>
        return undefined
      }}
    />
  )
}
