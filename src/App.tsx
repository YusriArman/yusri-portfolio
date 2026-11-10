import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { ProjectsSection } from './components/ProjectsSection'
import { EventsSection } from './components/EventsSection'
import { profile } from './content/profile'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProjectsSection />
        <EventsSection />
      </main>
      {/* Stage 1 stub so the "Get in touch" button has a target. Replaced by the full Contact section in Stage 2. */}
      <footer className="container" id="contact" style={{ paddingBlock: 'var(--space-8)' }}>
        <a className="text-link" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
      </footer>
    </>
  )
}
