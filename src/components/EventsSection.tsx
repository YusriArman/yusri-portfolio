import { events } from '../content/events'
import { site } from '../content/site'
import type { Event } from '../content/types'
import { Gallery } from './Gallery'
import { MissingBlock, MissingList } from './Missing'
import './EventsSection.css'

function EventEntry({ event }: { event: Event }) {
  return (
    <article className="event" id={`event-${event.slug}`}>
      <div className="event__feature">
        {event.featuredPhoto ? (
          <figure>
            <div className="media event__photo">
              <img src={event.featuredPhoto.src} alt={event.featuredPhoto.alt} loading="lazy" />
            </div>
            {event.featuredPhoto.caption && <figcaption className="event__caption">{event.featuredPhoto.caption}</figcaption>}
          </figure>
        ) : (
          <MissingBlock what={`featured photograph of ${event.title}`} aspect="16 / 9" className="event__photo" />
        )}
      </div>

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
          <MissingList items={event.missing} />
        </div>
      </div>

      <Gallery items={event.gallery} title={event.title} />
    </article>
  )
}

export function EventsSection() {
  return (
    <section className="section section--dark" id="events" aria-labelledby="events-title">
      <div className="container">
        <div className="section__head">
          <h2 className="section__title" id="events-title">
            {site.sections.events.title}
          </h2>
          <p className="section__intro">{site.sections.events.intro}</p>
        </div>

        <div className="events-list">
          {events.map((event) => (
            <EventEntry key={event.slug} event={event} />
          ))}
        </div>
      </div>
    </section>
  )
}
