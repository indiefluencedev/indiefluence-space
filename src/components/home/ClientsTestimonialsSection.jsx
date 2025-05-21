"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeadingComponent from "../UI/HeadingComponent";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
	{
		id: "t001",
		quote:
			"Their advisory services transformed our tech strategy completely...",
		author: "Sarah Johnson",
		position: "CEO, InnovateTech",
		company: "InnovateTech",
		client: "/png/testimonials/testImage.png",
		image: "/png/testimonials/imageProject.png",
	},
	{
		id: "t002",
		quote: "The system architecture they designed has scaled flawlessly...",
		author: "Michael Chen",
		position: "CTO, ScaleUp Solutions",
		company: "ScaleUp Solutions",
		client: "/png/testimonials/testImage.png",
		image: "/png/testimonials/imageProject.png",
	},
	{
		id: "t003",
		quote: "Their backend development team delivered a solution...",
		author: "Elena Rodriguez",
		position: "VP of Engineering, DataFlow",
		company: "DataFlow",
		client: "/png/testimonials/testImage.png",
		image: "/png/testimonials/imageProject.png",
	},
	{
		id: "t004",
		quote: "Our user engagement metrics doubled after implementing...",
		author: "James Wilson",
		position: "Product Director, UserFirst",
		company: "UserFirst",
		client: "/png/testimonials/testImage.png",
		image: "/png/testimonials/imageProject.png",
	},
	{
		id: "t005",
		quote: "Their DevOps implementation reduced our deployment time...",
		author: "Aisha Patel",
		position: "Lead Developer, CloudNative",
		company: "CloudNative",
		client: "/png/testimonials/testImage.png",
		image: "/png/testimonials/imageProject.png",
	},
];

