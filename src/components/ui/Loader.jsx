import { Monogram } from '../brand/Logo'

export default function Loader({ full = true }) {
  return (
    <div
      className={`grid place-items-center bg-ink-900 ${full ? 'min-h-screen' : 'min-h-[50vh]'}`}
    >
      <div className="flex flex-col items-center gap-5">
        <span className="animate-pulse-soft">
          <Monogram size={52} />
        </span>
        <span className="h-px w-16 overflow-hidden bg-white/10">
          <span className="block h-full w-1/2 animate-[sheen_1.4s_linear_infinite] bg-gold-500" />
        </span>
      </div>
    </div>
  )
}
