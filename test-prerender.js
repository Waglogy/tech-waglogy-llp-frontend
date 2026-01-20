/**
 * Quick test script to verify pre-rendering will work
 * Run this before the full build to check setup
 */

import { existsSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = fileURLToPath(new URL('.', import.meta.url))

async function testSetup() {
  console.log('🧪 Testing pre-render setup...\n')
  
  let allGood = true
  
  // Check 1: Puppeteer installation
  try {
    await import('puppeteer')
    console.log('✅ Puppeteer is installed')
  } catch (e) {
    console.log('❌ Puppeteer is NOT installed')
    console.log('   Run: npm install --save-dev puppeteer')
    allGood = false
  }
  
  // Check 2: Build directory exists
  const distDir = join(process.cwd(), 'dist')
  const indexPath = join(distDir, 'index.html')
  
  if (existsSync(indexPath)) {
    console.log('✅ Build files found in dist/')
  } else {
    console.log('⚠️  No build found. Run "npm run build:no-prerender" first')
    console.log('   (This is normal if you haven\'t built yet)')
  }
  
  // Check 3: Can import prerender script
  try {
    await import('./prerender.js')
    console.log('✅ Pre-render script is valid')
  } catch (e) {
    console.log('❌ Pre-render script has errors:', e.message)
    allGood = false
  }
  
  console.log('\n' + '='.repeat(50))
  if (allGood) {
    console.log('✅ All checks passed! Ready to pre-render.')
  } else {
    console.log('⚠️  Some checks failed. Fix issues above before building.')
  }
  console.log('='.repeat(50) + '\n')
}

testSetup()
