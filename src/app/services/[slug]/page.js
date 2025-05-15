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
	// Unwrap params if it's a Promise
	const unwrappedParams =
		params && typeof params.then === "function" ? use(params) : params;
	const slug = unwrappedParams.slug;

	const { darkMode } = useTheme();
	const width = useWindowWidth();
	const isDesktop = width >= 1024;

	const [openMobileSections, setOpenMobileSections] = useState([]);
	const [initialMobileSections, setInitialMobileSections] = useState([]); // Initialize state here
	const mobileContentRef = useRef([]);
	const mobileImageRef = useRef([]);
	const mobileTextRef = useRef([]);

	const service = services.find(
		(s) => s.slug === slug, // No need for toLowerCase() as mentioned
	);

	const sectionRefs = useRef([]);
	const imageRefs = useRef([]);
	const leftColRef = useRef(null);
	const titleRef = useRef(null);
	const textContainerRef = useRef(null);
	const leftTextRefs = useRef([]);

	if (!service) return notFound();

	const { title, details } = service;

	const toggleMobileSection = (index) => {
		setOpenMobileSections((prev) => {
			const updated = [...prev];
			updated[index] = !updated[index];
			return updated;
		});
	};

	useEffect(() => {
		setInitialMobileSections(details.map((_, i) => i === 0));
	}, [details]);

	useEffect(() => {
		if (!isDesktop) {
			setOpenMobileSections(initialMobileSections);
		} else {
			setOpenMobileSections([]);
		}
	}, [slug, isDesktop, initialMobileSections]); // Using unwrapped slug here

	useEffect(() => {
		const mm = gsap.matchMedia();

		mm.add("(min-width: 1024px)", () => {
			gsap.set(textContainerRef.current, {
				position: "relative",
				overflow: "hidden",
			});

			leftTextRefs.current.forEach((el, i) => {
				const children = el.querySelectorAll("h2, p");
				gsap.set(children, { opacity: 0, y: -20 });

				gsap.set(el, {
					opacity: i === 0 ? 1 : 0,
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					pointerEvents: "none",
				});

				if (i === 0) {
					gsap.to(children, {
						opacity: 1,
						y: 0,
						stagger: 0.15,
						duration: 1.2,
						ease: "power4.out",
					});
				}
			});

			let currentIndex = 0;

			details.forEach((_, i) => {
				ScrollTrigger.create({
					trigger: sectionRefs.current[i],
					start: "top center",
					onEnter: () => {
						if (currentIndex !== i) {
							const oldChildren =
								leftTextRefs.current[currentIndex].querySelectorAll("h2, p");
							const newChildren =
								leftTextRefs.current[i].querySelectorAll("h2, p");

							gsap.to(leftTextRefs.current[currentIndex], {
								opacity: 0,
								duration: 0.6,
								ease: "power2.out",
							});
							gsap.set(newChildren, { opacity: 0, y: -20 });

							gsap.to(leftTextRefs.current[i], {
								opacity: 1,
								duration: 0.3,
								onComplete: () => {
									gsap.to(newChildren, {
										opacity: 1,
										y: 0,
										stagger: 0.15,
										duration: 1.2,
										ease: "power4.out",
									});
								},
							});

							currentIndex = i;
						}
					},
					onLeaveBack: () => {
						if (i > 0 && currentIndex !== i - 1) {
							const oldChildren =
								leftTextRefs.current[currentIndex].querySelectorAll("h2, p");
							const newChildren =
								leftTextRefs.current[i - 1].querySelectorAll("h2, p");

							gsap.to(leftTextRefs.current[currentIndex], {
								opacity: 0,
								duration: 0.6,
								ease: "power2.out",
							});
							gsap.set(newChildren, { opacity: 0, y: -20 });

							gsap.to(leftTextRefs.current[i - 1], {
								opacity: 1,
								duration: 0.3,
								onComplete: () => {
									gsap.to(newChildren, {
										opacity: 1,
										y: 0,
										stagger: 0.15,
										duration: 1.2,
										ease: "power4.out",
									});
								},
							});

							currentIndex = i - 1;
						}
					},
				});
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

				ScrollTrigger.create({
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
			});
		});

		// Enhanced mobile animations
		if (!isDesktop) {
			openMobileSections.forEach((isOpen, i) => {
				if (mobileContentRef.current[i]) {
					if (isOpen) {
						// Set initial state for animation
						gsap.set(mobileContentRef.current[i], {
							height: "auto",
							overflow: "hidden",
						});

						// Animate the main content container
						gsap.fromTo(
							mobileContentRef.current[i],
							{
								height: 0,
								opacity: 0,
							},
							{
								height: "auto",
								opacity: 1,
								duration: 0.6,
								ease: "power3.out",
							},
						);

						// Animate the image with a staggered reveal
						if (mobileImageRef.current[i]) {
							gsap.fromTo(
								mobileImageRef.current[i],
								{
									y: -60,
									opacity: 0,
									scale: 0.95,
								},
								{
									y: 0,
									opacity: 1,
									scale: 1,
									duration: 0.8,
									delay: 0.1,
									ease: "back.out(1.4)",
								},
							);
						}

						// Animate the text description
						if (mobileTextRef.current[i]) {
							gsap.fromTo(
								mobileTextRef.current[i],
								{
									y: -40,
									opacity: 0,
								},
								{
									y: 0,
									opacity: 1,
									duration: 0.8,
									delay: 0.2,
									ease: "power2.out",
								},
							);
						}
					} else {
						// Animate closing if the section was previously open
						gsap.to(mobileContentRef.current[i], {
							height: 0,
							opacity: 0,
							duration: 0.5,
							ease: "power2.in",
						});
					}
				}
			});
		}

		return () => mm.revert();
	}, [details, openMobileSections, isDesktop]);

	return (
		<div
			className={`w-full my-28 pt-10 px-1 transition-colors duration-300 ${darkMode ? " text-white" : " text-white"}`}
		>
			{!isDesktop && (
				<h1
					className={`text-[32px] xs:text-4xl md:text-6xl text-center tracking-widest font-bold uppercase mt-10 text-[#395299] leading-tight ${darkMode ? "text-[#fbcc03]" : "text-[#395299]"}`}
				>
					{title}
				</h1>
			)}

			<div className="lg:flex max-w-[1600px] 3xl:max-w-[1840px] mx-auto">
				{isDesktop && (
					<div
						ref={leftColRef}
						className="hidden lg:block w-full lg:w-1/2 px-6 h-screen sticky top-0"
					>
						<div className="flex flex-col h-full justify-center items-start">
							<h1
								ref={titleRef}
								className={`lg:text-5xl 2xl:text-7xl xl:text-6xl lg:tracking-wider xl:tracking-widest font-bold uppercase mb-8 text-[#395299] leading-tight ${darkMode ? "text-[#fbcc03]" : "text-[#395299]"}`}
							>
								{title}
							</h1>

							<div
								ref={textContainerRef}
								className="relative lg:h-[250px] xl:h-[340px] 2xl:h-[290px] 3xl:h-[500px] w-full max-w-[500px] 2xl:max-w-[500px] 3xl:max-w-[600px] xl:ml-[21%] 2xl:ml-[32%] 3xl:ml-[14%]"
								style={{ willChange: "transform" }}
							>
								{details.map((sec, i) => (
									<div
										key={i}
										ref={(el) => (leftTextRefs.current[i] = el)}
										className="absolute top-0 left-0 w-full"
									>
										<p
											className={`lg:text-[20px] xl:text-[22px] 3xl:text-[28px] tracking-widest ${darkMode ? "text-gray-300" : "text-black font-medium"}`}
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
						details.map((sec, i) => (
							<div
								key={i}
								ref={(el) => (sectionRefs.current[i] = el)}
								className={`px-2 py-10 flex flex-col justify-center lg:h-[500px] xl:h-[600px] 3xl:h-[800px] items-center ${i === details.length - 1 ? "mb-[20vh]" : ""}`}
							>
								<div
									className={`rounded-3xl p-8 w-full max-w-[500px] xl:max-w-[650px] 2xl:max-w-[700px] 3xl:max-w-[900px] shadow-lg ${darkMode ? "bg-black" : "bg-black border border-gray-200"}`}
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
										className="w-full lg:h-[250px] xl:h-[350px] 3xl:h-[600px] object-cover rounded-md md:rounded-xl"
									/>
								</div>
							</div>
						))
					) : (
						<div className="bg-black rounded-3xl mt-16 md:mt-20 mx-4 p-2 md:p-8 space-y-14 md:space-y-20">
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

									{/* Mobile content container with smooth animation */}
									<div
										ref={(el) => (mobileContentRef.current[i] = el)}
										className="overflow-hidden"
										style={{
											height: openMobileSections[i] ? "auto" : 0,
											opacity: openMobileSections[i] ? 1 : 0,
										}}
									>
										<div className="mt-4 px-2 text-center">
											<div
												ref={(el) => (mobileImageRef.current[i] = el)}
												className="overflow-hidden rounded-3xl mb-3"
											>
												<img
													src={sec.image || "/placeholder.svg"}
													alt={sec.heading}
													className="w-full h-[300px] object-cover"
												/>
											</div>
											<p
												ref={(el) => (mobileTextRef.current[i] = el)}
												className="text-[16px] md:text-[20px] tracking-widest text-gray-300 text-left"
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
