import { profile } from '../content/profile'
import { site } from '../content/site'
import { RollingLink } from '../motion/RollingLink'
import { ChapterHeading } from './ChapterHeading'
import './ClosingSection.css'

/** Chapter 05: a short About, then the contact block that ends the page. */
export function ClosingSection() {
  const chapter = site.chapters.closing
  return (
    <section className="section section--closing chapter" id="about" aria-labelledby="about-title">
      <div className="container">
        <ChapterHeading number={chapter.number} label={chapter.label} title={chapter.aboutTitle} id="about-title" />

        <div className="about">
          <div className="about__text">
            {profile.about.map((para) => (
              <p className="about__para" key={para}>
                {para}
              </p>
            ))}
          </div>

          <div className="about__facts">
            <div className="about__group">
              <h3 className="about__subhead">Education</h3>
              <ul className="about__education">
                {profile.education.map((e) => (
                  <li key={e.title}>
                    <p className="about__edu-title">{e.title}</p>
                    <p className="about__edu-meta">
                      {e.place}, {e.period}
                      {e.note && `. ${e.note}`}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {profile.skills.map((group) => (
              <div className="about__group" key={group.group}>
                <h3 className="about__subhead">{group.group}</h3>
                <ul className="pills">
                  {group.items.map((item) => (
                    <li className="pill" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="contact" id="contact" role="group" aria-labelledby="contact-title">
          <h2 className="contact__title" id="contact-title">
            {chapter.contactTitle}
          </h2>
          <p className="contact__intro">{chapter.contactIntro}</p>
          <a className="contact__email" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <ul className="contact__links">
            {profile.links.map((link) => (
              <li key={link.href}>
                <RollingLink className="roll--underlined" href={link.href} label={link.label} external />
              </li>
            ))}
            {profile.resume && (
              <li>
                <RollingLink className="roll--underlined" href={profile.resume} label="Résumé (PDF)" external />
              </li>
            )}
          </ul>
        </div>
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
