import type { Project } from '../content/types'
import { PhotoSlot, SlotBadge, usePhotoPlanning } from '../dev/photoPlanning'
import { Reveal } from '../motion/Reveal'
import { imageStyle } from './imageStyle'
import './ProjectCard.css'

function Media({ project }: { project: Project }) {
  const planning = usePhotoPlanning()

  if (!project.image) {
    if (planning) {
      return <PhotoSlot kind="project" name={project.title} folder={`projects/${project.slug}`} className="project__slot" />
    }
    // No image yet: a typographic tile so the layout still reads as a project preview.
    return (
      <div className="project__media project__media--text media" aria-hidden="true">
        <span>{project.title}</span>
      </div>
    )
  }

  const content = (
    <>
      <img src={project.image.src} alt={project.image.alt} loading="lazy" style={imageStyle(project.image)} />
      {planning && <SlotBadge kind="project" />}
    </>
  )
  const primary = project.links[0]
  return primary ? (
    <a className="project__media media" href={primary.href} target="_blank" rel="noreferrer" aria-label={`${project.title}: ${primary.label}`}>
      {content}
    </a>
  ) : (
    <div className="project__media media">{content}</div>
  )
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project" id={`project-${project.slug}`}>
      <Reveal>
        <Media project={project} />
      </Reveal>

      <div className="project__body">
        <h3 className="project__title">{project.title}</h3>
        <p className="project__context">{project.context}</p>
        <p className="project__summary">{project.summary}</p>

        {project.problem && (
          <div className="project__block">
            <h4 className="project__subhead">The problem</h4>
            <p>{project.problem}</p>
          </div>
        )}

        <div className="project__block">
          <h4 className="project__subhead">What I did</h4>
          <ul className="dash-list">
            {project.contribution.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        {project.outcome && (
          <div className="project__block">
            <h4 className="project__subhead">Outcome</h4>
            <p>{project.outcome}</p>
          </div>
        )}

        {project.tech.length > 0 && (
          <ul className="pills" aria-label="Technologies">
            {project.tech.map((t) => (
              <li className="pill" key={t}>
                {t}
              </li>
            ))}
          </ul>
        )}

        {project.details && project.details.length > 0 && (
          <details className="disclosure">
            <summary className="disclosure__summary">More technical detail</summary>
            <ul className="dash-list disclosure__body">
              {project.details.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </details>
        )}

        {project.links.length > 0 && (
          <ul className="project__links">
            {project.links.map((link) => (
              <li key={link.href}>
                <a className="text-link" href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}
