"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useTheme } from "@/context/TheamContext";

gsap.registerPlugin(TextPlugin);

// SpinDialText Component - Preserving your original text animation
const SpinDialText = ({ text = "BUTTON", isHovering, duration = 0.5 }) => {
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

// Button Controls Component
export const ButtonControls = ({ onSizeChange }) => {
	const [width, setWidth] = useState(300);
	const [height, setHeight] = useState(80);

	const handleWidthChange = (e) => {
		const newWidth = Math.max(300, parseInt(e.target.value) || 300);
		setWidth(newWidth);
		onSizeChange({ width: newWidth, height });
	};

	const handleHeightChange = (e) => {
		const newHeight = Math.max(80, parseInt(e.target.value) || 80);
		setHeight(newHeight);
		onSizeChange({ width, height: newHeight });
	};

	return (
		<div className="p-4 mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
			<h3 className="text-lg font-medium mb-4 dark:text-white">
				Button Size Controls
			</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium mb-1 dark:text-gray-300">
						Width (min 300px)
					</label>
					<input
						type="number"
						min="300"
						value={width}
						onChange={handleWidthChange}
						className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium mb-1 dark:text-gray-300">
						Height (min 80px)
					</label>
					<input
						type="number"
						min="80"
						value={height}
						onChange={handleHeightChange}
						className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
					/>
				</div>
			</div>
		</div>
	);
};

// Base Button Styles
const baseButtonStyles = {
	minWidth: 300,
	minHeight: 80,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	fontSize: "1.1rem",
	fontWeight: "bold",
	borderRadius: "8px",
	cursor: "pointer",
	transition: "all 0.3s ease",
};

// Button 1: CosmicPulseButton - EXPLORESPACE
export const CosmicPulseButton = ({
	text = "EXPLORESPACE",
	onClick,
	className = "",
	width = 300,
	height = 80,
}) => {
	const { darkMode } = useTheme();
	const [isHovering, setIsHovering] = useState(false);
	const buttonRef = useRef(null);
	const pulseRef = useRef(null);

	// Theme-aware colors
	const bgColor = darkMode ? "var(--secondary-color)" : "var(--primary-color)";
	const textColor = darkMode ? "white" : "black";
	const pulseColor = darkMode
		? "var(--secondary-color)"
		: "var(--primary-color)";

	useEffect(() => {
		if (!buttonRef.current || !pulseRef.current) return;

		if (isHovering) {
			// Pulse animation
			gsap.fromTo(
				pulseRef.current,
				{
					scale: 0,
					opacity: 0.8,
				},
				{
					scale: 1.5,
					opacity: 0,
					duration: 0.8,
					ease: "power2.out",
					repeat: -1,
				},
			);

			// Button subtle scaling
			gsap.to(buttonRef.current, {
				scale: 1.05,
				duration: 0.3,
				ease: "back.out(1.5)",
			});
		} else {
			// Kill pulse animation
			gsap.killTweensOf(pulseRef.current);
			gsap.set(pulseRef.current, {
				scale: 0,
				opacity: 0,
			});

			// Reset button scale
			gsap.to(buttonRef.current, {
				scale: 1,
				duration: 0.3,
			});
		}
	}, [isHovering]);

	return (
		<button
			ref={buttonRef}
			style={{
				...baseButtonStyles,
				backgroundColor: bgColor,
				color: textColor,
				width: `${width}px`,
				height: `${height}px`,
			}}
			className={`relative ${className}`}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			onClick={onClick}
		>
			{/* Pulse effect */}
			<div
				ref={pulseRef}
				style={{ backgroundColor: pulseColor }}
				className="absolute inset-0 rounded-md pointer-events-none opacity-0"
			/>

			{/* Button content */}
			<div className="flex items-center justify-center relative z-10">
				<SpinDialText text={text} isHovering={isHovering} duration={0.4} />
				<svg
					className="w-4 h-4 ml-3"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M5 12H19M19 12L13 6M19 12L13 18"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</div>
		</button>
	);
};

// Button 2: WarpDriveButton - WARP SPEED
export const WarpDriveButton = ({
	text = "WARP SPEED",
	onClick,
	className = "",
	width = 300,
	height = 80,
}) => {
	const { darkMode } = useTheme();
	const [isHovering, setIsHovering] = useState(false);
	const buttonRef = useRef(null);
	const bgRef = useRef(null);
	const warpLinesRef = useRef(null);

	// Theme-aware colors
	const primaryColor = "var(--primary-color)";
	const secondaryColor = "var(--secondary-color)";
	const bgColor = darkMode ? secondaryColor : "white";
	const textColor = darkMode ? "white" : secondaryColor;

	useEffect(() => {
		if (!buttonRef.current || !bgRef.current || !warpLinesRef.current) return;

		if (isHovering) {
			// Slide in the background
			gsap.to(bgRef.current, {
				width: "100%",
				duration: 0.4,
				ease: "power2.out",
			});

			// Text color change
			gsap.to(buttonRef.current, {
				color: darkMode ? secondaryColor : "white",
				duration: 0.4,
			});

			// Warp lines animation
			gsap.fromTo(
				warpLinesRef.current.children,
				{
					scaleX: 0,
					opacity: 0.7,
				},
				{
					scaleX: 1,
					opacity: 0,
					duration: 0.8,
					stagger: 0.05,
					ease: "power2.inOut",
					repeat: -1,
				},
			);
		} else {
			// Reset animations
			gsap.killTweensOf(warpLinesRef.current.children);

			// Hide background
			gsap.to(bgRef.current, {
				width: "0%",
				duration: 0.4,
			});

			// Reset text color
			gsap.to(buttonRef.current, {
				color: textColor,
				duration: 0.4,
			});
		}
	}, [isHovering, darkMode]);

	// Create warp lines
	const warpLines = Array(8).fill(0);

	return (
		<button
			ref={buttonRef}
			style={{
				...baseButtonStyles,
				backgroundColor: "transparent",
				color: textColor,
				borderColor: darkMode ? "white" : secondaryColor,
				borderWidth: "2px",
				width: `${width}px`,
				height: `${height}px`,
			}}
			className={`relative overflow-hidden font-medium rounded-md ${className}`}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			onClick={onClick}
		>
			{/* Sliding background */}
			<div
				ref={bgRef}
				style={{ backgroundColor: darkMode ? primaryColor : secondaryColor }}
				className="absolute inset-y-0 left-0 w-0 z-0"
			/>

			{/* Warp speed lines */}
			<div
				ref={warpLinesRef}
				className="absolute inset-0 flex justify-around items-center pointer-events-none z-0"
			>
				{warpLines.map((_, i) => (
					<div
						key={i}
						style={{
							backgroundColor: darkMode ? "rgba(251, 204, 3, 0.7)" : "white",
							height: `${Math.random() * 80 + 20}%`,
							width: "1px",
							transformOrigin: "left center",
						}}
					/>
				))}
			</div>

			{/* Button content */}
			<div className="relative z-10 flex items-center justify-center">
				<span>{text}</span>
				<svg
					className="w-4 h-4 ml-3"
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
			</div>
		</button>
	);
};

// Button 3: ConstellationButton - NAVIGATE STARS
export const ConstellationButton = ({
	text = "NAVIGATE STARS",
	onClick,
	className = "",
	width = 300,
	height = 80,
}) => {
	const { darkMode } = useTheme();
	const [isHovering, setIsHovering] = useState(false);
	const buttonRef = useRef(null);
	const starsRef = useRef(null);

	// Theme-aware colors
	const bgColor = darkMode ? "#111827" : "white";
	const textColor = darkMode
		? "var(--primary-color)"
		: "var(--secondary-color)";
	const borderColor = darkMode
		? "var(--primary-color)"
		: "var(--secondary-color)";
	const starColor = darkMode
		? "var(--primary-color)"
		: "var(--secondary-color)";

	// Generate stars
	const stars = Array(20)
		.fill(0)
		.map(() => ({
			left: `${Math.random() * 100}%`,
			top: `${Math.random() * 100}%`,
			size: `${Math.random() * 3 + 1}px`,
			delay: Math.random() * 0.5,
		}));

	useEffect(() => {
		if (!buttonRef.current || !starsRef.current) return;

		if (isHovering) {
			// Animate stars appearance
			gsap.to(starsRef.current.children, {
				opacity: 1,
				scale: 1,
				duration: 0.5,
				stagger: 0.02,
				ease: "back.out(2)",
			});

			// Animate button
			gsap.to(buttonRef.current, {
				borderColor: darkMode
					? "rgba(251, 204, 3, 0.7)"
					: "rgba(57, 82, 153, 0.7)",
				boxShadow: `0 0 15px ${darkMode ? "rgba(251, 204, 3, 0.3)" : "rgba(57, 82, 153, 0.3)"}`,
				duration: 0.3,
			});
		} else {
			// Reset animations
			gsap.to(starsRef.current.children, {
				opacity: 0,
				scale: 0.5,
				duration: 0.3,
				stagger: 0.01,
			});

			// Reset button
			gsap.to(buttonRef.current, {
				borderColor: borderColor,
				boxShadow: "none",
				duration: 0.3,
			});
		}
	}, [isHovering, darkMode]);

	return (
		<button
			ref={buttonRef}
			style={{
				...baseButtonStyles,
				backgroundColor: bgColor,
				color: textColor,
				borderColor: borderColor,
				borderWidth: "2px",
				width: `${width}px`,
				height: `${height}px`,
			}}
			className={`relative overflow-hidden rounded-md ${className}`}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			onClick={onClick}
		>
			{/* Stars */}
			<div ref={starsRef} className="absolute inset-0 pointer-events-none">
				{stars.map((star, index) => (
					<div
						key={index}
						className="absolute rounded-full"
						style={{
							left: star.left,
							top: star.top,
							width: star.size,
							height: star.size,
							backgroundColor: starColor,
							opacity: 0,
							transform: "scale(0.5)",
							boxShadow: `0 0 5px ${starColor}`,
						}}
					/>
				))}
			</div>

			{/* Button content */}
			<div className="flex items-center justify-center relative z-10">
				<span>{text}</span>
				<svg
					className="w-4 h-4 ml-3"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12 5L19 12M19 12L12 19M19 12H5"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</div>
		</button>
	);
};

// Button 4: QuantumButton - QUANTUMJUMP
export const QuantumButton = ({
	text = "QUANTUMJUMP",
	onClick,
	className = "",
	width = 300,
	height = 80,
}) => {
	const { darkMode } = useTheme();
	const [isHovering, setIsHovering] = useState(false);
	const buttonRef = useRef(null);
	const particlesRef = useRef(null);

	// Theme-aware colors
	const bgColor = darkMode ? "#111827" : "white";
	const textColor = darkMode
		? "var(--primary-color)"
		: "var(--secondary-color)";
	const particleColor = darkMode
		? "var(--primary-color)"
		: "var(--secondary-color)";

	// Generate particles
	const particles = Array(15)
		.fill(0)
		.map(() => ({
			left: "50%",
			top: "50%",
			size: `${Math.random() * 4 + 2}px`,
			angle: Math.random() * Math.PI * 2,
			distance: Math.random() * 50 + 30,
		}));

	useEffect(() => {
		if (!buttonRef.current || !particlesRef.current) return;

		if (isHovering) {
			// Animate particles outward
			Array.from(particlesRef.current.children).forEach((particle, index) => {
				const { angle, distance } = particles[index];
				const x = Math.cos(angle) * distance;
				const y = Math.sin(angle) * distance;

				gsap.fromTo(
					particle,
					{
						opacity: 0,
						x: 0,
						y: 0,
						scale: 0,
					},
					{
						opacity: 1,
						x: x,
						y: y,
						scale: 1,
						duration: 0.6,
						delay: Math.random() * 0.3,
						ease: "power2.out",
						onComplete: () => {
							gsap.to(particle, {
								opacity: 0,
								duration: 0.3,
							});
						},
					},
				);
			});

			// Button pulse
			gsap.to(buttonRef.current, {
				scale: 1.05,
				duration: 0.3,
				ease: "back.out(1.7)",
			});
		} else {
			// Stop animations
			Array.from(particlesRef.current.children).forEach((particle) => {
				gsap.killTweensOf(particle);
				gsap.set(particle, { opacity: 0, x: 0, y: 0 });
			});

			// Reset button
			gsap.to(buttonRef.current, {
				scale: 1,
				duration: 0.3,
			});
		}
	}, [isHovering]);

	return (
		<button
			ref={buttonRef}
			style={{
				...baseButtonStyles,
				backgroundColor: bgColor,
				color: textColor,
				borderColor: darkMode
					? "var(--primary-color)"
					: "var(--secondary-color)",
				borderWidth: "2px",
				width: `${width}px`,
				height: `${height}px`,
			}}
			className={`relative overflow-hidden rounded-md ${className}`}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			onClick={onClick}
		>
			{/* Particles */}
			<div ref={particlesRef} className="absolute inset-0 pointer-events-none">
				{particles.map((particle, index) => (
					<div
						key={index}
						className="absolute rounded-full"
						style={{
							left: particle.left,
							top: particle.top,
							width: particle.size,
							height: particle.size,
							backgroundColor: particleColor,
							opacity: 0,
							transform: "scale(0)",
							boxShadow: `0 0 5px ${particleColor}`,
						}}
					/>
				))}
			</div>

			{/* Button content */}
			<div className="flex items-center justify-center relative z-10">
				<SpinDialText text={text} isHovering={isHovering} duration={0.3} />
			</div>
		</button>
	);
};

// Button 5: WormholeButton - ENTER WORMHOLE
export const WormholeButton = ({
	text = "ENTER WORMHOLE",
	onClick,
	className = "",
	width = 300,
	height = 80,
}) => {
	const { darkMode } = useTheme();
	const [isHovering, setIsHovering] = useState(false);
	const buttonRef = useRef(null);
	const vortexRef = useRef(null);

	// Theme-aware colors
	const bgColor = darkMode ? "var(--secondary-color)" : "var(--primary-color)";
	const textColor = darkMode ? "white" : "black";
	const vortexColor = darkMode
		? "rgba(251, 204, 3, 0.3)"
		: "rgba(57, 82, 153, 0.3)";

	useEffect(() => {
		if (!buttonRef.current || !vortexRef.current) return;

		if (isHovering) {
			// Vortex rotation
			gsap.to(vortexRef.current, {
				rotation: 360,
				duration: 4,
				repeat: -1,
				ease: "linear",
			});

			// Button glow
			gsap.to(buttonRef.current, {
				boxShadow: `0 0 20px ${darkMode ? "rgba(251, 204, 3, 0.5)" : "rgba(57, 82, 153, 0.5)"}`,
				duration: 0.5,
			});
		} else {
			// Stop animations
			gsap.killTweensOf(vortexRef.current);
			gsap.set(vortexRef.current, { rotation: 0 });

			// Remove glow
			gsap.to(buttonRef.current, {
				boxShadow: "none",
				duration: 0.3,
			});
		}
	}, [isHovering, darkMode]);

	return (
		<button
			ref={buttonRef}
			style={{
				...baseButtonStyles,
				backgroundColor: bgColor,
				color: textColor,
				width: `${width}px`,
				height: `${height}px`,
			}}
			className={`relative overflow-hidden rounded-md ${className}`}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			onClick={onClick}
		>
			{/* Vortex effect */}
			<div ref={vortexRef} className="absolute inset-0 pointer-events-none">
				<div className="absolute inset-0 flex items-center justify-center">
					<div
						className="rounded-full border-t-2 border-b-2"
						style={{
							borderColor: vortexColor,
							width: "150%",
							height: "150%",
						}}
					/>
					<div
						className="rounded-full border-l-2 border-r-2"
						style={{
							borderColor: vortexColor,
							width: "120%",
							height: "120%",
						}}
					/>
				</div>
			</div>

			{/* Button content */}
			<div className="flex items-center justify-center relative z-10">
				<span>{text}</span>
				<svg
					className="w-4 h-4 ml-3"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12 5L19 12M19 12L12 19M19 12H5"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</div>
		</button>
	);
};

// Button 6: BlackHoleButton - BLACK HOLE
export const BlackHoleButton = ({
	text = "BLACK HOLE",
	onClick,
	className = "",
	width = 300,
	height = 80,
}) => {
	const { darkMode } = useTheme();
	const [isHovering, setIsHovering] = useState(false);
	const buttonRef = useRef(null);
	const holeRef = useRef(null);
	const particlesRef = useRef(null);

	// Theme-aware colors
	const bgColor = darkMode ? "#111827" : "white";
	const textColor = darkMode
		? "var(--primary-color)"
		: "var(--secondary-color)";
	const holeColor = darkMode
		? "var(--secondary-color)"
		: "var(--primary-color)";
	const particleColor = darkMode
		? "var(--primary-color)"
		: "var(--secondary-color)";

	// Generate particles
	const particles = Array(12)
		.fill(0)
		.map(() => ({
			left: `${Math.random() * 100}%`,
			top: `${Math.random() * 100}%`,
			size: `${Math.random() * 3 + 1}px`,
		}));

	useEffect(() => {
		if (!buttonRef.current || !holeRef.current || !particlesRef.current) return;

		if (isHovering) {
			// Black hole pulse
			gsap.to(holeRef.current, {
				scale: 1.1,
				duration: 1,
				repeat: -1,
				yoyo: true,
				ease: "sine.inOut",
			});

			// Particle suction animation
			Array.from(particlesRef.current.children).forEach((particle) => {
				gsap.to(particle, {
					x: "50%",
					y: "50%",
					scale: 0,
					opacity: 0,
					duration: 1.5,
					delay: Math.random() * 0.5,
					repeat: -1,
					repeatDelay: 1,
					ease: "power2.in",
					onComplete: () => {
						gsap.set(particle, {
							x: 0,
							y: 0,
							scale: 1,
							opacity: 0.7,
						});
					},
				});
			});

			// Button glow
			gsap.to(buttonRef.current, {
				boxShadow: `0 0 15px ${darkMode ? "rgba(57, 82, 153, 0.5)" : "rgba(251, 204, 3, 0.5)"}`,
				duration: 0.3,
			});
		} else {
			// Stop animations
			gsap.killTweensOf(holeRef.current);
			gsap.set(holeRef.current, { scale: 1 });

			Array.from(particlesRef.current.children).forEach((particle) => {
				gsap.killTweensOf(particle);
				gsap.set(particle, {
					x: 0,
					y: 0,
					scale: 1,
					opacity: 0.7,
				});
			});

			// Remove glow
			gsap.to(buttonRef.current, {
				boxShadow: "none",
				duration: 0.3,
			});
		}
	}, [isHovering, darkMode]);

	return (
		<button
			ref={buttonRef}
			style={{
				...baseButtonStyles,
				backgroundColor: bgColor,
				color: textColor,
				borderColor: darkMode
					? "var(--primary-color)"
					: "var(--secondary-color)",
				borderWidth: "2px",
				width: `${width}px`,
				height: `${height}px`,
			}}
			className={`relative overflow-hidden rounded-md ${className}`}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			onClick={onClick}
		>
			{/* Black hole center */}
			<div
				ref={holeRef}
				className="absolute rounded-full"
				style={{
					width: "30px",
					height: "30px",
					backgroundColor: holeColor,
					left: "50%",
					top: "50%",
					transform: "translate(-50%, -50%)",
					boxShadow: `0 0 15px ${holeColor}`,
				}}
			/>

			{/* Particles */}
			<div ref={particlesRef} className="absolute inset-0 pointer-events-none">
				{particles.map((particle, index) => (
					<div
						key={index}
						className="absolute rounded-full"
						style={{
							left: particle.left,
							top: particle.top,
							width: particle.size,
							height: particle.size,
							backgroundColor: particleColor,
							opacity: 0.7,
							boxShadow: `0 0 3px ${particleColor}`,
						}}
					/>
				))}
			</div>

			{/* Button content */}
			<div className="flex items-center justify-center relative z-10">
				<span>{text}</span>
			</div>
		</button>
	);
};

// Button 7: MeteorButton - New meteor-themed button
export const MeteorButton = ({
	text = "METEOR STORM",
	onClick,
	className = "",
	width = 300,
	height = 80,
}) => {
	const { darkMode } = useTheme();
	const [isHovering, setIsHovering] = useState(false);
	const buttonRef = useRef(null);
	const meteorsRef = useRef(null);

	// Theme-aware colors
	const bgColor = darkMode ? "#111827" : "white";
	const textColor = darkMode
		? "var(--primary-color)"
		: "var(--secondary-color)";
	const meteorColor = darkMode
		? "var(--primary-color)"
		: "var(--secondary-color)";

	// Generate meteors
	const meteors = Array(5)
		.fill(0)
		.map(() => ({
			left: `${Math.random() * 100}%`,
			top: `${Math.random() * 100}%`,
			angle: Math.random() * 30 + 30, // Between 30-60 degrees
			length: `${Math.random() * 50 + 50}px`,
			speed: Math.random() * 0.5 + 0.5,
			delay: Math.random() * 1,
		}));

	useEffect(() => {
		if (!buttonRef.current || !meteorsRef.current) return;

		if (isHovering) {
			// Animate meteors
			Array.from(meteorsRef.current.children).forEach((meteor, index) => {
				const { angle, length, speed, delay } = meteors[index];
				const radians = angle * (Math.PI / 180);
				const x = Math.cos(radians) * 200;
				const y = Math.sin(radians) * 200;

				gsap.fromTo(
					meteor,
					{
						x: -x,
						y: -y,
						opacity: 0,
					},
					{
						x: x,
						y: y,
						opacity: 1,
						duration: speed,
						delay: delay,
						repeat: -1,
						repeatDelay: 2,
						ease: "power1.in",
						onComplete: () => {
							gsap.set(meteor, {
								x: -x,
								y: -y,
								opacity: 0,
							});
						},
					},
				);
			});

			// Button glow
			gsap.to(buttonRef.current, {
				boxShadow: `0 0 15px ${darkMode ? "rgba(251, 204, 3, 0.5)" : "rgba(57, 82, 153, 0.5)"}`,
				duration: 0.3,
			});
		} else {
			// Stop animations
			Array.from(meteorsRef.current.children).forEach((meteor) => {
				gsap.killTweensOf(meteor);
				gsap.set(meteor, {
					x: 0,
					y: 0,
					opacity: 0,
				});
			});

			// Remove glow
			gsap.to(buttonRef.current, {
				boxShadow: "none",
				duration: 0.3,
			});
		}
	}, [isHovering, darkMode]);

	return (
		<button
			ref={buttonRef}
			style={{
				...baseButtonStyles,
				backgroundColor: bgColor,
				color: textColor,
				borderColor: darkMode
					? "var(--primary-color)"
					: "var(--secondary-color)",
				borderWidth: "2px",
				width: `${width}px`,
				height: `${height}px`,
			}}
			className={`relative overflow-hidden rounded-md ${className}`}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			onClick={onClick}
		>
			{/* Meteors */}
			<div ref={meteorsRef} className="absolute inset-0 pointer-events-none">
				{meteors.map((meteor, index) => (
					<div
						key={index}
						className="absolute"
						style={{
							left: meteor.left,
							top: meteor.top,
							width: meteor.length,
							height: "2px",
							backgroundColor: meteorColor,
							opacity: 0,
							transform: `rotate(${meteor.angle}deg)`,
							transformOrigin: "left center",
							boxShadow: `0 0 5px ${meteorColor}`,
						}}
					/>
				))}
			</div>

			{/* Button content */}
			<div className="flex items-center justify-center relative z-10">
				<SpinDialText text={text} isHovering={isHovering} duration={0.3} />
			</div>
		</button>
	);
};
