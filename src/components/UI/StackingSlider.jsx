"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

function StackingSlides({ projects }) {
	const containerRef = useRef(null);
	const slidesRef = useRef([]);

	// Convert projects to array if it's not already one
	const projectsArray = Array.isArray(projects) ? projects : [];

	useEffect(() => {
		const container = containerRef.current;
		const slides = slidesRef.current.filter(Boolean);
		if (!container || !slides.length) return;

		// Clear any existing ScrollTriggers to avoid duplicates
		ScrollTrigger.getAll().forEach((tr) => tr.kill());

		// Set initial positions - cards stacked with increasing offsets
		const stackOffset = 80; // Increased offset for more visible stacking
		const initialScale = 0.9; // Initial scale for cards (smaller)
		const initialOpacity = 0.6; // Initial opacity for background cards

		slides.forEach((slide, i) => {
			// Position each slide with increasing offsets
			gsap.set(slide, {
				y: i * stackOffset,
				scale: Math.max(initialScale - i * 0.02, 0.7), // Decreasing scale for deeper cards
				opacity: Math.max(initialOpacity - i * 0.05, 0.3), // Decreasing opacity
				rotationX: 5, // Slight rotation for 3D effect
				transformPerspective: 1000,
				transformOrigin: "center top",
			});
		});

		// Create scroll animation
		const totalSlides = slides.length;

		// Main timeline
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: container,
				start: "top top",
				end: `+=${totalSlides * 130}%`, // More scroll distance for smoother transitions
				pin: true,
				scrub: 1, // Smooth scrubbing
				anticipatePin: 1, // Helps with performance
			},
		});

		// Animate each slide individually for better control
		slides.forEach((slide, i) => {
			// For each slide except the last one:
			if (i < slides.length - 1) {
				tl.to(
					slide,
					{
						y: -100, // Move up and out of view
						scale: 1.05, // Slightly larger as it comes to focus
						opacity: 0, // Fade out as it exits
						rotationX: -5, // Tilt away as it exits
						duration: 1 / totalSlides, // Normalize duration based on number of slides
						ease: "power1.inOut",
					},
					i / totalSlides,
				); // Stagger the animations
			}

			// For all slides behind the current one, animate them forward
			if (i > 0) {
				tl.to(
					slides[i],
					{
						y: (i - 1) * stackOffset, // Move up to take the place of the previous card
						scale: Math.max(initialScale - (i - 1) * 0.02, 0.7), // Adjust scale
						opacity: Math.max(initialOpacity - (i - 1) * 0.05, 0.3), // Adjust opacity
						rotationX: 5, // Maintain perspective
						duration: 1 / totalSlides,
						ease: "power1.inOut",
					},
					(i - 1) / totalSlides,
				);
			}
		});

		return () => ScrollTrigger.getAll().forEach((tr) => tr.kill());
	}, [projectsArray]);

	if (!projectsArray.length) {
		return (
			<div className="flex items-center justify-center h-screen">
				<p>No projects available</p>
			</div>
		);
	}

	return (
		<div
			ref={containerRef}
			className="stacking-container relative h-screen w-full overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800"
		>
			{projectsArray.map((proj, i) => (
				<div
					key={proj.id || i}
					ref={(el) => (slidesRef.current[i] = el)}
					className="stack-slide absolute left-0 right-0 mx-auto"
					style={{
						width: "85%",
						maxWidth: "1000px",
						height: "70vh",
						top: "15vh", // Centered vertically
						zIndex: projectsArray.length - i,
						willChange: "transform, opacity", // Performance optimization
					}}
				>
					<div
						className="slide-content h-full rounded-2xl shadow-xl overflow-hidden transition-shadow duration-300 hover:shadow-2xl transform-gpu"
						style={{
							background: "rgba(255, 255, 255, 0.9)",
							backdropFilter: "blur(12px)",
							WebkitBackdropFilter: "blur(12px)",
						}}
					>
						<div className="card-inner flex flex-col h-full">
							{/* Card image - top 40% of card */}
							<div className="relative w-full h-2/5 overflow-hidden bg-gray-200">
								{proj.image && (
									<div className="w-full h-full relative">
										<div
											className="absolute inset-0 bg-cover bg-center"
											style={{
												backgroundImage: `url(${proj.image || "/placeholder-image.jpg"})`,
											}}
										/>
									</div>
								)}
								<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
								<h2 className="absolute bottom-4 left-4 text-3xl font-bold text-white drop-shadow-lg">
									{proj.title}
								</h2>
							</div>

							{/* Card content - bottom 60% */}
							<div className="p-6 flex flex-col flex-grow">
								<p className="text-gray-700 text-lg mb-6 flex-grow">
									{proj.description}
								</p>

								{/* Technologies */}
								{proj.technologies && proj.technologies.length > 0 && (
									<div className="mb-6">
										<h3 className="text-sm font-bold text-gray-500 uppercase mb-2">
											Technologies
										</h3>
										<div className="flex flex-wrap gap-2">
											{proj.technologies.map((tech, index) => (
												<span
													key={index}
													className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
												>
													{tech}
												</span>
											))}
										</div>
									</div>
								)}

								{/* Link button */}
								{proj.link && (
									<a
										href={proj.link}
										target="_blank"
										rel="noopener noreferrer"
										className="self-start px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-md"
									>
										View Project
									</a>
								)}
							</div>
						</div>
					</div>
				</div>
			))}

			{/* Scroll indicator */}
			<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white">
				<p className="mb-2 text-sm opacity-70">Scroll to explore</p>
				<div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
					<div className="w-1 h-3 bg-white rounded-full mt-1 animate-bounce"></div>
				</div>
			</div>
		</div>
	);
}

export default StackingSlides;
