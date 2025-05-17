"use client";

import { useRef, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { services } from "@/data/services";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/context/TheamContext";
import useWindowWidth from "@/hooks/useWindowWidth";
import { ArrowUpRight } from "lucide-react";
import { use } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function ServiceDetailPage({ params }) {
	const unwrappedParams =
		params && typeof params.then === "function" ? use(params) : params;
	const slug = unwrappedParams.slug;

	const { darkMode } = useTheme();
	const width = useWindowWidth();
	const isDesktop = width >= 1024;

	const [openMobileSections, setOpenMobileSections] = useState([]);
	const [initialMobileSections, setInitialMobileSections] = useState([]);
	const mobileContentRef = useRef([]);
	const mobileImageRef = useRef([]);
	const mobileTextRef = useRef([]);

	const service = services.find((s) => s.slug === slug);

	const sectionRefs = useRef([]);
	const imageRefs = useRef([]);
	const leftColRef = useRef(null);
	const titleRef = useRef(null);
	const textContainerRef = useRef(null);
	const leftTextRefs = useRef([]);
	const scrollTriggers = useRef([]);

	if (!service) return notFound();

	const { title, details } = service;

	const toggleMobileSection = (index) => {
		const updated = [...openMobileSections];
		updated[index] = !updated[index];
		setOpenMobileSections(updated);

		// Animate only the toggled section
		animateMobileSection(index, updated[index]);
	};

	const animateMobileSection = (index, isOpen) => {
		const contentEl = mobileContentRef.current[index];
		const imageEl = mobileImageRef.current[index];
		const textEl = mobileTextRef.current[index];

		if (!contentEl) return;

		gsap.killTweensOf([contentEl, imageEl, textEl]);

		if (isOpen) {
			gsap.set(contentEl, {
				display: "block",
				overflow: "hidden",
			});

			const fullHeight = contentEl.scrollHeight;

			gsap.fromTo(
				contentEl,
				{ height: 0, opacity: 0 },
				{
					height: fullHeight,
					opacity: 1,
					duration: 0.4,
					ease: "power2.out",
					onComplete: () => {
						gsap.set(contentEl, { height: "auto" });
					},
				}
			);

			if (imageEl) {
				gsap.fromTo(
					imageEl,
					{ y: -60, opacity: 0, scale: 0.95 },
					{
						y: 0,
						opacity: 1,
						scale: 1,
						duration: 0.6,
						delay: 0.1,
						ease: "back.out(1.4)",
					}
				);
			}

			if (textEl) {
				gsap.fromTo(
					textEl,
					{ y: -40, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						duration: 0.6,
						delay: 0.2,
						ease: "power2.out",
					}
				);
			}
		} else {
			const currentHeight = contentEl.offsetHeight;

			gsap.fromTo(
				contentEl,
				{ height: currentHeight, opacity: 1 },
				{
					height: 0,
					opacity: 0,
					duration: 0.4,
					ease: "power2.inOut",
					onComplete: () => {
						gsap.set(contentEl, { display: "none", height: "auto" });
					},
				}
			);
		}
	};

	useEffect(() => {
		setInitialMobileSections(details.map((_, i) => i === 0));
	}, [details]);

	useEffect(() => {
		if (!isDesktop) {
			setOpenMobileSections(details.map((_, i) => i === 0));
		} else {
			setOpenMobileSections([]);
		}

		// ✅ Animate first section on load if mobile
		setTimeout(() => {
			if (!isDesktop && mobileContentRef.current[0]) {
				animateMobileSection(0, true);
			}
		}, 100); // slight delay to ensure refs are set
	}, [slug, isDesktop, details]);

	useEffect(() => {
		if (!isDesktop) return;
		
		// Clean up previous scroll triggers
		if (scrollTriggers.current.length) {
			scrollTriggers.current.forEach(trigger => trigger.kill());
			scrollTriggers.current = [];
		}

		const mm = gsap.matchMedia();

		mm.add("(min-width: 1024px)", () => {
			gsap.set(textContainerRef.current, {
				position: "relative",
				overflow: "visible",
			});

			leftTextRefs.current.forEach((el, i) => {
				if (!el) return;
				
				const children = el.querySelectorAll("h2, p");
				
				if (i === 0) {
					// Make first description visible always
					gsap.set(el, {
						opacity: 1,
						position: i === 0 ? "relative" : "absolute",
						top: 0,
						left: 0,
						width: "100%",
						pointerEvents: "auto",
					});
					
					gsap.to(children, {
						opacity: 1,
						y: 0,
						duration: 1.2,
						ease: "power2.out",
					});
				} else {
					gsap.set(children, { opacity: 0, y: -20 });
					gsap.set(el, {
						opacity: 0,
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						pointerEvents: "none",
					});
				}
			});

			let currentIndex = 0;

			// Create better scroll triggers for each section
			details.forEach((_, i) => {
				const trigger = ScrollTrigger.create({
					trigger: sectionRefs.current[i],
					start: "top 40%", // Adjusted to trigger earlier
					end: "bottom 40%", // Adjusted end position
					onEnter: () => {
						if (currentIndex !== i) {
							const oldChildren =
								leftTextRefs.current[currentIndex]?.querySelectorAll("h2, p");
							const newChildren =
								leftTextRefs.current[i]?.querySelectorAll("h2, p");
							
							if (leftTextRefs.current[currentIndex]) {
								gsap.to(leftTextRefs.current[currentIndex], {
									opacity: 0,
									duration: 0.4,
									ease: "power2.out",
								});
							}
							
							if (leftTextRefs.current[i] && newChildren) {
								gsap.set(newChildren, { opacity: 0, y: -20 });

								gsap.to(leftTextRefs.current[i], {
									opacity: 1,
									duration: 0.3,
									onComplete: () => {
										gsap.to(newChildren, {
											opacity: 1,
											y: 0,
											stagger: 0.1,
											duration: 0.8,
											ease: "power3.out",
										});
									},
								});
							}

							currentIndex = i;
						}
					},
					onLeaveBack: () => {
						if (i > 0 && currentIndex === i) {
							const prevIndex = i - 1;
							
							if (leftTextRefs.current[currentIndex]) {
								gsap.to(leftTextRefs.current[currentIndex], {
									opacity: 0,
									duration: 0.4,
									ease: "power2.out",
								});
							}
							
							if (leftTextRefs.current[prevIndex]) {
								const newChildren = leftTextRefs.current[prevIndex].querySelectorAll("h2, p");
								gsap.set(newChildren, { opacity: 0, y: -20 });

								gsap.to(leftTextRefs.current[prevIndex], {
									opacity: 1,
									duration: 0.3,
									onComplete: () => {
										gsap.to(newChildren, {
											opacity: 1,
											y: 0,
											stagger: 0.1,
											duration: 0.8,
											ease: "power3.out",
										});
									},
								});
							}

							currentIndex = prevIndex;
						}
					},
					markers: false, // Set to true for debugging
				});
				
				scrollTriggers.current.push(trigger);
			});
		});

		mm.add("(min-width: 0px)", () => {
			gsap.from(titleRef.current, {
				x: -100,
				opacity: 0,
				duration: 1,
				ease: "power4.out",
			});

			imageRefs.current.forEach((imgEl) => {
				gsap.set(imgEl, { opacity: 0 });

				const trigger = ScrollTrigger.create({
					trigger: imgEl,
					start: "top 80%",
					onEnter: () => {
						gsap.to(imgEl, {
							opacity: 1,
							duration: 0.5,
							ease: "power2.out",
						});
					},
					onLeaveBack: () => {
						gsap.to(imgEl, {
							opacity: 1,
							duration: 0.2,
						});
					},
					once: true,
				});
				
				scrollTriggers.current.push(trigger);
			});
		});

		return () => {
			mm.revert();
			scrollTriggers.current.forEach(trigger => trigger.kill());
		};
	}, [details, isDesktop]);

	return (
		<div
			className={`w-full my-10 md:my-16 lg:my-20 pt-10 lg:mt-20 xl:mt-20 2xl:mt-20 3xl:mt-20 px-1 transition-colors duration-300 ${darkMode ? " text-white" : " text-white"}`}
		>
			{!isDesktop && (
				<h1
					ref={titleRef}
					className={`text-[32px] xs:text-4xl md:text-6xl text-center tracking-widest font-bold uppercase mt-10 text-[#395299] leading-tight ${darkMode ? "text-[#fbcc03]" : "text-[#395299]"}`}
				>
					{title}
				</h1>
			)}

			<div className="lg:flex max-w-[1600px] 3xl:max-w-[1840px] mx-auto items-start">
				{isDesktop && (
					<div
						ref={leftColRef}
						className="hidden lg:block w-full lg:w-1/2 px-6 sticky top-24 pt-8"
					>
						<div className="flex flex-col justify-start items-start">
							<h1
								className={`lg:text-5xl 2xl:text-7xl xl:text-6xl lg:tracking-wider xl:tracking-widest font-bold uppercase mb-8 text-[#395299] leading-tight ${
									darkMode ? "text-[#fbcc03]" : "text-[#395299]"
								}`}
							>
								{title}
							</h1>

							<div
								ref={textContainerRef}
								className="relative w-full max-w-[500px] 2xl:max-w-[550px] 3xl:max-w-[600px] min-h-[200px]"
								style={{ willChange: "transform" }}
							>
								{details.map((sec, i) => (
									<div
										key={i}
										ref={(el) => (leftTextRefs.current[i] = el)}
										className={`${i === 0 ? "" : "absolute"} top-0 left-0 w-full`}
									>
										<p
											className={`lg:text-[20px] xl:text-[22px] 3xl:text-[28px] tracking-widest ${
												darkMode ? "text-gray-300" : "text-black font-medium"
											}`}
										>
											{sec.description}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>
				)}

				<div className="w-full lg:w-1/2">
					{isDesktop ? (
						<div className="space-y-6">
							{details.map((sec, i) => (
								<div
									key={i}
									ref={(el) => (sectionRefs.current[i] = el)}
									className="pb-2"
								>
									<div className="px-2 md:px-4">
										<div
											className={`rounded-3xl p-8 w-full max-w-[500px] xl:max-w-[650px] 2xl:max-w-[700px] 3xl:max-w-[900px] shadow-lg ${
												darkMode ? "bg-black" : "bg-black border border-gray-200"
											}`}
										>
											<div className="flex justify-between items-center mb-4">
												<h3 className="text-2xl pb-3 font-semibold tracking-widest">
													{sec.heading}
												</h3>
											</div>
											<img
												ref={(el) => (imageRefs.current[i] = el)}
												src={sec.image || "/placeholder.svg"}
												alt={sec.heading}
												className="w-full h-auto aspect-video object-cover rounded-md md:rounded-xl"
											/>
										</div>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="bg-black rounded-3xl mt-16 md:mt-20 mx-4 px-2 md:px-8 py-4 md:py-8 space-y-14 md:space-y-20">
							{details.map((sec, i) => (
								<div key={i}>
									<button
										onClick={() => toggleMobileSection(i)}
										className="w-full text-left px-4 py-3 md:py-5 flex justify-between items-center rounded-xl text-white"
									>
										<h3 className="font-bold xxs:text-[16px] xs:text-[20px] md:text-[28px] tracking-widest">
											{sec.heading}
										</h3>
										<ArrowUpRight
											className={`md:w-12 md:h-12 w-8 h-8 transition-transform duration-300 ${
												openMobileSections[i]
													? "rotate-0 text-[#fbcc03]"
													: "rotate-[90deg] text-gray-400"
											}`}
										/>
									</button>

									<div
										ref={(el) => (mobileContentRef.current[i] = el)}
										className="overflow-hidden"
										style={{ display: "none" }}
									>
										<div className="mt-4 px-2 text-center">
											<div
												ref={(el) => (mobileImageRef.current[i] = el)}
												className="overflow-hidden rounded-3xl mb-3"
											>
												<img
													src={sec.image || "/placeholder.svg"}
													alt={sec.heading}
													className="w-full h-[180px] sm:h-[280px] md:h-[350px] object-cover"
												/>
											</div>
											<p
												ref={(el) => (mobileTextRef.current[i] = el)}
												className="text-[16px] md:text-[20px] text-gray-300 text-left"
											>
												{sec.description}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}