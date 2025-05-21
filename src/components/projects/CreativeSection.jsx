"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { creative } from "../../data/creative";

gsap.registerPlugin(ScrollTrigger);

// 👇 Dynamic visible cards helper based on screen width
const visibleCards = () => {
  const width = window.innerWidth;
  if (width >= 1024) return 3;     // Desktop
  if (width >= 768) return 2;      // Tablet
  return 1.2;                      // Mobile
};

const CreativeSection = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const imageTrackRefs = useRef([]);
  const currentImageIndex = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Initialize image tracks
      creative.forEach((_, i) => {
        currentImageIndex.current[i] = 1;
        if (imageTrackRefs.current[i]) {
          gsap.set(imageTrackRefs.current[i], { xPercent: -100 });
        }
      });

      const container = containerRef.current;
      const track = trackRef.current;
      const totalCards = creative.length;

      const resizeHandler = () => {
        const cardsVisible = visibleCards();
        const cardWidth = track.scrollWidth / totalCards;

        ScrollTrigger.getAll().forEach(trigger => trigger.kill());

        gsap.to(track, {
          x: () => {
            const offsetBuffer = window.innerWidth < 768 ? 35 : 0; // Extra space on mobile
            return -(cardWidth * (totalCards - cardsVisible)) - offsetBuffer;
          },
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${track.scrollWidth - container.offsetWidth}`,
            scrub: 1.5,
            pin: track,
            pinSpacing: true,
            anticipatePin: 2,
          },
        });
      };

      resizeHandler();
      window.addEventListener("resize", resizeHandler);

      return () => {
        window.removeEventListener("resize", resizeHandler);
        ctx.revert();
      };
    }, containerRef);
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
      ref={containerRef}
      className="relative w-full overflow-hidden py-10"
    >
      <div
        ref={trackRef}
        className="flex flex-row h-[550px] lg:h-[500px] xl:h-[600px] 3xl:h-[800px] items-center"
      >
        {creative.map((card, i) => (
          <div
            key={card.id}
            ref={(el) => (cardRefs.current[i] = el)}
            className="flex-shrink-0 w-[90%] md:w-1/2 lg:w-1/3 px-[10px]"
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
