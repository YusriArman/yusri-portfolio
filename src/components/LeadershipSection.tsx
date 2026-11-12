import { leadershipGallery } from '../content/galleries'
import { leadership } from '../content/leadership'
import { site } from '../content/site'
import type { Role } from '../content/types'
import { PhotoSlot, SlotBadge, usePhotoPlanning } from '../dev/photoPlanning'
import { ChapterBackdrop } from '../motion/ChapterBackdrop'
import { Reveal } from '../motion/Reveal'
import { ChapterHeading } from './ChapterHeading'
import { Gallery } from './Gallery'
import { imageStyle } from './imageStyle'
import './LeadershipSection.css'

function RoleItem({ role }: { role: Role }) {
  return (
    <li className="role">
      <div className="role__head">
        <h4 className="role__title">{role.title}</h4>
        <p className="role__period">{role.period}</p>
      </div>
      <ul className="dash-list role__contributions">
        {role.contributions.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {role.link && (
        <a className="text-link" href={role.link.href}>
          {role.link.label}
        </a>
      )}
    </li>
  )
}

export function LeadershipSection() {
  const planning = usePhotoPlanning()
  const chapter = site.chapters.leadership
  const featured = leadership.flatMap((org) => org.roles.filter((r) => r.featured).map((role) => ({ org, role })))[0]
  const groups = leadership
    .map((org) => ({ name: org.name, roles: org.roles.filter((r) => !r.featured) }))
    .filter((org) => org.roles.length > 0)

  return (
    <section className="section section--accent chapter chapter--panel" id="leadership" aria-labelledby="leadership-title">
      <ChapterBackdrop />
      <div className="container">
        <ChapterHeading number={chapter.number} label={chapter.label} title={chapter.title} intro={chapter.intro} id="leadership-title" />

        {featured && (
          <article className={`surface featured-role${featured.role.photo || planning ? ' featured-role--photo' : ''}`}>
            {featured.role.photo ? (
              <Reveal radius={20}>
                <figure className="media featured-role__photo">
                  <img src={featured.role.photo.src} alt={featured.role.photo.alt} loading="lazy" style={imageStyle(featured.role.photo)} />
                  {planning && <SlotBadge kind="leadership" />}
                </figure>
              </Reveal>
            ) : (
              planning && (
                <Reveal radius={20}>
                  <PhotoSlot kind="leadership" folder="leadership/president" className="featured-role__photo" />
                </Reveal>
              )
            )}
            <div className="featured-role__body">
              <div className="featured-role__meta">
                <p className="featured-role__org">{featured.org.name}</p>
                <p className="featured-role__period">{featured.role.period}</p>
              </div>
              <h3 className="featured-role__title">{featured.role.title}</h3>
              <ul className="dash-list featured-role__contributions">
                {featured.role.contributions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>
        )}

        <div className="org-grid">
          {groups.map((org) => (
            <section className="surface org" key={org.name} aria-labelledby={`org-${org.name.replace(/\W+/g, '-')}`}>
              <h3 className="org__name" id={`org-${org.name.replace(/\W+/g, '-')}`}>
                {org.name}
              </h3>
              <ul className="org__roles">
                {org.roles.map((role) => (
                  <RoleItem key={role.title} role={role} />
                ))}
              </ul>
            </section>
          ))}
        </div>

        {(leadershipGallery.length > 0 || planning) && (
          <div className="leadership__gallery">
            <Gallery
              items={leadershipGallery}
              label={chapter.galleryLabel}
              title="leadership and community roles"
              slot={{ kind: 'leadershipGallery', folder: 'leadership-gallery', count: 5 }}
            />
          </div>
        )}
      </div>
    </section>
  )
}
