"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { QuantumButton } from "../UI/SpinDielButton";
import { useTheme } from "@/context/TheamContext";
import { useRouter } from "next/navigation";
import HeadingComponent from "../UI/HeadingComponent";

import { services } from "@/data/services"; // Importing service data
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Service data with consistent image paths
// const services = [
// 	{
// 		id: "001",
// 		title: "Social Media Marketing",
// 		description:
// 			"Boost your online presence with strategic content across Instagram, LinkedIn, X, and more—tailored to each platform's strengths to maximize engagement.",
// 		image: "/png/services/socialmediea-marketing.png",
// 	},
// 	{
// 		id: "002",
// 		title: "Outbound Marketing",
// 		description:
// 			"Engage potential clients through targeted WhatsApp outreach, cold calls, Google & Meta Ads, and high-converting email campaigns.",
// 		image: "/png/services/Outbound_Marketing_1.png",
// 	},
// 	{
// 		id: "003",
// 		title: "Content Creation",
// 		description:
// 			"From short-form videos to podcasts, voiceovers, and public shoots—our in-house team crafts impactful content across all formats.",
// 		image: "/png/services/Content_Creation_1.png",
// 	},
// 	{
// 		id: "004",
// 		title: "Influencer Marketing",
// 		description:
// 			"Connect your brand with trusted influencers through campaign planning, editing assistance, and high-ROI collaborations.",
// 		image: "/png/services/Influencer_Marketing.png",
// 	},
// 	{
// 		id: "005",
// 		title: "Website Development",
// 		description:
// 			"Deliver fast, modern websites with strong SEO, intuitive UI/UX, and optional chatbot integration—backed by robust content and blog writing.",
// 		image: "/png/services/Website_Development.png",
// 	},
// 	{
// 		id: "006",
// 		title: "B2B Marketing",
// 		description:
// 			"Leverage AI-powered targeting, ICP curation, and lead automation to scale your B2B reach through psychology-driven strategies.",
// 		image: "/png/services/B2B_Marketing.png",
// 	},
// 	{
// 		id: "007",
// 		title: "Graphic Designing",
// 		description:
// 			"Create scroll-stopping brand visuals—from social posts and brochures to logos, presentations, and office collateral.",
// 		image: "/png/services/Graphic_Designing.png",
// 	},
// 	{
// 		id: "008",
// 		title: "Brand Management",
// 		description:
// 			"Maintain a cohesive brand identity through digital footprinting, business collaterals, funnel automation, and strategic partnerships.",
// 		image: "/png/services/Brand_Management.png",
// 	},
// ];

export default function ServicesSection() {
	const { darkMode } = useTheme();
	const router = useRouter();
	const sectionRef = useRef(null);
	const cardsContainerRef = useRef(null);
	const progressRef = useRef([]);
	const serviceElementsRef = useRef([]);

	useEffect(() => {
		const section = sectionRef.current;
		const cardsContainer = cardsContainerRef.current;

		if (!section || !cardsContainer) return;

		// Calculate total scrollable width
		const totalWidth = services.length * 100;

		// Set container width
		gsap.set(cardsContainer, {
			width: `${totalWidth}%`,
			x: 0, // Start at beginning (first card)
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

		// Create smooth horizontal scroll from left to right
		const scrollMultiplier = 1; // Slows down the scroll by 5x
		const scrollTween = gsap.to(cardsContainer, {
			x: () => -(cardsContainer.scrollWidth - window.innerWidth),
			ease: "none",
			scrollTrigger: {
				trigger: section,
				start: "top top",
				// Multiplying the end value makes the scroll slower
				end: () =>
					`+=${(cardsContainer.scrollWidth - window.innerWidth) * scrollMultiplier}`,
				pin: true,
				scrub: 2, // Smoother, slower scrolling
				anticipatePin: 1,
				invalidateOnRefresh: true,
				onUpdate: (self) => {
					const progress = Math.floor(self.progress * services.length);
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
		});

		// Animate individual cards as they come into view
		serviceElementsRef.current.forEach((el, index) => {
			if (!el) return;

			gsap.fromTo(
				el,
				{ x: -50, opacity: 0.7 },
				{
					x: 0,
					opacity: 1,
					scrollTrigger: {
						trigger: el,
						containerAnimation: scrollTween,
						start: "left right",
						end: "left center",
						scrub: true,
					},
				},
			);

			const heading = el.querySelector("h2");
			const description = el.querySelector("p");

			if (heading) {
				gsap.fromTo(
					heading,
					{ y: 30, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						scrollTrigger: {
							trigger: el,
							containerAnimation: scrollTween,
							start: "left right+=100",
							end: "left center",
							scrub: true,
						},
					},
				);
			}

			if (description) {
				gsap.fromTo(
					description,
					{ y: 20, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						scrollTrigger: {
							trigger: el,
							containerAnimation: scrollTween,
							start: "left right+=100",
							end: "left center",
							scrub: true,
						},
					},
				);
			}
		});

		// Handle resize events
		const handleResize = () => {
			setDynamicHeight();
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
						sectionLabel="SERVICES"
						title={
							<>
								Tech stacks for a<br />
								rapidly evolving world
							</>
						}
						sectionNumber="005"
					/>
				</div>

				{/* Horizontal Scrolling Services Section - removed fixed height */}
				<section
					ref={sectionRef}
					className="w-full min-h-[700px] overflow-hidden relative "
				>
					<div
						ref={cardsContainerRef}
						className="absolute top-0 left-0 h-full flex will-change-transform"
					>
						{services.map((service, index) => (
							<div
								key={service.id}
								ref={(el) => (serviceElementsRef.current[index] = el)}
								className="w-screen h-full flex items-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 border-b border-gray-200 dark:border-gray-800"
							>
								{/* Card container - Only constrained on smaller screens, full width on large screens */}
								<div className="relative w-full h-full lg:w-full mx-auto">
									{/* Content wrapper */}
									<div className="relative w-full h-full flex flex-col md:flex-row items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 z-10">
										{/* Content side - Adjusted width to fill more space on larger screens */}
										<div className="w-full md:w-1/2 flex flex-col justify-center pr-0 md:pr-8 lg:pr-16 mb-8 md:mb-0 mt-6 md:mt-0">
											<div className="flex items-center">
												<span className="text-sm font-mono opacity-70 mb-2">
													S/{service.id}
												</span>
											</div>
											<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
												{service.title}
											</h2>
											<p className="text-default sm:text-lg md:text-xl lg:text-xl xl:text-2xl max-w-xl lg:max-w-2xl mb-6 sm:mb-8 opacity-90">
												{service.description}
											</p>
											<QuantumButton
												text="EXPLORE"
												className="mt-2 sm:mt-4 w-full sm:w-auto"
												onClick={() => router.push(`/services/${service.slug}`)}
											/>
										</div>

										{/* Image Container - Allowed to be larger on big screens */}
										<div className="w-full md:w-1/2 flex items-center justify-center mt-4 md:mt-0">
											<div className="w-full aspect-square max-w-md lg:max-w-none lg:w-full">
												<div className="w-full h-full p-2 sm:p-4 lg:p-0 xl:p-2 flex items-center justify-center">
													<img
														src={service.image}
														alt={service.title}
														className=" w-full h-full md:w-[90%]  md:h-[90%] object-contain rounded-lg"
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</section>
			</div>
		</>
	);
}
