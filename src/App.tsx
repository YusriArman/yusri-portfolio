import { MotionConfig } from 'motion/react'
import { AboutSection } from './components/AboutSection'
import { EventsSection } from './components/EventsSection'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { LeadershipSection } from './components/LeadershipSection'
import { Nav } from './components/Nav'
import { ProjectsSection } from './components/ProjectsSection'
import { PhotoPlanningToggle } from './dev/photoPlanning'

// The page reads as five chapters:
// 01 Say hello (name and contact), 02 Meet me, 03 What I build, 04 How I lead, 05 What I deliver.
export default function App() {
  return (
    // reducedMotion="user": people who ask their device for less motion get fades instead of movement.
    <MotionConfig reducedMotion="user">
      <Nav />
      <main>
        <Hero />
        <AboutSection />
        <ProjectsSection />
        <LeadershipSection />
        <EventsSection />
      </main>
      <Footer />
      <PhotoPlanningToggle />
    </MotionConfig>
  )
}
