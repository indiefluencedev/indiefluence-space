"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { creative } from "../../data/creative";

gsap.registerPlugin(ScrollTrigger);

const CreativeSection = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const imageTrackRefs = useRef([]);
  const currentImageIndex = useRef([]);
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    // Initialize carousel state
    creative.forEach((_, i) => {
      currentImageIndex.current[i] = 1;
      if (imageTrackRefs.current[i]) {
        gsap.set(imageTrackRefs.current[i], { xPercent: -100 });
      }
    });

    // Calculate dynamic height based on viewport
    const setDynamicHeight = () => {
      const viewportHeight = window.innerHeight;
      const minHeight = 600;
      const idealHeight = Math.max(minHeight, viewportHeight * 0.85);
      section.style.height = `${idealHeight}px`;
    };

    setDynamicHeight();

    // Calculate the total scroll distance with proper padding
    const getScrollDistance = () => {
      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      // Responsive padding: more for mobile, less for desktop
      const extraPadding = viewportWidth < 768 ? viewportWidth * 0 : viewportWidth * 0.1;
      return trackWidth - viewportWidth + extraPadding;
    };

    // Create smooth horizontal scroll animation with delays
    const scrollDistance = getScrollDistance();
    const scrollMultiplier = 1.2; // Slightly increase for better pacing
    const delayAmount = 1000; // 1 second delay in pixels equivalent

    const scrollTween = gsap.to(track, {
      x: () => -scrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${scrollDistance * scrollMultiplier + delayAmount * 2}`, // Add delay space at both ends
        pin: true,
        scrub: 2,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const totalDistance = scrollDistance;
          const delayRatio = delayAmount / (scrollDistance * scrollMultiplier + delayAmount * 2);
          
          let adjustedProgress;
          
          if (progress <= delayRatio) {
            // First delay period - stay at start
            adjustedProgress = 0;
          } else if (progress >= (1 - delayRatio)) {
            // Last delay period - stay at end
            adjustedProgress = 1;
          } else {
            // Normal scrolling with adjusted progress
            adjustedProgress = (progress - delayRatio) / (1 - 2 * delayRatio);
          }
          
          gsap.set(track, { x: -totalDistance * adjustedProgress });
        },
      },
    });

    // Animate individual cards as they come into view
    cardRefs.current.forEach((el, index) => {
      if (!el) return;

      gsap.fromTo(
        el,
        { x: -50, opacity: 0.7 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: el,
            containerAnimation: scrollTween,
            start: "left right",
            end: "left center",
            scrub: true,
          },
        },
      );

      const heading = el.querySelector("h3");
      const description = el.querySelector("p");

      if (heading) {
        gsap.fromTo(
          heading,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: el,
              containerAnimation: scrollTween,
              start: "left right+=100",
              end: "left center",
              scrub: true,
            },
          },
        );
      }

      if (description) {
        gsap.fromTo(
          description,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: el,
              containerAnimation: scrollTween,
              start: "left right+=100",
              end: "left center",
              scrub: true,
            },
          },
        );
      }
    });

    // Handle resize events
    const handleResize = () => {
      setDynamicHeight();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const showNextImage = (i) => {
    const track = imageTrackRefs.current[i];
    const total = creative[i].posts.length;
    let newIndex = currentImageIndex.current[i] + 1;
    gsap.to(track, {
      xPercent: -100 * newIndex,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        if (newIndex === total + 1) {
          gsap.set(track, { xPercent: -100 });
          newIndex = 1;
        }
        currentImageIndex.current[i] = newIndex;
      },
    });
  };

  const showPrevImage = (i) => {
    const track = imageTrackRefs.current[i];
    const total = creative[i].posts.length;
    let newIndex = currentImageIndex.current[i] - 1;
    gsap.to(track, {
      xPercent: -100 * newIndex,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        if (newIndex === 0) {
          gsap.set(track, { xPercent: -100 * total });
          newIndex = total;
        }
        currentImageIndex.current[i] = newIndex;
      },
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-10 3xl:pb-20 flex items-center justify-center min-h-screen"
    >
      <div
        ref={trackRef}
        className="flex flex-row items-center"
        style={{ 
          height: "100%", 
          minHeight: "500px", 
          willChange: "transform",
          paddingRight: isMobile ? "12vw" : "10vw" // More padding for mobile
        }}
      >
        {creative.map((card, i) => (
          <div
            key={card.id}
            ref={(el) => (cardRefs.current[i] = el)}
            className="flex-shrink-0 w-[100%] md:w-1/2 lg:w-1/3 px-[10px]"
          >
            <div className="bg-gray-800 rounded-xl overflow-hidden relative group h-[500px] lg:h-[450px] xl:h-[550px] 3xl:h-[800px]">
              {/* Image Carousel */}
              <div className="overflow-hidden w-full h-full">
                <div
                  ref={(el) => (imageTrackRefs.current[i] = el)}
                  className="flex h-full"
                  style={{ width: '100%', height: '100%' }}
                >
                  {[card.posts[card.posts.length - 1], ...card.posts, card.posts[0]].map((img, j) => (
                    <div
                      key={j}
                      className="w-full h-full shrink-0 overflow-hidden"
                      style={{ flex: '0 0 100%' }}
                    >
                      <img
                        src={img.postImage}
                        alt=""
                        className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-500"
                        draggable="false"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() => showPrevImage(i)}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-7xl text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                &#8249;
              </button>
              <button
                onClick={() => showNextImage(i)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-7xl text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                &#8250;
              </button>

              {/* Description */}
              <div className="p-4 bg-opacity-50 absolute bottom-0 left-0 w-full text-white">
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-sm leading-snug">{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CreativeSection;