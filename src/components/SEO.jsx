import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'Studio Name'         // TODO
const SITE_URL  = 'https://example.com' // TODO
const DEFAULT_IMG = `${SITE_URL}/og-image.jpg`

export default function SEO({
  title,
  description = 'Graphic designer specializing in brand identity, editorial design, and visual systems.',
  image = DEFAULT_IMG,
  url,
  type = 'website',
  noindex = false,
}) {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME
  const canonical = url ? `${SITE_URL}${url}` : SITE_URL

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}