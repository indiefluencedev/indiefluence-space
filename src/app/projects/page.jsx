"use client";

import { useState, useEffect, useRef } from "react";
import CategoryTabs from "@/components/projects/CategoryTabs";
import WebsiteSection from "@/components/projects/WebsiteSection";
import CreativeSection from "@/components/projects/CreativeSection";
import MuteBoxSection from "@/components/projects/MuteBoxSection";
import { projects as projectsData } from "@/data/projects";
import HeadingComponent from "@/components/UI/HeadingComponent";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("Website");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const contentRef = useRef(null);

  const handleSelectCategory = (category) => {
    if (category === activeCategory) return;

    setIsTransitioning(true);

    // Set minimum height to prevent footer showing
    if (contentRef.current) {
      contentRef.current.style.minHeight = "100vh";
    }

    // Small delay to ensure smooth transition
    setTimeout(() => {
      setActiveCategory(category);

      // Remove min-height after component loads
      setTimeout(() => {
        setIsTransitioning(false);
        if (contentRef.current) {
          contentRef.current.style.minHeight = "";
        }
      }, 200);
    }, 50);
  };

  // Force scroll to top when switching tabs
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeCategory]);

  return (
    <section className="w-full">
      <HeadingComponent title="Projects" />

      <div className="w-full h-[80px] text-white flex flex-col items-center justify-center space-y-6 my-10">
        <CategoryTabs active={activeCategory} onSelect={handleSelectCategory} />
      </div>

      {/* Content Section with minimum height to prevent footer flash */}
      <div
        ref={contentRef}
        className="relative w-full overflow-x-hidden"
        style={{ minHeight: isTransitioning ? "100vh" : "auto" }}
      >
        {!isTransitioning && activeCategory === "Website" && (
          <div className="opacity-0 animate-fadeIn">
            <WebsiteSection projects={projectsData.websites} />
          </div>
        )}
        {!isTransitioning && activeCategory === "Creative" && (
          <div className="opacity-0 animate-fadeIn">
            <CreativeSection projects={projectsData.creative} />
          </div>
        )}
        {!isTransitioning && activeCategory === "Mute Box" && (
          <div className="opacity-0 animate-fadeIn">
            <MuteBoxSection projects={projectsData.mutebox} />
          </div>
        )}

        {/* Loading placeholder during transition */}
        {isTransitioning && (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        )}
      </div>
    </section>
  );
}
