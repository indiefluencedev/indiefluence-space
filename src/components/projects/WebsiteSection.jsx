"use client";
import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectBlock from "./ProjectBlock";

export default function WebsiteSection({ projects, darkMode }) {
  const containerRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const sections = gsap.utils.toArray(".project-block", container);
    const borders = gsap.utils.toArray(".block-separator", container);

    sections.forEach((section, index) => {
      if (index === sections.length - 1) return;

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top+=130",
        pin: true,
        pinSpacing: false,
        markers: false,
      });

      if (borders[index]) {
        gsap.set(borders[index], {
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 30,
        });

        ScrollTrigger.create({
          trigger: section,
          start: "bottom top+=129",
          end: "bottom top",
          pin: borders[index],
          pinSpacing: false,
        });
      }

      if (sections[index + 1]) {
        gsap.set(sections[index + 1], {
          paddingTop: "-100px",
        });
      }
    });

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
            technologies={proj.technologies}
            image={proj.image}
            link={proj.link}
            isLast={idx === projects.length - 1}
            darkMode={darkMode}
          />
          {idx < projects.length - 1 && (
            <div
              className={`block-separator w-full border-t border-dotted ${
                darkMode ? "border-gray-600" : "border-white"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
