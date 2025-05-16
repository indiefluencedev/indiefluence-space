"use client";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import Image from "next/image";
import DarkModeToggle from "@/components/navbar/toggle/DarkModeToggle";
import { services } from "@/data/services"; // Import services from your data file
import TransitionLink from "@/components/UI/TransitionLink"; // Added TransitionLink import

/**
 * FULLSCREEN NAVIGATION COMPONENT
 *
 * This component creates a fullscreen navigation menu with animations.
 *
 * FEATURES:
 * - Fullscreen overlay navigation
 * - Animated transitions using GSAP
 * - Services dropdown menu
 * - Social media links
 * - Responsive design for all screen sizes
 * - Dark/light mode support
 * - Horizontal lines below menu items
 * - Micro-interactions on hover
 *
 * FONT SIZE CUSTOMIZATION:
 * - For menu items: Look for "text-[3rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem]" classes in the nav links section
 * - For ID numbers: Look for "text-base md:text-xl lg:text-3xl" classes in the nav links section
 * - For social icons text: Look for "text-gray-400" class in the social links section
 * - For CTA button: Look for "text-base md:text-xl lg:text-2xl" classes in the CTA section
 */

// Custom hook to safely use theme when next-themes might not be available
const useThemeSafe = () => {
	// Default to light theme if useTheme is not available
	const [mounted, setMounted] = useState(false);
	const [currentTheme, setCurrentTheme] = useState("light");

	useEffect(() => {
		// Check if we're in a browser environment
		if (typeof window !== "undefined") {
			// Check for dark mode preference
			const isDarkMode =
				window.matchMedia &&
				window.matchMedia("(prefers-color-scheme: dark)").matches;
			setCurrentTheme(isDarkMode ? "dark" : "light");

			// Check for theme in localStorage
			const savedTheme = localStorage.getItem("theme");
			if (savedTheme) {
				setCurrentTheme(savedTheme);
			}

			// Check for data-theme attribute on document
			const dataTheme = document.documentElement.getAttribute("data-theme");
			if (dataTheme) {
				setCurrentTheme(dataTheme);
			}

			setMounted(true);
		}
	}, []);

	return { theme: currentTheme, mounted };
};

/**
 * NavItem Component
 *
 * Renders a single navigation item with animations.
 *
 * PROPS:
 * - id: The number prefix for the nav item (e.g., "01")
 * - label: The text to display (e.g., "HOME")
 * - href: The URL to navigate to
 * - isActive: Whether this item is currently active
 * - hasDropdown: Whether this item has a dropdown menu
 * - onClick: Function to call when clicked
 * - navSizeClass: Tailwind classes for the main text size (CUSTOMIZABLE)
 * - idSizeClass: Tailwind classes for the ID number size (CUSTOMIZABLE)
 */
