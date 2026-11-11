import { events } from '../content/events'
import { site } from '../content/site'
import type { Event } from '../content/types'
import { PhotoSlot, SlotBadge, usePhotoPlanning } from '../dev/photoPlanning'
import { ScrollExpand } from '../motion/ScrollExpand'
import { ChapterHeading } from './ChapterHeading'
import { Gallery } from './Gallery'
import { imageStyle } from './imageStyle'
import './EventsSection.css'

function EventEntry({ event }: { event: Event }) {
  const planning = usePhotoPlanning()
  return (
    <article className="event" id={`event-${event.slug}`}>
      {event.featuredPhoto ? (
        <figure className="event__feature">
          <ScrollExpand>
            <div className="media event__photo">
              <img src={event.featuredPhoto.src} alt={event.featuredPhoto.alt} loading="lazy" style={imageStyle(event.featuredPhoto)} />
              {planning && <SlotBadge kind="eventFeatured" />}
            </div>
          </ScrollExpand>
          {event.featuredPhoto.caption && <figcaption className="event__caption">{event.featuredPhoto.caption}</figcaption>}
        </figure>
      ) : (
        planning && (
          <ScrollExpand>
            <PhotoSlot kind="eventFeatured" folder={`events/${event.slug}/featured`} className="event__photo" />
          </ScrollExpand>
        )
      )}

      <div className="event__grid">
        <div className="event__meta">
          <h3 className="event__title">{event.title}</h3>
          <p className="event__role">
            {event.role}, {event.organisation}
          </p>
          <p className="event__period">{event.period}</p>
          <p className="event__summary">{event.summary}</p>
        </div>

        <div className="event__detail">
          <h4 className="event__subhead">What I did</h4>
          <ul className="dash-list">
            {event.contributions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h4 className="event__subhead">Outcomes</h4>
          <ul className="dash-list">
            {event.outcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {event.link && (
            <a className="text-link event__link" href={event.link.href}>
              {event.link.label}
            </a>
          )}
        </div>
      </div>

      <Gallery
        items={event.gallery}
        label={site.chapters.events.galleryLabel}
        title={event.title}
        slot={{ kind: 'eventGallery', folder: `events/${event.slug}/gallery`, count: 4 }}
      />
    </article>
  )
}

export function EventsSection() {
  const chapter = site.chapters.events
  return (
    <section className="section section--dark chapter" id="events" aria-labelledby="events-title">
      <div className="container">
        <ChapterHeading number={chapter.number} label={chapter.label} title={chapter.title} intro={chapter.intro} id="events-title" />

        <div className="events-list">
          {events.map((event) => (
            <EventEntry key={event.slug} event={event} />
          ))}
        </div>
      </div>
    </section>
  )
}
