// Phase 3 deliverable verification — runs from within the project so
// ESM imports resolve correctly. Checks word counts, schema shape, and
// internal-link presence for the three priority city pages.

import { citiesRichContent } from '../src/data/citiesRichContent.js'
import {
  generateCityLocalBusinessSchema,
  generateCityServiceSchema,
  generateFAQSchema,
} from '../src/config/seo.js'
import { cities, getCityBySlug } from '../src/data/cities.js'

function wordCount(s) {
  if (!s) return 0
  return String(s).trim().split(/\s+/).length
}

function cityWordTotal(city) {
  let total = 0
  total += wordCount(city.h1)
  total += wordCount(city.heroPara)
  total += wordCount(city.intro)
  total += wordCount(city.localContent)
  total += wordCount(city.localHeading)
  total += wordCount(city.localPara)
  for (const p of city.localPoints || []) total += wordCount(p)
  for (const w of city.whyChoose || []) {
    total += wordCount(w.title) + wordCount(w.body)
  }
  for (const s of city.serviceDetails || []) {
    total += wordCount(s.title) + wordCount(s.body)
  }
  for (const cs of city.caseStudies || []) {
    total += wordCount(cs.title) + wordCount(cs.challenge) + wordCount(cs.outcome)
  }
  for (const ind of city.industryDetails || []) {
    total += wordCount(ind.name) + wordCount(ind.body)
  }
  for (const f of city.faq || []) total += wordCount(f.q) + wordCount(f.a)
  for (const f of city.extendedFaqs || []) total += wordCount(f.q) + wordCount(f.a)
  total += wordCount(city.industriesHeading)
  for (const ind of city.industries || []) total += wordCount(ind)
  for (const a of city.nearbyAreas || []) total += wordCount(a)
  return total
}

function checkSchema(schema, type, label) {
  const ok = schema && schema['@context'] === 'https://schema.org' && schema['@type']
  const checks = []
  checks.push([ok ? '✓' : '✗', `${label} valid root`])
  if (type && schema['@type'] !== type) {
    checks.push(['✗', `${label} expected @type=${type}, got ${schema['@type']}`])
  } else {
    checks.push(['✓', `${label} @type = ${schema['@type']}`])
  }
  return checks
}

const PRIORITY = [
  'gangtok', 'sikkim', 'guwahati',
  'shillong', 'siliguri', 'darjeeling',
  'itanagar', 'imphal', 'aizawl', 'kohima', 'agartala',
]

console.log('═══════════════════════════════════════════════════════════')
console.log('  Phase 3 deliverable verification')
console.log('═══════════════════════════════════════════════════════════\n')

console.log(`Cities loaded from cities.js: ${cities.length}`)
console.log(`Cities with rich content:     ${PRIORITY.filter((s) => citiesRichContent[s]).length}/${PRIORITY.length}\n`)

let pass = true

for (const slug of PRIORITY) {
  const city = getCityBySlug(slug)
  console.log(`──── /web-development/${slug} ────`)

  const wc = cityWordTotal(city)
  const wcOk = wc >= 800 && wc <= 2000
  console.log(`  Word count:                   ${wc}  ${wcOk ? '✓ in 800-2000 range' : '✗ outside target'}`)
  if (!wcOk) pass = false

  const allFaqs = [...(city.faq || []), ...(city.extendedFaqs || [])]
  const faqOk = allFaqs.length >= 6
  console.log(`  FAQ count:                    ${allFaqs.length}  ${faqOk ? '✓' : '✗ (target ≥6)'}`)
  if (!faqOk) pass = false

  console.log(`  Why-choose cards:             ${city.whyChoose?.length || 0}  ${(city.whyChoose?.length || 0) >= 4 ? '✓' : '✗ (target ≥4)'}`)
  if ((city.whyChoose?.length || 0) < 4) pass = false
  console.log(`  Service detail cards:         ${city.serviceDetails?.length || 0}  ${(city.serviceDetails?.length || 0) >= 5 ? '✓' : '✗ (target ≥5)'}`)
  if ((city.serviceDetails?.length || 0) < 5) pass = false
  console.log(`  Case studies:                 ${city.caseStudies?.length || 0}  ${(city.caseStudies?.length || 0) >= 2 ? '✓' : '✗ (target ≥2)'}`)
  if ((city.caseStudies?.length || 0) < 2) pass = false
  console.log(`  Industry detail entries:      ${city.industryDetails?.length || 0}`)
  console.log(`  Nearby areas (cross-link):    ${city.nearbyAreas?.length || 0}`)

  // Title tag length
  const tlen = (city.seo.title || '').length
  console.log(`  Title tag length:             ${tlen} chars  ${tlen <= 60 ? '✓' : '✗ (>60 chars)'}`)

  const dlen = (city.seo.description || '').length
  console.log(`  Meta description length:      ${dlen} chars  ${dlen >= 140 && dlen <= 165 ? '✓' : `△ (target 140-160, current ${dlen})`}`)

  // Primary keyword in first 100 words check
  const first100 = `${city.h1} ${city.heroPara} ${city.intro || ''}`.split(/\s+/).slice(0, 100).join(' ').toLowerCase()
  const hasKeyword = first100.includes(city.name.toLowerCase()) && (first100.includes('web develop') || first100.includes('development'))
  console.log(`  Primary kw in first 100 words: ${hasKeyword ? '✓' : '✗'}`)
  if (!hasKeyword) pass = false

  // Generate and validate schemas
  const lb = generateCityLocalBusinessSchema(city)
  const sv = generateCityServiceSchema(city)
  const faqSchema = generateFAQSchema(allFaqs.map((f) => ({ question: f.q, answer: f.a })))
  console.log(`  LocalBusiness schema:         @id=${lb['@id']}`)
  console.log(`                                areaServed entries: ${lb.areaServed.length}`)
  console.log(`                                offer catalog items: ${lb.hasOfferCatalog.itemListElement.length}`)
  console.log(`  Service schema:               @id=${sv['@id']}`)
  console.log(`  FAQ schema mainEntity:        ${faqSchema.mainEntity.length} questions`)

  for (const [mark, label] of [
    ...checkSchema(lb, 'ProfessionalService', 'LocalBusiness'),
    ...checkSchema(sv, 'Service', 'Service'),
    ...checkSchema(faqSchema, 'FAQPage', 'FAQPage'),
  ]) {
    if (mark === '✗') {
      console.log(`  ${mark} ${label}`)
      pass = false
    }
  }

  console.log('')
}

console.log('═══════════════════════════════════════════════════════════')
console.log(pass ? '  ALL CHECKS PASSED ✓' : '  SOME CHECKS FAILED ✗')
console.log('═══════════════════════════════════════════════════════════')
process.exit(pass ? 0 : 1)
