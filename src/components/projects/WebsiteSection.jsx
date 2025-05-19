// app/components/WebsiteSection.jsx
"use client";
import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectBlock from "./ProjectBlock";

export default function WebsiteSection({ projects }) {
  const containerRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useLayoutEffect(() => {
    const container = containerRef.current;
    // Define the sections (project blocks)
    const sections = gsap.utils.toArray(".project-block", container);

    // Pin each section until the next one comes in to create stacking overlap
    sections.forEach((section, index) => {
      if (index === sections.length - 1) return; // Skip pinning the last block
      ScrollTrigger.create({
        trigger: section,
        start: "top top",         // when this block's top hits top of viewport
        end: "bottom top",        // when this block's bottom hits top of viewport
        pin: true,
        pinSpacing: false        // allow next section to overlap without extra space
      });
    });

    // Parallax effect: image moves slower than scroll, previous image stays partly visible
    sections.forEach((section) => {
      const img = section.querySelector(".project-image");
      if (img) {
        gsap.to(img, {
          y: "-20%",  // move image upward slowly (20% of its height) 
          scrollTrigger: {
            trigger: section,
            start: "top center",    // start parallax when section enters center
            end: "bottom top",      // end when section leaves top
            scrub: true             // smooth continuous animation tied to scroll
          }
        });
      }
    });

    // Clean up ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trig => trig.kill());
    };
  }, []);  // empty dependency ensures this runs once on mount

  return (
    <div ref={containerRef} className="relative w-full">
      {projects.map((proj, idx) => (
        <ProjectBlock 
          key={idx} 
          title={proj.title} 
          description={proj.description} 
          image={proj.image} 
          link={proj.link}
          // You might pass index if needed for animation offsets
        />
      ))}
    </div>
  );
}
