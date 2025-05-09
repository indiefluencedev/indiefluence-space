"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import DarkModeToggle from "./toggle/DarkModeToggle";

const navLinks = [
	{ id: "01", label: "Home", href: "/" },
	{ id: "02", label: "About", href: "/about" },
	{ id: "03", label: "Services", href: "/services" },
	{ id: "04", label: "Projects", href: "/projects" },
	{ id: "05", label: "Expertise", href: "/expertise" },
	{ id: "06", label: "Contact", href: "/contact" },
];

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const menuRef = useRef(null);
	const menuItemsRef = useRef([]);
	const contactBtnRef = useRef(null);
	const arrowRef = useRef(null);
	const navbarRef = useRef(null);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	// Scroll behavior
	useEffect(() => {
		const controlNavbar = () => {
			const currentScrollY = window.scrollY;

			if (currentScrollY > lastScrollY) {
				// scrolling down
				setIsVisible(false);
			} else {
				// scrolling up
				setIsVisible(true);
			}

			setLastScrollY(currentScrollY);
		};

		window.addEventListener("scroll", controlNavbar);

		return () => {
			window.removeEventListener("scroll", controlNavbar);
		};
	}, [lastScrollY]);

	// GSAP animations
	useEffect(() => {
		if (menuOpen) {
			// Menu open animation
			gsap.fromTo(
				menuRef.current,
				{ opacity: 0, height: 0 },
				{ opacity: 1, height: "auto", duration: 0.5, ease: "power3.out" },
			);

			// Animate each menu item with staggered delay
			gsap.fromTo(
				menuItemsRef.current,
				{ opacity: 0, y: 20 },
				{
					opacity: 1,
					y: 0,
					duration: 0.4,
					stagger: 0.1,
					ease: "power2.out",
					delay: 0.2,
				},
			);

			// Animate contact button
			gsap.fromTo(
				contactBtnRef.current,
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: 0.4, delay: 0.6, ease: "power2.out" },
			);

			// Animate arrow
			gsap.fromTo(
				arrowRef.current,
				{ x: -10, opacity: 0 },
				{ x: 0, opacity: 1, duration: 0.4, delay: 0.7, ease: "back.out" },
			);
		}
	}, [menuOpen]);

	return (
		<>
			{/* Main Navbar Container - Max width 400px */}
			<div
				ref={navbarRef}
				className={`fixed top-0 right-0 z-40 transition-transform duration-300 xss:w-full max-w-[400px] w-full ${
					isVisible ? "translate-y-0" : "-translate-y-full"
				}`}
				style={{
					margin: "10px",
					clipPath:
						"polygon(0 0, 100% 0, 100% 100%, 30px 100%, 0 calc(100% - 30px))",
				}}
			>
				{/* Border element */}
				<div
					className="absolute inset-0 bg-gray-800"
					style={{
						transform: "scale(1.01)",
						zIndex: -1,
					}}
				/>

				{/* Main navbar container with slightly smaller dimensions to show the border */}
				<header
					className="relative w-full bg-white text-black shadow-lg"
					style={{
						clipPath:
							"polygon(0 0, 100% 0, 100% 100%, 30px 100%, 0 calc(100% - 30px))",
						margin: "1px",
					}}
				>
					<div className="flex items-center border-b border-gray-800">
						{/* Logo section - 300px width */}
						<div
							className="flex items-center p-2 w-3/4"
							style={{ maxWidth: "300px" }}
						>
							<div className="mr-2">
								<Image
									src="/svg/logo.svg"
									alt="indiefluence"
									width={25}
									height={12}
									className="w-auto h-auto"
								/>
							</div>
						</div>

						{/* Menu toggle button container - 100px width and height (square) */}
						<div
							className="relative border-l border-l-gray-800 border-dashed w-1/4"
							style={{
								maxWidth: "100px",
								aspectRatio: "1 / 1",
							}}
						>
							<button
								onClick={toggleMenu}
								aria-label="Toggle menu"
								className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 focus:outline-none"
							>
								{menuOpen ? (
									<svg
										width="18"
										height="18"
										viewBox="0 0 24 24"
										className="transform transition-transform duration-300"
									>
										<path
											d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
											fill="currentColor"
										/>
									</svg>
								) : (
									<svg
										width="18"
										height="18"
										viewBox="0 0 24 24"
										className="transform transition-transform duration-300"
									>
										<path
											d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
											fill="currentColor"
										/>
									</svg>
								)}
							</button>
						</div>
					</div>

					{/* Menu dropdown */}
					{menuOpen && (
						<div ref={menuRef} className="overflow-hidden bg-white">
							<nav className="flex flex-col border-b border-gray-800">
								{navLinks.map((link, index) => (
									<Link
										key={link.id}
										href={link.href}
										ref={(el) => (menuItemsRef.current[index] = el)}
										className="flex items-center justify-between py-3 px-3 border-b border-gray-800 last:border-b-0 hover:bg-[var(--primary-color)] transition-colors duration-300"
									>
										<div className="flex items-center">
											<span className="text-xs font-medium mr-3">
												{link.id}
											</span>
											<span className="text-sm font-normal">{link.label}</span>
										</div>
										{link.id === "01" && <span className="text-sm">+</span>}
									</Link>
								))}
							</nav>

							{/* Contact section */}
							<div
								ref={contactBtnRef}
								className="flex bg-[var(--secondary-color)] text-white"
							>
								<div className="py-3 px-3 flex-1">
									<span className="text-xs uppercase font-medium">CONTACT</span>
									<span className="text-xs uppercase font-medium ml-1">US</span>
									<h2 className="text-sm font-medium mt-2">LET'S TALK</h2>
									<div className="flex items-center mt-3">
										<span className="mr-3">/</span>
										<span>F034671</span>
									</div>
								</div>
								<div className="flex items-center justify-center px-3 border-l border-black">
									<div ref={arrowRef} className="transform">
										<svg
											width="18"
											height="18"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M5 12H19M19 12L12 5M19 12L12 19"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</div>
								</div>
							</div>
						</div>
					)}
				</header>
			</div>

			{/* Dark mode toggle positioned at bottom right */}
			<div className="fixed bottom-4 right-4 z-50">
				<div className="bg-white dark:bg-gray-800 rounded-full h-[34px] ">
					<DarkModeToggle />
				</div>
			</div>
		</>
	);
};

export default Navbar;
