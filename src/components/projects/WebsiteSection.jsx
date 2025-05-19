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

    sections.forEach((section, index) => {
      if (index === sections.length - 1) return;

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top+=100", // ends a bit earlier to reveal heading/image of previous
        pin: true,
        pinSpacing: false,
        markers: false,
      });

      // Add margin-top to the *next* section so this one stays visible partially
      if (sections[index + 1]) {
        gsap.set(sections[index + 1], {
          paddingTop: "50px", // space for previous heading + partial image
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
        <ProjectBlock
          key={idx}
          title={proj.title}
          description={proj.description}
          image={proj.image}
          link={proj.link}
          isLast={idx === projects.length - 1}
        />
      ))}
    </div>
  );
}
