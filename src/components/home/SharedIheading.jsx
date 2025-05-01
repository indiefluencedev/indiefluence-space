"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

const splitText = (text, className = "") =>
	text.split("").map((char, i) => (
		<span key={i} className={`${className} inline-block`}>
			{char === " " ? "\u00A0" : char}
		</span>
	));

const SharedIheading = () => {
	const fromRef = useRef([]);
	const ideasSpan = useRef(null);
	const toRef = useRef([]);
	const impactRef = useRef([]);
	const btnRef = useRef(null);
	const arrowRef = useRef(null);

	// Animate on mount
	useEffect(() => {
		const timeline = gsap.timeline();

		// "From"
		timeline.from(fromRef.current, {
			y: 80,
			opacity: 0,
			stagger: 0.04,
			duration: 1,
			ease: "power3.out",
		});

		// Scramble animation for "IDEAS"
		timeline.fromTo(
			ideasSpan.current,
			{ text: "....." },
			{
				text: "IDEAS",
				duration: 1.2,
				delay: 0.2,
				ease: "power2.out",
			},
			"-=0.6",
		);

		// "TO"
		timeline.from(
			toRef.current,
			{
				y: 50,
				opacity: 0,
				stagger: 0.1,
				duration: 0.8,
			},
			"-=0.5",
		);

		// Reveal animation for "IMPACT"
		timeline.from(
			impactRef.current,
			{
				y: 100,
				opacity: 0,
				scale: 0.8,
				filter: "blur(6px)",
				duration: 1.2,
				stagger: 0.05,
				ease: "power4.out",
			},
			"-=0.6",
		);
	}, []);

	// Button hover microinteraction
	useEffect(() => {
		const btn = btnRef.current;
		const arrow = arrowRef.current;
		if (!btn || !arrow) return;

		const tl = gsap.timeline({ paused: true });
		tl.to(arrow, { x: 6, duration: 0.3, ease: "power1.out" });

		btn.addEventListener("mouseenter", () => tl.play());
		btn.addEventListener("mouseleave", () => tl.reverse());

		return () => {
			btn.removeEventListener("mouseenter", () => tl.play());
			btn.removeEventListener("mouseleave", () => tl.reverse());
		};
	}, []);

	// Utility to collect refs for span arrays
	const attachRefs = (arr, refArray) => (el) => {
		if (el && !refArray.current.includes(el)) refArray.current.push(el);
	};

	return (
		<div className="flex flex-col w-full py-6 sm:py-8 md:py-10 lg:py-16 px-1 sm:px-2 md:px-4 lg:px-8 bg-white">
			{/* Main slogan */}
			<div className="text-left mt-6 sm:mt-8 md:mt-10 lg:mt-20 mb-6 sm:mb-7 md:mb-8 lg:mb-10 font-bold tracking-tight leading-none">
				<div className="text-[2.5rem] xss:text-[3rem] xs:text-[3.5rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] xl:text-[7rem] 2xl:text-[8rem]">
					{splitText("From", "").map((el, i) =>
						React.cloneElement(el, {
							ref: attachRefs(el, fromRef),
						}),
					)}
				</div>

				{/* "IDEAS" with scramble effect */}
				<div className="flex items-center mt-1 xs:mt-1.5 sm:mt-2">
					<span
						ref={ideasSpan}
						className="text-[3.5rem] xss:text-[4.5rem] xs:text-[5.5rem] sm:text-[6.5rem] md:text-[7rem] lg:text-[9rem] xl:text-[10rem] 2xl:text-[12rem] ml-4 xs:ml-6 sm:ml-8 md:ml-12 lg:ml-16 text-[#fbcc03]"
					>
						IDEAS
					</span>
				</div>

				<div className="text-[1.8rem] xss:text-[2.2rem] xs:text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] xl:text-[5rem] 2xl:text-[6rem] mt-1 xs:mt-1.5 sm:mt-2 md:mt-3">
					{splitText("TO").map((el, i) =>
						React.cloneElement(el, {
							ref: attachRefs(el, toRef),
						}),
					)}
				</div>

				<div className="text-[4rem] xss:text-[6rem] xs:text-[7rem] sm:text-[10rem] md:text-[10rem] lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem] text-[#395299] mt-1 xs:mt-1.5 sm:mt-2">
					{splitText("IMPACT").map((el, i) =>
						React.cloneElement(el, {
							ref: attachRefs(el, impactRef),
						}),
					)}
				</div>
			</div>

			{/* Tagline and button */}
			<div className="ml-auto text-right max-w-full xs:max-w-[90%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-[75%] xl:max-w-[70%]">
				<p className="text-xs xss:text-sm xs:text-base sm:text-[1.05rem] md:text-lg mb-3 xs:mb-4 sm:mb-5 md:mb-6">
					We are a bunch of{" "}
					<span className="font-bold text-[#fbcc03] text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl">
						Psychology
					</span>{" "}
					geeks who also happen to run a{" "}
					<span className="font-bold text-[#fbcc03] text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl">
						Marketing Company
					</span>
				</p>
				<button
					ref={btnRef}
					className="border border-black px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 py-1.5 xs:py-2 sm:py-2.5 inline-flex items-center text-xs xss:text-sm xs:text-base"
				>
					LET'S TALK
					<svg
						ref={arrowRef}
						className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 ml-1 xs:ml-1.5 sm:ml-2"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M5 12H19M19 12L13 6M19 12L13 18"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default SharedIheading;
