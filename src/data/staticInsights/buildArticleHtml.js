/**
 * Build semantic HTML for insight articles (SEO-friendly headings and lists).
 */
export function buildArticleHtml(sections) {
  return sections
    .map((s) => {
      let block = `<h2>${s.h}</h2>`
      for (const p of s.p || []) {
        block += `<p>${p}</p>`
      }
      if (s.bullets?.length) {
        block += '<ul>'
        for (const li of s.bullets) {
          block += `<li>${li}</li>`
        }
        block += '</ul>'
      }
      return block
    })
    .join('')
}

export function insightRow(meta, sections) {
  return {
    _id: `static-insight-${meta.slug}`,
    slug: meta.slug,
    title: meta.title,
    excerpt: meta.excerpt,
    contentType: 'html',
    content: buildArticleHtml(sections),
    author: meta.author || 'Waglogy Team',
    image: meta.image ?? null,
    date: meta.date,
    tags: meta.tags,
    readTime: meta.readTime,
    isPublished: true
  }
}
