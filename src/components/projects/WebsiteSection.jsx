"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectBlock from "./ProjectBlock";

export default function WebsiteSection({ projects, darkMode }) {
	const containerRef = useRef(null); // Reference to the main wrapper container
	gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger with GSAP

	useLayoutEffect(() => {
		const container = containerRef.current;

		// Select all project blocks and separators within the container
		const sections = gsap.utils.toArray(".project-block", container);
		const borders = gsap.utils.toArray(".block-separator", container);

		// Loop through each section to apply pinning and effects
		sections.forEach((section, index) => {
			if (index === sections.length - 1) return; // Skip last block

			// Pin each section at the top of the viewport
			ScrollTrigger.create({
				trigger: section,
				start: "top top", // Start pinning when section reaches top
				end: "bottom top+=150", // End pin slightly before it scrolls out
				pin: true,
				pinSpacing: false, // Don't add extra space after unpinning
				markers: false, // Set to true for debugging visuals
			});

			// Apply border separation pinning
			if (borders[index]) {
				gsap.set(borders[index], {
					position: "absolute",
					bottom: 0,
					left: 0,
					width: "100%",
					zIndex: 30, // Keep it above other layers
				});

				// Pin the dotted border at the bottom as the section scrolls out
				ScrollTrigger.create({
					trigger: section,
					start: "bottom top+=129", // Just before unpinning section
					end: "bottom top",
					pin: borders[index],
					pinSpacing: false,
				});
			}

			// Optional: adjust next section's padding (negative padding won't work as expected in CSS)
			if (sections[index + 1]) {
				gsap.set(sections[index + 1], {
					paddingTop: "-100px", // May have no effect, consider using margin or offsetY instead
				});
			}
		});

		// Animate image parallax scroll within each project block
		sections.forEach((section) => {
			const img = section.querySelector(".project-image");
			if (img) {
				gsap.to(img, {
					y: "-0%", // No actual movement here; adjust to "-20%" for stronger effect ( but i remove -20% beacuse when we scroll blocks then image is also moving with scroll so thats why i give -0% )
					scrollTrigger: {
						trigger: section,
						start: "top center", // Start effect as section enters center
						end: "bottom top", // End effect as section scrolls out
						scrub: true, // Sync with scroll
					},
				});
			}
		});

		// Cleanup all triggers on unmount
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

					{/* Render separator border between blocks */}
					{idx < projects.length - 1 && (
						<div
							className={
								"block-separator w-full border-t border-dotted bg-secondary"
							}
						/>
					)}
				</div>
			))}
		</div>
	);
}
