/**
 * Client-side filter, sort, and paginate for merged / static insights.
 */

function stripHtml(html) {
  if (!html || typeof html !== 'string') return ''
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

export function applyInsightQuery(blogs, params = {}) {
  let list = [...blogs].filter((b) => b.isPublished !== false)

  if (params.search) {
    const q = String(params.search).toLowerCase()
    list = list.filter((b) => {
      const blob = [
        b.title,
        b.excerpt,
        stripHtml(b.content),
        ...(b.tags || [])
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      return blob.includes(q)
    })
  }

  if (params.tags) {
    const tag = String(params.tags)
    list = list.filter((b) => Array.isArray(b.tags) && b.tags.includes(tag))
  }

  const sort = params.sort || '-date'
  list.sort((a, b) => {
    const da = new Date(a.date || 0).getTime()
    const db = new Date(b.date || 0).getTime()
    return sort.startsWith('-') ? db - da : da - db
  })

  const page = Math.max(1, Number(params.page) || 1)
  const limit = Math.min(100, Math.max(1, Number(params.limit) || 9))
  const total = list.length
  const totalPages = Math.max(1, Math.ceil(total / limit))
  const slice = list.slice((page - 1) * limit, page * limit)

  return {
    data: slice,
    totalPages,
    total,
    page
  }
}

export function mergeApiAndStatic(apiList, staticList) {
  const apiSlugs = new Set((apiList || []).map((b) => b.slug).filter(Boolean))
  const extra = (staticList || []).filter((b) => b.slug && !apiSlugs.has(b.slug))
  return [...(apiList || []), ...extra]
}
