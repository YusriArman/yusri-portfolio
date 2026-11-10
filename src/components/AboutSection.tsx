import { profile } from '../content/profile'
import { site } from '../content/site'
import './AboutSection.css'

export function AboutSection() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container about">
        <div className="about__text">
          <h2 className="section__title" id="about-title">
            {site.sections.about.title}
          </h2>
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
    </section>
  )
}
