"use client"
import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

export const Card = ({ card, index }) => {
  return (
    <motion.div
      className="flex-shrink-0  w-[280px] md:w-[350px] h-[500px] relative rounded-xl overflow-hidden mx-2 cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={() => window.open(card.redirectUrl, "_blank")}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-80 z-10" />
      <div className="absolute bottom-0 left-0 p-4 z-20 text-white">
        <p className="text-sm font-medium opacity-80">{card.category}</p>
        <h3 className="text-xl font-bold mt-1">{card.title}</h3>
      </div>
      <img
        src={card.src || "/placeholder.svg"}
        alt={card.title}
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback for broken images
          e.target.src = "/placeholder.svg?height=500&width=350"
        }}
      />
    </motion.div>
  )
}

export const Carousel = ({ items }) => {
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const [isPinned, setIsPinned] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [sectionHeight, setSectionHeight] = useState(0)
  const [hasStartedScrolling, setHasStartedScrolling] = useState(false)

  useEffect(() => {
    // Calculate the total height needed for the scroll container
    if (containerRef.current) {
      const containerWidth = containerRef.current.scrollWidth
      const viewportWidth = containerRef.current.offsetWidth
      const extraScrollDistance = Math.max(containerWidth - viewportWidth, 0)

      // Set the section height to be enough for complete horizontal scroll
      // Add extra height to ensure the section stays pinned until horizontal scroll is complete
      setSectionHeight(window.innerHeight * 2 + extraScrollDistance)
    }
  }, [items])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Pin the section when it comes into view
        if (entry.isIntersecting) {
          setIsPinned(true)
        }
      },
      { threshold: [0.1] },
    )

    observer.observe(section)

    const handleScroll = () => {
      if (!section || !containerRef.current) return

      const rect = section.getBoundingClientRect()

      // Check if section is in viewport and should be pinned
      if (rect.top <= 0 && rect.bottom > window.innerHeight) {
        setIsPinned(true)
        setHasStartedScrolling(true)

        // Calculate how far we've scrolled into the section
        const scrolledDistance = Math.abs(rect.top)

        // Calculate the total scrollable width of the carousel
        const containerWidth = containerRef.current.scrollWidth
        const viewportWidth = containerRef.current.offsetWidth
        const maxHorizontalScroll = Math.max(containerWidth - viewportWidth, 0)

        // Calculate the scroll range for horizontal movement
        const horizontalScrollRange = window.innerHeight + maxHorizontalScroll

        // Map vertical scroll position to horizontal scroll
        const horizontalScrollPosition = Math.min(
          Math.max((scrolledDistance / horizontalScrollRange) * maxHorizontalScroll, 0),
          maxHorizontalScroll,
        )

        // Update scroll progress (0 to 1)
        setScrollProgress(maxHorizontalScroll > 0 ? horizontalScrollPosition / maxHorizontalScroll : 0)

        // Apply the horizontal scroll
        containerRef.current.scrollLeft = horizontalScrollPosition

        // Only unpin when we've completed the horizontal scroll AND scrolled past the section
        if (horizontalScrollPosition >= maxHorizontalScroll && scrolledDistance > horizontalScrollRange) {
          setIsPinned(false)
        }
      } else if (rect.bottom <= 0 && hasStartedScrolling) {
        // Section has completely passed, unpin it
        setIsPinned(false)
      } else if (rect.top > 0) {
        // Section hasn't reached the top yet
        setIsPinned(false)
        setHasStartedScrolling(false)
        setScrollProgress(0)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [hasStartedScrolling])

  return (
    <div ref={sectionRef} className="relative w-full" style={{ height: `${sectionHeight}px` }}>
      <div className={`w-full ${isPinned ? "fixed top-0 left-0 right-0" : ""}`} style={{ zIndex: 10 }}>
        {/* Add padding equivalent to one card width on each side */}
        <div
          ref={containerRef}
          className="flex overflow-x-hidden py-16 w-full 3xl:w-7xl mx-auto"
          style={{
            paddingLeft: "280px", // Space for invisible card on the left
            paddingRight: "350px", // Space for invisible card on the right
          }}
        >
          {items}
        </div>

        {/* Progress indicator */}
        {/* <div className="max-w-7xl mx-auto px-4 mb-4">
          <div className="w-full h-1 bg-gray-200 rounded-full">
            <div
              className="h-full bg-black rounded-full transition-all duration-100"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div> */}
      </div>
    </div>
  )
}
