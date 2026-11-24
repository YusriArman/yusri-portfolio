import { createContext, useContext } from 'react'

/**
 * false while the boot screen is covering the page, true once it starts to lift.
 * The opening waits for it, so the name animates as the page is revealed.
 */
export const IntroContext = createContext(true)

export const useIntroReady = () => useContext(IntroContext)
