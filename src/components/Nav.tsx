import { profile } from '../content/profile'
import { site } from '../content/site'
import './Nav.css'

export function Nav() {
  return (
    <header className="nav container">
      <a className="nav__brand" href="#top">
        {profile.shortName}
      </a>
      <nav aria-label="Primary">
        <ul className="nav__list">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a className="nav__link" href={item.href}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
