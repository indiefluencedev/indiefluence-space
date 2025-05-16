"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

/**
 * ModernTransition Component
 * A collection of minimalist black and white page transition effects
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The page content
 * @param {string} props.type - The transition type: "slice", "wipe", "vignette", "typewriter", "blinds"
 * @param {boolean} props.contained - Whether the transition should be contained within its parent (for demos)
 */
const ModernTransition = ({ children, type = "slice", contained = false }) => {
	const pathname = usePathname();
	const [isFirstLoad, setIsFirstLoad] = useState(true);
	const [isTransitioning, setIsTransitioning] = useState(true);
	const prevPathRef = useRef(pathname);
	const contentRef = useRef(null);
	const overlayRef = useRef(null);
	const transitionElementRef = useRef(null);

	// Handle initial page load animation
	useEffect(() => {
		if (isFirstLoad) {
			if (!contained) {
				document.body.style.overflow = "hidden";
			}

			// Make sure overlay is visible before animation
			if (overlayRef.current) {
				gsap.set(overlayRef.current, {
					visibility: "visible",
					opacity: 1,
				});
			}

			const tl = gsap.timeline({
				onComplete: () => {
					setIsFirstLoad(false);
					setIsTransitioning(false);
					if (!contained) {
						document.body.style.overflow = "";
					}
				},
			});

			if (transitionElementRef.current) {
				// Different animations based on type
				switch (type) {
					case "slice":
						// Set initial state for slices
						const slices =
							transitionElementRef.current.querySelectorAll(".slice");
						gsap.set(slices, { scaleY: 1 });

						// Animate the slices
						tl.to(slices, {
							scaleY: 0,
							duration: 1.2,
							stagger: 0.05,
							ease: "power3.inOut",
							transformOrigin: (i) =>
								i % 2 === 0 ? "top center" : "bottom center",
						})
							.to(
								contentRef.current,
								{
									opacity: 1,
									visibility: "visible",
									duration: 0.5,
								},
								"-=0.5",
							)
							.set(overlayRef.current, { visibility: "hidden" });
						break;

					case "wipe":
						// Set initial state for wipe
						gsap.set(transitionElementRef.current, {
							x: "-100%",
							opacity: 1,
						});

						// Animate the wipe
						tl.to(transitionElementRef.current, {
							x: "0%",
							duration: 0.8,
							ease: "power2.inOut",
						})
							.to(transitionElementRef.current, {
								x: "100%",
								duration: 0.8,
								ease: "power2.inOut",
							})
							.to(
								contentRef.current,
								{
									opacity: 1,
									visibility: "visible",
									duration: 0.5,
								},
								"-=0.5",
							)
							.set(overlayRef.current, { visibility: "hidden" });
						break;

					case "vignette":
						// Set initial state for vignette
						gsap.set(transitionElementRef.current, {
							scale: 0,
							opacity: 1,
							borderRadius: "50%",
						});

						// Animate the vignette
						tl.to(transitionElementRef.current, {
							scale: 2,
							duration: 1.2,
							ease: "power2.inOut",
						})
							.to(
								transitionElementRef.current,
								{
									opacity: 0,
									duration: 0.5,
								},
								"-=0.3",
							)
							.to(
								contentRef.current,
								{
									opacity: 1,
									visibility: "visible",
									duration: 0.5,
								},
								"-=0.3",
							)
							.set(overlayRef.current, { visibility: "hidden" });
						break;

					case "typewriter":
						// Set initial state for typewriter blocks
						const blocks =
							transitionElementRef.current.querySelectorAll(
								".typewriter-block",
							);
						gsap.set(blocks, {
							scaleX: 1,
							transformOrigin: "right center",
						});

						// Animate the typewriter blocks
						tl.to(blocks, {
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
								"-=0.3",
							)
							.set(overlayRef.current, { visibility: "hidden" });
						break;

					case "blinds":
						// Set initial state for blinds
						const blinds =
							transitionElementRef.current.querySelectorAll(".blind");
						gsap.set(blinds, { height: "100%" });

						// Animate the blinds
						tl.to(blinds, {
							height: 0,
							duration: 1,
							stagger: 0.05,
							ease: "power3.inOut",
							transformOrigin: "top center",
						})
							.to(
								contentRef.current,
								{
									opacity: 1,
									visibility: "visible",
									duration: 0.5,
								},
								"-=0.5",
							)
							.set(overlayRef.current, { visibility: "hidden" });
						break;

					default:
						// Default slice animation
						const defaultSlices =
							transitionElementRef.current.querySelectorAll(".slice");
						gsap.set(defaultSlices, { scaleY: 1 });

						tl.to(defaultSlices, {
							scaleY: 0,
							duration: 1.2,
							stagger: 0.05,
							ease: "power3.inOut",
							transformOrigin: (i) =>
								i % 2 === 0 ? "top center" : "bottom center",
						})
							.to(
								contentRef.current,
								{
									opacity: 1,
									visibility: "visible",
									duration: 0.5,
								},
								"-=0.5",
							)
							.set(overlayRef.current, { visibility: "hidden" });
				}
			}

			return () => {
				tl.kill();
			};
		}
	}, [isFirstLoad, type, contained]);

	// Handle page transitions
	useEffect(() => {
		// Skip on first load as it's handled separately
		if (isFirstLoad) return;

		// Only run transition when pathname changes
		if (prevPathRef.current === pathname) return;

		prevPathRef.current = pathname;
		setIsTransitioning(true);

		if (!contained) {
			document.body.style.overflow = "hidden";
		}

		// Make sure overlay is visible before animation
		if (overlayRef.current) {
			gsap.set(overlayRef.current, {
				visibility: "visible",
				opacity: 1,
			});
		}

		const tl = gsap.timeline({
			onComplete: () => {
				setIsTransitioning(false);
				if (!contained) {
					document.body.style.overflow = "";
				}
			},
		});

		// First hide the current content
		tl.to(contentRef.current, { opacity: 0, duration: 0.3 });

		if (transitionElementRef.current) {
			// Different animations based on type
			switch (type) {
				case "slice":
					// Set initial state for slices
					const slices =
						transitionElementRef.current.querySelectorAll(".slice");
					gsap.set(slices, { scaleY: 0 });

					// Animate the slices in and out
					tl.to(slices, {
						scaleY: 1,
						duration: 0.8,
						stagger: 0.05,
						ease: "power3.inOut",
						transformOrigin: (i) =>
							i % 2 === 0 ? "bottom center" : "top center",
					})
						.to(slices, {
							scaleY: 0,
							duration: 0.8,
							stagger: 0.05,
							ease: "power3.inOut",
							transformOrigin: (i) =>
								i % 2 === 0 ? "top center" : "bottom center",
							delay: 0.2,
						})
						.to(
							contentRef.current,
							{
								opacity: 1,
								visibility: "visible",
								duration: 0.5,
							},
							"-=0.5",
						)
						.set(overlayRef.current, { visibility: "hidden" });
					break;

				case "wipe":
					// Set initial state for wipe
					gsap.set(transitionElementRef.current, {
						x: "-100%",
						opacity: 1,
					});

					// Animate the wipe
					tl.to(transitionElementRef.current, {
						x: "0%",
						duration: 0.8,
						ease: "power2.inOut",
					})
						.to(transitionElementRef.current, {
							x: "100%",
							duration: 0.8,
							ease: "power2.inOut",
						})
						.to(
							contentRef.current,
							{
								opacity: 1,
								visibility: "visible",
								duration: 0.5,
							},
							"-=0.5",
						)
						.set(overlayRef.current, { visibility: "hidden" });
					break;

				case "vignette":
					// Set initial state for vignette
					gsap.set(transitionElementRef.current, {
						scale: 0,
						opacity: 1,
						borderRadius: "50%",
					});

					// Animate the vignette
					tl.to(transitionElementRef.current, {
						scale: 2,
						duration: 1.2,
						ease: "power2.inOut",
					})
						.to(
							transitionElementRef.current,
							{
								opacity: 0,
								duration: 0.5,
							},
							"-=0.3",
						)
						.to(
							contentRef.current,
							{
								opacity: 1,
								visibility: "visible",
								duration: 0.5,
							},
							"-=0.3",
						)
						.set(overlayRef.current, { visibility: "hidden" });
					break;

				case "typewriter":
					// Reset and animate typewriter blocks
					const blocks =
						transitionElementRef.current.querySelectorAll(".typewriter-block");

					// First set them all to be visible
					gsap.set(blocks, {
						scaleX: 0,
						transformOrigin: "left center",
					});

					// Animate in
					tl.to(blocks, {
						scaleX: 1,
						duration: 0.8,
						stagger: 0.03,
						ease: "power2.inOut",
					})
						// Then animate out
						.to(blocks, {
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
							"-=0.3",
						)
						.set(overlayRef.current, { visibility: "hidden" });
					break;

				case "blinds":
					// Reset and animate blinds
					const blinds =
						transitionElementRef.current.querySelectorAll(".blind");

					// First set them all to be hidden
					gsap.set(blinds, { height: 0 });

					// Animate in
					tl.to(blinds, {
						height: "100%",
						duration: 0.8,
						stagger: 0.05,
						ease: "power3.inOut",
						transformOrigin: "bottom center",
					})
						// Then animate out
						.to(blinds, {
							height: 0,
							duration: 0.8,
							stagger: 0.05,
							ease: "power3.inOut",
							transformOrigin: "top center",
							delay: 0.2,
						})
						.to(
							contentRef.current,
							{
								opacity: 1,
								visibility: "visible",
								duration: 0.5,
							},
							"-=0.5",
						)
						.set(overlayRef.current, { visibility: "hidden" });
					break;

				default:
					// Default slice animation
					const defaultSlices =
						transitionElementRef.current.querySelectorAll(".slice");

					// Reset slices
					gsap.set(defaultSlices, { scaleY: 0 });

					// Animate in and out
					tl.to(defaultSlices, {
						scaleY: 1,
						duration: 0.8,
						stagger: 0.05,
						ease: "power3.inOut",
						transformOrigin: (i) =>
							i % 2 === 0 ? "bottom center" : "top center",
					})
						.to(defaultSlices, {
							scaleY: 0,
							duration: 0.8,
							stagger: 0.05,
							ease: "power3.inOut",
							transformOrigin: (i) =>
								i % 2 === 0 ? "top center" : "bottom center",
							delay: 0.2,
						})
						.to(
							contentRef.current,
							{
								opacity: 1,
								visibility: "visible",
								duration: 0.5,
							},
							"-=0.5",
						)
						.set(overlayRef.current, { visibility: "hidden" });
			}
		}

		return () => {
			tl.kill();
		};
	}, [pathname, isFirstLoad, type, contained]);

	// Render different transition elements based on type
	const renderTransitionElement = () => {
		switch (type) {
			case "slice":
				return (
					<div ref={transitionElementRef} className="w-full h-full flex">
						{[...Array(10)].map((_, i) => (
							<div
								key={i}
								className="slice h-full bg-black"
								style={{ flex: 1 }}
							></div>
						))}
					</div>
				);

			case "wipe":
				return (
					<div
						ref={transitionElementRef}
						className="w-full h-full bg-black"
					></div>
				);

			case "vignette":
				return (
					<div
						ref={transitionElementRef}
						className="w-full h-full bg-black"
						style={{ transformOrigin: "center center" }}
					></div>
				);

			case "typewriter":
				return (
					<div
						ref={transitionElementRef}
						className="w-full h-full flex flex-col"
					>
						{[...Array(20)].map((_, i) => (
							<div
								key={i}
								className="typewriter-block w-full bg-black"
								style={{ flex: 1 }}
							></div>
						))}
					</div>
				);

			case "blinds":
				return (
					<div ref={transitionElementRef} className="w-full h-full flex">
						{[...Array(12)].map((_, i) => (
							<div
								key={i}
								className="blind h-full bg-black"
								style={{ flex: 1 }}
							></div>
						))}
					</div>
				);

			default:
				return (
					<div ref={transitionElementRef} className="w-full h-full flex">
						{[...Array(10)].map((_, i) => (
							<div
								key={i}
								className="slice h-full bg-black"
								style={{ flex: 1 }}
							></div>
						))}
					</div>
				);
		}
	};

	const overlayClass = contained
		? "absolute inset-0 z-10 pointer-events-none overflow-hidden flex items-center justify-center"
		: "fixed inset-0 z-50 pointer-events-none overflow-hidden flex items-center justify-center";

	return (
		<>
			{/* Transition Overlay */}
			<div
				ref={overlayRef}
				className={overlayClass}
				style={{
					visibility: isFirstLoad || isTransitioning ? "visible" : "hidden",
					opacity: 1,
				}}
			>
				{renderTransitionElement()}
			</div>

			{/* Content Container */}
			<div
				ref={contentRef}
				className={contained ? "relative" : ""}
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

export default ModernTransition;
