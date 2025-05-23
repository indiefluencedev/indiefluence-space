// ************************ this component is used for heading button *************************** //
"use client";

import { useState } from "react";
import CategoryTabs from "@/components/projects/CategoryTabs";
import WebsiteSection from "@/components/projects/WebsiteSection";
import CreativeSection from "@/components/projects/CreativeSection";
import MuteBoxSection from "@/components/projects/MuteBoxSection";
import StackingCards from "@/components/projects/StackingCards";

// ✅ Correct import using named export
import { projects as projectsData } from "@/data/projects";
import HeadingComponent from "@/components/UI/HeadingComponent";

export default function Projects() {
	const [activeCategory, setActiveCategory] = useState("Website");

	const handleSelectCategory = (category) => {
		setActiveCategory(category);
	};

	return (
		<section className="w-full">
			{/* Hero Section */}

			<HeadingComponent title="Projects" />

			<div className="w-full h-[80px]  text-white flex flex-col items-center justify-center space-y-6 my-10">
				{/* Buttons */}
				<CategoryTabs active={activeCategory} onSelect={handleSelectCategory} />

				{/* Heading */}
			</div>



			{/* Content Section */}
			<div className="relative w-full overflow-x-hidden">
				{activeCategory === "Website" && (
					<WebsiteSection projects={projectsData.websites} />
				)}
				{activeCategory === "StackingCards" && (
					<StackingCards projects={projectsData.StackingCards} />
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
