"use client";
import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  { id: 1, color: "bg-red-500", text: "Card 1" },
  { id: 2, color: "bg-orange-500", text: "Card 2" },
  { id: 3, color: "bg-blue-500", text: "Card 3" },
  { id: 4, color: "bg-purple-600", text: "Card 4" },
];

export default function StackingCards() {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useLayoutEffect(() => {
    const cardsCount = cardRefs.current.length;
    const cardHeight = 600; // fixed card height in px
    const halfHeight = cardHeight / 2; // 300px, spacing to overlap half

    // Initial setup for stacking effect
    cardRefs.current.forEach((card, i) => {
      const scale = 0.7 + i * 0.1; // scales from 0.7 to 1
      gsap.set(card, {
        scale,
        yPercent: -cardsCount * 2, // slight upward offset to lift stack a bit
        transformOrigin: "center top",
        position: "sticky",
        top: "20px",
        marginTop: i === 0 ? 0 : -halfHeight, // overlap next cards half height negative margin
        zIndex: cardsCount - i,
      });
    });

    // Create timeline for scroll-triggered stacking animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top -300px", // start when top hits 300px above viewport top
        end: `+=${cardsCount * cardHeight}`, // scroll distance for full animation
        scrub: 1,
        pin: true,
        pinSpacing: false,
      },
    });

    // Animate each card scaling up to 1 and moving upward to yPercent 0
    cardRefs.current.forEach((card, i) => {
      tl.to(
        card,
        {
          scale: 1,
          yPercent: 0,
          ease: "power1.out",
        },
        i * 0.3 // stagger animation slightly for smooth effect
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[4000px] bg-gray-100 flex flex-col items-center justify-start"
    >
      {cards.map((card, idx) => (
        <div
          key={card.id}
          ref={(el) => (cardRefs.current[idx] = el)}
          className={`w-[600px] h-[600px] rounded-lg shadow-xl text-white flex items-center justify-center text-3xl font-bold ${card.color}`}
        >
          {card.text}
        </div>
      ))}
    </div>
  );
}
