"use client";
import React, { useEffect, useState, createContext } from "react";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export const CarouselContext = createContext({
	currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }) => {
	const carouselRef = React.useRef(null);
	const [canScrollLeft, setCanScrollLeft] = React.useState(false);
	const [canScrollRight, setCanScrollRight] = React.useState(true);
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		if (carouselRef.current) {
			carouselRef.current.scrollLeft = initialScroll;
			checkScrollability();
		}
	}, [initialScroll]);

	const checkScrollability = () => {
		if (carouselRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
			setCanScrollLeft(scrollLeft > 0);
			setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
		}
	};

	const scrollLeft = () => {
		if (carouselRef.current) {
			carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
		}
	};

	const scrollRight = () => {
		if (carouselRef.current) {
			carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
		}
	};

	const isMobile = () => {
		return window && window.innerWidth < 768;
	};

	return (
		<CarouselContext.Provider value={{ currentIndex }}>
			<div className="relative w-full">
				<div
					className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] md:py-20"
					ref={carouselRef}
					onScroll={checkScrollability}
				>
					<div
						className={cn(
							"absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l",
						)}
					></div>

					<div
						className={cn(
							"flex flex-row justify-start gap-4 pl-4",
							"mx-auto max-w-7xl", // remove max-w-4xl if you want the carousel to span the full width of its container
						)}
					>
						{items.map((item, index) => (
							<motion.div
								initial={{
									opacity: 0,
									y: 20,
								}}
								animate={{
									opacity: 1,
									y: 0,
									transition: {
										duration: 0.5,
										delay: 0.2 * index,
										ease: "easeOut",
									},
								}}
								key={"card" + index}
								className="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
							>
								{item}
							</motion.div>
						))}
					</div>
				</div>
				<div className="mr-10 flex justify-end gap-2">
					<button
						className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
						onClick={scrollLeft}
						disabled={!canScrollLeft}
					>
						<IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
					</button>
					<button
						className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
						onClick={scrollRight}
						disabled={!canScrollRight}
					>
						<IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
					</button>
				</div>
			</div>
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

	// Function to handle redirection to Instagram
	const handleRedirect = () => {
		window.open(card.redirectUrl, "_blank");
	};

	// Handle media loading errors
	const handleMediaError = () => {
		setMediaError(true);
	};

	return (
		<motion.button
			onClick={handleRedirect}
			className="relative z-10 flex h-80 w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-[40rem] md:w-96 dark:bg-neutral-900 cursor-pointer transition-transform hover:scale-[1.02]"
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
			{/* Media container */}
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
						{/* Fallback if video fails */}
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
