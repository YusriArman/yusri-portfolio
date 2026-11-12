import { useEffect, useState } from 'react'
import { useMotionValueEvent, useScroll } from 'motion/react'

export function ScrollProgress() {
    const [percent, setPercent] = useState(0)
    const { scrollYProgress } = useScroll()

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        setPercent(Math.round(value * 100))
    })

    useEffect(() => {
        setPercent(Math.round(scrollYProgress.get() * 100))
    }, [scrollYProgress])

    return (
        <span
            className="nav__progress"
            role="progressbar"
            aria-label="Page scroll position"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
        >
            {percent}%
        </span>
    )
}