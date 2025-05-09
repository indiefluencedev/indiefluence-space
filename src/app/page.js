"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "@/components/home/HeroSection";
import StraightSection from "@/components/home/ServiceSection";
import { CosmicPulseButton } from "@/components/UI/SpinDielButton";
import ClientsTestimonialsSection from "@/components/home/ClientsTestimonialsSection";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
	const parallaxSectionRef = useRef(null);
	const backgroundRef = useRef(null);
	const colorBackgroundRef = useRef(null);
	const firstPanelRef = useRef(null);
	const highlightRef = useRef(null);
	const buttonRef = useRef(null);
	const line1Ref = useRef(null);
	const line2Ref = useRef(null);
	const line3Ref = useRef(null);
	const mask1Ref = useRef(null);
	const mask2Ref = useRef(null);
	const mask3Ref = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			if (
				backgroundRef.current &&
				colorBackgroundRef.current &&
				firstPanelRef.current &&
				highlightRef.current &&
				buttonRef.current &&
				line1Ref.current &&
				line2Ref.current &&
				line3Ref.current &&
				mask1Ref.current &&
				mask2Ref.current &&
				mask3Ref.current
			) {
				// Background parallax
				gsap.to(backgroundRef.current, {
					yPercent: -30,
					ease: "none",
					scrollTrigger: {
						trigger: parallaxSectionRef.current,
						start: "top top",
						end: "bottom top",
						scrub: true,
					},
				});

				// Color parallax (optional reveal)
				gsap.to(colorBackgroundRef.current, {
					yPercent: -30,
					ease: "none",
					scrollTrigger: {
						trigger: parallaxSectionRef.current,
						start: "top top",
						end: "bottom top",
						scrub: true,
					},
				});

				// Mask reveal for each line
				[
					{ mask: mask1Ref.current, text: line1Ref.current, delay: 0 },
					{ mask: mask2Ref.current, text: line2Ref.current, delay: 0.18 },
					{ mask: mask3Ref.current, text: line3Ref.current, delay: 0.36 },
				].forEach(({ mask, text, delay }) => {
					gsap.set(text, { color: "#fff", opacity: 1 });
					gsap.set(mask, { x: "0%" });
					gsap.to(mask, {
						x: "101%",
						duration: 0.8,
						ease: "power2.inOut",
						delay,
						scrollTrigger: {
							trigger: firstPanelRef.current,
							start: "top 80%",
							toggleActions: "play none none reverse",
						},
						onUpdate: function () {
							// Optionally fade in text as mask passes
							const progress = this.progress();
							if (progress > 0.2) {
								gsap.to(text, {
									color: "#fff",
									opacity: 1,
									duration: 0.2,
									overwrite: "auto",
								});
							}
						},
						onStart: function () {
							gsap.set(text, { color: "#222", opacity: 1 });
						},
					});
				});

				// Highlight animation (after text reveal)
				gsap.fromTo(
					highlightRef.current,
					{ backgroundPositionX: "-100%", color: "#fff" },
					{
						backgroundPositionX: "0%",
						color: "#ffeb3b",
						backgroundImage:
							"linear-gradient(90deg, #ffeb3b 50%, transparent 50%)",
						backgroundSize: "200% 100%",
						backgroundRepeat: "no-repeat",
						duration: 1.2,
						ease: "power2.out",
						delay: 0.7,
						scrollTrigger: {
							trigger: highlightRef.current,
							start: "top 90%",
							toggleActions: "play none none reverse",
						},
						onStart: () => {
							highlightRef.current.style.transition = "color 0.4s";
						},
					},
				);

				// Button pop-in
				gsap.fromTo(
					buttonRef.current,
					{ scale: 0.7, opacity: 0 },
					{
						scale: 1,
						opacity: 1,
						duration: 0.7,
						ease: "back.out(1.7)",
						delay: 1.2,
						scrollTrigger: {
							trigger: buttonRef.current,
							start: "top 95%",
							toggleActions: "play none none reverse",
						},
					},
				);
			}
		}, parallaxSectionRef);

		return () => ctx.revert();
	}, []);

	const renderParallaxSection = () => (
		<section
			ref={parallaxSectionRef}
			className="relative w-full h-[150vh] overflow-hidden"
		>
			{/* Background image */}
			<div
				ref={backgroundRef}
				className="absolute inset-0 w-full h-[200vh] bg-cover bg-center bg-no-repeat"
				style={{
					backgroundImage: "url('/png/ChatGPT.png')",
					zIndex: 10,
				}}
			/>

			{/* Color overlay */}
			<div
				ref={colorBackgroundRef}
				className="absolute inset-0 w-full h-[200vh] bg-cover bg-center bg-no-repeat opacity-70"
				style={{
					backgroundImage: "url('/png/ChatGPT.png')",
					zIndex: 15,
				}}
			/>

			{/* Content Panel at the bottom */}
			<div
				ref={firstPanelRef}
				className="absolute bottom-10 right-0 z-30 w-full text-right px-4 pr-10"
			>
				<h2 className="text-5xl md:text-7xl font-extrabold mb-8 text-white tracking-tight">
					<span
						className="relative overflow-hidden block"
						style={{ display: "block" }}
					>
						<span ref={line1Ref} className="relative z-10">
							A creative team of digital strategists
						</span>
						<span
							ref={mask1Ref}
							className="absolute inset-0 bg-yellow-400 z-20"
							style={{ willChange: "transform" }}
						></span>
					</span>
					<span
						className="relative overflow-hidden block"
						style={{ display: "block" }}
					>
						<span ref={line2Ref} className="relative z-10">
							blending psychology and marketing
						</span>
						<span
							ref={mask2Ref}
							className="absolute inset-0 bg-yellow-400 z-20"
							style={{ willChange: "transform" }}
						></span>
					</span>
					<span
						className="relative overflow-hidden block"
						style={{ display: "block" }}
					>
						<span ref={line3Ref} className="relative z-10">
							to build brands that truly{" "}
							<span
								ref={highlightRef}
								style={{
									backgroundClip: "text",
									WebkitBackgroundClip: "text",
									WebkitTextFillColor: "transparent",
									backgroundImage:
										"linear-gradient(90deg, #ffeb3b 50%, #fff 50%)",
									backgroundSize: "200% 100%",
									backgroundPositionX: "-100%",
								}}
							>
								connect
							</span>
							.
						</span>
						<span
							ref={mask3Ref}
							className="absolute inset-0 bg-yellow-400 z-20"
							style={{ willChange: "transform" }}
						></span>
					</span>
				</h2>
				<div ref={buttonRef} className="inline-block">
					<CosmicPulseButton
						className="text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-500 focus:ring-offset-yellow-200"
						style={{ padding: "10px 20px", fontSize: "1.2rem" }}
					>
						Contact Us
					</CosmicPulseButton>
				</div>
			</div>
		</section>
	);

	return (
		<div className="w-full overflow-x-hidden">
			{/* HeroSection as the first slide, layered above */}
			<div className="relative z-20">
				<HeroSection />
			</div>
			{/* Parallax section slides up from beneath, overlapping HeroSection at the start */}
			<div className="relative z-10 -mt-32">{renderParallaxSection()}</div>
			<StraightSection />
			<ClientsTestimonialsSection />
		</div>
	);
}
