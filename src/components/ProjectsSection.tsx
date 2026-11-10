import { projects } from '../content/projects'
import { site } from '../content/site'
import { ProjectCard } from './ProjectCard'
import './ProjectsSection.css'

export function ProjectsSection() {
  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <div className="section__head">
          <h2 className="section__title" id="projects-title">
            {site.sections.projects.title}
          </h2>
          <p className="section__intro">{site.sections.projects.intro}</p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
