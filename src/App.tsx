import { MotionConfig } from 'motion/react'
import { ClosingSection, Footer } from './components/ClosingSection'
import { EventsSection } from './components/EventsSection'
import { Hero } from './components/Hero'
import { LeadershipSection } from './components/LeadershipSection'
import { Nav } from './components/Nav'
import { ProjectsSection } from './components/ProjectsSection'
import { PhotoPlanningToggle } from './dev/photoPlanning'

// The page reads as five chapters:
// 01 Meet me, 02 What I build, 03 How I lead, 04 What I deliver, 05 Let's talk.
export default function App() {
  return (
    // reducedMotion="user": people who ask their device for less motion get fades instead of movement.
    <MotionConfig reducedMotion="user">
      <Nav />
      <main>
        <Hero />
        <ProjectsSection />
        <LeadershipSection />
        <EventsSection />
        <ClosingSection />
      </main>
      <Footer />
      <PhotoPlanningToggle />
    </MotionConfig>
  )
}
