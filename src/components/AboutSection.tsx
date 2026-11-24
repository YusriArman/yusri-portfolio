import { ChapterBackdrop } from '../motion/ChapterBackdrop'
import { usePhotos } from '../photos/PhotoLibrary'
import { introGallery } from '../content/galleries'
import { profile } from '../content/profile'
import { site } from '../content/site'
import { SlotBadge, usePhotoPlanning } from '../dev/photoPlanning'
import { Reveal } from '../motion/Reveal'
import { Bookmark } from './Bookmark'
import { ChapterHeading } from './ChapterHeading'
import { Gallery } from './Gallery'
import { Scene } from './Scene'
import './AboutSection.css'

/** Chapter 02, in two screen-sized scenes: who I am (with education and skills), then photographs. */
export function AboutSection() {
  const photos = usePhotos('introduction-gallery', introGallery)
  const portrait = usePhotos('portrait', [profile.portrait])[0]
  const planning = usePhotoPlanning()
  const chapter = site.chapters.about
  const showGallery = photos.length > 0 || planning

  return (
    <section className="section section--tint chapter chapter--panel chapter--scenes" id="about" aria-labelledby="about-title">
      <ChapterBackdrop />
      <Bookmark />

      {/* Scene 1: who I am, what I studied and what I use, all on one screen. */}
      <Scene className="about-scene about-scene--intro">
        <div className="about">
          {portrait && (
            <Reveal className="about__portrait-wrap">
              <figure className="about__portrait media">
                <img
                  src={portrait.src}
                  alt={portrait.alt}
                  width={profile.portrait.width}
                  height={profile.portrait.height}
                  loading="lazy"
                  style={portrait.position ? { objectPosition: portrait.position } : undefined}
                />
                {planning && <SlotBadge kind="portrait" />}
              </figure>
            </Reveal>
          )}

          <div className="about__body">
            <ChapterHeading number={chapter.number} label={chapter.label} title={chapter.title} id="about-title" />
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
      </Scene>

      {/* Scene 2: the photographs, given a screen of their own. */}
      {showGallery && (
        <Scene className="about-scene about-scene--gallery">
          <div className="about__gallery">
            <Gallery
              items={photos}
              label={chapter.galleryLabel}
              title="the introduction"
              slot={{ kind: 'introGallery', folder: 'introduction-gallery', count: 5 }}
            />
          </div>
        </Scene>
      )}
    </section>
  )
}
