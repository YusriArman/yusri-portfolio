import { projects } from '../content/projects'
import { site } from '../content/site'
import { ChapterBackdrop } from '../motion/ChapterBackdrop'
import { ChapterHeading } from './ChapterHeading'
import { ProjectCard } from './ProjectCard'
import './ProjectsSection.css'

export function ProjectsSection() {
  const chapter = site.chapters.projects
  return (
    <section className="section section--light chapter chapter--panel" id="projects" aria-labelledby="projects-title">
      <ChapterBackdrop />
      <div className="container">
        <ChapterHeading number={chapter.number} label={chapter.label} title={chapter.title} intro={chapter.intro} id="projects-title" />

        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
