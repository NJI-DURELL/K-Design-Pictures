export default function PageHero({ kicker, title, intro, children }) {
  return (
    <section className="relative overflow-hidden pb-16 pt-40">
      <div className="pointer-events-none absolute inset-0 bg-radial-spot" />
      <div className="absolute inset-0 bg-grain opacity-[0.035] mix-blend-overlay" />
      <div className="shell relative">
        {kicker && <span className="kicker animate-fade-up">{kicker}</span>}
        <h1 className="mt-6 max-w-4xl text-fluid-display font-semibold text-white text-balance animate-fade-up">
          {title}
        </h1>
        {intro && (
          <p
            className="mt-6 max-w-2xl text-lg leading-relaxed text-mist-400 animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            {intro}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}
