"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { QuantumButton } from "../UI/SpinDielButton";
gsap.registerPlugin(TextPlugin);

// Hoverable Letter component for interactive text - now respects theme
const HoverableLetter = ({ letter, className = "", reverse = false }) => {
	const [isHovering, setIsHovering] = useState(false);
	const letterRef = useRef(null);

	useEffect(() => {
		if (!letterRef.current) return;

		if (isHovering) {
			gsap.to(letterRef.current, {
				color: reverse ? "var(--primary-color)" : "var(--secondary-color)",
				scale: 1.1,
				duration: 0.2,
				ease: "power1.out",
			});
		} else {
			gsap.to(letterRef.current, {
				color: reverse ? "var(--secondary-color)" : "var(--primary-color)",
				scale: 1,
				duration: 0.2,
				ease: "power1.out",
			});
		}
	}, [isHovering, reverse]);

	return (
		<span
			ref={letterRef}
			className={`hoverable-letter inline-block ${className}`}
			style={{
				color: reverse ? "var(--secondary-color)" : "var(--primary-color)",
				transition: "none",
			}}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			{letter === " " ? "\u00A0" : letter}
		</span>
	);
};

// Updated component for text with hoverable letters - uses CSS vars
const HoverableText = ({
	text,
	isSecondary = false,
	reverse = false,
	className = "",
}) => {
	return (
		<div className={className}>
			{text.split("").map((letter, index) => (
				<HoverableLetter
					key={index}
					letter={letter}
					className={isSecondary ? "text-[var(--secondary-color)]" : ""}
					reverse={reverse}
				/>
			))}
		</div>
	);
};

// Original SpinDialText component with added theme awareness
const SpinDialText = ({ text, isHovering, duration = 0.5 }) => {
	const charRefs = useRef([]);

	useEffect(() => {
		if (!isHovering) return;

		// Cancel any existing animations
		charRefs.current.forEach((ref) => {
			if (ref) gsap.killTweensOf(ref);
		});

		// Create quick spin animations with slight stagger
		charRefs.current.forEach((charEl, index) => {
			if (!charEl) return;

			const targetChar = text[index];

			gsap.fromTo(
				charEl,
				{ innerHTML: Math.random() > 0.5 ? "0" : "A" },
				{
					duration: duration,
					innerHTML: targetChar,
					ease: "steps(5)",
					delay: index * 0.03, // Very short stagger
					onUpdate: function () {
						// During animation, show random characters
						if (this.progress() < 0.8) {
							const randomChar =
								Math.random() > 0.5
									? String.fromCharCode(65 + Math.floor(Math.random() * 26))
									: // A-Z
										Math.floor(Math.random() * 10).toString(); // 0-9
							charEl.innerHTML = randomChar;
						} else {
							// Final character
							charEl.innerHTML = targetChar;
						}
					},
				},
			);
		});
	}, [isHovering, text, duration]);

	return (
		<span className="inline-flex">
			{text.split("").map((char, index) => (
				<span
					key={index}
					ref={(el) => (charRefs.current[index] = el)}
					className="inline-block font-mono"
					style={{ width: "0.8em", textAlign: "center" }}
				>
					{char}
				</span>
			))}
		</span>
	);
};

const splitText = (text, className = "") =>
	text.split("").map((char, i) => (
		<span key={i} className={`${className} inline-block text-current`}>
			{char === " " ? "\u00A0" : char}
		</span>
	));

