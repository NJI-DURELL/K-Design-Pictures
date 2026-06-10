import { Helmet } from 'react-helmet-async'

const SITE = 'https://k-design-six.vercel.app'
const DEFAULT_OG = `${SITE}/og-image.png`

/**
 * Per-page meta. Falls back to the document defaults set in index.html.
 */
export default function Seo({
  title,
  description,
  path = '/',
  image = DEFAULT_OG,
  type = 'website',
  noindex = false,
}) {
  const fullTitle = title
    ? `${title} | K-Design Pictures`
    : 'K-Design Pictures SARL | Cinematic Audiovisual Production in Yaoundé'
  const url = `${SITE}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}
