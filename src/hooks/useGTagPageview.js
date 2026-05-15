import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

// SPA-aware Google Analytics 4 page-view tracking.
// gtag('config', GA_ID) in index.html already fires a pageview on the
// very first page load, so this hook deliberately skips the first run
// and only sends events for subsequent client-side route changes.
const GA_ID = 'G-64PPXWEEJ4'

export default function useGTagPageview() {
  const { pathname, search } = useLocation()
  const isFirstRun = useRef(true)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return

    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }

    window.gtag('event', 'page_view', {
      page_path: pathname + search,
      page_location: window.location.href,
      page_title: document.title,
      send_to: GA_ID,
    })
  }, [pathname, search])
}
