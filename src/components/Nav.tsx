import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { profile } from '../content/profile'
import { site } from '../content/site'
import { RollingLink } from '../motion/RollingLink'
import { EASE_OUT } from '../motion/settings'
import { ScrollProgress } from './Scrollprogress'
import './Nav.css'

export function Nav() {
  const shell = useRef<HTMLDivElement>(null)
  const menuButton = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  const reducedMotion = useReducedMotion()

  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem('portfolio-theme') === 'dark'
    } catch {
      return false
    }
  })

  // Apply and remember the selected theme.
  useEffect(() => {
    const theme = dark ? 'dark' : 'light'
    document.documentElement.dataset.theme = theme

    try {
      localStorage.setItem('portfolio-theme', theme)
    } catch {
      // The toggle still works without browser storage.
    }
  }, [dark])

  // Close on an outside click or Escape.
  useEffect(() => {
    if (!open) return

    function onPointerDown(event: PointerEvent) {
      if (!shell.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <header className="nav container">
      <a className="nav__brand" href="#top">
        {profile.shortName}
      </a>

      <div className="nav__dock">
        <div
          ref={shell}
          className="nav__shell"
          data-open={open}
          onBlur={(event) => {
            // Focus going nowhere (a click on plain text) is not the same as leaving the menu.
            const next = event.relatedTarget

            if (next instanceof Node && !event.currentTarget.contains(next)) {
              setOpen(false)
            }
          }}
        >
          <div className="nav__controls">
            <button
              ref={menuButton}
              type="button"
              className="nav__toggle"
              aria-expanded={open}
              aria-controls="primary-navigation"
              onClick={() => setOpen((previous) => !previous)}
            >
              <span className="nav__menu-icon" aria-hidden="true">
                <span />
                <span />
              </span>

              {open ? 'Close' : 'Menu'}
            </button>

            <button
              type="button"
              className="nav__theme"
              aria-label={
                dark ? 'Switch to light mode' : 'Switch to dark mode'
              }
              onClick={() => setDark((previous) => !previous)}
            >
              <span aria-hidden="true">{dark ? '☀' : '☾'}</span>
            </button>

            <ScrollProgress />
          </div>

          <motion.div
            className="nav__reveal"
            initial={false}
            animate={{
              height: open ? 'auto' : 0,
              opacity: open ? 1 : 0,
            }}
            transition={{
              duration: reducedMotion ? 0 : 0.4,
              ease: EASE_OUT,
            }}
            inert={!open}
            aria-hidden={!open}
          >
            <nav
              id="primary-navigation"
              className="nav__panel"
              aria-label="Primary"
            >
              <p className="nav__label">Explore</p>

              <ul
                className="nav__list"
                onClick={(event) => {
                  if ((event.target as Element).closest('a')) {
                    setOpen(false)
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
          </motion.div>
        </div>
      </div>

      <a className="nav__contact" href="#contact">
        Let’s talk <span aria-hidden="true">↗</span>
      </a>
    </header>
  )
}