import { useEffect, useRef, useState } from 'react'
import { profile } from '../content/profile'
import { site } from '../content/site'
import { RollingLink } from '../motion/RollingLink'
import './Nav.css'

export function Nav() {
  const menu = useRef<HTMLDetailsElement>(null)
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem('portfolio-theme') === 'dark'
    } catch {
      return false
    }
  })

  useEffect(() => {
    const theme = dark ? 'dark' : 'light'

    document.documentElement.dataset.theme = theme

    try {
      localStorage.setItem('portfolio-theme', theme)
    } catch {
      // The toggle still works if browser storage is unavailable.
    }
  }, [dark])

  function closeMenu() {
    if (menu.current) menu.current.open = false
  }

  return (
    <header className="nav container">
      <a className="nav__brand" href="#top">
        {profile.shortName}
      </a>
      <div className="nav__controls">
        <details
          className="nav__menu"
          ref={menu}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              closeMenu()
              menu.current?.querySelector('summary')?.focus()
            }
          }}
          onBlur={(event) => {
            // Close when keyboard focus leaves the whole menu.
            if (!event.currentTarget.contains(event.relatedTarget)) {
              closeMenu()
            }
          }}
        >
          <summary className="nav__capsule">
            <span className="nav__icon" aria-hidden="true">☰</span>
            Menu
          </summary>

          <nav className="nav__panel" aria-label="Primary">
            <p className="nav__label">Explore</p>

            <ul
              className="nav__list"
              onClick={(event) => {
                if ((event.target as Element).closest('a')) {
                  closeMenu()
                }
              }}
            >
              {site.nav.map((item) => (
                <li key={item.href}>
                  <RollingLink
                    className="nav__link"
                    href={item.href}
                    label={item.label}
                  />
                </li>
              ))}
            </ul>
          </nav>
        </details>
        <button
          type="button"
          className="nav__theme"
          aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          onClick={() => setDark((previous) => !previous)}
        >
          <span aria-hidden="true">{dark ? '☀' : '☾'}</span>
        </button>
      </div>


      <a className="nav__contact" href="#contact">
        Let’s talk <span aria-hidden="true">↗</span>
      </a>
    </header>
  )
}