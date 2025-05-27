"use client";

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
		let lastTouchY = 0;

		const isTouchScreen =
			typeof window !== "undefined" && "ontouchstart" in window;

		const smoothScroll = () => {
			if (!isNavbarScroll) {
				const diff = targetScroll - currentScroll;
				currentScroll += diff * speed;
				window.scrollTo(0, currentScroll);
			}
			animationFrameId = requestAnimationFrame(smoothScroll);
		};

		animationFrameId = requestAnimationFrame(smoothScroll);

		const handleScroll = (e) => {
			const target = e.target;

			// ✅ Fix: only call closest on Elements
			if (!(target instanceof Element)) return;

			const isNavbar =
				target.closest(".navbar") ||
				target.closest("nav") ||
				target.closest('[role="navigation"]') ||
				target.closest(".fullscreen-nav");

			if (isNavbar) {
				isNavbarScroll = true;
				return;
			}

			isNavbarScroll = false;
			e.preventDefault();

			if (e.type === "wheel") {
				const scrollAmount = e.deltaY * 0.5;
				targetScroll += scrollAmount;
			} else if (e.type === "touchmove") {
				const touchY = e.touches[0].clientY;
				const deltaY = lastTouchY ? lastTouchY - touchY : 0;
				lastTouchY = touchY;

				const scrollFactor = isTouchScreen ? 3.5 : 1.5;
				targetScroll += deltaY * scrollFactor;
			}

			targetScroll = Math.max(0, targetScroll);
			targetScroll = Math.min(
				targetScroll,
				document.documentElement.scrollHeight - window.innerHeight
			);
		};

		const handleTouchEnd = () => {
			lastTouchY = 0;
		};

		window.addEventListener("wheel", handleScroll, { passive: false });
		window.addEventListener("touchmove", handleScroll, { passive: false });
		window.addEventListener("touchend", handleTouchEnd, { passive: true });

		const handleMouseLeave = (e) => {
			const target = e.target;

			// ✅ Fix: only call closest on Elements
			if (!(target instanceof Element)) return;

			const isNavbar =
				target.closest(".navbar") ||
				target.closest("nav") ||
				target.closest('[role="navigation"]') ||
				target.closest(".fullscreen-nav");

			if (!isNavbar) {
				isNavbarScroll = false;
			}
		};

		document.addEventListener("mouseleave", handleMouseLeave);

		return () => {
			window.removeEventListener("wheel", handleScroll);
			window.removeEventListener("touchmove", handleScroll);
			window.removeEventListener("touchend", handleTouchEnd);
			document.removeEventListener("mouseleave", handleMouseLeave);
			cancelAnimationFrame(animationFrameId);
		};
	}, [speed]);
};
