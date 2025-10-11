import React from 'react'
import { Helmet } from 'react-helmet-async'
import { SITE_CONFIG, PAGE_SEO } from '../config/seo'

/**
 * SEO Component for dynamic meta tags
 * Optimized for Sikkim, India and Northeast India
 */
const SEO = ({ 
  title, 
  description, 
  keywords = [], 
  canonical, 
  page = 'home',
  image,
  type = 'website',
  schemas = []
}) => {
  // Get page-specific SEO data or use defaults
  const pageSEO = PAGE_SEO[page] || PAGE_SEO.home
  
  const seoTitle = title || pageSEO.title || SITE_CONFIG.defaultTitle
  const seoDescription = description || pageSEO.description || SITE_CONFIG.defaultDescription
  const seoKeywords = keywords.length > 0 
    ? keywords 
    : [...(pageSEO.keywords || []), ...SITE_CONFIG.defaultKeywords]
  const seoCanonical = canonical || pageSEO.canonical || '/'
  const seoImage = image || `${SITE_CONFIG.siteUrl}/banner.png`
  const fullUrl = `${SITE_CONFIG.siteUrl}${seoCanonical}`

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="title" content={seoTitle} />
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords.join(', ')} />
      <meta name="author" content={SITE_CONFIG.author} />
      <link rel="canonical" href={fullUrl} />

      {/* Language and Region */}
      <html lang="en-IN" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="IN-SK" />
      <meta name="geo.placename" content="Gangtok, Sikkim" />
      <meta name="geo.position" content="27.3389;88.6065" />
      <meta name="ICBM" content="27.3389, 88.6065" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_CONFIG.siteName} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      <meta name="twitter:creator" content={`@${SITE_CONFIG.twitter}`} />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={SITE_CONFIG.siteName} />

      {/* Theme Color */}
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />

      {/* Business Contact */}
      <meta name="contact" content={SITE_CONFIG.business.email} />
      <meta name="email" content={SITE_CONFIG.business.email} />
      <meta name="phone" content={SITE_CONFIG.business.phone} />

      {/* Structured Data / Schema.org */}
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}

      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
    </Helmet>
  )
}

export default SEO

