/**
 * SSR-based static pre-rendering.
 *
 * Runs after `vite build` and `vite build --ssr src/entry-server.jsx`.
 * Imports the compiled server bundle, renders each route to an HTML string,
 * and writes the result into dist/<route>/index.html.
 *
 * No browser or Puppeteer required — pure Node.js.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Parse all routes from sitemap.xml — single source of truth for what to prerender.
// This covers static pages, city landing pages, and all insight articles automatically.
function buildRouteList() {
  const sitemap = readFileSync(join(__dirname, 'public', 'sitemap.xml'), 'utf-8')
  const matches = [...sitemap.matchAll(/<loc>https?:\/\/waglogy\.in([^<]*)<\/loc>/g)]
  const routes = matches
    .map(m => m[1] || '/')
    .map(r => (r === '' ? '/' : r))
    .filter((r, i, arr) => arr.indexOf(r) === i)
  console.log(`📋 Found ${routes.length} routes in sitemap.xml`)
  return routes
}

async function prerender() {
  console.log('🚀 Starting SSR pre-rendering...')

  const routes = buildRouteList()
  const distDir = join(__dirname, 'dist')
  const template = readFileSync(join(distDir, 'index.html'), 'utf-8')

  // Load the Vite SSR bundle (built to dist/server/ by `vite build --ssr`)
  const serverEntryUrl = pathToFileURL(
    join(distDir, 'server', 'entry-server.js')
  ).href
  const { render } = await import(serverEntryUrl)

  let succeeded = 0

  for (const url of routes) {
    try {
      console.log(`📄 Pre-rendering: ${url}`)

      const { html, helmet } = render(url)

      let pageHtml = template

      // Mark the HTML element with the route so the client can decide
      // whether to hydrate or do a fresh CSR render (see src/main.jsx).
      pageHtml = pageHtml.replace(
        /(<html[^>]*)(>)/,
        `$1 data-ssr-route="${url}"$2`
      )

      // Inject server-rendered body at the placeholder
      pageHtml = pageHtml.replace('<!--ssr-outlet-->', html)

      // ── Head tag injection ────────────────────────────────────────────
      const helmetTitle = helmet?.title?.toString() ?? ''
      const helmetMeta  = helmet?.meta?.toString()  ?? ''
      const helmetLink  = helmet?.link?.toString()  ?? ''

      // Replace <title>
      if (helmetTitle) {
        pageHtml = pageHtml.replace(/<title>[^<]*<\/title>/, helmetTitle)
      }

      // Replace <meta name="description">
      const descMatch = helmetMeta.match(
        /<meta[^>]+name="description"[^>]+content="([^"]*)"[^>]*\/?>/
      )
      if (descMatch) {
        pageHtml = pageHtml.replace(
          /(<meta name="description"\s+content=")[^"]*(")/,
          `$1${descMatch[1]}$2`
        )
      }

      // Replace og:title / og:description
      const ogTitleMatch = helmetMeta.match(
        /<meta[^>]+property="og:title"[^>]+content="([^"]*)"[^>]*\/?>/
      )
      if (ogTitleMatch) {
        pageHtml = pageHtml.replace(
          /(<meta property="og:title"\s+content=")[^"]*(")/,
          `$1${ogTitleMatch[1]}$2`
        )
      }

      const ogDescMatch = helmetMeta.match(
        /<meta[^>]+property="og:description"[^>]+content="([^"]*)"[^>]*\/?>/
      )
      if (ogDescMatch) {
        pageHtml = pageHtml.replace(
          /(<meta property="og:description"\s+content=")[^"]*("[^>]*>)/,
          `$1${ogDescMatch[1]}$2`
        )
      }

      // Replace <link rel="canonical">
      const canonicalMatch = helmetLink.match(
        /<link[^>]+rel="canonical"[^>]+href="([^"]*)"[^>]*\/?>/
      )
      if (canonicalMatch) {
        pageHtml = pageHtml.replace(
          /(<link rel="canonical" href=")[^"]*(")/,
          `$1${canonicalMatch[1]}$2`
        )
      }

      // ── Write output ──────────────────────────────────────────────────
      let outputPath
      if (url === '/') {
        outputPath = join(distDir, 'index.html')
      } else {
        const routeName = url.slice(1) // strip leading /
        mkdirSync(join(distDir, routeName), { recursive: true })
        outputPath = join(distDir, routeName, 'index.html')
      }

      writeFileSync(outputPath, pageHtml)
      const kb = Math.round(pageHtml.length / 1024)
      console.log(
        `✅ ${url} → dist${outputPath.replace(distDir, '')} (${kb} KB)`
      )
      succeeded++
    } catch (err) {
      console.error(`❌ Failed to pre-render ${url}:`, err.message)
      if (err.stack) console.error(err.stack)
    }
  }

  console.log(`\n✨ Pre-rendering complete — ${succeeded}/${routes.length} routes rendered successfully.`)

  if (succeeded === 0) {
    console.error('❌ No routes were pre-rendered. Check the errors above.')
    process.exit(1)
  }
}

prerender().catch((err) => {
  console.error('❌ Pre-rendering failed:', err)
  process.exit(1)
})