const NavItem = ({
	id,
	label,
	href,
	isActive,
	hasDropdown = false,
	onClick,
	navSizeClass = "text-7xl", // CUSTOMIZE MAIN TEXT SIZE HERE
	idSizeClass = "text-2xl", // CUSTOMIZE ID NUMBER SIZE HERE
}) => {
	const itemRef = useRef(null);
	const lineRef = useRef(null);
	const textRef = useRef(null);

	// Set up hover animation for the line and text
	useEffect(() => {
		if (itemRef.current && lineRef.current && textRef.current) {
			// Initial state for the line
			gsap.set(lineRef.current, {
				scaleX: isActive ? 1 : 0,
				transformOrigin: "left center",
				opacity: isActive ? 1 : 0.3,
			});

			// Create hover animations
			const enterAnimation = () => {
				gsap.to(lineRef.current, {
					scaleX: 1,
					opacity: 1,
					duration: 0.4,
					ease: "power2.out",
				});
				gsap.to(textRef.current, {
					x: 10, // Shift text slightly to the right
					duration: 0.3,
					ease: "power2.out",
				});
			};

			const leaveAnimation = () => {
				if (!isActive) {
					gsap.to(lineRef.current, {
						scaleX: 0,
						opacity: 0.3,
						duration: 0.4,
						ease: "power2.in",
					});
				}
				gsap.to(textRef.current, {
					x: 0, // Return text to original position
					duration: 0.3,
					ease: "power2.in",
				});
			};

			// Add event listeners
			itemRef.current.addEventListener("mouseenter", enterAnimation);
			itemRef.current.addEventListener("mouseleave", leaveAnimation);

			// Cleanup
			return () => {
				if (itemRef.current) {
					itemRef.current.removeEventListener("mouseenter", enterAnimation);
					itemRef.current.removeEventListener("mouseleave", leaveAnimation);
				}
			};
		}
	}, [isActive]);

	// Active state animation
	useEffect(() => {
		if (isActive && itemRef.current) {
			gsap.fromTo(
				itemRef.current,
				{ color: "rgba(255, 255, 255, 0.7)" },
				{
					color: "var(--secondary-color)",
					duration: 0.8,
					ease: "elastic.out(1, 0.3)",
				},
			);

			// Animate the line for active state
			if (lineRef.current) {
				gsap.to(lineRef.current, {
					scaleX: 1,
					opacity: 1,
					duration: 0.4,
					ease: "power2.out",
				});
			}
		}
	}, [isActive]);

	return (
		<div className="relative w-full">
			<TransitionLink
				href={href}
				className={`group flex items-center w-full mb-4 relative overflow-visible hover:text-[var(--primary-color)] ${
					isActive ? "text-[var(--secondary-color)]" : "text-white"
				}`}
				ref={itemRef}
				onClick={onClick}
			>
				<span
					className={`${idSizeClass} font-medium text-gray-500 mr-8 max-md:mr-4 group-hover:text-[var(--primary-color)] ${
						isActive ? "text-[var(--secondary-color)]" : ""
					}`}
				>
					{id}
				</span>
				<div
					ref={textRef}
					className="transform transition-transform duration-300"
				>
					<h2
						className={`${navSizeClass} font-bold uppercase tracking-wider transition-colors duration-300 flex items-center group-hover:text-[var(--primary-color)] ${
							isActive ? "text-[var(--secondary-color)]" : "text-white"
						}`}
					>
						<span className="mr-0 max-md:mr-0">{label}</span>
						{hasDropdown && (
							<svg
								width="28"
								height="28"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								className={`ml-3 max-md:ml-2 max-md:w-5 group-hover:text-[var(--primary-color)] ${
									isActive ? "text-[var(--secondary-color)]" : ""
								}`}
								style={{ display: "inline", verticalAlign: "middle" }}
							>
								<path d="M6 9l6 6 6-6" />
							</svg>
						)}
					</h2>
				</div>
			</TransitionLink>
			{/* Horizontal line below menu item */}
			<div
				ref={lineRef}
				className={`w-full h-[1px] bg-gradient-to-r from-white via-white to-transparent mb-6 ${
					isActive ? "opacity-100" : "opacity-30"
				}`}
				style={{ transformOrigin: "left center" }}
			></div>
		</div>
	);
};

/**
 * SocialMediaLink Component
 *
 * Renders a social media link with icon and text.
 *
 * PROPS:
 * - name: The name of the social media platform
 * - url: The URL to link to
 * - icon: The SVG icon to display
 */
const SocialMediaLink = ({ name, url, icon }) => {
	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className="mb-8 flex items-center group hover:text-[var(--primary-color)]"
		>
			<span className="text-4xl font-bold text-gray-700 group-hover:text-[var(--primary-color)] transition-colors duration-300">
				{icon}
			</span>
			<h3 className="text-4xl font-bold text-gray-700 group-hover:text-[var(--primary-color)] transition-colors duration-300 ml-4">
				{name}
			</h3>
		</a>
	);
};

/**
 * FullscreenNav Component
 *
 * Main component that renders the fullscreen navigation.
 */