export default function ClientTestimonials() {
	const sectionRef = useRef(null);
	const cardsContainerRef = useRef(null);
	const progressRef = useRef([]);
	const testimonialElementsRef = useRef([]);

	// Reverse the testimonials array to display in descending order
	const reversedTestimonials = [...testimonials].reverse();

	useEffect(() => {
		const section = sectionRef.current;
		const cardsContainer = cardsContainerRef.current;

		if (!section || !cardsContainer) return;

		// Calculate total scrollable width
		const totalWidth = testimonials.length * 100;

		// Calculate the offset needed to show the last card first (index 0 of reversedTestimonials)
		const initialOffset = window.innerWidth * (testimonials.length - 1);

		// Set container width and initial position
		gsap.set(cardsContainer, {
			width: `${totalWidth}%`,
			x: -initialOffset, // Position to show the last testimonial first
		});

		// Calculate dynamic height based on viewport
		const setDynamicHeight = () => {
			// Set minimum height but also adapt to viewport height
			const viewportHeight = window.innerHeight;
			const minHeight = 600; // Minimum height for the section
			const idealHeight = Math.max(minHeight, viewportHeight * 0.85); // 85% of viewport height
			section.style.height = `${idealHeight}px`;
		};

		// Set initial height
		setDynamicHeight();

		// Create smooth horizontal scroll from right to left
		const scrollMultiplier = 1; // Slows down the scroll by 5x - matching services section
		const scrollTween = gsap.fromTo(
			cardsContainer,
			{ x: -initialOffset }, // Start from the position showing the last testimonial
			{
				x: 0, // Move to the beginning (right to left)
				ease: "none",
				scrollTrigger: {
					trigger: section,
					start: "top top",
					// Multiplying the end value makes the scroll slower
					end: () => `+=${initialOffset * scrollMultiplier}`,
					pin: true,
					scrub: 2, // Smoother, slower scrolling - matching services section
					anticipatePin: 1,
					invalidateOnRefresh: true,
					onUpdate: (self) => {
						// Calculate which testimonial is currently visible
						const progress = Math.floor(
							(1 - self.progress) * testimonials.length,
						);
						progressRef.current.forEach((dot, i) => {
							if (dot) {
								dot.setAttribute(
									"data-current",
									i === progress ? "true" : "false",
								);
							}
						});
					},
				},
			},
		);

		// Animate individual testimonial cards as they come into view
		testimonialElementsRef.current.forEach((el, index) => {
			if (!el) return;

			gsap.fromTo(
				el,
				{ x: 50, opacity: 0.7 }, // Changed from -50 to 50 to enter from right
				{
					x: 0,
					opacity: 1,
					scrollTrigger: {
						trigger: el,
						containerAnimation: scrollTween,
						start: "right left", // Changed from "left right" to "right left"
						end: "right center", // Changed from "left center" to "right center"
						scrub: true,
					},
				},
			);

			// Animate quote and content
			const quote = el.querySelector(".quote-mark");
			const testimonialText = el.querySelector(".testimonial-text");
			const authorInfo = el.querySelector(".author-info");

			if (quote) {
				gsap.fromTo(
					quote,
					{ y: 30, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						scrollTrigger: {
							trigger: el,
							containerAnimation: scrollTween,
							start: "right left-=100", // Changed direction
							end: "right center",
							scrub: true,
						},
					},
				);
			}

			if (testimonialText) {
				gsap.fromTo(
					testimonialText,
					{ y: 20, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						scrollTrigger: {
							trigger: el,
							containerAnimation: scrollTween,
							start: "right left-=100", // Changed direction
							end: "right center",
							scrub: true,
						},
					},
				);
			}

			if (authorInfo) {
				gsap.fromTo(
					authorInfo,
					{ y: 20, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						delay: 0.1,
						scrollTrigger: {
							trigger: el,
							containerAnimation: scrollTween,
							start: "right left-=150", // Changed direction
							end: "right center",
							scrub: true,
						},
					},
				);
			}
		});

		// Immediately highlight the correct progress indicator
		progressRef.current.forEach((dot, i) => {
			if (dot) {
				dot.setAttribute(
					"data-current",
					i === testimonials.length - 1 ? "true" : "false",
				);
			}
		});

		// Handle resize events
		const handleResize = () => {
			setDynamicHeight();

			// Recalculate the offset on resize
			const newInitialOffset = window.innerWidth * (testimonials.length - 1);

			// Reset container position after resize
			if (!ScrollTrigger.getById("testimonialScroll")) {
				gsap.set(cardsContainer, { x: -newInitialOffset });
			}

			ScrollTrigger.refresh();
		};

		window.addEventListener("resize", handleResize);

		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<>
			{/* Main container to eliminate unwanted spacing */}
			<div className="w-full relative">
				{/* Heading Section with responsive spacing */}
				<div className="pt-8 md:pt-12 lg:pt-16">
					<HeadingComponent
						sectionLabel="TESTIMONIALS"
						title={
							<>
								What our clients
								<br />
								have to say
							</>
						}
						sectionNumber="006"
					/>
				</div>

				{/* Horizontal Scrolling Testimonials Section */}
				<section
					ref={sectionRef}
					className="w-full min-h-[600px] overflow-hidden relative"
				>
					<div
						ref={cardsContainerRef}
						className="absolute top-0 left-0 h-full flex will-change-transform"
					>
						{/* Using the reversed array for display */}
						{reversedTestimonials.map((testimonial, index) => (
							<div
								key={testimonial.id}
								ref={(el) => (testimonialElementsRef.current[index] = el)}
								className="w-screen h-full flex items-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 border-b border-gray-200 dark:border-gray-800"
							>
								{/* Card container */}
								<div className="relative w-full h-full lg:w-full mx-auto">
									{/* Content wrapper */}
									<div className="relative w-full h-full flex flex-col md:flex-row items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 z-10">
										{/* Image Container - Left side */}
										<div className="w-full md:w-1/2 flex items-center justify-center mb-4 md:mb-0">
											<div className="w-[90%] 2xl:w-[700px] 2xl:h-[700px] aspect-square max-w-md lg:max-w-none lg:w-[85%]">
												<div className="relative w-full h-full shadow-2xl">
													<img
														src={testimonial.image}
														alt={`${testimonial.company} project`}
														className="w-full h-full object-cover rounded-lg"
													/>
													<div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-900 p-2 sm:p-4 shadow-lg rounded-md">
														<img
															src={testimonial.client}
															alt={testimonial.company}
															className="w-16 sm:w-24 h-8 sm:h-12 object-contain"
														/>
													</div>
												</div>
											</div>
										</div>

										{/* Content side - Right side */}
										<div className="w-full md:w-1/2 flex flex-col justify-center pl-0 md:pl-8 lg:pl-12 mb-2 md:mb-0 mt-2 md:mt-0">
											<div className="flex items-center">
												<span className="text-xs sm:text-sm font-mono opacity-70 mb-1">
													T/{testimonial.id}
												</span>
											</div>
											<div className="text-4xl md:text-5xl lg:text-6xl font-serif mb-2 sm:mb-4 quote-mark">
												"
											</div>
											<p className="text-default text-base sm:text-lg md:text-xl lg:text-2xl max-w-xl lg:max-w-2xl mb-3 sm:mb-4 font-serif italic testimonial-text">
												{testimonial.quote}
											</p>
											<div className="flex items-center mt-2 author-info">
												<div className="w-10 h-10 rounded-full overflow-hidden mr-3 shadow-lg">
													<img
														src={testimonial.image}
														alt={testimonial.author}
														className="w-full h-full object-cover"
													/>
												</div>
												<div>
													<h4 className="font-bold text-base sm:text-lg">
														{testimonial.author}
													</h4>
													<p className="text-xs sm:text-sm opacity-70">
														{testimonial.position}, {testimonial.company}
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Progress indicator dots */}
					<div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 w-full flex justify-center gap-3 z-10">
						{testimonials.map((_, index) => (
							<div
								key={index}
								ref={(el) => (progressRef.current[index] = el)}
								className="w-3 h-3 rounded-full bg-gray-400 opacity-30 data-[current='true']:opacity-100 data-[current='true']:bg-gray-800 dark:data-[current='true']:bg-gray-200 transition-all duration-300"
								data-current={
									index === testimonials.length - 1 ? "true" : "false"
								}
							></div>
						))}
					</div>
				</section>
			</div>
		</>
	);
}
