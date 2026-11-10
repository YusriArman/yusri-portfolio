import { leadership } from '../content/leadership'
import { site } from '../content/site'
import type { Role } from '../content/types'
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
  const featured = leadership.flatMap((org) => org.roles.filter((r) => r.featured).map((role) => ({ org, role })))[0]
  const groups = leadership
    .map((org) => ({ name: org.name, roles: org.roles.filter((r) => !r.featured) }))
    .filter((org) => org.roles.length > 0)

  return (
    <section className="section" id="leadership" aria-labelledby="leadership-title">
      <div className="container">
        <div className="section__head">
          <h2 className="section__title" id="leadership-title">
            {site.sections.leadership.title}
          </h2>
          <p className="section__intro">{site.sections.leadership.intro}</p>
        </div>

        {featured && (
          <article className="surface featured-role">
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
      </div>
    </section>
  )
}
