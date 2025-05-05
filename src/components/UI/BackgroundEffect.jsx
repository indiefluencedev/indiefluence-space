"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/context/TheamContext";
import gsap from "gsap";

export default function BackgroundEffects() {
	// Get theme from context
	const { darkMode } = useTheme();
	const containerRef = useRef(null);

	// Fixed opacity values - no UI controls needed
	const LIGHT_MODE_OPACITY = 1; // Higher permanent opacity for light mode
	const DARK_MODE_OPACITY = 1; // Higher permanent opacity for dark mode

	// Mouse position for interactive elements
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	// Create and manage background based on dark/light mode
	useEffect(() => {
		if (!containerRef.current) return;

		// Clear any existing elements when theme changes
		while (containerRef.current.firstChild) {
			containerRef.current.removeChild(containerRef.current.firstChild);
		}

		let cleanupFunction;

		if (darkMode) {
			// Create space elements for dark mode
			cleanupFunction = createSpaceBackground();
		} else {
			// Create floating elements for light mode
			createFloatingElements();

			// Add mouse move event listener for light mode interactivity
			const handleMouseMove = (e) => {
				setMousePosition({
					x: e.clientX,
					y: e.clientY,
				});
			};

			window.addEventListener("mousemove", handleMouseMove);

			return () => {
				window.removeEventListener("mousemove", handleMouseMove);
			};
		}

		// Cleanup function to prevent memory leaks
		return () => {
			if (containerRef.current) {
				gsap.killTweensOf(containerRef.current.children);
			}
			if (cleanupFunction) {
				cleanupFunction();
			}
		};
	}, [darkMode]);

	// Effect to handle mouse interaction with elements in light mode
	useEffect(() => {
		if (darkMode || !containerRef.current) return;

		// Only run this effect in light mode
		const elements = containerRef.current.querySelectorAll(
			".interactive-element",
		);

		elements.forEach((element) => {
			const rect = element.getBoundingClientRect();
			const elementCenterX = rect.left + rect.width / 2;
			const elementCenterY = rect.top + rect.height / 2;

			// Calculate distance from mouse to element
			const distX = mousePosition.x - elementCenterX;
			const distY = mousePosition.y - elementCenterY;
			const distance = Math.sqrt(distX * distX + distY * distY);

			// Only affect elements within 150px of mouse
			if (distance < 150) {
				// Repel strength - closer means stronger push
				const strength = 1 - distance / 150;
				const moveX = distX * strength * -0.5; // Reverse direction to push away
				const moveY = distY * strength * -0.5;

				gsap.to(element, {
					x: moveX,
					y: moveY,
					duration: 0.5,
					ease: "power2.out",
				});
			} else {
				// Return to original animation path if not affected by mouse
				gsap.to(element, {
					x: element.originalX || 0,
					y: element.originalY || 0,
					duration: 1,
					ease: "power2.out",
				});
			}
		});
	}, [mousePosition, darkMode]);

	/**
	 * Creates a space-themed background for dark mode
	 * Includes stars, nebulas, and galaxies with enhanced twinkling effects
	 */
	const createSpaceBackground = () => {
		const container = containerRef.current;

		// Create multiple star layers for parallax effect
		// Each layer has different properties for size, speed and base opacity
		const layers = [
			{
				count: 80,
				size: [0.8, 2],
				speed: 35,
				opacity: [0.3 * DARK_MODE_OPACITY, 0.6 * DARK_MODE_OPACITY],
				twinkleChance: 0.4, // Chance for a star to twinkle
			}, // Distant stars (slowest)
			{
				count: 70,
				size: [1, 2.5],
				speed: 65,
				opacity: [0.5 * DARK_MODE_OPACITY, 0.8 * DARK_MODE_OPACITY],
				twinkleChance: 0.5, // Chance for a star to twinkle
			}, // Medium stars
			{
				count: 50,
				size: [1.5, 3.5],
				speed: 85,
				opacity: [0.6 * DARK_MODE_OPACITY, 0.9 * DARK_MODE_OPACITY],
				twinkleChance: 0.6, // Chance for a star to twinkle
			}, // Closer stars (fastest)
		];

		// Create starfield layers with different movement speeds
		layers.forEach((layer, layerIndex) => {
			// Create a starfield container for this layer
			const starfield = document.createElement("div");
			starfield.className = "absolute inset-0 w-full h-full";
			container.appendChild(starfield);

			// Create stars for this layer
			for (let i = 0; i < layer.count; i++) {
				const star = document.createElement("div");
				star.className = "absolute rounded-full";

				// Size based on layer properties
				const size =
					Math.random() * (layer.size[1] - layer.size[0]) + layer.size[0];
				star.style.width = `${size}px`;
				star.style.height = `${size}px`;

				// Position stars randomly across the viewport
				star.style.left = `${Math.random() * 100}%`;
				star.style.top = `${Math.random() * 100}%`;

				// Star color - mostly white with some color variations
				const colorRand = Math.random();
				if (colorRand < 0.7) {
					// White to light blue stars (most common)
					const blueHue = Math.floor(Math.random() * 30);
					star.style.backgroundColor = `rgb(${220 + blueHue}, ${220 + blueHue}, 255)`;
				} else if (colorRand < 0.85) {
					// Yellowish stars
					star.style.backgroundColor = "rgb(255, 255, 220)";
				} else if (colorRand < 0.95) {
					// Reddish stars
					star.style.backgroundColor = "rgb(255, 230, 230)";
				} else {
					// Rare bluish stars
					star.style.backgroundColor = "rgb(200, 220, 255)";
				}

				// Add opacity based on layer, with slight randomization
				const baseOpacity =
					Math.random() * (layer.opacity[1] - layer.opacity[0]) +
					layer.opacity[0];
				star.style.opacity = baseOpacity.toString();

				starfield.appendChild(star);

				// Enhanced twinkling effects - with multiple variations
				if (Math.random() < layer.twinkleChance) {
					// Choose a twinkling effect type
					const effectType = Math.random();

					if (effectType < 0.4) {
						// Simple opacity pulsing (subtle)
						gsap.to(star, {
							opacity: baseOpacity * (Math.random() * 0.4 + 0.3),
							duration: Math.random() * 3 + 2,
							repeat: -1,
							yoyo: true,
							ease: "sine.inOut",
						});
					} else if (effectType < 0.7) {
						// More dramatic twinkling with scale
						gsap.to(star, {
							opacity: baseOpacity * (Math.random() * 0.5 + 0.2),
							scale: 0.6 + Math.random() * 0.4,
							duration: Math.random() * 2 + 1,
							repeat: -1,
							yoyo: true,
							ease: "sine.inOut",
						});
					} else if (effectType < 0.9) {
						// Sparkling effect with box-shadow and brightness
						const originalColor = star.style.backgroundColor;
						const boxShadow = `0 0 ${Math.random() * 3 + 2}px rgba(255,255,255,${baseOpacity * 0.8})`;

						// Multi-stage sparkling timeline
						const timeline = gsap.timeline({
							repeat: -1,
							repeatDelay: Math.random() * 4 + 3,
						});

						timeline
							.to(star, {
								boxShadow,
								filter: "brightness(1.5)",
								duration: Math.random() * 0.3 + 0.2,
								ease: "power1.in",
							})
							.to(star, {
								boxShadow: "none",
								filter: "brightness(1)",
								duration: Math.random() * 0.3 + 0.2,
								ease: "power1.out",
							});
					} else {
						// Flicker effect (rapid and random)
						const timeline = gsap.timeline({
							repeat: -1,
							repeatDelay: Math.random() * 5 + 4,
						});

						// Create a quick sequence of flickers
						for (let f = 0; f < Math.floor(Math.random() * 3) + 2; f++) {
							timeline
								.to(star, {
									opacity: baseOpacity * 1.2,
									duration: 0.05,
									ease: "none",
								})
								.to(star, {
									opacity: baseOpacity * 0.3,
									duration: 0.05,
									ease: "none",
								})
								.to(star, {
									opacity: baseOpacity,
									duration: 0.1,
									ease: "none",
								});
						}
					}
				}
			}

			// Animate each starfield layer at different speeds for parallax
			gsap.to(starfield, {
				y: `${layer.speed}%`,
				duration: 80 - layerIndex * 20, // Different speeds for each layer
				repeat: -1,
				ease: "none",
				onRepeat: () => {
					// Reset position when animation completes to create seamless loop
					gsap.set(starfield, { y: "0%" });
				},
			});
		});

		// Create nebulas (colored clouds)
		for (let i = 0; i < 3; i++) {
			const nebula = document.createElement("div");
			nebula.className = "absolute rounded-full blur-3xl";

			// Size of nebulas
			const size = Math.random() * 30 + 20; // 20-50% of viewport
			nebula.style.width = `${size}%`;
			nebula.style.height = `${size * (Math.random() * 0.5 + 0.5)}%`; // Not perfectly circular

			// Position nebulas
			nebula.style.left = `${Math.random() * 100}%`;
			nebula.style.top = `${Math.random() * 100}%`;

			// Random colors for nebulas with adjustable opacity
			const hue = Math.floor(Math.random() * 360);
			nebula.style.backgroundColor = `hsla(${hue}, 70%, 60%, ${0.05 * DARK_MODE_OPACITY})`;

			container.appendChild(nebula);

			// Slow movement for nebulas
			gsap.to(nebula, {
				x: `${(Math.random() - 0.5) * 10}%`,
				y: `${(Math.random() - 0.5) * 10}%`,
				duration: Math.random() * 50 + 50,
				repeat: -1,
				yoyo: true,
				ease: "sine.inOut",
			});
		}

		// Create distant galaxies
		for (let i = 0; i < 2; i++) {
			const galaxy = document.createElement("div");
			galaxy.className = "absolute rounded-full blur-md";

			// Galaxy size
			const size = Math.random() * 10 + 5; // 5-15% of viewport
			galaxy.style.width = `${size}%`;
			galaxy.style.height = `${size}%`;

			// Position galaxies
			galaxy.style.left = `${Math.random() * 100}%`;
			galaxy.style.top = `${Math.random() * 100}%`;

			// Galaxy gradient with adjustable opacity
			const hue1 = Math.floor(Math.random() * 360);
			const hue2 = (hue1 + Math.floor(Math.random() * 60 + 30)) % 360;
			galaxy.style.background = `radial-gradient(circle,
        hsla(${hue1}, 70%, 40%, ${0.1 * DARK_MODE_OPACITY}) 0%,
        hsla(${hue2}, 70%, 30%, ${0.05 * DARK_MODE_OPACITY}) 50%,
        transparent 80%)`;

			container.appendChild(galaxy);

			// Very slow rotation for galaxies
			gsap.to(galaxy, {
				rotation: 360,
				transformOrigin: "center center",
				duration: Math.random() * 200 + 200,
				repeat: -1,
				ease: "none",
			});
		}

		// Create additional stars with special sparkling effects
		for (let i = 0; i < 15; i++) {
			const specialStar = document.createElement("div");
			specialStar.className = "absolute";

			// Size - slightly larger than regular stars
			const size = Math.random() * 3 + 2.5;
			specialStar.style.width = `${size}px`;
			specialStar.style.height = `${size}px`;

			// Make it round
			specialStar.style.borderRadius = "50%";

			// Position stars randomly across the viewport
			specialStar.style.left = `${Math.random() * 100}%`;
			specialStar.style.top = `${Math.random() * 100}%`;

			// Bright white/blue color
			specialStar.style.backgroundColor = `rgb(${240 + Math.random() * 15}, ${240 + Math.random() * 15}, 255)`;

			// Add a glow effect
			specialStar.style.boxShadow = `0 0 ${Math.random() * 5 + 3}px rgba(255, 255, 255, ${0.7 * DARK_MODE_OPACITY})`;

			// Base opacity
			const specialOpacity = 0.85 * DARK_MODE_OPACITY;
			specialStar.style.opacity = specialOpacity.toString();

			container.appendChild(specialStar);

			// Create advanced spark/sparkle animation
			const sparkleTimeline = gsap.timeline({
				repeat: -1,
				repeatDelay: Math.random() * 4 + 2, // Longer delay between sparkles
			});

			// Multi-phase sparkle effect
			sparkleTimeline
				.to(specialStar, {
					boxShadow: `0 0 ${Math.random() * 8 + 5}px rgba(255, 255, 255, ${0.9 * DARK_MODE_OPACITY})`,
					opacity: specialOpacity * 1.2,
					scale: 1.2,
					duration: 0.2,
					ease: "power2.in",
				})
				.to(specialStar, {
					boxShadow: `0 0 ${Math.random() * 12 + 8}px rgba(255, 255, 255, ${0.7 * DARK_MODE_OPACITY})`,
					scale: 1.4,
					duration: 0.1,
					ease: "power1.out",
				})
				.to(specialStar, {
					boxShadow: `0 0 ${Math.random() * 4 + 2}px rgba(255, 255, 255, ${0.5 * DARK_MODE_OPACITY})`,
					opacity: specialOpacity * 0.8,
					scale: 0.9,
					duration: 0.3,
					ease: "power2.out",
				})
				.to(specialStar, {
					boxShadow: `0 0 ${Math.random() * 3 + 1}px rgba(255, 255, 255, ${0.4 * DARK_MODE_OPACITY})`,
					opacity: specialOpacity,
					scale: 1,
					duration: 0.2,
					ease: "power1.inOut",
				});
		}

		return () => {};
	};

	/**
	 * Creates floating elements for light mode
	 * Includes math symbols, shapes, and subtle gradients
	 * Now with mouse interaction
	 */
	const createFloatingElements = () => {
		const container = containerRef.current;

		// More vibrant colors with higher permanent opacity
		const colors = [
			`rgba(251, 204, 3, ${0.3 * LIGHT_MODE_OPACITY})`, // Yellow
			`rgba(57, 82, 153, ${0.4 * LIGHT_MODE_OPACITY})`, // Blue
			`rgba(57, 123, 103, ${0.35 * LIGHT_MODE_OPACITY})`, // Teal
			`rgba(180, 60, 60, ${0.3 * LIGHT_MODE_OPACITY})`, // Red
			`rgba(100, 170, 100, ${0.35 * LIGHT_MODE_OPACITY})`, // Green
			`rgba(147, 51, 234, ${0.3 * LIGHT_MODE_OPACITY})`, // Purple
		];

		// Math and earth related symbols
		const mathSymbols = [
			{ type: "text", value: "+", size: 1 },
			{ type: "text", value: "-", size: 1 },
			{ type: "text", value: "×", size: 1 },
			{ type: "text", value: "÷", size: 1 },
			{ type: "text", value: "=", size: 1 },
			{ type: "text", value: "∑", size: 1.2 },
			{ type: "text", value: "∆", size: 1.2 },
			{ type: "text", value: "π", size: 1.2 },
			{ type: "text", value: "√", size: 1.2 },
			{ type: "text", value: "∞", size: 1.5 },
			{ type: "text", value: "⊕", size: 1.3 }, // Earth symbol
			{ type: "text", value: "⊙", size: 1.3 }, // Sun symbol
			{ type: "shape", value: "circle", size: 0.9 }, // Planet
			{ type: "shape", value: "triangle", size: 0.8 }, // Mountain
			{ type: "shape", value: "square", size: 0.8 }, // Basic shape
		];

		// Create floating elements
		for (let i = 0; i < 70; i++) {
			const symbolOption =
				mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
			const element = document.createElement("div");

			// Base size - varied distribution of sizes
			const baseSize =
				Math.random() < 0.85
					? Math.random() * 12 + 8 // 8-20px (small elements - 85%)
					: Math.random() * 25 + 15; // 15-40px (larger elements - 15%)

			// Apply the symbol size multiplier
			const size = baseSize * symbolOption.size;

			// Set base styles - add interactive-element class for mouse interaction
			element.className = "absolute interactive-element";

			// Increased opacity for better visibility - using fixed value
			element.style.opacity = Math.random() * 0.4 + 0.3 * LIGHT_MODE_OPACITY;

			// Color
			const color = colors[Math.floor(Math.random() * colors.length)];

			// Position
			element.style.left = `${Math.random() * 100}%`;
			element.style.top = `${Math.random() * 100}%`;

			if (symbolOption.type === "text") {
				// Create text symbols
				element.style.fontSize = `${size}px`;
				element.style.color = color;
				element.style.fontWeight = "bold";
				element.textContent = symbolOption.value;
				element.style.display = "flex";
				element.style.justifyContent = "center";
				element.style.alignItems = "center";
				element.style.width = `${size * 1.2}px`;
				element.style.height = `${size * 1.2}px`;
			} else {
				// Create shapes
				element.style.width = `${size}px`;
				element.style.height = `${size}px`;
				element.style.backgroundColor = color;

				if (symbolOption.value === "circle") {
					element.style.borderRadius = "50%";
				} else if (symbolOption.value === "triangle") {
					element.style.width = "0";
					element.style.height = "0";
					element.style.backgroundColor = "transparent";
					element.style.borderLeft = `${size / 2}px solid transparent`;
					element.style.borderRight = `${size / 2}px solid transparent`;
					element.style.borderBottom = `${size}px solid ${color}`;
				} else {
					// Square shape
					element.style.borderRadius = "2px";
				}
			}

			container.appendChild(element);

			// Create more advanced animation paths with GSAP
			const timeline = gsap.timeline({
				repeat: -1,
				yoyo: true,
			});

			// Determine random animation style
			const animStyle = Math.random();
			let targetX = 0;
			let targetY = 0;

			if (animStyle < 0.3) {
				// Curved path animation
				const motionPoints = [
					{ x: (Math.random() - 0.5) * 50, y: (Math.random() - 0.5) * 50 },
					{ x: (Math.random() - 0.5) * 50, y: (Math.random() - 0.5) * 50 },
					{ x: (Math.random() - 0.5) * 50, y: (Math.random() - 0.5) * 50 },
					{ x: 0, y: 0 },
				];

				targetX = motionPoints[0].x;
				targetY = motionPoints[0].y;

				timeline.to(element, {
					duration: Math.random() * 15 + 15,
					motionPath: {
						path: motionPoints,
						curviness: 1.5,
					},
					rotation: Math.random() * 180,
					ease: "sine.inOut",
				});
			} else if (animStyle < 0.6) {
				// Gentle floating with slight rotation
				targetX = (Math.random() - 0.5) * 60;
				targetY = (Math.random() - 0.5) * 60;

				timeline.to(element, {
					duration: Math.random() * 20 + 10,
					x: targetX,
					y: targetY,
					rotation: Math.random() * 60 - 30,
					ease: "sine.inOut",
				});
			} else {
				// Simple up/down or side/side motion
				const isVertical = Math.random() < 0.5;
				targetX = isVertical ? 0 : (Math.random() - 0.5) * 40;
				targetY = isVertical ? (Math.random() - 0.5) * 40 : 0;

				timeline.to(element, {
					duration: Math.random() * 15 + 10,
					x: targetX,
					y: targetY,
					rotation: Math.random() * 30 - 15,
					ease: "sine.inOut",
				});
			}

			// Store original animation targets for returning after mouse interaction
			element.originalX = targetX;
			element.originalY = targetY;

			// Subtle opacity pulsing for some elements
			if (Math.random() < 0.4) {
				const currentOpacity = parseFloat(element.style.opacity);
				gsap.to(element, {
					opacity: currentOpacity * 0.6, // Less drastic change
					duration: Math.random() * 4 + 2,
					repeat: -1,
					yoyo: true,
					ease: "sine.inOut",
				});
			}

			// Add hover effect for interactive elements
			element.addEventListener("mouseenter", () => {
				gsap.to(element, {
					scale: 1.2,
					duration: 0.3,
					ease: "power1.out",
				});
			});

			element.addEventListener("mouseleave", () => {
				gsap.to(element, {
					scale: 1,
					duration: 0.3,
					ease: "power1.out",
				});
			});
		}

		// Create more visible gradients
		for (let i = 0; i < 4; i++) {
			const gradient = document.createElement("div");
			gradient.className = "absolute rounded-full blur-3xl";

			// Mostly smaller gradients
			const size =
				Math.random() < 0.7
					? Math.random() * 15 + 10 // 10-25% (smaller)
					: Math.random() * 25 + 15; // 15-40% (larger)

			gradient.style.width = `${size}%`;
			gradient.style.height = `${size}%`;

			// Position
			gradient.style.left = `${Math.random() * 100}%`;
			gradient.style.top = `${Math.random() * 100}%`;

			// More visible gradients with configurable opacity
			const gradientTypes = [
				`radial-gradient(circle, rgba(251, 204, 3, ${0.15 * LIGHT_MODE_OPACITY}) 0%, rgba(251, 204, 3, ${0.08 * LIGHT_MODE_OPACITY}) 40%, transparent 70%)`,
				`radial-gradient(circle, rgba(57, 82, 153, ${0.15 * LIGHT_MODE_OPACITY}) 0%, rgba(57, 82, 153, ${0.08 * LIGHT_MODE_OPACITY}) 40%, transparent 70%)`,
				`radial-gradient(circle, rgba(100, 170, 100, ${0.15 * LIGHT_MODE_OPACITY}) 0%, rgba(100, 170, 100, ${0.08 * LIGHT_MODE_OPACITY}) 40%, transparent 70%)`,
				`radial-gradient(circle, rgba(180, 100, 100, ${0.15 * LIGHT_MODE_OPACITY}) 0%, rgba(180, 100, 100, ${0.08 * LIGHT_MODE_OPACITY}) 40%, transparent 70%)`,
				`radial-gradient(circle, rgba(147, 51, 234, ${0.15 * LIGHT_MODE_OPACITY}) 0%, rgba(147, 51, 234, ${0.08 * LIGHT_MODE_OPACITY}) 40%, transparent 70%)`,
			];

			gradient.style.background =
				gradientTypes[Math.floor(Math.random() * gradientTypes.length)];

			container.appendChild(gradient);

			// Create more complex movement for gradients
			const tl = gsap.timeline({
				repeat: -1,
				yoyo: true,
			});

			tl.to(gradient, {
				x: `${(Math.random() - 0.5) * 10}%`,
				y: `${(Math.random() - 0.5) * 10}%`,
				scale: 0.8 + Math.random() * 0.4,
				duration: Math.random() * 40 + 30,
				ease: "sine.inOut",
			}).to(gradient, {
				x: `${(Math.random() - 0.5) * 10}%`,
				y: `${(Math.random() - 0.5) * 10}%`,
				scale: 0.8 + Math.random() * 0.4,
				duration: Math.random() * 40 + 30,
				ease: "sine.inOut",
			});
		}
	};

	return (
		<div
			ref={containerRef}
			className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
			aria-hidden="true"
		/>
	);
}
