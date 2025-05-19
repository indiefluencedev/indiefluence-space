// app/components/CreativeSection.jsx
"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function MuteBoxSection({ projects }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Fade-in animation for section appearance
    gsap.from(sectionRef.current, { opacity: 0, y: 50, duration: 0.5 });
  }, []);

  return (
     <div>
      <h1 className="text-4xl md:text-5xl mt-10 font-bold text-yellow-500 dark:text-white transition-colors duration-300">
          MuteBoxSection
        </h1>
    </div>
  );
}
