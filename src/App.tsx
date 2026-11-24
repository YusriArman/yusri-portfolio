import { useCallback, useState } from 'react'
import { PhotoLibrary } from './photos/PhotoLibrary'
import { MotionConfig } from 'motion/react'
import { IntroContext } from './motion/IntroContext'
import { SceneSnap } from './motion/SceneSnap'
import { SmoothScroll } from './motion/SmoothScroll'
import { AboutSection } from './components/AboutSection'
import { BootSplash, shouldBoot } from './components/BootSplash'
import { EventsSection } from './components/EventsSection'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { IntroScroll } from './components/IntroScroll'
import { LeadershipSection } from './components/LeadershipSection'
import { Nav } from './components/Nav'
import { ProjectsSection } from './components/ProjectsSection'
import { PhotoPlanningToggle } from './dev/photoPlanning'

// The page reads as a journey: the opening (name and contact), a pinned "Hi, I'm Yusri" intro,
// then five chapters whose labels are stops along the way (see site.ts).
export default function App() {
  // Decided once, on first render: is the boot screen showing this visit?
  const [booting, setBooting] = useState(shouldBoot)
  // The opening animates once the boot screen starts to lift (straight away if there is none).
  const [ready, setReady] = useState(!booting)
  const lift = useCallback(() => setReady(true), [])
  const done = useCallback(() => {
    setReady(true)
    setBooting(false)
  }, [])

  return (
    // reducedMotion="user": people who ask their device for less motion get fades instead of movement.
    <MotionConfig reducedMotion="user">
      <IntroContext.Provider value={ready}>
        <SmoothScroll>
          <PhotoLibrary>
            <Nav />
            <main>
              <Hero />
              <IntroScroll />
              <AboutSection />
              <ProjectsSection />
              <LeadershipSection />
              <EventsSection />
            </main>
            <Footer />
            <PhotoPlanningToggle />
            <SceneSnap />
          </PhotoLibrary>
        </SmoothScroll>
        {booting && <BootSplash onLift={lift} onDone={done} />}
      </IntroContext.Provider>
    </MotionConfig>
  )
}
