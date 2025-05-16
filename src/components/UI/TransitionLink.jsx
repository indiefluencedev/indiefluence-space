"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * TransitionLink component for smooth page transitions
 * Use this instead of regular Next.js Link for pages where you want the transition effect
 */
const TransitionLink = ({
	href,
	children,
	className = "",
	onClick,
	prefetch = true,
}) => {
	const router = useRouter();

	const handleClick = (e) => {
		// Allow the default onClick to run if provided
		if (onClick) {
			onClick(e);
		}

		// If it's an external link or has a modifier key pressed, let the browser handle it
		if (
			href.startsWith("http") ||
			href.startsWith("mailto:") ||
			href.startsWith("tel:") ||
			e.metaKey ||
			e.ctrlKey ||
			e.shiftKey ||
			e.altKey
		) {
			return;
		}

		e.preventDefault();

		// Start transition before navigation
		const startTransition = () => {
			// Dispatch custom event to trigger transition
			window.dispatchEvent(new CustomEvent('pageTransitionStart'));

			// Small delay to allow transition to start before navigation
			setTimeout(() => {
				router.push(href);
			}, 100);
		};

		startTransition();
	};

	return (
		<Link
			href={href}
			className={className}
			onClick={handleClick}
			prefetch={prefetch}
		>
			{children}
		</Link>
	);
};

export default TransitionLink;