const SharedHeading = () => {
	// Create refs for text animations
	const fromRef = useRef(null);
	const ideasSpan = useRef(null);
	const toRef = useRef(null);
	const impactSpan = useRef(null);

	// State management
	const [buttonHover, setButtonHover] = useState(false);
	const [ideasVisible, setIdeasVisible] = useState(false);
	const [impactVisible, setImpactVisible] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(false);

	// Refs for button animations
	const btnBlackRef = useRef(null);
	const textBlackRef = useRef(null);
	const underlineRef = useRef(null);

	// Store animation timelines
	const mainTl = useRef(null);

	// Check for dark mode
	useEffect(() => {
		const checkDarkMode = () => {
			const isDark =
				document.documentElement.getAttribute("data-dark-mode") === "true";
			setIsDarkMode(isDark);
		};

		// Initial check
		checkDarkMode();

		// Set up observer for theme changes
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (
					mutation.type === "attributes" &&
					mutation.attributeName === "data-dark-mode"
				) {
					checkDarkMode();
				}
			});
		});

		observer.observe(document.documentElement, { attributes: true });

		// Clean up observer
		return () => observer.disconnect();
	}, []);

	// Animate on mount with proper cleanup
	useEffect(() => {
		// Kill any existing animations on component mount
		if (mainTl.current) {
			mainTl.current.kill();
		}

		// Reset visibility state
		setIdeasVisible(false);
		setImpactVisible(false);

		// Create a new timeline
		mainTl.current = gsap.timeline();

		// "From" text animation
		mainTl.current.fromTo(
			fromRef.current.children,
			{
				y: 80,
				opacity: 0,
				color: "currentColor", // Explicitly set color
			},
			{
				y: 0,
				opacity: 1,
				color: "currentColor", // Ensure text color is inherited
				stagger: 0.04,
				duration: 1,
				ease: "power3.out",
			},
		);

		// Scramble animation for "IDEAS"
		mainTl.current.fromTo(
			ideasSpan.current,
			{ text: "....." },
			{
				text: "IDEAS",
				duration: 1.2,
				delay: 0.2,
				ease: "power2.out",
				onComplete: () => setIdeasVisible(true),
			},
			"-=0.6",
		);

		// "TO" animation
		mainTl.current.fromTo(
			toRef.current.children,
			{
				y: 50,
				opacity: 0,
				color: "currentColor", // Explicitly set color
			},
			{
				y: 0,
				opacity: 1,
				color: "currentColor", // Ensure text color is inherited
				stagger: 0.1,
				duration: 0.8,
			},
			"-=0.5",
		);

		// Scramble animation for "IMPACT"
		mainTl.current.fromTo(
			impactSpan.current,
			{ text: "......" },
			{
				text: "IMPACT",
				duration: 1.2,
				ease: "power2.out",
				onComplete: () => setImpactVisible(true),
			},
			"-=0.6",
		);

		// Cleanup function
		return () => {
			if (mainTl.current) {
				mainTl.current.kill();
			}
		};
	}, []);

	// Button hover animations
	useEffect(() => {
		if (!btnBlackRef.current || !underlineRef.current) return;

		if (buttonHover) {
			// Animate the yellow underline to appear on hover
			gsap.to(underlineRef.current, {
				width: "100%",
				duration: 0.3,
				ease: "power2.out",
			});
		} else {
			// Animate the yellow underline to disappear on hover out
			gsap.to(underlineRef.current, {
				width: 0,
				duration: 0.3,
				ease: "power2.out",
			});
		}
	}, [buttonHover]);

	return (
		<div className="flex flex-col w-full py-2 sm:py-4 md:py-8 lg:pt-0 lg:pb-20 px-1 sm:px-2 md:px-4 lg:px-8">
			{/* Main slogan */}
			<div className="text-left mb-2 sm:mb-4 md:mb-8 lg:mb-10 font-bold tracking-tight leading-none">
				<div
					ref={fromRef}
					className="text-[2rem] xss:text-[2.5rem] xs:text-[3rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[5rem] xl:text-[6rem] 2xl:text-[7rem] text-current"
				>
					{splitText("From", "")}
				</div>

				{/* "IDEAS" with scramble effect and hover */}
				<div className="flex items-center mt-1 xs:mt-1.5 sm:mt-2">
					<span
						ref={ideasSpan}
						className={`text-[3rem] xss:text-[3.5rem] xs:text-[4.5rem] sm:text-[5.5rem] md:text-[6rem] lg:text-[7rem] xl:text-[8rem] 2xl:text-[9rem] ml-12 sm:ml-16 md:ml-20 text-[var(--primary-color)] ${ideasVisible ? "hidden" : ""}`}
					>
						IDEAS
					</span>
					{ideasVisible && (
						<HoverableText
							text="IDEAS"
							className="text-[3rem] xss:text-[3.5rem] xs:text-[4.5rem] sm:text-[5.5rem] md:text-[6rem] lg:text-[7rem] xl:text-[8rem] 2xl:text-[9rem] ml-4 xs:ml-6 sm:ml-8 md:ml-12 lg:ml-16 font-bold"
						/>
					)}
				</div>

				<div
					ref={toRef}
					className="text-[1.5rem] xss:text-[1.8rem] xs:text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] xl:text-[4rem] 2xl:text-[5rem] mt-1 xs:mt-1.5 sm:mt-2 md:mt-3 text-current"
				>
					{splitText("TO", "")}
				</div>

				{/* "IMPACT" with scramble effect and hover */}
				<div className="flex items-start">
					<span
						ref={impactSpan}
						className={`text-[3.5rem] xss:text-[4.5rem] xs:text-[5.5rem] sm:text-[7rem] md:text-[8rem] lg:text-[7rem] xl:text-[10rem] 2xl:text-[11rem] text-[var(--secondary-color)] mt-1 xs:mt-1.5 sm:mt-2 ${impactVisible ? "hidden" : ""}`}
					>
						IMPACT
					</span>
					{impactVisible && (
						<HoverableText
							text="IMPACT"
							reverse={true}
							className="text-[3.5rem] xss:text-[4.5rem] xs:text-[5.5rem] sm:text-[7rem] md:text-[8rem] lg:text-[7rem] xl:text-[10rem] 2xl:text-[11rem] mt-1 xs:mt-1.5 sm:mt-2 font-bold text-[var(--secondary-color)]"
						/>
					)}
				</div>
			</div>

			{/* Tagline and button */}
			<div className="ml-30 text-right max-w-full xs:max-w-[90%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-[75%] xl:max-w-[70%]">
				<p className="text-xs xss:text-sm xs:text-base sm:text-[1.05rem] md:text-lg mb-3 xs:mb-4 sm:mb-5 md:mb-6">
					We are a bunch of{" "}
					<span className="font-bold text-[var(--primary-color)] text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl">
						Psychology
					</span>{" "}
					geeks who also happen to run a{" "}
					<span className="font-bold text-[var(--primary-color)] text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl">
						Marketing Company
					</span>
				</p>

				<div className="justify-end flex items-center">
					<QuantumButton
						text="LET'S TALK"
						className="mt-4 xs:mt-5 sm:mt-6 md:mt-4"
					/>
				</div>
			</div>
		</div>
	);
};

export default SharedHeading;
