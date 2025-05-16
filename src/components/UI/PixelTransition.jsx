"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

/**
 * PixelTransition Component
 * Handles both initial page load and page transitions with a pixelated effect
 */
const PixelTransition = ({ children }) => {
	const pathname = usePathname();
	const [isFirstLoad, setIsFirstLoad] = useState(true);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const prevPathRef = useRef(pathname);
	const contentRef = useRef(null);
	const overlayRef = useRef(null);
	const blocksRef = useRef(null);
	const animationRef = useRef(null);

	// Number of blocks in the grid
	const BLOCKS_COUNT = 20;

	// Create array for storing block refs
	const blockRefsArray = useRef([]);

	// Helper function to set block refs
	const setBlockRef = (el, index) => {
		blockRefsArray.current[index] = el;
	};

	// Handle initial page load animation
	useEffect(() => {
		if (isFirstLoad) {
			document.body.style.overflow = "hidden";

			// Make sure overlay is visible before animation
			gsap.set(overlayRef.current, {
				visibility: "visible",
				opacity: 1,
			});

			// Set initial state for blocks
			gsap.set(blockRefsArray.current, {
				scaleX: 1,
				transformOrigin: "right center",
			});

			const tl = gsap.timeline({
				onComplete: () => {
					setIsFirstLoad(false);
					setIsTransitioning(false);
					document.body.style.overflow = "";
				},
			});

			// Animate the blocks
			tl.to(blockRefsArray.current, {
				scaleX: 0,
				duration: 0.8,
				stagger: 0.03,
				ease: "power2.inOut",
			})
				.to(
					contentRef.current,
					{
						opacity: 1,
						visibility: "visible",
						duration: 0.5,
					},
					"-=0.3"
				)
				.set(overlayRef.current, { visibility: "hidden" });

			animationRef.current = tl;
			return () => {
				tl.kill();
			};
		}
	}, [isFirstLoad]);

	// Handle page transitions
	useEffect(() => {
		// Skip on first load as it's handled separately
		if (isFirstLoad) return;

		// Only run transition when pathname changes
		if (prevPathRef.current === pathname) return;

		// Kill any existing animation
		if (animationRef.current) {
			animationRef.current.kill();
		}

		prevPathRef.current = pathname;
		setIsTransitioning(true);

		document.body.style.overflow = "hidden";

		// Make sure overlay is visible before animation
		gsap.set(overlayRef.current, {
			visibility: "visible",
			opacity: 1,
		});

		const tl = gsap.timeline({
			onComplete: () => {
				setIsTransitioning(false);
				document.body.style.overflow = "";
			},
		});

		// First hide the current content
		tl.to(contentRef.current, {
			opacity: 0,
			duration: 0.3,
		});

		// Reset and animate blocks
		gsap.set(blockRefsArray.current, {
			scaleX: 0,
			transformOrigin: "left center",
		});

		// Animate in
		tl.to(blockRefsArray.current, {
			scaleX: 1,
			duration: 0.8,
			stagger: 0.03,
			ease: "power2.inOut",
		})
			// Then animate out
			.to(blockRefsArray.current, {
				scaleX: 0,
				duration: 0.8,
				stagger: 0.03,
				ease: "power2.inOut",
				transformOrigin: "right center",
				delay: 0.2,
			})
			.to(
				contentRef.current,
				{
					opacity: 1,
					visibility: "visible",
					duration: 0.5,
				},
				"-=0.3"
			)
			.set(overlayRef.current, { visibility: "hidden" });

		animationRef.current = tl;

		return () => {
			tl.kill();
		};
	}, [pathname, isFirstLoad]);

	// Listen for transition start event
	useEffect(() => {
		const handleTransitionStart = () => {
			setIsTransitioning(true);
		};

		window.addEventListener('pageTransitionStart', handleTransitionStart);
		return () => {
			window.removeEventListener('pageTransitionStart', handleTransitionStart);
		};
	}, []);

	return (
		<>
			{/* Transition Overlay */}
			<div
				ref={overlayRef}
				className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
				style={{
					visibility: isFirstLoad || isTransitioning ? "visible" : "hidden",
					opacity: 1,
				}}
			>
				<div ref={blocksRef} className="w-full h-full flex flex-col">
					{Array.from({ length: BLOCKS_COUNT }).map((_, index) => (
						<div
							key={index}
							ref={(el) => setBlockRef(el, index)}
							className="w-full bg-black"
							style={{ flex: 1 }}
						></div>
					))}
				</div>
			</div>

			{/* Content Container */}
			<div
				ref={contentRef}
				style={{
					opacity: isFirstLoad || isTransitioning ? 0 : 1,
					visibility: isFirstLoad || isTransitioning ? "hidden" : "visible",
					transition: "opacity 0.3s ease",
				}}
			>
				{children}
			</div>
		</>
	);
};

export default PixelTransition;
