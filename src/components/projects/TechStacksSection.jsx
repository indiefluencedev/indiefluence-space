// src/components/projects/TechStacksSection.jsx
"use client";

import { useState } from "react";
import CategoryTabs from "@/components/projects/CategoryTabs";
import WebsiteSection from "@/components/projects/WebsiteSection";
import CreativeSection from "@/components/projects/CreativeSection";
import MuteBoxSection from "@/components/projects/MuteBoxSection";

// ✅ Correct import using named export
import { projects as projectsData } from "@/data/projects";

export default function TechStacksSection() {
  const [activeCategory, setActiveCategory] = useState("Website");

  const handleSelectCategory = (category) => {
    setActiveCategory(category);
  };

  return (
    <section className="w-full">
      {/* Hero Section */}
      <div className="w-full h-[470px]  text-white flex flex-col items-center justify-center space-y-6">
        {/* Buttons */}
        <CategoryTabs active={activeCategory} onSelect={handleSelectCategory} />

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl mt-10 font-bold text-yellow-500 dark:text-white transition-colors duration-300">
          Our Projects
        </h1>
      </div>

      {/* Content Section */}
      <div className="relative w-full overflow-x-hidden">
        {activeCategory === "Website" && (
          <WebsiteSection projects={projectsData.websites} />
        )}
        {activeCategory === "Creative" && (
          <CreativeSection projects={projectsData.creative} />
        )}
        {activeCategory === "Mute Box" && (
          <MuteBoxSection projects={projectsData.mutebox} />
        )}
      </div>
    </section>
  );
}
