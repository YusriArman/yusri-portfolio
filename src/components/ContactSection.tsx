import { profile } from '../content/profile'
import { site } from '../content/site'
import './ContactSection.css'

export function ContactSection() {
  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <h2 className="contact__title" id="contact-title">
          {site.sections.contact.title}
        </h2>
        <p className="contact__intro">{site.sections.contact.intro}</p>
        <a className="contact__email" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <ul className="contact__links">
          {profile.links.map((link) => (
            <li key={link.href}>
              <a className="text-link" href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            </li>
          ))}
          {profile.resume && (
            <li>
              <a className="text-link" href={profile.resume} target="_blank" rel="noreferrer">
                Résumé (PDF)
              </a>
            </li>
          )}
        </ul>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__row">
        <p>{profile.fullName}</p>
        <a className="text-link" href="#top">
          Back to top
        </a>
      </div>
    </footer>
  )
}
