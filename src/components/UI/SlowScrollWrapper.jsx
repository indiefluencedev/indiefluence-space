"use client";

import { useSlowScroll } from "@/hooks/useSlowScroll";

export default function SlowScrollWrapper({ children, speed = 0.5 }) {
	// Use a slightly faster speed for better responsiveness
	const adjustedSpeed = speed * 1.5;
	useSlowScroll(adjustedSpeed);

	return (
		<div className="slow-scroll-wrapper">
			{children}
		</div>
	);
}
