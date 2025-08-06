/* ────────────────────────────────────────────────────────────── */
/*  Mute-box cards carousel ► slower scroll + full card exposure  */
/* ────────────────────────────────────────────────────────────── */
"use client";

import React, {
  useRef,
  useLayoutEffect,
  useEffect,
  useState,
  createContext,
} from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export const CarouselContext = createContext({ currentIndex: 0 });

export const Carousel = ({ items, initialScroll = 0 }) => {
  const sectionRef  = useRef(null);
  const trackRef    = useRef(null);
  const [currentIndex] = useState(0);

  useLayoutEffect(() => {
    /* kill only previous triggers that belonged to this carousel */
    ScrollTrigger.getAll().forEach(t => t.vars.id === "mutebox-carousel" && t.kill());

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const track   = trackRef.current;
      if (!section || !track) return;

      /* ── constants you can tweak ─────────────────────────── */
      const EXTRA_RIGHT         = 40;   // px so last card clears the gutter
      const SCROLL_SPEED_FACTOR = 1.4;  // >1  = slower horiz. motion

      // Much shorter delays for better UX (reduced from 0.3 & 0.2)
      const FIRST_CARD_DELAY    = 0.08; // ~8% of scroll for first card visibility
      const LAST_CARD_PAUSE     = 0.06; // ~6% of scroll for last card pause
      /* ─────────────────────────────────────────────────────── */

      /* reset any stale inline styles */
      gsap.set(track,   { x: 0 });
      gsap.set(section, { clearProps: "height" });

      /* dynamic height - FIXED for 768px and 1024px viewports */
      const setDynamicHeight = () => {
        const w = window.innerWidth;
        const cardHeight = Math.min(window.innerHeight * 0.8, 640); // 80vh or 40rem max
        const topMargin = w >= 768 ? 80 : 40; // md:mt-20 vs mt-10
        const minHeight = cardHeight + topMargin + 60; // extra padding for safety

        let h;
        if      (w <  640) h = Math.max(680, minHeight);
        else if (w <  768) h = Math.max(720, minHeight);  // ← Increased from 500 to 720
        else if (w < 1024) h = Math.max(700, minHeight);  // ← Increased from 400 to 700
        else if (w < 1280) h = Math.max(700, minHeight);
        else if (w < 1536) h = Math.max(740, minHeight);
        else               h = Math.max(780, minHeight);

        section.style.height = `${h}px`;
      };
      setDynamicHeight();

      /* ── distances with delays ────────────────────────────── */
      const scrollDistanceX = track.scrollWidth - window.innerWidth + EXTRA_RIGHT;
      const baseEndDistance = scrollDistanceX * SCROLL_SPEED_FACTOR;

      // Add extra distance for first card delay and last card pause
      const firstCardDelayDistance = baseEndDistance * FIRST_CARD_DELAY;
      const lastCardPauseDistance = baseEndDistance * LAST_CARD_PAUSE;
      const endDistanceY = baseEndDistance + firstCardDelayDistance + lastCardPauseDistance;

      /* ── main tween with keyframes for delays ─────────────── */
      const timeline = gsap.timeline({
        scrollTrigger: {
          id: "mutebox-carousel",
          trigger: section,
          start: "top top",
          end: () => `+=${endDistanceY}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Phase 1: Very short delay before first card starts moving
      timeline.to(track, {
        x: 0,
        duration: FIRST_CARD_DELAY,
        ease: "none"
      });

      // Phase 2: Main scrolling animation
      timeline.to(track, {
        x: () => -scrollDistanceX,
        duration: 1 - FIRST_CARD_DELAY - LAST_CARD_PAUSE,
        ease: "none"
      });

      // Phase 3: Short pause when last card is fully visible
      timeline.to(track, {
        x: () => -scrollDistanceX,
        duration: LAST_CARD_PAUSE,
        ease: "none"
      });

      /* keep everything responsive */
      const onResize = () => {
        setDynamicHeight();
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", onResize);

      return () => window.removeEventListener("resize", onResize);
    }, sectionRef);

    return () => ctx.revert();
  }, [items, initialScroll]);

  /* final clean-up */
  useEffect(() => {
    return () => ScrollTrigger.getAll().forEach(t => t.vars.id === "mutebox-carousel" && t.kill());
  }, []);

  /* ── JSX ─────────────────────────────────────────────────── */
  return (
    <CarouselContext.Provider value={{ currentIndex }}>
      <section ref={sectionRef} className="w-full overflow-hidden relative">
        <div
          ref={trackRef}
          className={cn(
            "absolute top-0 left-0 h-full flex will-change-transform gap-4",
            "pl-3 md:pl-4 xl:pl-[100px] 2xl:pl-[130px] 3xl:pl-[350px] 4xl:pl-[650px]",
            "md:mt-20 mt-10"
          )}
        >
          {items.map((item, idx) => (
            <motion.div
              key={`card-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: 0.2 * idx, ease: "easeOut" },
              }}
              className="rounded-3xl last:pr-3 md:last:pr-4 xl:last:pr-[10%]"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </section>
    </CarouselContext.Provider>
  );
};

/*  ▶︎  Card component remains unchanged  */
export const Card = ({ card }) => {
  const [mediaError, setMediaError] = useState(false);
  const isGif = card.src?.toLowerCase().endsWith(".gif");
  const isVideo = card.src &&
    (card.src.toLowerCase().endsWith(".mp4") || card.src.toLowerCase().includes("giphy.gif"));

  const onError = () => setMediaError(true);
  const redirect = () => window.open(card.redirectUrl, "_blank");

  return (
    <motion.button
      onClick={redirect}
      className="relative mt-16 md:mt-0 z-10 flex w-80 md:w-96 h-[60vh] md:h-[80vh] max-h-[40rem] flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 dark:bg-neutral-900 cursor-pointer transition-transform hover:scale-[1.02]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" />
      <div className="relative z-40 p-8">
        <motion.p className="text-left font-sans text-sm font-medium text-white md:text-base">
          {card.category}
        </motion.p>
        <motion.p className="mt-2 max-w-xs text-left font-sans text-xl font-semibold [text-wrap:balance] text-white md:text-3xl">
          {card.title}
        </motion.p>
      </div>
      <div className="absolute inset-0 z-10">
        {isVideo && !mediaError ? (
          <video
            autoPlay loop muted playsInline
            className="h-full w-full object-cover"
            onError={onError}
          >
            <source src={card.src} type="video/mp4" />
          </video>
        ) : isGif && !mediaError ? (
          <img
            src={card.src}
            alt={card.title}
            className="h-full w-full object-cover"
            onError={onError}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-800">
            <p className="text-sm text-gray-500">{card.title}</p>
          </div>
        )}
      </div>
    </motion.button>
  );
};
