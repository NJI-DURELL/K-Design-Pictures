import { Play } from 'lucide-react'
import Poster from './Poster'

/**
 * Renders a video from a YouTube or Facebook URL. No downloads, no SDK:
 * YouTube uses the standard embed, Facebook uses the official video plugin
 * iframe. When `url` is empty it shows a branded poster with a play button.
 *
 * Accepted links:
 *   YouTube  - youtu.be/ID, youtube.com/watch?v=ID, youtube.com/embed/ID
 *   Facebook - facebook.com/<page>/videos/ID, fb.watch/xxxx, facebook.com/watch/?v=ID
 */
export default function VideoEmbed({ url = '', title = 'Video', seed = '', className = '' }) {
  const youtubeId = extractYouTube(url)
  const isFacebook = /facebook\.com|fb\.watch|fb\.me/.test(url)

  if (youtubeId) {
    return (
      <div className={`aspect-video w-full overflow-hidden ${className}`}>
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  if (isFacebook) {
    const src = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
      url
    )}&show_text=false&autoplay=false`
    return (
      <div className={`aspect-video w-full overflow-hidden bg-ink-950 ${className}`}>
        <iframe
          className="h-full w-full"
          src={src}
          title={title}
          loading="lazy"
          style={{ border: 'none', overflow: 'hidden' }}
          scrolling="no"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    )
  }

  // No link yet: branded placeholder.
  return (
    <div className={`group relative aspect-video w-full ${className}`}>
      <Poster seed={seed || title} alt="" className="h-full w-full" />
      <div className="absolute inset-0 grid place-items-center">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-gold-500/90 text-ink-900 transition-transform duration-500 group-hover:scale-110">
          <Play size={28} className="ml-1 fill-current" />
        </span>
      </div>
    </div>
  )
}

export function extractYouTube(url = '') {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/)
  return m ? m[1] : null
}
