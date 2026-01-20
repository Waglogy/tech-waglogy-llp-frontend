/**
 * Pre-rendering script for SEO
 * Generates static HTML files for all routes so Googlebot can crawl them
 * 
 * This script uses Puppeteer to render each route and save static HTML files.
 * 
 * Installation: npm install --save-dev puppeteer
 * Usage: npm run build (automatically runs prerender) or npm run prerender
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createServer } from 'http'
import { readdir } from 'fs/promises'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Routes to pre-render
const routes = [
  '/',
  '/about',
  '/services',
  '/contact',
  '/pricing',
  '/projects',
  '/blog'
]

// Start a local server to serve the built files
function startServer(distDir, port = 3001) {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let filePath = join(distDir, req.url === '/' ? 'index.html' : req.url)
      
      // Handle static assets (JS, CSS, images, etc.)
      if (req.url.includes('.')) {
        // Serve actual files (assets)
        if (!existsSync(filePath)) {
          res.writeHead(404)
          res.end('Not found')
          return
        }
      } else {
        // Handle route requests - serve index.html for all routes (SPA behavior)
        filePath = join(distDir, 'index.html')
      }

      try {
        const content = readFileSync(filePath)
        const ext = filePath.split('.').pop()
        const contentType = {
          'html': 'text/html; charset=utf-8',
          'js': 'application/javascript; charset=utf-8',
          'css': 'text/css; charset=utf-8',
          'json': 'application/json',
          'png': 'image/png',
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'svg': 'image/svg+xml',
          'ico': 'image/x-icon',
          'woff': 'font/woff',
          'woff2': 'font/woff2',
          'ttf': 'font/ttf'
        }[ext] || 'text/plain'

        res.writeHead(200, { 
          'Content-Type': contentType,
          'Cache-Control': 'no-cache'
        })
        res.end(content)
      } catch (error) {
        res.writeHead(404)
        res.end('Not found')
      }
    })

    server.listen(port, () => {
      console.log(`🌐 Local server running on http://localhost:${port}`)
      resolve(server)
    })
  })
}

async function prerender() {
  try {
    // Check if puppeteer is available
    let puppeteer
    try {
      puppeteer = await import('puppeteer')
    } catch (e) {
      console.log('⚠️  Puppeteer not installed. Skipping pre-rendering.')
      console.log('💡 Install it with: npm install --save-dev puppeteer')
      console.log('💡 Or run: npm run build:no-prerender to skip pre-rendering')
      return
    }

    console.log('🚀 Starting pre-rendering...')
    
    const distDir = join(__dirname, 'dist')
    const indexPath = join(distDir, 'index.html')
    
    if (!existsSync(indexPath)) {
      console.error('❌ Build files not found. Run "npm run build:no-prerender" first.')
      process.exit(1)
    }

    // Start local server
    const server = await startServer(distDir)
    
    // Launch browser
    const browser = await puppeteer.default.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

    const page = await browser.newPage()
    
    // Set viewport
    await page.setViewport({ width: 1920, height: 1080 })
    
    // Set user agent to match Googlebot
    await page.setUserAgent('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)')

    for (const route of routes) {
      try {
        console.log(`📄 Pre-rendering: ${route}`)
        
        // Navigate to route via local server
        const url = `http://localhost:3001${route}`
        
        await page.goto(url, { 
          waitUntil: 'networkidle0', 
          timeout: 60000 // Increased timeout
        })
        
        // Wait for React to hydrate and content to be visible
        await page.waitForSelector('#root', { timeout: 15000 })
        
        // Wait for actual content (not just empty div)
        // Check if root has meaningful content
        await page.waitForFunction(
          () => {
            const root = document.getElementById('root')
            return root && root.innerHTML.length > 100 // Has substantial content
          },
          { timeout: 15000 }
        )
        
        // Additional wait for animations and async content
        await page.waitForTimeout(2000)
        
        // Verify content is actually rendered (not just empty)
        const contentCheck = await page.evaluate(() => {
          const root = document.getElementById('root')
          if (!root) return false
          const textContent = root.textContent || ''
          const innerHTML = root.innerHTML || ''
          // Check for meaningful content (not just whitespace or noscript)
          return textContent.trim().length > 50 && innerHTML.includes('<div')
        })
        
        if (!contentCheck) {
          console.warn(`⚠️  Warning: Route ${route} may not have fully rendered content`)
        }
        
        // Get rendered HTML
        const html = await page.content()
        
        // Verify HTML contains expected content
        if (!html.includes('Tech Waglogy') && !html.includes('waglogy')) {
          console.warn(`⚠️  Warning: Route ${route} HTML may be missing expected content`)
        }
        
        // Save to file
        let outputPath
        if (route === '/') {
          outputPath = indexPath
        } else {
          outputPath = join(distDir, route, 'index.html')
          mkdirSync(dirname(outputPath), { recursive: true })
        }
        
        // Fix asset paths for nested routes
        let finalHtml = html
        if (route !== '/') {
          const depth = route.split('/').filter(Boolean).length
          const pathPrefix = '../'.repeat(depth)
          finalHtml = finalHtml
            .replace(/href="\//g, `href="${pathPrefix}`)
            .replace(/src="\//g, `src="${pathPrefix}`)
            .replace(/srcset="\//g, `srcset="${pathPrefix}`)
            .replace(/action="\//g, `action="${pathPrefix}`)
        }
        
        writeFileSync(outputPath, finalHtml)
        
        // Verify file was created and has content
        const savedFile = readFileSync(outputPath, 'utf8')
        if (savedFile.length < 1000) {
          console.warn(`⚠️  Warning: Pre-rendered file for ${route} seems too small`)
        }
        
        console.log(`✅ Pre-rendered: ${route} -> ${outputPath} (${Math.round(savedFile.length / 1024)}KB)`)
      } catch (error) {
        console.error(`❌ Error pre-rendering ${route}:`, error.message)
        // Continue with other routes even if one fails
      }
    }

    await browser.close()
    server.close()
    console.log('✨ Pre-rendering complete!')
    console.log('📦 Static HTML files are ready for deployment.')
  } catch (error) {
    console.error('❌ Pre-rendering failed:', error.message)
    process.exit(1)
  }
}

prerender()
