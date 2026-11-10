import type { Project } from '../content/types'
import { MissingBlock, MissingList } from './Missing'
import './ProjectCard.css'

export function ProjectCard({ project }: { project: Project }) {
  const primary = project.links[0]
  const media = project.image ? (
    <img
      src={project.image.src}
      alt={project.image.alt}
      loading="lazy"
      style={project.image.fit === 'contain' ? { objectFit: 'contain', padding: '12%', background: project.image.background } : undefined}
    />
  ) : (
    <MissingBlock what={`Preview image for ${project.title}`} aspect="4 / 3" className="project__missing" />
  )

  return (
    <article className="project" id={`project-${project.slug}`}>
      {primary && project.image ? (
        <a className="project__media media" href={primary.href} target="_blank" rel="noreferrer" aria-label={`${project.title}: ${primary.label}`}>
          {media}
        </a>
      ) : (
        <div className="project__media media">{media}</div>
      )}

      <div className="project__body">
        <h3 className="project__title">{project.title}</h3>
        <p className="project__context">{project.context}</p>
        <p className="project__summary">{project.summary}</p>

        <ul className="dash-list project__contribution" aria-label="My contribution">
          {project.contribution.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {project.tech.length > 0 && (
          <ul className="pills" aria-label="Technologies">
            {project.tech.map((t) => (
              <li className="pill" key={t}>
                {t}
              </li>
            ))}
          </ul>
        )}

        {project.links.length > 0 && (
          <ul className="project__links">
            {project.links.map((link) => (
              <li key={link.href}>
                <a className="text-link" href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
                {link.note && <span className="project__note"> ({link.note})</span>}
              </li>
            ))}
          </ul>
        )}

        <MissingList items={project.missing} />
      </div>
    </article>
  )
}
