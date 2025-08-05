"use client";

import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
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
  const [isMobile, setIsMobile] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  /* ---------- non-GSAP: detect mobile ---------- */
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* ---------- GSAP / ScrollTrigger setup ---------- */
  useLayoutEffect(() => {
    // Kill all existing ScrollTrigger instances first
    ScrollTrigger.killAll();

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      // Reset transforms before starting
      gsap.set(track, { x: 0, clearProps: "all" });
      gsap.set(section, { height: "auto", clearProps: "height" });

      // Small delay to ensure DOM is ready
      gsap.delayedCall(0.1, () => {
        // Index bookkeeping + initial position
        creative.forEach((_, i) => {
          currentImageIndex.current[i] = 1;
          if (imageTrackRefs.current[i]) {
            gsap.set(imageTrackRefs.current[i], { xPercent: -100 });
          }
        });

        /* ------------ helpers ------------ */
        const setDynamicHeight = () => {
          const width = window.innerWidth;
          let height;
          if (width < 640) height = 680;
          else if (width < 768) height = 500;
          else if (width < 1024) height = 400;
          else if (width < 1280) height = 700;
          else if (width < 1536) height = 740;
          else height = 780;
          section.style.height = `${height}px`;
        };
        setDynamicHeight();

        /* ------------ horizontal scroll ------------ */
        const baseScrollDistance = track.scrollWidth - window.innerWidth;
        const invisibleCardWidth =
          window.innerWidth < 768
            ? window.innerWidth * 0.8
            : window.innerWidth < 1024
            ? window.innerWidth * 0.4
            : window.innerWidth * 0.2667;
        const gapSize = 16;
        const adjustedScrollDistance = baseScrollDistance + invisibleCardWidth + gapSize;

        gsap.to(track, {
          x: () => -adjustedScrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top+=1",
            end: () => `+=${adjustedScrollDistance}`,
            pin: true,
            scrub: 2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            markers: false,
            id: "creative-horizontal-scroll",
            onToggle: self => {
              if (!self.isActive) {
                gsap.set(track, { x: 0 });
              }
            }
          },
        });

        /* ------------ card fade-in ------------ */
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
                containerAnimation: ScrollTrigger.getById("creative-horizontal-scroll"),
                start: "left right",
                end: "left center",
                scrub: true,
                id: `creative-card-${index}`,
              },
            },
          );
        });

        /* ------------ resize refresh ------------ */
        const handleResize = () => {
          setDynamicHeight();
          ScrollTrigger.refresh();
        };
        window.addEventListener("resize", handleResize);

        setIsInitialized(true);

        /* ------ cleanup for this component only ------ */
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      setIsInitialized(false);
    };
  }, []); // Remove dependencies to avoid re-initialization

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      ScrollTrigger.killAll();
      if (sectionRef.current) {
        gsap.set(sectionRef.current, { clearProps: "all" });
      }
      if (trackRef.current) {
        gsap.set(trackRef.current, { clearProps: "all" });
      }
    };
  }, []);

  /* ---------- helper functions for arrows ---------- */
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
      className="relative w-full overflow-hidden py-10 3xl:pb-20 flex items-center justify-center min-h-[300px] md:min-h-[400px] 3xl:min-h-screen"
    >
      <div
        ref={trackRef}
        className="flex flex-row items-center gap-4"
        style={{
          height: "100%",
          minHeight: "500px",
          willChange: "transform",
          paddingRight: isMobile ? "0vw" : "0vw",
        }}
      >
        {/* Invisible spacer */}
        <div className="flex-shrink-0 w-[5%] md:w-[16.67%] invisible">
          <div className="aspect-square max-w-[800px] w-full mx-auto" />
        </div>

        {creative.map((card, i) => (
          <div
            key={card.id}
            ref={(el) => (cardRefs.current[i] = el)}
            className="flex-shrink-0 w-[90%] md:w-1/2 lg:w-1/3"
          >
            {/* Card */}
            <div className="bg-gray-800 rounded-xl overflow-hidden relative group aspect-square md:max-w-[800px] w-full mx-auto">
              <div className="overflow-hidden w-full h-full">
                <div
                  ref={(el) => (imageTrackRefs.current[i] = el)}
                  className="flex h-full"
                  style={{ width: "100%", height: "100%" }}
                >
                  {[card.posts[card.posts.length - 1], ...card.posts, card.posts[0]].map(
                    (img, j) => (
                      <div
                        key={j}
                        className="w-full h-full shrink-0 overflow-hidden"
                        style={{ flex: "0 0 100%" }}
                      >
                        <img
                          src={img.postImage}
                          alt=""
                          className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-500"
                          draggable="false"
                        />
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Prev / Next */}
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

              {/* Caption */}
              <div className="absolute bottom-0 left-0 w-full bg-black/70 text-white">
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                  <p className="text-sm leading-snug">{card.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Invisible spacer */}
        <div className="flex-shrink-0 w-0 md:w-[6.67%] invisible">
          <div className="aspect-square max-w-[800px] w-full mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default CreativeSection;
