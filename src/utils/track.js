// Lightweight wrappers around window.gtag for our three custom GA4 events.
// All wrappers are no-ops if gtag isn't loaded (e.g. ad-blockers, SSR), so
// they're safe to call from any component without a guard.

function safeGtag(eventName, params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', eventName, params)
}

export function trackPhoneClick(location = 'unknown') {
  safeGtag('phone_call_click', { location })
}

export function trackWhatsappClick(location = 'unknown') {
  safeGtag('whatsapp_click', { location })
}

export function trackLead(formLocation, extra = {}) {
  safeGtag('generate_lead', {
    form_location: formLocation,
    value: 1,
    currency: 'INR',
    ...extra,
  })
}