const FullscreenNav = () => {
	// State and hooks
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);
	const [showServicesDropdown, setShowServicesDropdown] = useState(false);
	const { theme, mounted } = useThemeSafe();

	// Refs for animations
	const navRef = useRef(null);
	const menuBtnRef = useRef(null);
	const closeBtnRef = useRef(null);
	const itemsRef = useRef([]);
	const logoRef = useRef(null);
	const ctaButtonRef = useRef(null);
	const socialIconsRef = useRef(null);
	const socialIconsContainerRef = useRef(null);
	const timelineRef = useRef(null);
	const servicesDropdownRef = useRef(null);

	// Navigation links configuration
	// CUSTOMIZE MENU ITEMS HERE
	const navLinks = [
		{ id: "01", label: "Home", href: "/" },
		{ id: "02", label: "About", href: "/about" },
		{ id: "03", label: "Services", href: "#", hasDropdown: true },
		{ id: "04", label: "Projects", href: "/projects" },
		{ id: "05", label: "Expertise", href: "/expertise" },
		{ id: "06", label: "Contact", href: "/contact" },
	];

	// Social media links configuration
	// CUSTOMIZE SOCIAL MEDIA LINKS HERE
	const socialMedia = [
		{
			name: "INSTAGRAM",
			url: "https://instagram.com/yourcompany",
			icon: (
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
				>
					<rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
					<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
					<line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
				</svg>
			),
		},
		{
			name: "FACEBOOK",
			url: "https://facebook.com/yourcompany",
			icon: (
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
				>
					<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
				</svg>
			),
		},
		{
			name: "LINKEDIN",
			url: "https://linkedin.com/company/yourcompany",
			icon: (
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
				>
					<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
					<rect x="2" y="9" width="4" height="12"></rect>
					<circle cx="4" cy="4" r="2"></circle>
				</svg>
			),
		},
		{
			name: "X / TWITTER",
			url: "https://x.com/yourcompany",
			icon: (
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
				>
					<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
				</svg>
			),
		},
	];

	/**
	 * Toggle Services Dropdown
	 *
	 * Handles opening and closing the services dropdown menu.
	 */
	const toggleServicesDropdown = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setShowServicesDropdown(!showServicesDropdown);
	};

	/**
	 * Click Outside Handler
	 *
	 * Closes the dropdown when clicking outside of it.
	 */
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				servicesDropdownRef.current &&
				!servicesDropdownRef.current.contains(event.target) &&
				!event.target.closest('a[href="#"]') // Don't close if clicking the Services link itself
			) {
				setShowServicesDropdown(false);
			}
		};

		if (showServicesDropdown) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showServicesDropdown]);

	/**
	 * Animation Timeline Setup
	 *
	 * Creates the GSAP animation timeline for the navbar.
	 */
	useEffect(() => {
		// Initialize GSAP timeline
		timelineRef.current = gsap.timeline({ paused: true });

		// Ensure refs are available before animating
		if (navRef.current) {
			// Set initial state
			gsap.set(navRef.current, {
				opacity: 0,
				y: 0, // Changed from 40 to 0 to remove the gap at the top
				visibility: "hidden",
			});

			timelineRef.current.to(navRef.current, {
				opacity: 1,
				y: 0,
				visibility: "visible",
				duration: 0.7,
				ease: "power3.out",
			});
		}

		// Animate close button if available
		if (closeBtnRef.current) {
			timelineRef.current.fromTo(
				closeBtnRef.current,
				{ opacity: 0, x: 60 },
				{ opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
				"-=0.3",
			);
		}

		// Animate social icons if available
		if (socialIconsContainerRef.current) {
			const socialIcons = socialIconsContainerRef.current.querySelectorAll("a");
			if (socialIcons.length > 0) {
				timelineRef.current.fromTo(
					socialIcons,
					{ opacity: 0, y: 30 },
					{
						opacity: 1,
						y: 0,
						duration: 0.6,
						stagger: 0.1,
						ease: "back.out(1.7)",
					},
					"-=0.4",
				);
			}
		}

		// Animate nav items if available
		if (itemsRef.current.length > 0) {
			const validItems = itemsRef.current.filter((item) => item !== null);
			if (validItems.length > 0) {
				timelineRef.current.fromTo(
					validItems,
					{ opacity: 0, y: 80, scale: 0.95 },
					{
						opacity: 1,
						y: 0,
						scale: 1,
						duration: 0.8,
						stagger: 0.1,
						ease: "back.out(1.7)",
					},
					"-=0.5",
				);
			}
		}

		// Animate CTA button
		const ctaElements = document.querySelectorAll(".navbar-cta-animate");
		if (ctaElements.length > 0) {
			timelineRef.current.fromTo(
				ctaElements,
				{ opacity: 0, y: 60, scale: 0.95 },
				{
					opacity: 1,
					y: 0,
					scale: 1,
					duration: 0.8,
					ease: "elastic.out(1, 0.6)",
				},
				"-=0.5",
			);
		}

		return () => {
			if (timelineRef.current) {
				timelineRef.current.kill();
			}
		};
	}, []);

	/**
	 * Toggle Navigation
	 *
	 * Handles opening and closing the fullscreen navigation.
	 */
	const toggleNav = () => {
		if (!timelineRef.current) return;

		if (isOpen) {
			// Reverse the timeline for close animation
			timelineRef.current.reverse();

			// After animation completes, update state
			setTimeout(() => {
				setIsOpen(false);
				setShowServicesDropdown(false);
			}, 1000);
		} else {
			setIsOpen(true);

			// Make sure the nav is visible before playing the animation
			if (navRef.current) {
				// Reset visibility and opacity before playing animation
				gsap.set(navRef.current, {
					visibility: "visible",
					opacity: 0,
					y: 0, // Changed from 40 to 0 to remove the gap at the top
				});
			}

			// Play the timeline for open animation
			setTimeout(() => {
				timelineRef.current.play();
			}, 50); // Small delay to ensure DOM updates
		}
	};

	/**
	 * Escape Key Handler
	 *
	 * Closes the navigation when the Escape key is pressed.
	 */
	useEffect(() => {
		const handleEscKey = (event) => {
			if (event.key === "Escape" && isOpen) {
				toggleNav();
			}
		};

		document.addEventListener("keydown", handleEscKey);
		return () => {
			document.removeEventListener("keydown", handleEscKey);
		};
	}, [isOpen]);

	// Determine button colors based on theme
	const buttonBgColor =
		theme === "dark"
			? "bg-[var(--primary-color)]"
			: "bg-[var(--secondary-color)]";
	const buttonTextColor = theme === "dark" ? "text-black" : "text-white";
	const buttonBorderColor =
		theme === "dark"
			? "border-[var(--primary-color)]"
			: "border-[var(--secondary-color)]";
	const buttonHoverBg = theme === "dark" ? "hover:bg-black" : "hover:bg-white";
	const buttonHoverText =
		theme === "dark"
			? "hover:text-[var(--primary-color)]"
			: "hover:text-[var(--secondary-color)]";

	// Don't render theme-dependent elements until mounted
	if (!mounted) {
		return null;
	}

	return (
		<>
			{/* SECTION: Menu Button */}
			<div className="fixed top-8 right-8 z-[90] flex items-center space-x-4 max-md:top-4 max-md:right-4">
				{/* MENU Button */}
				<button
					ref={menuBtnRef}
					onClick={toggleNav}
					aria-label="Open Menu"
					className={`flex items-center transition-all duration-300 ${
						isOpen ? "hidden" : "block"
					} px-5 py-2 rounded-full font-bold uppercase ${buttonBgColor} ${buttonTextColor} ${buttonHoverBg} ${buttonHoverText} border-2 ${buttonBorderColor} shadow-md`}
					style={{ letterSpacing: "0.1em" }}
				>
					<span className="text-xl font-medium mr-2 max-md:text-xl">MENU</span>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path d="M7 12L21 12" />
						<path d="M3 6L21 6" />
						<path d="M11 18L21 18" />
					</svg>
				</button>
			</div>

			{/* SECTION: Fullscreen Navigation Overlay */}
			<div
				ref={navRef}
				className={`fixed inset-0 bg-black bg-opacity-95 z-[80] overflow-auto ${isOpen ? "block" : "hidden"}`}
				style={{
					opacity: isOpen ? 1 : 0,
					y: 0, // Fixed: Set to 0 to remove the gap at the top
					visibility: isOpen ? "visible" : "hidden",
					transition: "opacity 0.3s ease", // Fallback transition
				}}
			>
				{/* SECTION: Navigation Container */}
				<div className="w-full h-full flex flex-col px-4 md:px-12 py-0">
					{" "}
					{/* Changed py-8 to py-0 to remove top gap */}
					{/* SECTION: Logo and Close Button */}
					<div className="flex justify-between items-start pt-8 mb-16 max-md:mb-8">
						{" "}
						{/* Added pt-8 to maintain spacing */}
						{/* Logo - Increased Size */}
						<div ref={logoRef} className="w-80 max-md:w-56">
							<Image
								src="/svg/logo.svg"
								alt="Logo"
								width={300}
								height={300}
								className="opacity-100"
							/>
						</div>
						{/* Close Button */}
						<button
							ref={closeBtnRef}
							onClick={toggleNav}
							aria-label="Close Menu"
							className="flex items-center text-white hover:text-[var(--primary-color)] transition-all duration-300"
						>
							<span className="text-xl font-medium mr-2 max-md:text-xl">
								CLOSE
							</span>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								className="hover:text-[var(--primary-color)]"
							>
								<path d="M18 6L6 18" />
								<path d="M6 6L18 18" />
							</svg>
						</button>
					</div>
					{/* SECTION: Mobile-style layout for all screen sizes */}
					<div className="flex flex-col w-full">
						{/* SECTION: Social Links in a row */}
						<div
							ref={socialIconsContainerRef}
							className="flex flex-row justify-center items-center gap-6 mb-8"
						>
							{socialMedia.map((social, index) => (
								<a
									key={index}
									href={social.url}
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-400 hover:text-[var(--primary-color)] transition-colors duration-300 transform hover:scale-110 transition-transform duration-300"
								>
									{social.icon}
								</a>
							))}
						</div>

						{/* SECTION: Nav Links - CUSTOMIZE FONT SIZES HERE */}
						<nav className="flex-1 mt-6 w-full">
							{navLinks.map((item, index) => {
								const isActive = item.hasDropdown
									? pathname.startsWith("/services")
									: pathname === item.href;

								return (
									<div
										key={item.id}
										ref={(el) => (itemsRef.current[index] = el)}
										className="relative"
									>
										{item.hasDropdown ? (
											<div className="relative">
												<a
													href="#"
													onClick={toggleServicesDropdown}
													className={`group flex items-center w-full relative overflow-hidden text-white hover:text-[var(--primary-color)] ${
														isActive ? "text-[var(--secondary-color)]" : ""
													}`}
													style={{ alignItems: "center" }}
												>
													{/* ID Number - CUSTOMIZE SIZE HERE */}
													<span
														className={`text-base md:text-xl lg:text-3xl font-medium text-gray-500 mr-4 md:mr-8 group-hover:text-[var(--primary-color)] ${
															isActive ? "text-[var(--secondary-color)]" : ""
														}`}
													>
														{item.id}
													</span>
													{/* Main Text - CUSTOMIZE SIZE HERE */}
													<div className="transform transition-transform duration-300 hover:translate-x-2">
														<h2
															className={`text-[3rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] font-bold uppercase tracking-wider transition-colors duration-300 flex items-center group-hover:text-[var(--primary-color)] ${
																isActive
																	? "text-[var(--secondary-color)]"
																	: "text-white"
															}`}
															style={{ alignItems: "center" }}
														>
															<span className="mr-0">{item.label}</span>
															<svg
																width="28"
																height="28"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																strokeWidth="2"
																className={`ml-2 md:ml-3 w-5 md:w-auto group-hover:text-[var(--primary-color)] ${
																	isActive
																		? "text-[var(--secondary-color)]"
																		: ""
																} ${showServicesDropdown ? "transform rotate-180" : ""}`}
																style={{
																	display: "inline",
																	verticalAlign: "middle",
																	transition: "transform 0.3s ease",
																}}
															>
																<path d="M6 9l6 6 6-6" />
															</svg>
														</h2>
													</div>
												</a>

												{/* Horizontal line below menu item */}
												<div
													className={`w-full h-[1px] bg-gradient-to-r from-white via-white to-transparent mb-6 ${
														isActive ? "opacity-100" : "opacity-30"
													} transform transition-transform duration-300 origin-left ${
														showServicesDropdown ? "scale-x-100" : "scale-x-0"
													} group-hover:scale-x-100`}
												></div>

												{/* SECTION: Services Dropdown */}
												{showServicesDropdown && (
													<div
														ref={servicesDropdownRef}
														className="pl-8 md:pl-24 flex flex-col gap-2 mb-8"
													>
														<div className="flex justify-between items-center mb-2">
															<div className="flex-1"></div>
															<button
																className="text-white hover:text-[var(--primary-color)]"
																onClick={(e) => {
																	e.stopPropagation();
																	setShowServicesDropdown(false);
																}}
																aria-label="Close services menu"
															>
																<svg
																	width="20"
																	height="20"
																	viewBox="0 0 24 24"
																	fill="none"
																	stroke="currentColor"
																	strokeWidth="2"
																>
																	<path d="M18 6L6 18" />
																	<path d="M6 6L18 18" />
																</svg>
															</button>
														</div>

														{/* Services List - CUSTOMIZE DROPDOWN FONT SIZE HERE */}
														{services.map((service) => (
															<div key={service.id} className="relative">
																<TransitionLink
																	href={`/services/${service.slug}`}
																	className={`flex items-center py-2 text-xl md:text-3xl lg:text-5xl font-bold uppercase tracking-wider transition-colors duration-200 hover:text-[var(--primary-color)] ${
																		pathname === `/services/${service.slug}`
																			? "text-[var(--secondary-color)]"
																			: "text-white"
																	} transform transition-transform duration-300 hover:translate-x-2`}
																	onClick={() => {
																		setShowServicesDropdown(false);
																		toggleNav();
																	}}
																>
																	<span className="group-hover:text-[var(--primary-color)]">
																		{service.title}
																	</span>
																</TransitionLink>
																{/* Thin line below each service item */}
																<div className="w-full h-[1px] bg-gradient-to-r from-white/30 to-transparent my-2 transform origin-left scale-x-0 transition-transform duration-300 hover:scale-x-100"></div>
															</div>
														))}
													</div>
												)}
											</div>
										) : (
											<div className="relative">
												<TransitionLink
													href={item.href}
													className={`group flex items-center w-full relative overflow-hidden hover:text-[var(--primary-color)] ${
														isActive
															? "text-[var(--secondary-color)]"
															: "text-white"
													}`}
													onClick={() => setIsOpen(false)}
												>
													{/* ID Number - CUSTOMIZE SIZE HERE */}
													<span
														className={`text-base md:text-xl lg:text-3xl font-medium text-gray-500 mr-4 md:mr-8 group-hover:text-[var(--primary-color)] ${
															isActive ? "text-[var(--secondary-color)]" : ""
														}`}
													>
														{item.id}
													</span>
													{/* Main Text - CUSTOMIZE SIZE HERE */}
													<div className="transform transition-transform duration-300 hover:translate-x-2">
														<h2
															className={`text-[3rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] font-bold uppercase tracking-wider transition-colors duration-300 flex items-center group-hover:text-[var(--primary-color)] ${
																isActive
																	? "text-[var(--secondary-color)]"
																	: "text-white"
															}`}
														>
															<span>{item.label}</span>
														</h2>
													</div>
												</TransitionLink>
												{/* Horizontal line below menu item */}
												<div
													className={`w-full h-[1px] bg-gradient-to-r from-white via-white to-transparent mb-6 ${
														isActive ? "opacity-100" : "opacity-30"
													} transform transition-transform duration-300 origin-left ${
														isActive ? "scale-x-100" : "scale-x-0"
													} group-hover:scale-x-100`}
												></div>
											</div>
										)}
									</div>
								);
							})}
						</nav>

						{/* SECTION: CTA Button */}
						<div className="flex justify-center mt-12">
							<TransitionLink
								href="/contact"
								className="navbar-cta-animate group flex flex-col items-center text-center leading-tight relative"
							>
								<span className="flex items-center transform transition-transform duration-300 group-hover:translate-x-2">
									{/* Rocket icon */}
									<svg
										className="mr-2 text-[var(--primary-color)]"
										width="32"
										height="32"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
									>
										<path d="M5 19c-1.5-1.5 2-5 7-7 2-5 5.5-8.5 7-7s-2 5-7 7c-2 5-5.5 8.5-7 7z" />
										<circle cx="12" cy="12" r="2" />
									</svg>
									{/* CTA Text - CUSTOMIZE SIZE HERE */}
									<span className="text-base md:text-xl lg:text-3xl font-extrabold uppercase tracking-widest text-white group-hover:text-[var(--primary-color)] transition-colors duration-300">
										LET'S CREATE
									</span>
								</span>
								{/* CTA Subtext - CUSTOMIZE SIZE HERE */}
								<span className="text-base md:text-xl lg:text-3xl font-extrabold uppercase tracking-widest text-[var(--primary-color)] relative mt-2 transform transition-transform duration-300 group-hover:translate-x-2">
									SOLUTIONS
									<span className="block w-0 group-hover:w-full h-1 bg-[var(--primary-color)] transition-all duration-500 absolute left-0 -bottom-1"></span>
								</span>
								{/* Horizontal line below CTA */}
								<div className="w-full h-[1px] bg-gradient-to-r from-[var(--primary-color)] via-[var(--primary-color)] to-transparent mt-4 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
							</TransitionLink>
						</div>
					</div>
				</div>
			</div>

			{/* SECTION: Dark Mode Toggle */}
			<div className="fixed bottom-4 right-4 z-50">
				<div className="bg-white dark:bg-gray-800 rounded-full h-[34px] shadow-md hover:shadow-xl transition-shadow duration-200">
					<DarkModeToggle />
				</div>
			</div>
		</>
	);
};

export default FullscreenNav;
