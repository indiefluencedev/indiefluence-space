"use client";
import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@/context/TheamContext"; // Import your theme context

export const Timeline = () => {
	const ref = useRef(null);
	const containerRef = useRef(null);
	const [height, setHeight] = useState(0);
	const { darkMode } = useTheme(); // Get dark mode from your context

	useEffect(() => {
		if (ref.current) {
			const rect = ref.current.getBoundingClientRect();
			setHeight(rect.height);
		}
	}, [ref]);

	// We don't need the darkMode state or setDarkMode since we're getting it from context
	// We also don't need this effect since the document attribute is handled by the theme context
	// However, if you need to handle any Timeline-specific dark mode effects, keep them here
	// but remove the document-level changes

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start 10%", "end 50%"],
	});

	const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
	const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

	const data = [
		{
			title: "Q1 2023 — The Spark",
			content:
				"Indiefluence was born out of a late-night idea — a space where creativity meets consistency. The goal? Help indie creators show up online with style and substance.",
			image: "/api/placeholder/600/400",
			metrics: {
				users: "10+",
				engagement: "Early Testing",
				revenue: "$0",
			},
			achievement: "First prototype completed",
		},
		{
			title: "Q2 2023 — Building the Blueprint",
			content:
				"Defined our mission: intuitive storytelling over algorithm-chasing. Started wireframing tools to support creators with scriptwriting, branding, and social flow.",
			image: "/api/placeholder/600/400",
			metrics: {
				users: "50+",
				engagement: "Alpha Testers",
				revenue: "$500",
			},
			achievement: "Secured seed funding",
		},
		{
			title: "Q3 2023 — First Scripts, First Feedback",
			content:
				"Launched early test scripts on TikTok and Instagram. Received feedback from a handful of indie creators and refined our voice to be more adaptive and authentic.",
			image: "/api/placeholder/600/400",
			metrics: {
				users: "120+",
				engagement: "15% weekly",
				revenue: "$2,500",
			},
			achievement: "First viral creator post using our template",
		},
		{
			title: "Q4 2023 — Creative Collabs",
			content:
				"Partnered with micro-influencers and independent brands. Helped storytellers across music, fashion, and wellness build narrative-driven content.",
			image: "/api/placeholder/600/400",
			metrics: {
				users: "500+",
				engagement: "22% weekly",
				revenue: "$10,000",
			},
			achievement: "Featured in Creator Economy Newsletter",
		},
		{
			title: "Q1 2024 — The Indie Toolkit",
			content:
				"Rolled out the first version of the Indie Toolkit — a curated set of prompts, scripts, and templates to support daily content creation without burnout.",
			image: "/api/placeholder/600/400",
			metrics: {
				users: "1,200+",
				engagement: "35% weekly",
				revenue: "$25,000",
			},
			achievement: "Launched premium subscription tier",
		},
		{
			title: "Q2 2024 — Going Live",
			content:
				"Indiefluence soft-launched to the public. Introduced real-time scripting support and started building a community of mindful content creators.",
			image: "/api/placeholder/600/400",
			metrics: {
				users: "5,000+",
				engagement: "42% weekly",
				revenue: "$75,000",
			},
			achievement: "First community event with 200+ attendees",
		},
		{
			title: "Q3 2024 — Stories That Stick",
			content:
				"Focused on longform storytelling. Expanded content formats for carousel threads, reels, and newsletter-style scripts that deepen engagement.",
			image: "/api/placeholder/600/400",
			metrics: {
				users: "12,000+",
				engagement: "48% weekly",
				revenue: "$150,000",
			},
			achievement: "Partnership with three major creator platforms",
		},
		{
			title: "Q1 2025 — The Indie Influence Grows",
			content:
				"Supported 300+ creators in their growth journeys. Community-first updates coming soon — events, feedback loops, and co-creation spaces.",
			image: "/api/placeholder/600/400",
			metrics: {
				users: "25,000+",
				engagement: "52% weekly",
				revenue: "$400,000",
			},
			achievement: "Series A funding secured",
		},
	];

	return (
		<>
			{/* Instead of the inline dark mode toggle, use your DarkModeToggle component */}
			<div className="fixed top-4 right-4 z-50">
				<div className="theme-toggle">
					{/* Import and use your DarkModeToggle component */}
					{/* <DarkModeToggle /> */}
					{/* Or you can leave the existing button if you prefer */}
					{/* but make it use the context toggleTheme function */}
				</div>
			</div>

			{/* Heading Section - 400px height */}
			<section
				className={`w-full h-[400px] flex flex-col justify-center items-center border-b ${darkMode ? "border-gray-800" : "border-gray-200"}`}
			>
				<div className="w-full max-w-7xl mx-auto px-8">
					<div className="flex justify-between items-center w-full">
						<div className="flex items-center">
							<span
								className={`text-sm font-mono opacity-50 ${darkMode ? "text-white" : "text-neutral-900"}`}
							>
								ABOUT
							</span>
						</div>
						<h1
							className={`text-5xl md:text-6xl font-bold text-center ${darkMode ? "text-white" : "text-neutral-900"}`}
						>
							Our journey from
							<br />
							idea to influence
						</h1>
						<div className="flex items-center">
							<span
								className={`text-sm font-mono opacity-50 ${darkMode ? "text-white" : "text-neutral-700"}`}
							>
								/002
							</span>
						</div>
					</div>
				</div>
			</section>

			<div
				className={`w-full bg-transparent font-sans md:px-10 transition-colors duration-300 ${darkMode ? "bg-gray-900" : ""}`}
				ref={containerRef}
			>
				<div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
					<p
						className={`text-sm md:text-base max-w-xl mb-10 transition-colors duration-300 ${darkMode ? "text-white" : "text-neutral-700"}`}
					>
						From our first ideation sessions to today's thriving community,
						follow our path of growth, challenges, and breakthroughs that shaped
						what Indiefluence has become.
					</p>
				</div>
				<div ref={ref} className="relative max-w-7xl mx-auto pb-20">
					{data.map((item, index) => (
						<div
							key={index}
							className="flex justify-start pt-10 md:pt-40 md:gap-10"
						>
							<div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
								<div
									className={`h-10 absolute left-3 md:left-3 w-10 rounded-full ${darkMode ? "bg-gray-800" : "bg-white"} flex items-center justify-center transition-colors duration-300`}
								>
									<div
										className={`h-4 w-4 rounded-full ${darkMode ? "bg-neutral-600 border-neutral-500" : "bg-neutral-200 border-neutral-300"} border p-2 transition-colors duration-300`}
									/>
								</div>
								<h3
									className={`hidden md:block text-xl md:pl-20 md:text-5xl font-bold transition-colors duration-300 ${darkMode ? "text-white" : "text-neutral-500"}`}
								>
									{item.title}
								</h3>
							</div>

							<div className="relative pl-20 pr-4 md:pl-4 w-full">
								<h3
									className={`md:hidden block text-2xl mb-4 text-left font-bold transition-colors duration-300 ${darkMode ? "text-white" : "text-neutral-500"}`}
								>
									{item.title}
								</h3>

								{/* Enhanced Content Section */}
								<div className="flex flex-col md:flex-row gap-8">
									{/* Left content */}
									<div className="md:w-1/2">
										{/* Updated text color for dark mode */}
										<p
											className={`text-sm md:text-base mb-6 transition-colors duration-300 ${darkMode ? "text-white" : "text-neutral-700"}`}
										>
											{item.content}
										</p>

										{/* Metrics grid */}
										<div className="grid grid-cols-3 gap-4 mt-6 mb-8">
											<div className="flex flex-col">
												<span
													className={`text-xs uppercase transition-colors duration-300 ${darkMode ? "text-white" : "text-neutral-400"}`}
												>
													Users
												</span>
												<span
													className={`text-lg font-semibold transition-colors duration-300 ${darkMode ? "text-white" : "text-neutral-900"}`}
												>
													{item.metrics.users}
												</span>
											</div>
											<div className="flex flex-col">
												<span
													className={`text-xs uppercase transition-colors duration-300 ${darkMode ? "text-white" : "text-neutral-400"}`}
												>
													Engagement
												</span>
												<span
													className={`text-lg font-semibold transition-colors duration-300 ${darkMode ? "text-white" : "text-neutral-900"}`}
												>
													{item.metrics.engagement}
												</span>
											</div>
											<div className="flex flex-col">
												<span
													className={`text-xs uppercase transition-colors duration-300 ${darkMode ? "text-white" : "text-neutral-400"}`}
												>
													Revenue
												</span>
												<span
													className={`text-lg font-semibold transition-colors duration-300 ${darkMode ? "text-white" : "text-neutral-900"}`}
												>
													{item.metrics.revenue}
												</span>
											</div>
										</div>

										{/* Achievement badge */}
										<div
											className={`inline-flex items-center px-3 py-1 rounded-full transition-colors duration-300 ${darkMode ? "bg-neutral-800" : "bg-neutral-100"}`}
										>
											<svg
												className="w-4 h-4 text-yellow-500 mr-2"
												viewBox="0 0 24 24"
												fill="currentColor"
											>
												<path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
											</svg>
											<span
												className={`text-sm font-medium transition-colors duration-300 ${darkMode ? "text-white" : "text-neutral-800"}`}
											>
												{item.achievement}
											</span>
										</div>
									</div>

									{/* Right side with image */}
									<div className="md:w-1/2 mt-6 md:mt-0">
										<div
											className={`aspect-video rounded-lg overflow-hidden transition-colors duration-300 ${darkMode ? "bg-neutral-800" : "bg-neutral-100"}`}
										>
											<img
												src={item.image}
												alt={`Milestone: ${item.title}`}
												className="w-full h-full object-cover"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
					<div
						style={{
							height: height + "px",
						}}
						className={`absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] ${darkMode ? "via-neutral-700" : "via-neutral-200"} to-transparent to-[99%] transition-colors duration-300 [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]`}
					>
						<motion.div
							style={{
								height: heightTransform,
								opacity: opacityTransform,
							}}
							className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
						/>
					</div>
				</div>
			</div>
		</>
	);
};
