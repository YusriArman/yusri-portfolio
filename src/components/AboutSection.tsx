import { introGallery } from '../content/galleries'
import { profile } from '../content/profile'
import { site } from '../content/site'
import { SlotBadge, usePhotoPlanning } from '../dev/photoPlanning'
import { Reveal } from '../motion/Reveal'
import { ChapterHeading } from './ChapterHeading'
import { Gallery } from './Gallery'
import './AboutSection.css'

/** Chapter 02: portrait, a short personal introduction, education and skills, then a few photographs. */
export function AboutSection() {
  const planning = usePhotoPlanning()
  const chapter = site.chapters.about
  const showGallery = introGallery.length > 0 || planning

  return (
    <section className="section section--plain" id="about" aria-labelledby="about-title">
      <div className="container">
        <ChapterHeading number={chapter.number} label={chapter.label} title={chapter.title} id="about-title" />

        <div className="about">
          <Reveal className="about__portrait-wrap">
            <figure className="about__portrait media">
              <img
                src={profile.portrait.src}
                alt={profile.portrait.alt}
                width={759}
                height={1065}
                loading="lazy"
                style={profile.portrait.position ? { objectPosition: profile.portrait.position } : undefined}
              />
              {planning && <SlotBadge kind="portrait" />}
            </figure>
          </Reveal>

          <div className="about__body">
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
        </div>

        {showGallery && (
          <div className="about__gallery">
            <Gallery
              items={introGallery}
              label={chapter.galleryLabel}
              title="the introduction"
              size="compact"
              slot={{ kind: 'introGallery', folder: 'introduction-gallery', count: 5 }}
            />
          </div>
        )}
      </div>
    </section>
  )
}
