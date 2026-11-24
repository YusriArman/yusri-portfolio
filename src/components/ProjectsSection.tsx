import { projects } from '../content/projects'
import { site } from '../content/site'
import { ChapterBackdrop } from '../motion/ChapterBackdrop'
import { ChapterHeading } from './ChapterHeading'
import { ProjectCard } from './ProjectCard'
import { Scene } from './Scene'
import './ProjectsSection.css'

/**
 * Chapter 03, in screen-sized scenes. The first project shares a screen with the
 * chapter heading, picture on the left and story on the right. The remaining projects
 * sit side by side on the next screen, so text-only ones don't get a sparse screen each.
 */
export function ProjectsSection() {
  const chapter = site.chapters.projects
  const [first, ...rest] = projects
  const heading = (
    <ChapterHeading number={chapter.number} label={chapter.label} title={chapter.title} intro={chapter.intro} id="projects-title" />
  )

  return (
    <section className="section section--light chapter chapter--panel chapter--scenes" id="projects" aria-labelledby="projects-title">
      <ChapterBackdrop />

      {first && (
        <Scene className="projects-scene">
          <ProjectCard project={first} layout="split" lead={heading} />
        </Scene>
      )}

      {rest.length > 0 && (
        <Scene className="projects-scene">
          <div className="projects-pair">
            {rest.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Scene>
      )}
    </section>
  )
}
