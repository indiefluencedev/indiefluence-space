"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { services } from "@/data/services";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ServiceDetailPage({ params }) {
	const service = services.find(
		(s) => s.slug.toLowerCase() === params.slug.toLowerCase(),
	);

	const sectionsRef = useRef([]);

	const router = useRouter();

	useEffect(() => {
		sectionsRef.current.forEach((el, index) => {
			if (!el) return;

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: el,
					start: "top 80%",
					end: "bottom 30%",
					scrub: false,
					toggleActions: "play none none reverse",
				},
			});

			tl.fromTo(
				el.querySelector(".section-heading"),
				{ y: 30, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.6 },
			)
				.fromTo(
					el.querySelector(".section-image"),
					{ scale: 0.95, opacity: 0 },
					{ scale: 1, opacity: 1, duration: 0.6 },
					"-=0.4",
				)
				.fromTo(
					el.querySelector(".section-desc"),
					{ y: 20, opacity: 0 },
					{ y: 0, opacity: 1, duration: 0.5 },
					"-=0.3",
				);
		});
	}, []);

	if (!service) return notFound();

	return (
		<div className="min-h-screen px-4 sm:px-8 md:px-16 lg:px-24 py-12">
			<button
				onClick={() => router.back()}
				className="text-sm text-blue-600 underline mb-6"
			>
				← Go back
			</button>

			<h1 className="text-4xl sm:text-5xl font-bold mb-6">{service.title}</h1>
			<p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl">
				{service.description}
			</p>

			<div className="w-full max-w-5xl mx-auto rounded-lg overflow-hidden mb-12">
				<img
					src={service.image}
					alt={service.title}
					className="w-full h-auto rounded-lg"
				/>
			</div>

			<div className="space-y-20">
				{service.details.map((section, index) => (
					<div
						key={index}
						ref={(el) => (sectionsRef.current[index] = el)}
						className="flex flex-col md:flex-row items-center gap-10"
					>
						<div className="w-full md:w-1/2">
							<img
								src={section.image}
								alt={section.heading}
								className="section-image w-full rounded-xl shadow-md"
							/>
						</div>

						<div className="w-full md:w-1/2">
							<h2 className="section-heading text-2xl sm:text-3xl font-semibold mb-4">
								{section.heading}
							</h2>
							<p className="section-desc text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
								{section.description}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
