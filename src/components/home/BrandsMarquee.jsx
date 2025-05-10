"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export default function BrandSection() {
	const logoRefs = useRef([]);
	const [initialized, setInitialized] = useState(false);

	const logos = [
		"/svg/aerawatluxe.svg",
		"/svg/ananthagram.svg",
		"/svg/bhumi-retreat.svg",
		"/svg/defined-values.svg",
		"/svg/genesis-classes.svg",
		"/svg/goldstar.svg",
		"/svg/kross-fix.svg",
		"/svg/logo.svg",
		"/svg/mars.svg",
		"/svg/modvak.svg",
		"/svg/mydigirecords.svg",
		"/svg/mypetsrecords.svg",
		"/svg/myro.svg",
		"/svg/nidas-pure.svg",
		"/svg/padama-energy.svg",
		"/svg/pmc.svg",
		"/svg/renault.svg",
		"/svg/resdec-system.svg",
		"/svg/royal-enfield.svg",
	];

	// Pre-initialize logo sources with the first 6 logos
	const [logoSources, setLogoSources] = useState(logos.slice(0, 6));

	useEffect(() => {
		let index = 0;
		const total = logos.length;

		// Mark the component as initialized
		setInitialized(true);

		const showNextGroup = () => {
			// Update logo sources
			const nextSources = [];
			for (let i = 0; i < 6; i++) {
				const logoIndex = (index + i) % total;
				nextSources.push(logos[logoIndex]);
			}
			setLogoSources(nextSources);

			// Reset positions immediately after sources update
			setTimeout(() => {
				// Set entry positions
				gsap.set(logoRefs.current[0], { y: 80, opacity: 0 });
				gsap.set(logoRefs.current[1], { x: -80, opacity: 0 });
				gsap.set(logoRefs.current[2], { y: -80, opacity: 0 });
				gsap.set(logoRefs.current[3], { x: 80, opacity: 0 });
				gsap.set(logoRefs.current[4], {
					rotation: -30,
					transformOrigin: "top center",
					opacity: 0,
				});
				gsap.set(logoRefs.current[5], { scale: 0.8, opacity: 0 });

				// Create animation timeline
				const tl = gsap.timeline({
					onComplete: () => {
						// Wait 3 seconds, then fade out and switch
						setTimeout(() => {
							gsap.to(logoRefs.current, {
								opacity: 0,
								duration: 0.6,
								ease: "power1.inOut",
								onComplete: () => {
									index = (index + 6) % total;
									showNextGroup();
								},
							});
						}, 3000); // Display for 3 seconds
					},
				});

				// Animate in one-by-one
				tl.to(
					logoRefs.current[0],
					{ y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
					0,
				);
				tl.to(
					logoRefs.current[1],
					{ x: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
					0.2,
				);
				tl.to(
					logoRefs.current[2],
					{ y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
					0.4,
				);
				tl.to(
					logoRefs.current[3],
					{ x: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
					0.6,
				);
				tl.to(
					logoRefs.current[4],
					{
						rotation: 0,
						opacity: 1,
						duration: 0.9,
						ease: "back.out(1.7)",
					},
					0.8,
				);
				tl.to(
					logoRefs.current[5],
					{
						scale: 1,
						opacity: 1,
						duration: 0.7,
						ease: "power2.out",
					},
					1.0,
				);
			}, 0);
		};

		showNextGroup(); // Start animation

		// Cleanup function
		return () => {
			// Cancel any pending animations
			gsap.killTweensOf(logoRefs.current);
		};
	}, []);

	return (
		<div className="container mx-auto px-4 py-20">
			<div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 items-center justify-items-center">
				{logoSources.map((src, i) => (
					<div
						key={i}
						ref={(el) => (logoRefs.current[i] = el)}
						className="relative h-[100px] w-[200px] flex items-center justify-center opacity-0"
						style={{ opacity: 0 }} // Start invisible
					>
						<Image
							src={src}
							alt={`Logo ${i + 1}`}
							fill
							sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
							style={{ objectFit: "contain" }}
							priority={i < 2} // Prioritize loading the first two logos
						/>
					</div>
				))}
			</div>
		</div>
	);
}
