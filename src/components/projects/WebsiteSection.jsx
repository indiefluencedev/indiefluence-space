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
    const sections = gsap.utils.toArray(".project-block", container);
    const borders = gsap.utils.toArray(".block-separator", container);

    sections.forEach((section, index) => {
      if (index === sections.length - 1) return;

      // Pin each section
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top+=130", // ends a bit earlier to reveal heading/image of previous
        pin: true,
        pinSpacing: false,
        markers: false,
      });

      // Make sure the border is visible during scroll
      if (borders[index]) {
        // Position the border at the bottom of each section
        gsap.set(borders[index], {
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 30, // Higher than content to ensure visibility
        });

        // Make the border sticky during scroll
        ScrollTrigger.create({
          trigger: section,
          start: "bottom top+=129", // Just before the section unpins
          end: "bottom top", // Until next section reaches top
          pin: borders[index],
          pinSpacing: false,
        });
      }

      // Add margin-top to the next section so this one stays visible partially
      if (sections[index + 1]) {
        gsap.set(sections[index + 1], {
          paddingTop: "-100px", // space for previous heading + partial image
        });
      }
    });

    // Parallax effect: image moves slower than scroll
    sections.forEach((section) => {
      const img = section.querySelector(".project-image");
      if (img) {
        gsap.to(img, {
          y: "-20%",
          scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {projects.map((proj, idx) => (
        <div key={idx} className="project-section relative">
          <ProjectBlock
            title={proj.title}
            description={proj.description}
            image={proj.image}
            link={proj.link}
            isLast={idx === projects.length - 1}
          />
          {idx < projects.length - 1 && (
            <div className="block-separator w-full border-t border-dotted border-black"></div>
          )}
        </div>
      ))}
    </div>
  );
}