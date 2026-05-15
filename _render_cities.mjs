import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { pathToFileURL } from 'url'

const { render } = await import(pathToFileURL('/tmp/wg-dist/server/entry-server.js').href)
const template = readFileSync('/tmp/wg-dist/index.html', 'utf-8')

const cities = ['gangtok', 'sikkim', 'guwahati']
mkdirSync('/tmp/render-out', { recursive: true })

for (const slug of cities) {
  const url = `/web-development/${slug}`
  const { html, helmet } = render(url)
  let pageHtml = template.replace('<!--ssr-outlet-->', html)
  if (helmet?.title)  pageHtml = pageHtml.replace(/<title>[^<]*<\/title>/, helmet.title.toString())
  writeFileSync(`/tmp/render-out/${slug}.html`, pageHtml)

  // Extract just the body text for word count
  const bodyOnly = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  const wordCount = bodyOnly.split(/\s+/).length

  // Count JSON-LD blocks
  const jsonLdMatches = pageHtml.match(/<script[^>]*application\/ld\+json[^>]*>/g) || []

  // Count internal links
  const internalLinks = (pageHtml.match(/href="\/(?!\/)[^"]*"/g) || []).length

  // Count headings
  const h1Count = (pageHtml.match(/<h1[\s>]/g) || []).length
  const h2Count = (pageHtml.match(/<h2[\s>]/g) || []).length

  console.log(`\n──── /web-development/${slug} ────`)
  console.log(`  Word count (rendered body):  ${wordCount}`)
  console.log(`  H1 elements:                 ${h1Count}  ${h1Count === 1 ? '✓' : '✗ (must be exactly 1)'}`)
  console.log(`  H2 elements:                 ${h2Count}`)
  console.log(`  JSON-LD <script> blocks:     ${jsonLdMatches.length}`)
  console.log(`  Internal links:              ${internalLinks}`)
  console.log(`  Title tag:                   ${helmet?.title?.toString().replace(/<[^>]+>/g, '').slice(0, 100)}`)
}
