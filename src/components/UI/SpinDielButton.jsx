"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

// SpinDialText Component - For text animation effect
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

// Enhanced QuantumButton component
export const QuantumButton = ({
	text = "QUANTUMJUMP",
	onClick,
	className = "",
	width = 300,
	height = 80,
	darkMode = false,
}) => {
	const [isHovering, setIsHovering] = useState(false);
	const buttonRef = useRef(null);
	const staticParticlesRef = useRef(null);
	const dynamicParticlesRef = useRef(null);

	// Theme-aware colors
	const bgColor = darkMode ? "#111827" : "white";
	const textColor = darkMode
		? "var(--primary-color)"
		: "var(--secondary-color)";
	const particleColor = darkMode
		? "var(--primary-color)"
		: "var(--secondary-color)";

	// Generate static particles (always visible)
	const staticParticles = Array(8)
		.fill(0)
		.map(() => ({
			left: `${Math.random() * 100}%`,
			top: `${Math.random() * 100}%`,
			size: `${Math.random() * 3 + 1}px`,
			pulseDelay: Math.random() * 2,
		}));

	// Generate dynamic particles (visible on hover)
	const dynamicParticles = Array(20)
		.fill(0)
		.map(() => ({
			left: "50%",
			top: "50%",
			size: `${Math.random() * 4 + 2}px`,
			angle: Math.random() * Math.PI * 2,
			distance: Math.random() * 60 + 40, // Increased distance for better spread
		}));

	// Handle static particles pulsing animation
	useEffect(() => {
		if (!staticParticlesRef.current) return;

		// Create pulsing animation for static particles
		Array.from(staticParticlesRef.current.children).forEach(
			(particle, index) => {
				gsap.to(particle, {
					opacity: 0.2,
					scale: 0.7,
					duration: 1.5,
					repeat: -1,
					yoyo: true,
					delay: staticParticles[index].pulseDelay,
					ease: "sine.inOut",
				});
			},
		);

		// Cleanup
		return () => {
			Array.from(staticParticlesRef.current?.children || []).forEach(
				(particle) => {
					gsap.killTweensOf(particle);
				},
			);
		};
	}, []);

	// Handle hover animations
	useEffect(() => {
		if (!buttonRef.current || !dynamicParticlesRef.current) return;

		if (isHovering) {
			// Animate particles outward
			Array.from(dynamicParticlesRef.current.children).forEach(
				(particle, index) => {
					const { angle, distance } = dynamicParticles[index];
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
							scale: 1.2,
							duration: 0.8,
							delay: Math.random() * 0.2,
							ease: "power2.out",
							onComplete: () => {
								gsap.to(particle, {
									opacity: 0,
									scale: 0.5,
									duration: 0.4,
									delay: 0.2,
								});
							},
						},
					);
				},
			);

			// Button pulse and glow effect
			gsap.to(buttonRef.current, {
				scale: 1.05,
				boxShadow: `0 0 20px ${darkMode ? "rgba(251, 204, 3, 0.5)" : "rgba(57, 82, 153, 0.5)"}`,
				duration: 0.3,
				ease: "back.out(1.7)",
			});

			// Also enhance static particles
			Array.from(staticParticlesRef.current.children).forEach((particle) => {
				gsap.to(particle, {
					opacity: 0.8,
					scale: 1.5,
					duration: 0.5,
				});
			});
		} else {
			// Stop animations for dynamic particles
			Array.from(dynamicParticlesRef.current.children).forEach((particle) => {
				gsap.killTweensOf(particle);
				gsap.set(particle, { opacity: 0, x: 0, y: 0 });
			});

			// Reset button
			gsap.to(buttonRef.current, {
				scale: 1,
				boxShadow: "none",
				duration: 0.3,
			});

			// Reset static particles to normal pulsing
			Array.from(staticParticlesRef.current.children).forEach(
				(particle, index) => {
					gsap.killTweensOf(particle);
					gsap.to(particle, {
						opacity: 0.2,
						scale: 0.7,
						duration: 1.5,
						repeat: -1,
						yoyo: true,
						delay: staticParticles[index].pulseDelay,
						ease: "sine.inOut",
					});
				},
			);
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
			{/* Static Particles - Always visible with subtle animation */}
			<div
				ref={staticParticlesRef}
				className="absolute inset-0 pointer-events-none"
			>
				{staticParticles.map((particle, index) => (
					<div
						key={`static-${index}`}
						className="absolute rounded-full"
						style={{
							left: particle.left,
							top: particle.top,
							width: particle.size,
							height: particle.size,
							backgroundColor: particleColor,
							opacity: 0.4,
							boxShadow: `0 0 4px ${particleColor}`,
						}}
					/>
				))}
			</div>

			{/* Dynamic Particles - Appear on hover with explosion effect */}
			<div
				ref={dynamicParticlesRef}
				className="absolute inset-0 pointer-events-none"
			>
				{dynamicParticles.map((particle, index) => (
					<div
						key={`dynamic-${index}`}
						className="absolute rounded-full"
						style={{
							left: particle.left,
							top: particle.top,
							width: particle.size,
							height: particle.size,
							backgroundColor: particleColor,
							opacity: 0,
							transform: "scale(0)",
							boxShadow: `0 0 6px ${particleColor}`,
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

// Demo/Example component
export const QuantumButtonDemo = () => {
	const [darkMode, setDarkMode] = useState(false);
	const [buttonSize, setButtonSize] = useState({ width: 300, height: 80 });

	const handleButtonClick = () => {
		console.log("Quantum button clicked!");
	};

	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
	};

	const handleSizeChange = (e, dimension) => {
		const value = Math.max(
			dimension === "width" ? 300 : 80,
			parseInt(e.target.value) || 0,
		);
		setButtonSize((prev) => ({ ...prev, [dimension]: value }));
	};

	return (
		<div
			className={`p-8 min-h-screen flex flex-col items-center justify-center transition-colors duration-300 ${
				darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
			}`}
		>
			<style jsx global>{`
        :root {
          --primary-color: ${darkMode ? "#FBCC03" : "#395299"};
          --secondary-color: ${darkMode ? "#395299" : "#FBCC03"};
        }
      `}</style>

			<h1 className="text-2xl font-bold mb-8">Quantum Button Demo</h1>

			<div className="mb-8">
				<QuantumButton
					text="QUANTUMJUMP"
					onClick={handleButtonClick}
					darkMode={darkMode}
					width={buttonSize.width}
					height={buttonSize.height}
				/>
			</div>

			<div className="w-full max-w-md space-y-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
				<div>
					<label className="flex items-center cursor-pointer">
						<div className="mr-3 text-gray-700 dark:text-gray-300 font-medium">
							Dark Mode
						</div>
						<div className="relative">
							<input
								type="checkbox"
								checked={darkMode}
								onChange={toggleDarkMode}
								className="sr-only"
							/>
							<div
								className={`block w-14 h-8 rounded-full ${darkMode ? "bg-blue-600" : "bg-gray-300"}`}
							></div>
							<div
								className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
									darkMode ? "transform translate-x-6" : ""
								}`}
							></div>
						</div>
					</label>
				</div>

				<div>
					<label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
						Width (min 300px)
					</label>
					<input
						type="number"
						min="300"
						value={buttonSize.width}
						onChange={(e) => handleSizeChange(e, "width")}
						className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
						Height (min 80px)
					</label>
					<input
						type="number"
						min="80"
						value={buttonSize.height}
						onChange={(e) => handleSizeChange(e, "height")}
						className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
					/>
				</div>
			</div>
		</div>
	);
};

export default QuantumButton;
