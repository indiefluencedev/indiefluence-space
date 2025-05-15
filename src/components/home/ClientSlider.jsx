"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";

const ClientSlider = () => {
	const sliderRef = useRef(null);
	const sliderContainerRef = useRef(null);
	const [isHovered, setIsHovered] = useState(false);

	// Define client logos
	const clients = [
		{
			id: 1,
			name: "Sony Music",
			logoSrc: "/images/clients/sony-music.svg",
			alt: "Sony Music logo",
		},
		{
			id: 2,
			name: "Coca Cola",
			logoSrc: "/images/clients/coca-cola.svg",
			alt: "Coca Cola logo",
		},
		{
			id: 3,
			name: "Montreux Jazz Festival",
			logoSrc: "/images/clients/montreux.svg",
			alt: "Montreux Jazz Festival logo",
		},
		{
			id: 4,
			name: "Pepsico",
			logoSrc: "/images/clients/pepsico.svg",
			alt: "Pepsico logo",
		},
		{
			id: 5,
			name: "Universal",
			logoSrc: "/images/clients/universal.svg",
			alt: "Universal logo",
		},
		{
			id: 6,
			name: "Logitech",
			logoSrc: "/images/clients/logitech.svg",
			alt: "Logitech logo",
		},
		{
			id: 7,
			name: "Sony Music",
			logoSrc: "/images/clients/sony-music.svg",
			alt: "Sony Music logo",
		},
	];

	useEffect(() => {
		const slider = sliderRef.current;
		const sliderContainer = sliderContainerRef.current;
		let animation;

		if (!slider || !sliderContainer) return;

		// Set up slider content and animation
		const setupSlider = () => {
			// Clear any existing animation
			if (animation) animation.kill();

			// Remove any cloned elements
			const existingClones = sliderContainer.querySelectorAll(".clone");
			existingClones.forEach((clone) => clone.remove());

			// Clone original items for seamless looping
			const itemsToClone = slider.querySelectorAll(".client-item");
			const totalWidth = slider.offsetWidth;

			// Create clones and append to slider to ensure infinite loop
			itemsToClone.forEach((item) => {
				const clone = item.cloneNode(true);
				clone.classList.add("clone");
				slider.appendChild(clone);
			});

			// Create GSAP animation for infinite scrolling with increased speed
			// Reduced duration from 25 to 12 seconds for faster movement
			animation = gsap.to(slider, {
				x: `-${totalWidth}px`,
				duration: 12, // Increased speed by reducing duration
				ease: "linear",
				repeat: -1,
				paused: isHovered,
				onRepeat: () => {
					// Reset position for true infinite looping
					gsap.set(slider, { x: 0 });
				},
			});
		};

		// Initialize the slider
		setupSlider();

		// Handle window resize
		const handleResize = () => {
			setupSlider();
		};

		window.addEventListener("resize", handleResize);

		return () => {
			if (animation) animation.kill();
			window.removeEventListener("resize", handleResize);
		};
	}, [isHovered]);

	useEffect(() => {
		const slider = sliderRef.current;
		if (!slider) return;

		// Get current animation instance
		const animation = gsap.getById(slider);

		// Pause/play animation based on hover state
		if (isHovered) {
			gsap.to(slider, { timeScale: 0.2, duration: 0.5 });
		} else {
			gsap.to(slider, { timeScale: 1, duration: 0.5 });
		}
	}, [isHovered]);

	// Define light theme colors explicitly
	const primaryColor = "#fbcc03"; // Replace with your actual primary color
	const textColor = "#333333"; // Dark text for light theme

	return (
		<section
			className="w-full py-10 md:py-16 lg:py-24 overflow-hidden"
			style={{ backgroundColor: "#f8f9fa" }}
		>
			<div className="container mx-auto px-4 md:px-6 lg:px-8">
				{/* Desktop layout - Side by side */}
				<div className="hidden lg:flex justify-between items-start mb-16">
					<div className="max-w-xl">
						<h2
							className="text-5xl lg:text-6xl xl:text-7xl font-bold"
							style={{ color: textColor }}
						>
							We collaborate
							<br />
							with <span style={{ color: primaryColor }}>leading</span>
							<br />
							companies
						</h2>
					</div>

					<div className="max-w-md mt-4">
						<p className="text-lg" style={{ color: textColor }}>
							Our Clients: Our Success. From{" "}
							<span style={{ color: primaryColor }}>startups</span> to industry{" "}
							<span style={{ color: primaryColor }}>leaders</span>, we tailor
							our services to meet every need.
						</p>

						<Link
							href="/contact"
							className="inline-flex items-center mt-8 text-2xl font-bold group"
							style={{ color: primaryColor }}
						>
							LET'S CREATE
							<svg
								className="ml-2 w-6 h-6 transform transition-transform group-hover:translate-x-1"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M14 5l7 7m0 0l-7 7m7-7H3"
								/>
							</svg>
						</Link>
					</div>
				</div>

				{/* Mobile layout - Stacked */}
				<div className="lg:hidden mb-10">
					<h2
						className="text-4xl md:text-5xl font-bold mb-6"
						style={{ color: textColor }}
					>
						We collaborate
						<br />
						with <span style={{ color: primaryColor }}>leading</span>
						<br />
						companies
					</h2>

					<p className="text-base md:text-lg mb-6" style={{ color: textColor }}>
						Our Clients: Our Success. From{" "}
						<span style={{ color: primaryColor }}>startups</span> to industry{" "}
						<span style={{ color: primaryColor }}>leaders</span>, we tailor our
						services to meet every need.
					</p>

					<Link
						href="/contact"
						className="inline-flex items-center text-xl md:text-2xl font-bold group"
						style={{ color: primaryColor }}
					>
						LET'S CREATE
						<svg
							className="ml-2 w-5 h-5 md:w-6 md:h-6 transform transition-transform group-hover:translate-x-1"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M14 5l7 7m0 0l-7 7m7-7H3"
							/>
						</svg>
					</Link>
				</div>

				{/* Client logo slider */}
				<div
					className="relative w-full overflow-hidden rounded-3xl p-6 md:p-8 lg:p-10"
					style={{ backgroundColor: "#FFFFFF" }}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					<div ref={sliderContainerRef} className="overflow-hidden">
						<div
							ref={sliderRef}
							className="flex items-center gap-8 md:gap-12 lg:gap-16 will-change-transform"
							style={{ display: "flex", flexWrap: "nowrap" }}
						>
							{/* Double the client items to ensure smoother looping */}
							{[...clients, ...clients, ...clients].map((client, index) => (
								<div
									key={`${client.id}-${index}`}
									className="client-item shrink-0 h-12 md:h-16 lg:h-20 flex items-center justify-center"
								>
									{/* We'll use placeholder divs, but in production you would use actual Image components */}
									<div className="h-full flex items-center justify-center min-w-[100px] md:min-w-[120px] lg:min-w-[150px]">
										{/* In a real implementation, replace this with your Image component */}
										<div className="w-full h-full relative flex items-center justify-center">
											{/* This would be an Image in production */}
											<div
												className="text-center text-sm md:text-base"
												style={{ color: "#000000" }}
											>
												{client.name}
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ClientSlider;
