// Shared motion settings. Change a value here and every animation follows.

/** The easing used across the site: quick start, soft landing. */
export const EASE_OUT: [number, number, number, number] = [0.2, 0.8, 0.2, 1]

/** Durations in seconds. */
export const DURATION = {
  quick: 0.25,
  base: 0.6,
  slow: 0.9,
}

/** Entrances play once, when a quarter of the element is in view. */
export const IN_VIEW_ONCE = { once: true, amount: 0.25 } as const
