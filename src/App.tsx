import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { ProjectsSection } from './components/ProjectsSection'
import { LeadershipSection } from './components/LeadershipSection'
import { EventsSection } from './components/EventsSection'
import { AboutSection } from './components/AboutSection'
import { ContactSection, Footer } from './components/ContactSection'
import { PhotoPlanningToggle } from './dev/photoPlanning'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProjectsSection />
        <LeadershipSection />
        <EventsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <PhotoPlanningToggle />
    </>
  )
}
