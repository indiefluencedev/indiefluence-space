"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import Image from "next/image";

const NavItem = ({ id, label, href, isActive }) => {
	const itemRef = useRef(null);

	useEffect(() => {
		if (isActive && itemRef.current) {
			gsap.fromTo(
				itemRef.current,
				{ color: "rgba(255, 255, 255, 0.7)" },
				{
					color: "#FF5B14", // Using orange color to match image
					duration: 0.8,
					ease: "elastic.out(1, 0.3)",
				},
			);
		}
	}, [isActive]);

	return (
		<Link
			href={href}
			className="group flex items-center w-full mb-12 relative overflow-hidden"
			ref={itemRef}
		>
			<span className="text-2xl font-medium text-gray-500 mr-8">{id}</span>
			<h2 className="text-7xl font-bold uppercase text-white tracking-wider hover:text-[#FF5B14] transition-colors duration-300">
				{label}
			</h2>
		</Link>
	);
};

const FullscreenNav = () => {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);
	const navRef = useRef(null);
	const menuBtnRef = useRef(null);
	const closeBtnRef = useRef(null);
	const itemsRef = useRef([]);
	const logoRef = useRef(null);
	const ctaButtonRef = useRef(null);
	const socialIconsRef = useRef(null);
	const facilitiesRef = useRef(null);
	const timelineRef = useRef(null);

	const navLinks = [
		{ id: "01", label: "Home", href: "/" },
		{ id: "02", label: "About", href: "/about" },
		{ id: "03", label: "Services", href: "/services" },
		{ id: "04", label: "Projects", href: "/projects" },
		{ id: "05", label: "Expertise", href: "/expertise" },
		{ id: "06", label: "Contact", href: "/contact" },
	];

	const facilities = [
		"OUR FACILITIES",
		"FOR ARTISTS",
		"FOR CORPORATE",
		"RENTAL",
	];

	// Create animation timeline on component mount
	useEffect(() => {
		timelineRef.current = gsap.timeline({ paused: true });

		// Prepare animations for navigation
		timelineRef.current
			.to(navRef.current, {
				opacity: 1,
				visibility: "visible",
				duration: 0.4,
				ease: "power3.out",
			})
			.fromTo(
				closeBtnRef.current,
				{ opacity: 0, x: 20 },
				{ opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
				"-=0.2",
			)
			.fromTo(
				facilitiesRef.current.children,
				{ opacity: 0, x: -50 },
				{ opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
				"-=0.2",
			)
			.fromTo(
				itemsRef.current,
				{ opacity: 0, y: 40 },
				{
					opacity: 1,
					y: 0,
					duration: 0.5,
					stagger: 0.08,
					ease: "power2.out",
				},
				"-=0.4",
			)
			.fromTo(
				ctaButtonRef.current,
				{ opacity: 0, scale: 0.9 },
				{ opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
				"-=0.2",
			)
			.fromTo(
				socialIconsRef.current.children,
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" },
				"-=0.3",
			);

		return () => {
			if (timelineRef.current) {
				timelineRef.current.kill();
			}
		};
	}, []);

	// Toggle navigation with animations
	const toggleNav = () => {
		if (isOpen) {
			// Reverse the timeline for close animation
			timelineRef.current.reverse();

			// After animation completes, update state
			setTimeout(() => {
				setIsOpen(false);
			}, 1000);
		} else {
			setIsOpen(true);

			// Play the timeline for open animation
			timelineRef.current.play();
		}
	};

	// Handle escape key to close navigation
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

	return (
		<>
			{/* Menu Button */}
			<div className="fixed top-8 right-8 z-[90]">
				<button
					ref={menuBtnRef}
					onClick={toggleNav}
					aria-label="Open Menu"
					className={`flex items-center text-white hover:text-[#FF5B14] transition-all duration-300 ${isOpen ? "hidden" : "block"}`}
				>
					<span className="text-xl font-medium mr-2">MENU</span>
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

			{/* Fullscreen Navigation */}
			<div
				ref={navRef}
				className={`fixed inset-0 bg-black bg-opacity-95 z-[80] overflow-auto ${
					isOpen ? "block" : "hidden"
				}`}
				style={{ opacity: 0, visibility: "hidden" }}
			>
				<div className="container mx-auto px-8 py-16 h-full flex flex-col">
					<div className="flex justify-between items-start mb-16">
						{/* Logo */}
						<div ref={logoRef} className="w-32">
							<Image
								src="/svg/logo.svg"
								alt="Logo"
								width={100}
								height={100}
								className="opacity-80"
							/>
						</div>

						{/* Close Button */}
						<button
							ref={closeBtnRef}
							onClick={toggleNav}
							aria-label="Close Menu"
							className="flex items-center text-white hover:text-[#FF5B14] transition-all duration-300"
						>
							<span className="text-xl font-medium mr-2">CLOSE</span>
							<svg
								width="24"
								height="24"
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

					<div className="flex flex-row h-full">
						{/* Left side - Facilities */}
						<div
							ref={facilitiesRef}
							className="w-1/3 flex flex-col justify-center"
						>
							{facilities.map((facility, index) => (
								<div key={index} className="mb-8">
									<h3 className="text-4xl font-bold text-gray-700 hover:text-[#FF5B14] transition-colors duration-300 cursor-pointer">
										{facility}
									</h3>
								</div>
							))}
						</div>

						{/* Right side - Main Navigation */}
						<div className="w-2/3 flex flex-col">
							<nav className="flex-1 mt-12">
								{navLinks.map((item, index) => (
									<div
										key={item.id}
										ref={(el) => (itemsRef.current[index] = el)}
									>
										<NavItem
											id={item.id}
											label={item.label}
											href={item.href}
											isActive={pathname === item.href}
										/>
									</div>
								))}
							</nav>

							{/* Footer area */}
							<div className="mt-auto mb-8">
								<div className="flex justify-between items-end">
									{/* Social Icons */}
									<div ref={socialIconsRef} className="flex space-x-8">
										<a
											href="#"
											className="text-gray-500 hover:text-white transition-all duration-300 text-lg uppercase"
											aria-label="Instagram"
										>
											INSTAGRAM
										</a>
										<a
											href="#"
											className="text-gray-500 hover:text-white transition-all duration-300 text-lg uppercase"
											aria-label="LinkedIn"
										>
											LINKEDIN
										</a>
									</div>

									{/* CTA Button */}
									<div ref={ctaButtonRef}>
										<a href="/contact" className="group flex items-center">
											<span className="text-[#FF5B14] text-4xl uppercase font-bold tracking-wider mr-4">
												LET'S CREATE
											</span>
											<svg
												width="32"
												height="32"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												className="text-[#FF5B14] transform transition-transform duration-300 group-hover:translate-x-2"
											>
												<path d="M5 12h14M12 5l7 7-7 7" />
											</svg>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default FullscreenNav;
