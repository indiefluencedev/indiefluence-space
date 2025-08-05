"use client";
import React, { useEffect, useRef, useState, createContext } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export const CarouselContext = createContext({
	currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }) => {
	const carouselRef = useRef(null);
	const sectionRef = useRef(null);
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const section = sectionRef.current;
		const cardsContainer = carouselRef.current;

		if (!section || !cardsContainer) return;

		cardsContainer.scrollLeft = initialScroll;

		const setDynamicHeight = () => {
			const width = window.innerWidth;
			let height;

			if (width < 640) {
				height = 680; // mobile
			} else if (width < 768) {
				height = 500; // tablet portrait
			} else if (width < 1024) {
				height = 400; // tablet landscape
			} else if (width < 1280) {
				height = 700; // laptop
			} else if (width < 1536) {
				height = 740; // desktop
			} else {
				height = 780; // large screens
			}

			section.style.height = `${height}px`;
		};

		setDynamicHeight();

		const scrollDistance = cardsContainer.scrollWidth - window.innerWidth;

		// ✅ UPDATED: scroll starts only when fully visible
		gsap.to(cardsContainer, {
			x: () => -scrollDistance,
			ease: "none",
			scrollTrigger: {
				trigger: section,
				start: "top top+=1", // ensure full visibility
				end: () => `+=${scrollDistance}`,
				pin: true,
				scrub: 2,
				invalidateOnRefresh: true,
				anticipatePin: 1,
				markers: false, // you can set true for debugging
			},
		});

		window.addEventListener("resize", () => {
			setDynamicHeight();
			ScrollTrigger.refresh();
		});

		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	}, [items]);

	return (
		<CarouselContext.Provider value={{ currentIndex }}>
			<section
				ref={sectionRef}
				className="w-full overflow-hidden relative"
			>
				<div
					ref={carouselRef}
					className={cn(
						"absolute top-0 left-0 h-full flex will-change-transform gap-4 pl-3 md:pl-4 xl:pl-[100px] 2xl:pl-[130px] 3xl:pl-[350px] 4xl:pl-[650px] md:mt-20 mt-10"
					)}
				>
					{items.map((item, index) => (
						<motion.div
							key={"card" + index}
							initial={{ opacity: 0, y: 20 }}
							animate={{
								opacity: 1,
								y: 0,
								transition: {
									duration: 0.5,
									delay: 0.2 * index,
									ease: "easeOut",
								},
							}}
							className="rounded-3xl last:pr-3 md:last:pr-4 xl:last:pr-[10%]"
						>
							{item}
						</motion.div>
					))}
				</div>
			</section>
		</CarouselContext.Provider>
	);
};

export const Card = ({ card, index }) => {
	const [mediaError, setMediaError] = useState(false);
	const isGif = card.src && card.src.toLowerCase().endsWith(".gif");
	const isVideo =
		card.src &&
		(card.src.toLowerCase().endsWith(".mp4") ||
			card.src.toLowerCase().includes("giphy.gif"));

	const handleRedirect = () => {
		window.open(card.redirectUrl, "_blank");
	};

	const handleMediaError = () => {
		setMediaError(true);
	};

	return (
		<motion.button
			onClick={handleRedirect}
			className="relative z-10 flex w-80 md:w-96 h-[80vh] max-h-[40rem] flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 dark:bg-neutral-900 cursor-pointer transition-transform hover:scale-[1.02]"
		>
			<div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" />
			<div className="relative z-40 p-8">
				<motion.p className="text-left font-sans text-sm font-medium text-white md:text-base">
					{card.category}
				</motion.p>
				<motion.p className="mt-2 max-w-xs text-left font-sans text-xl font-semibold [text-wrap:balance] text-white md:text-3xl">
					{card.title}
				</motion.p>
			</div>
			<div className="absolute inset-0 z-10">
				{isVideo && !mediaError ? (
					<video
						autoPlay
						loop
						muted
						playsInline
						className="h-full w-full object-cover"
						onError={handleMediaError}
					>
						<source src={card.src} type="video/mp4" />
						<img
							src="/api/placeholder/400/600"
							alt={card.title}
							className="h-full w-full object-cover"
						/>
					</video>
				) : isGif && !mediaError ? (
					<img
						src={card.src}
						alt={card.title}
						className="h-full w-full object-cover"
						onError={handleMediaError}
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-800">
						<p className="text-sm text-gray-500">{card.title}</p>
					</div>
				)}
			</div>
		</motion.button>
	);
};
