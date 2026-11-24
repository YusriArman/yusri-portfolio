import { usePhotos } from '../photos/PhotoLibrary'
import type { Project } from '../content/types'
import { SlotBadge, usePhotoPlanning } from '../dev/photoPlanning'
import { Reveal } from '../motion/Reveal'
import { imageStyle } from './imageStyle'
import './ProjectCard.css'

function Media({ project }: { project: Project }) {
  const photo = usePhotos(`projects/${project.slug}`, project.image ? [project.image] : [])[0]
  const planning = usePhotoPlanning()

  // No picture yet: show nothing rather than an empty tile, so the text starts at the top.
  if (!photo) return null

  const content = (
    <>
      <img src={photo.src} alt={photo.alt} loading="lazy" style={imageStyle(photo)} />
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
  const hasMedia = usePhotos(`projects/${project.slug}`, project.image ? [project.image] : []).length > 0
  return (
    <article className="project" id={`project-${project.slug}`}>
      {hasMedia && (
        <Reveal>
          <Media project={project} />
        </Reveal>
      )}

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
