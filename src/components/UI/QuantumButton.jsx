"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useTheme } from "@/context/TheamContext";

gsap.registerPlugin(TextPlugin);

// SpinDialText Component - For the text animation inside the button
const SpinDialText = ({ text = "BUTTON", animate, duration = 0.5 }) => {
	const charRefs = useRef([]);

	useEffect(() => {
		if (!animate) return;

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
	}, [animate, text, duration]);

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

// Floating Particle Component
const FloatingParticles = ({ darkMode }) => {
	const particlesRef = useRef(null);
	const particleColor = darkMode
		? "var(--primary-color)"
		: "var(--secondary-color)";

	// Create more particles (30) for better visibility
	const floatingParticles = Array(30)
		.fill(0)
		.map(() => ({
			left: `${Math.random() * 100}%`,
			top: `${Math.random() * 100}%`,
			size: `${Math.random() * 3 + 1}px`,
			duration: Math.random() * 10 + 10,
			delay: Math.random() * 5,
		}));

	useEffect(() => {
		if (!particlesRef.current) return;

		Array.from(particlesRef.current.children).forEach((particle, index) => {
			const { duration, delay } = floatingParticles[index];

			// Create floating animation
			gsap.to(particle, {
				y: `${Math.random() * 20 - 10}px`,
				x: `${Math.random() * 20 - 10}px`,
				duration: duration,
				delay: delay,
				repeat: -1,
				yoyo: true,
				ease: "sine.inOut",
			});

			// Pulse opacity
			gsap.to(particle, {
				opacity: 0.3,
				duration: Math.random() * 2 + 2,
				repeat: -1,
				yoyo: true,
				ease: "sine.inOut",
			});
		});

		return () => {
			Array.from(particlesRef.current?.children || []).forEach((particle) => {
				gsap.killTweensOf(particle);
			});
		};
	}, []);

	return (
		<div
			ref={particlesRef}
			className="absolute inset-0 pointer-events-none overflow-hidden"
		>
			{floatingParticles.map((particle, index) => (
				<div
					key={index}
					className="absolute rounded-full"
					style={{
						left: particle.left,
						top: particle.top,
						width: particle.size,
						height: particle.size,
						backgroundColor: particleColor,
						opacity: 0.5,
						boxShadow: `0 0 3px ${particleColor}`,
					}}
				/>
			))}
		</div>
	);
};

// Enhanced QuantumButton Component
export const QuantumButton = ({
	text = "QUANTUMJUMP",
	href = null,
	onClick = null,
	width = "300px",
	height = "80px",
	borderRadius = "8px",
	fontSize = "1.1rem",
	fontWeight = "bold",
	className = "",
	active = false,
	disabled = false,
}) => {
	const { darkMode } = useTheme();
	const [isAnimating, setIsAnimating] = useState(false);
	const [isActive, setIsActive] = useState(active);
	const buttonRef = useRef(null);
	const particlesRef = useRef(null);

	// Update active state when prop changes
	useEffect(() => {
		setIsActive(active);
	}, [active]);

	// Theme-aware colors
	const bgColor = darkMode ? "#111827" : "white";
	const textColor = darkMode
		? "var(--primary-color)"
		: "var(--secondary-color)";
	const particleColor = darkMode
		? "var(--primary-color)"
		: "var(--secondary-color)";

	// Active state styles
	const activeStyles = isActive
		? {
				boxShadow: `0 0 15px ${darkMode ? "var(--primary-color)" : "var(--secondary-color)"}`,
				transform: "scale(1.02)",
				borderWidth: "3px",
			}
		: {};

	// Disabled styles
	const disabledStyles = disabled
		? {
				opacity: 0.5,
				cursor: "not-allowed",
			}
		: {};

	// Generate explosion particles
	const explosionParticles = Array(30)
		.fill(0)
		.map(() => ({
			left: "50%",
			top: "50%",
			size: `${Math.random() * 5 + 2}px`,
			angle: Math.random() * Math.PI * 2,
			distance: Math.random() * 60 + 40,
		}));

	const triggerAnimation = () => {
		if (disabled) return;

		setIsAnimating(true);
		setTimeout(() => setIsAnimating(false), 1000);
	};

	// Animation effect
	useEffect(() => {
		if (!buttonRef.current || !particlesRef.current || !isAnimating || disabled)
			return;

		// Animate particles outward
		Array.from(particlesRef.current.children).forEach((particle, index) => {
			const { angle, distance } = explosionParticles[index];
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
			onComplete: () => {
				gsap.to(buttonRef.current, {
					scale: isActive ? 1.02 : 1, // Return to active scale if active
					duration: 0.3,
				});
			},
		});
	}, [isAnimating, isActive, disabled]);

	const handleClick = (e) => {
		if (disabled) return;

		triggerAnimation();

		// Toggle active state if no external control
		if (active === undefined) {
			setIsActive(!isActive);
		}

		if (onClick) onClick(e);
	};

	// Base button styles including custom props
	const buttonStyles = {
		backgroundColor: bgColor,
		color: textColor,
		borderColor: darkMode ? "var(--primary-color)" : "var(--secondary-color)",
		borderWidth: isActive ? "3px" : "2px",
		borderRadius: borderRadius,
		width: width,
		height: height,
		fontSize: fontSize,
		fontWeight: fontWeight,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		cursor: disabled ? "not-allowed" : "pointer",
		transition: "all 0.3s ease",
		...activeStyles,
		...disabledStyles,
	};

	// Create button content
	const buttonContent = (
		<>
			{/* Floating Particles (always visible) */}
			<FloatingParticles darkMode={darkMode} />

			{/* Explosion Particles (visible on hover/click) */}
			<div ref={particlesRef} className="absolute inset-0 pointer-events-none">
				{explosionParticles.map((particle, index) => (
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
				<SpinDialText text={text} animate={isAnimating} duration={0.3} />
			</div>
		</>
	);

	// Return Link or button based on href prop
	if (href && !disabled) {
		return (
			<Link href={href} className={`relative overflow-hidden ${className}`}>
				<div
					ref={buttonRef}
					style={buttonStyles}
					onMouseEnter={() => !disabled && triggerAnimation()}
					onClick={handleClick}
				>
					{buttonContent}
				</div>
			</Link>
		);
	}

	return (
		<button
			ref={buttonRef}
			style={buttonStyles}
			className={`relative overflow-hidden ${className}`}
			onMouseEnter={() => !disabled && triggerAnimation()}
			onClick={handleClick}
			disabled={disabled}
		>
			{buttonContent}
		</button>
	);
};

export default QuantumButton;
