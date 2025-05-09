"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { QuantumButton } from "../UI/SpinDielButton";
import { useTheme } from "@/context/TheamContext";
import { useRouter } from "next/navigation";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Service data with consistent image paths
const services = [
	{
		id: "001",
		title: "Social Media Marketing",
		description:
			"Boost your online presence with strategic content across Instagram, LinkedIn, X, and more—tailored to each platform's strengths to maximize engagement.",
		image: "/png/socialmediea-marketing.png",
	},
	{
		id: "002",
		title: "Outbound Marketing",
		description:
			"Engage potential clients through targeted WhatsApp outreach, cold calls, Google & Meta Ads, and high-converting email campaigns.",
		image: "/images/outbound-marketing.png",
	},
	{
		id: "003",
		title: "Content Creation",
		description:
			"From short-form videos to podcasts, voiceovers, and public shoots—our in-house team crafts impactful content across all formats.",
		image: "/images/content-creation.png",
	},
	{
		id: "004",
		title: "Influencer Marketing",
		description:
			"Connect your brand with trusted influencers through campaign planning, editing assistance, and high-ROI collaborations.",
		image: "/images/influencer-marketing.png",
	},
	{
		id: "005",
		title: "Website Development",
		description:
			"Deliver fast, modern websites with strong SEO, intuitive UI/UX, and optional chatbot integration—backed by robust content and blog writing.",
		image: "/images/website-development.png",
	},
	{
		id: "006",
		title: "B2B Marketing",
		description:
			"Leverage AI-powered targeting, ICP curation, and lead automation to scale your B2B reach through psychology-driven strategies.",
		image: "/images/b2b-marketing.png",
	},
	{
		id: "007",
		title: "Graphic Designing",
		description:
			"Create scroll-stopping brand visuals—from social posts and brochures to logos, presentations, and office collateral.",
		image: "/images/graphic-designing.png",
	},
	{
		id: "008",
		title: "Brand Management",
		description:
			"Maintain a cohesive brand identity through digital footprinting, business collaterals, funnel automation, and strategic partnerships.",
		image: "/images/brand-management.png",
	},
];

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

		// Create smooth horizontal scroll from left to right
		const scrollTween = gsap.to(cardsContainer, {
			x: () => -(cardsContainer.scrollWidth - window.innerWidth),
			ease: "none",
			scrollTrigger: {
				trigger: section,
				start: "top top",
				end: () => `+=${cardsContainer.scrollWidth - window.innerWidth}`,
				pin: true,
				scrub: 1,
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
				{ x: -100, opacity: 0.7 },
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
							start: "left right+=200",
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
							// Fix: Modified start and end positions to ensure description is visible
							start: "left right+=200",
							end: "left center+=100",
							scrub: true,
						},
					},
				);
			}
		});

		const handleResize = () => ScrollTrigger.refresh();
		window.addEventListener("resize", handleResize);

		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<>
			{/* Heading Section - Fixed height */}
			<section className="w-full py-12 md:py-16 flex flex-col justify-center items-center border-b border-gray-200 dark:border-gray-800">
				<div className="w-full max-w-7xl mx-auto px-4 md:px-8">
					<div className="flex flex-col md:flex-row justify-between items-center w-full">
						<div className="flex items-center mb-4 md:mb-0">
							<span className="text-sm font-mono opacity-50">SERVICES</span>
						</div>
						<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center">
							Tech stacks for a<br />
							rapidly evolving world
						</h1>
						<div className="flex items-center mt-4 md:mt-0">
							<span className="text-sm font-mono opacity-50">/005</span>
						</div>
					</div>
				</div>
			</section>

			{/* Horizontal Scrolling Services Section */}
			<section
				ref={sectionRef}
				className="w-full h-[700px] md:h-[900px] overflow-hidden relative"
			>
				<div
					ref={cardsContainerRef}
					className="absolute top-0 left-0 h-full flex will-change-transform"
				>
					{services.map((service, index) => (
						<div
							key={service.id}
							ref={(el) => (serviceElementsRef.current[index] = el)}
							className="w-screen h-full flex items-center px-4 sm:px-6 md:px-8 lg:px-16 border-b border-gray-200 dark:border-gray-800"
						>
							<div className="w-full h-full flex flex-col md:flex-row items-center justify-center py-8">
								<div className="w-full md:w-1/2 flex flex-col justify-center pr-0 md:pr-8 mb-10 md:mb-0">
									<div className="flex items-center">
										<span className="text-sm font-mono opacity-50 mb-2">
											S/{service.id}
										</span>
									</div>
									<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
										{service.title}
									</h2>
									{/* Fixed: Added opacity-100 to ensure description is visible by default */}
									<p className="text-default sm:text-lg md:text-xl max-w-xl mb-6 sm:mb-8 opacity-100">
										{service.description}
									</p>
									<QuantumButton
										text="EXPLORE"
										className="mt-2 sm:mt-4"
										onClick={() => router.push("/explore")}
									/>
								</div>
								<div className="w-full md:w-1/2 flex items-center justify-center">
									<div className="w-[80%] h-[80%] bg-default flex items-center justify-center">
										<img
											src={service.image}
											alt={service.title}
											className="w-full h-full object-cover"
										/>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Progress indicator */}
				<div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 w-full flex justify-center gap-3">
					{services.map((_, index) => (
						<div
							key={index}
							ref={(el) => (progressRef.current[index] = el)}
							data-current={index === 0 ? "true" : "false"}
							className="w-3 h-3 rounded-full bg-gray-400 opacity-30 data-[current='true']:opacity-100 data-[current='true']:bg-gray-800 dark:data-[current='true']:bg-gray-200 transition-all duration-300"
						></div>
					))}
				</div>
			</section>
		</>
	);
}
