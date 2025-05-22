"use client";

// hooks/useSlowScroll.js
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useSlowScroll = (speed = 0.5) => {
	useEffect(() => {
		let currentScroll = window.scrollY;
		let targetScroll = window.scrollY;
		let animationFrameId;
		let isNavbarScroll = false;

		const smoothScroll = () => {
			// Only apply smooth scroll if not in navbar
			if (!isNavbarScroll) {
				// Calculate the difference between target and current scroll
				const diff = targetScroll - currentScroll;

				// Apply direct easing without velocity
				currentScroll += diff * speed;

				// Update scroll position
				window.scrollTo(0, currentScroll);
			}

			// Continue animation
			animationFrameId = requestAnimationFrame(smoothScroll);
		};

		// Start the animation loop
		animationFrameId = requestAnimationFrame(smoothScroll);

		const handleScroll = (e) => {
			// Check if the scroll event is from the navbar
			const target = e.target;
			const isNavbar = target.closest('.navbar') ||
						   target.closest('nav') ||
						   target.closest('[role="navigation"]') ||
						   target.closest('.fullscreen-nav');

			if (isNavbar) {
				isNavbarScroll = true;
				// Allow default scroll behavior for navbar
				return;
			}

			isNavbarScroll = false;
			// Prevent default scroll behavior for main content
			e.preventDefault();

			// Update target scroll position with reduced sensitivity
			const scrollAmount = e.deltaY * 0.5;
			targetScroll += scrollAmount;

			// Ensure target scroll stays within bounds
			targetScroll = Math.max(0, targetScroll);
			targetScroll = Math.min(
				targetScroll,
				document.documentElement.scrollHeight - window.innerHeight
			);
		};

		// Add scroll event listeners
		window.addEventListener("wheel", handleScroll, { passive: false });
		window.addEventListener("touchmove", handleScroll, { passive: false });

		// Reset isNavbarScroll when mouse leaves the navbar
		const handleMouseLeave = (e) => {
			const target = e.target;
			const isNavbar = target.closest('.navbar') ||
						   target.closest('nav') ||
						   target.closest('[role="navigation"]') ||
						   target.closest('.fullscreen-nav');

			if (!isNavbar) {
				isNavbarScroll = false;
			}
		};

		document.addEventListener("mouseleave", handleMouseLeave);

		return () => {
			window.removeEventListener("wheel", handleScroll);
			window.removeEventListener("touchmove", handleScroll);
			document.removeEventListener("mouseleave", handleMouseLeave);
			cancelAnimationFrame(animationFrameId);
		};
	}, [speed]);
};
