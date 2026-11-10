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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
