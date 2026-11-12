import { profile } from '../content/profile'
import './Footer.css'

/** The end of the page: name, a small contact link and a way back up. */
export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__row">
        <p>{profile.fullName}</p>
        <div className="footer__links">
          <a className="text-link" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <a className="text-link" href="#top">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
