import { profile } from '../content/profile'
import { SlotBadge, usePhotoPlanning } from '../dev/photoPlanning'
import './Hero.css'

export function Hero() {
  const planning = usePhotoPlanning()
  return (
    <section className="hero container" id="top" aria-labelledby="hero-name">
      <h1 className="hero__name" id="hero-name" aria-label={profile.fullName}>
        {profile.heroName.map((line, i) => (
          <span className="hero__line" key={line} style={{ '--i': i } as React.CSSProperties}>
            <span className="hero__line-inner" aria-hidden="true">
              {line}
            </span>
          </span>
        ))}
      </h1>

      <div className="hero__row">
        <div className="hero__intro">
          <p className="hero__lede">{profile.intro}</p>
          <p className="hero__looking">
            {profile.lookingFor}
            {profile.availability && ` ${profile.availability}`}
          </p>
          <div className="hero__actions">
            <a className="button" href="#contact">
              Get in touch
            </a>
            <a className="text-link" href="#projects">
              See projects
            </a>
          </div>
        </div>

        <figure className="hero__portrait media">
          <img src={profile.portrait.src} alt={profile.portrait.alt} width={759} height={1065} fetchPriority="high" />
          {planning && <SlotBadge kind="portrait" />}
        </figure>
      </div>
    </section>
  )
}
