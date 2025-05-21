// components/CreativeSection.jsx
"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { creative } from "../../data/creative"; // adjust the path if needed

gsap.registerPlugin(ScrollTrigger);

const CreativeSection = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const imageTrackRefs = useRef([]);
  const currentImageIndex = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Carousel setup for each card
      creative.forEach((_, i) => {
        currentImageIndex.current[i] = 1;
        if (imageTrackRefs.current[i]) {
          gsap.set(imageTrackRefs.current[i], { xPercent: -100 });
        }
      });

      const totalCards = creative.length;

      gsap.to(trackRef.current, {
        xPercent: -100 * (totalCards - 3), // adjust for how many cards are visible
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalCards * 100}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          snap: 1 / (totalCards - 1),
        },
      });
    }, containerRef);

    return () => ctx.revert();
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
    <section ref={containerRef} className="relative w-full h-[500px] overflow-hidden">
      <div
        ref={trackRef}
        className="flex flex-row h-full items-center"
      >
        {creative.map((card, i) => (
          <div
            key={card.id}
            ref={(el) => (cardRefs.current[i] = el)}
            className="flex-shrink-0 w-full md:w-1/3 px-4"
          >
            <div className="bg-gray-800 rounded-xl overflow-hidden relative group h-[500px]">
  {/* Outer container to clip overflow */}
  <div className="overflow-hidden w-full h-full">
    {/* Sliding track with full width for each image */}
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
            className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-500 overflow-hidden"
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