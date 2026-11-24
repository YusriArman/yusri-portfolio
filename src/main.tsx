import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/archivo/wdth.css'
import './styles/tokens.css'
import './styles/base.css'
import App from './App'

// Photo planning styles are loaded in the local preview only.
if (import.meta.env.DEV) {
  import('./dev/photoPlanning.css')
}

// A reload always starts at the top, even after following a section link like #about.
// The browser would otherwise put you back where you were. Opening a shared link such
// as yoursite.com/#projects still goes straight to that section.
history.scrollRestoration = 'manual'
const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
if (navigation?.type === 'reload') {
  if (location.hash) history.replaceState(null, '', location.pathname + location.search)
  window.scrollTo(0, 0)
} else if (location.hash) {
  // The sections only exist once React has drawn the page, so jump to the linked one then.
  const id = decodeURIComponent(location.hash.slice(1))
  let tries = 0
  const jump = () => {
    const target = document.getElementById(id)
    if (target) target.scrollIntoView({ behavior: 'instant' })
    else if (++tries < 60) requestAnimationFrame(jump)
  }
  requestAnimationFrame(jump)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
