// Shared motion settings. Change a value here and every animation follows.

/** The easing used across the site: a fast, decisive start and a long, soft landing. */
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

/** Durations in seconds. */
export const DURATION = {
  quick: 0.3,
  base: 0.8,
  slow: 1.15,
}

/** Entrances play once, when a quarter of the element is in view. */
export const IN_VIEW_ONCE = { once: true, amount: 0.25 } as const
