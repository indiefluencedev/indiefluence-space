"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CosmicPulseButton } from "../UI/SpinDielButton";
import { useTheme } from "@/context/TheamContext";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Service data
const services = [
	{
		id: "001",
		title: "Advisory",
		description:
			"Gain strategic insights from our fractional CTOs, benefit from comprehensive technical reviews, and achieve accelerated development with expert backend, frontend, and DevOps solutions.",
		image: "/api/placeholder/800/600",
	},
	{
		id: "002",
		title: "System Architecture",
		description:
			"Build robust, scalable system architectures designed for performance and growth. Our expert engineers create solutions that align with your business goals and technical requirements.",
		image: "/api/placeholder/800/600",
	},
	{
		id: "003",
		title: "Backend Development",
		description:
			"Develop powerful server-side applications with our expert backend developers. We deliver high-performance, secure, and scalable solutions tailored to your specific business needs.",
		image: "/api/placeholder/800/600",
	},
	{
		id: "004",
		title: "Frontend Development",
		description:
			"Create intuitive and engaging user interfaces with our frontend development services. We build responsive, accessible, and visually stunning web applications that drive user engagement.",
		image: "/api/placeholder/800/600",
	},
	{
		id: "005",
		title: "Tech Stacks",
		description:
			"Leverage cutting-edge technology stacks for a rapidly evolving world. Our expertise spans across modern frameworks, languages, and tools to deliver solutions that stay ahead of the curve.",
		image: "/api/placeholder/800/600",
	},
	{
		id: "006",
		title: "DevOps & Cloud",
		description:
			"Streamline your development pipeline and optimize operations with our DevOps expertise. We implement CI/CD workflows and cloud-native solutions that enhance efficiency and reliability.",
		image: "/api/placeholder/800/600",
	},
	{
		id: "007",
		title: "AI & Machine Learning",
		description:
			"Harness the power of artificial intelligence and machine learning to transform your business. We develop smart solutions that automate processes and deliver valuable insights from your data.",
		image: "/api/placeholder/800/600",
	},
	{
		id: "008",
		title: "Cybersecurity",
		description:
			"Protect your digital assets with comprehensive security solutions. Our team implements robust measures to safeguard your applications, infrastructure, and data from evolving threats.",
		image: "/api/placeholder/800/600",
	},
];

export default function ServicesSection() {
	const { darkMode } = useTheme();
	const sectionRef = useRef(null);
	const cardsContainerRef = useRef(null);
	const sectionsRef = useRef([]);
	const progressRef = useRef([]);

	useEffect(() => {
		// Set up the horizontal scroll effect
		const section = sectionRef.current;
		const cardsContainer = cardsContainerRef.current;

		if (!section || !cardsContainer) return;

		// Calculate the total width for horizontal scrolling
		const totalWidth = services.length * 100;

		// Set the width of the cards container
		gsap.set(cardsContainer, {
			width: `${totalWidth}%`,
		});

		// Create the horizontal scroll effect
		const horizontalScroll = gsap.timeline({
			scrollTrigger: {
				trigger: section,
				start: "top top",
				end: `+=${totalWidth}%`,
				pin: true,
				scrub: 1,
				anticipatePin: 1,
				invalidateOnRefresh: true,
				onUpdate: (self) => {
					// Update progress indicators
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

		// Animate the cards container to move horizontally
		horizontalScroll.to(cardsContainer, {
			x: () => -(cardsContainer.scrollWidth - window.innerWidth),
			ease: "sine.inOut",
		});

		// Set up individual section animations
		sectionsRef.current.forEach((sectionEl, index) => {
			if (!sectionEl) return;

			gsap.fromTo(
				sectionEl,
				{
					x: 100,
					opacity: 0,
				},
				{
					x: 0,
					opacity: 1,
					duration: 1,
					scrollTrigger: {
						trigger: sectionEl,
						containerAnimation: horizontalScroll,
						start: "left right",
						end: "left center",
						scrub: true,
					},
				},
			);
		});

		// Clean up ScrollTrigger when component unmounts
		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	}, []);

	return (
		<>
			{/* Heading Section - 400px height */}
			<section className="w-full h-[400px] flex flex-col justify-center items-center border-b border-gray-200 dark:border-gray-800">
				<div className="w-full max-w-7xl mx-auto px-8">
					<div className="flex justify-between items-center w-full">
						<div className="flex items-center">
							<span className="text-sm font-mono opacity-50">SERVICES</span>
						</div>
						<h1 className="text-5xl md:text-6xl font-bold text-center">
							Tech stacks for a<br />
							rapidly evolving world
						</h1>
						<div className="flex items-center">
							<span className="text-sm font-mono opacity-50">/005</span>
						</div>
					</div>
				</div>
			</section>

			{/* Horizontal Scrolling Services Section */}
			<section
				ref={sectionRef}
				className="w-full h-screen overflow-hidden relative"
			>
				<div
					ref={cardsContainerRef}
					className="absolute top-0 left-0 h-full flex"
				>
					{services.map((service, index) => (
						<div
							key={service.id}
							ref={(el) => (sectionsRef.current[index] = el)}
							className="w-screen h-full flex items-center px-8 md:px-16 border-b border-gray-200 dark:border-gray-800"
						>
							<div className="w-full h-full flex flex-col md:flex-row items-center">
								{/* Left side with content and number */}
								<div className="w-full md:w-1/2 h-full flex flex-col justify-center pr-8">
									<div className="flex items-center">
										<span className="text-sm font-mono opacity-50 mb-2">
											S/{service.id}
										</span>
									</div>

									<h2 className="text-4xl md:text-5xl font-bold mb-8">
										{service.title}
									</h2>

									<p className="text-lg md:text-xl max-w-xl mb-12">
										{service.description}
									</p>



									<CosmicPulseButton/>
								</div>

								{/* Right side with image */}
								<div className="w-full md:w-1/2 h-3/4 bg-default flex items-center justify-center">
									{service.id === "001" ? (
										<div className="w-32 h-32">
											<svg
												viewBox="0 0 100 100"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<circle cx="30" cy="50" r="30" fill="currentColor" />
												<circle cx="70" cy="50" r="30" fill="currentColor" />
											</svg>
										</div>
									) : (
										<img
											src={service.image}
											alt={service.title}
											className="w-full h-full object-cover"
										/>
									)}
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Progress indicator */}
				<div className="absolute bottom-8 left-0 w-full flex justify-center gap-2">
					{services.map((service, index) => (
						<div
							key={index}
							ref={(el) => (progressRef.current[index] = el)}
							data-current={index === 0 ? "true" : "false"}
							className="w-2 h-2 rounded-full bg-gray-400 opacity-30 data-[current='true']:opacity-100"
						></div>
					))}
				</div>
			</section>
		</>
	);
}
