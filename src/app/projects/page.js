"use client";
import { useState } from "react";
import StackingSlides from "@/components/UI/StackingSlider";
import { projects } from "@/data/projects";
import { Heading } from "lucide-react";
import HeadingComponent from "@/components/UI/HeadingComponent";

export default function ProjectsPage() {
	// State to track which project category is selected
	const [selectedCategory, setSelectedCategory] = useState("websites");

	// Get the correct projects array based on selected category
	const projectsToDisplay = projects[selectedCategory] || [];

	return (
		<div className="min-h-screen">

			<HeadingComponent
				sectionLabel="PROJECTS"
				title="My Projects"
				icon={<Heading className="text-4xl" />}
			/>
			{/* Category selector */}
			<div className="fixed top-4 left-0 right-0 z-50 flex justify-center gap-4 p-4">
				{Object.keys(projects).map((category) => (
					<button
						key={category}
						onClick={() => setSelectedCategory(category)}
						className={`px-4 py-2 rounded-md transition-colors ${
							selectedCategory === category
								? "bg-blue-500 text-white"
								: "bg-gray-200 hover:bg-gray-300"
						}`}
					>
						{category.charAt(0).toUpperCase() + category.slice(1)}
					</button>
				))}
			</div>

			{/* Pass the selected category's projects array to the StackingSlides component */}
			<StackingSlides projects={projectsToDisplay} />
		</div>
	);
}
