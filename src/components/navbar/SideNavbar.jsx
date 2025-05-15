"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import Image from "next/image";
import DarkModeToggle from "./toggle/DarkModeToggle";
import { services } from "@/data/services"; // Import services from your data file

const NavItem = ({
	id,
	label,
	href,
	isActive,
	hasDropdown = false,
	onClick,
	navSizeClass = "text-7xl",
	idSizeClass = "text-2xl",
}) => {
	const itemRef = useRef(null);

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
		}
	}, [isActive]);

	return (
		<Link
			href={href}
			className={`group flex items-center w-full mb-10 relative overflow-hidden hover:text-[var(--primary-color)] ${isActive ? "text-[var(--secondary-color)]" : "text-white"}`}
			ref={itemRef}
			onClick={onClick}
		>
			<span
				className={`${idSizeClass} font-medium text-gray-500 mr-8 max-md:mr-4 group-hover:text-[var(--primary-color)] ${isActive ? "text-[var(--secondary-color)]" : ""}`}
			>
				{id}
			</span>
			<h2
				className={`${navSizeClass} font-bold uppercase tracking-wider transition-colors duration-300 flex items-center group-hover:text-[var(--primary-color)] ${isActive ? "text-[var(--secondary-color)]" : "text-white"}`}
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
						className={`ml-3 max-md:ml-2 max-md:w-5 group-hover:text-[var(--primary-color)] ${isActive ? "text-[var(--secondary-color)]" : ""}`}
						style={{ display: "inline", verticalAlign: "middle" }}
					>
						<path d="M6 9l6 6 6-6" />
					</svg>
				)}
			</h2>
		</Link>
	);
};

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

const FullscreenNav = () => {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);
	const [showServicesDropdown, setShowServicesDropdown] = useState(false);
	const navRef = useRef(null);
	const menuBtnRef = useRef(null);
	const closeBtnRef = useRef(null);
	const itemsRef = useRef([]);
	const logoRef = useRef(null);
	const ctaButtonRef = useRef(null);
	const socialIconsRef = useRef(null);
	const socialLinksRef = useRef(null);
	const timelineRef = useRef(null);
	const servicesDropdownRef = useRef(null);

	const navLinks = [
		{ id: "01", label: "Home", href: "/" },
		{ id: "02", label: "About", href: "/about" },
		{ id: "03", label: "Services", href: "#", hasDropdown: true },
		{ id: "04", label: "Projects", href: "/projects" },
		{ id: "05", label: "Expertise", href: "/expertise" },
		{ id: "06", label: "Contact", href: "/contact" },
	];

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

	// Handle services dropdown toggle
	const toggleServicesDropdown = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setShowServicesDropdown(!showServicesDropdown);
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				servicesDropdownRef.current &&
				!servicesDropdownRef.current.contains(event.target)
			) {
				setShowServicesDropdown(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	// Create animation timeline on component mount
	useEffect(() => {
		timelineRef.current = gsap.timeline({ paused: true });
		timelineRef.current
			.to(navRef.current, {
				opacity: 1,
				y: 0,
				visibility: "visible",
				duration: 0.7,
				ease: "power3.out",
			})
			.fromTo(
				closeBtnRef.current,
				{ opacity: 0, x: 60 },
				{ opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
				"-=0.3",
			)
			.fromTo(
				socialLinksRef.current.children,
				{ opacity: 0, x: -80 },
				{
					opacity: 1,
					x: 0,
					duration: 0.8,
					stagger: 0.09,
					ease: "elastic.out(1, 0.6)",
				},
				"-=0.4",
			)
			.fromTo(
				itemsRef.current,
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
			)
			.fromTo(
				".navbar-cta-animate",
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
				setShowServicesDropdown(false);
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
			{/* Menu Button + CTA */}
			<div className="fixed top-8 right-8 z-[90] flex items-center space-x-4 max-md:top-4 max-md:right-4">
				{/* MENU Button */}
				<button
					ref={menuBtnRef}
					onClick={toggleNav}
					aria-label="Open Menu"
					className={`flex items-center text-default transition-all duration-300 ${isOpen ? "hidden" : "block"} px-5 py-2 rounded-full font-bold uppercase bg-[var(--primary-color)] hover:bg-white hover:text-[var(--primary-color)] border-2 border-[var(--primary-color)] shadow-md`}
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
						className="hover:text-[var(--primary-color)]"
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
				className={`fixed inset-0 bg-black bg-opacity-95 z-[80] overflow-auto ${isOpen ? "block" : "hidden"}`}
				style={{ opacity: 0, y: 40, visibility: "hidden" }}
			>
				<div className="w-full h-full flex flex-col px-4 md:px-12 py-8">
					<div className="flex justify-between items-start mb-16 max-md:mb-8">
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

					{/* 3-column layout for opened navbar */}
					<div className="flex flex-row h-full max-xl:flex-col w-full">
						{/* Left: Social Links */}
						<div
							ref={socialLinksRef}
							className="w-1/5 flex flex-col justify-center max-xl:w-full max-xl:mb-8"
						>
							{/* Desktop: icon + text, Mobile: icons only in a row */}
							<div className="hidden max-xl:flex flex-row justify-center items-center gap-6 w-[300px] mb-8">
								{socialMedia.map((social, index) => (
									<a
										key={index}
										href={social.url}
										target="_blank"
										rel="noopener noreferrer"
										className=" xl: 2xl:text-3xl text-gray-400 hover:text-[var(--primary-color)] transition-colors duration-300"
									>
										{social.icon}
									</a>
								))}
							</div>
							<div className="flex-col justify-center w-[300px] max-xl:hidden">
								{socialMedia.map((social, index) => (
									<SocialMediaLink
										key={index}
										name={social.name}
										url={social.url}
										icon={social.icon}
									/>
								))}
							</div>
						</div>

						{/* Center: Nav Links (narrower) */}
						<div className="w-1/2 ml-12 flex flex-col justify-center items-center max-xl:w-full max-xl:ml-0 relative">
							<nav className="flex-1 mt-12 max-md:mt-6 w-full">
								{navLinks.map((item, index) => {
									const isActive = item.hasDropdown
										? pathname.startsWith("/services")
										: pathname === item.href;

									// Find the services index to use later
									const servicesIndex = navLinks.findIndex(
										(link) => link.label === "Services",
									);

									return (
										<div
											key={item.id}
											ref={(el) => (itemsRef.current[index] = el)}
											className="relative"
										>
											{item.hasDropdown ? (
												<>
													<a
														href="#"
														onClick={toggleServicesDropdown}
														className={`group flex items-center w-full mb-10 relative overflow-hidden max-md:mb-6 text-white hover:text-[var(--primary-color)] ${isActive ? "text-[var(--secondary-color)]" : ""}`}
														style={{ alignItems: "center" }}
													>
														<span
															className={`text-xl max-md:text-base font-medium text-gray-500 mr-8 max-md:mr-4 group-hover:text-[var(--primary-color)] ${isActive ? "text-[var(--secondary-color)]" : ""}`}
														>
															{item.id}
														</span>
														<h2
															className={`text-6xl max-md:text-3xl font-bold uppercase tracking-wider transition-colors duration-300 flex items-center group-hover:text-[var(--primary-color)] ${isActive ? "text-[var(--secondary-color)]" : "text-white"}`}
															style={{ alignItems: "center" }}
														>
															<span className="mr-0 max-md:mr-0">
																{item.label}
															</span>
															<svg
																width="28"
																height="28"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																strokeWidth="2"
																className={`ml-3 max-md:ml-2 max-md:w-5 group-hover:text-[var(--primary-color)] ${isActive ? "text-[var(--secondary-color)]" : ""} ${showServicesDropdown ? "transform rotate-180" : ""}`}
																style={{
																	display: "inline",
																	verticalAlign: "middle",
																	transition: "transform 0.3s ease",
																}}
															>
																<path d="M6 9l6 6 6-6" />
															</svg>
														</h2>
													</a>
													{/* Inline Dropdown: Only shown below Services link */}
													{showServicesDropdown && (
														<div
															ref={servicesDropdownRef}
															className="pl-24 max-md:pl-8 flex flex-col gap-2 mb-8"
														>
															{services.map((service) => (
																<Link
																	key={service.id}
																	href={`/services/${service.slug}`}
																	className={`flex items-center py-2 text-4xl max-md:text-xl font-bold uppercase tracking-wider transition-colors duration-200 hover:text-[var(--primary-color)] ${pathname === `/services/${service.slug}` ? "text-[var(--secondary-color)]" : "text-white"}`}
																	onClick={() => {
																		setShowServicesDropdown(false);
																		setIsOpen(false);
																	}}
																>
																	<span className="group-hover:text-[var(--primary-color)]">
																		{service.title}
																	</span>
																</Link>
															))}
														</div>
													)}
												</>
											) : (
												// Only add top margin to nav items below Services if dropdown is open
												<div
													className={
														index > servicesIndex && showServicesDropdown
															? "mt-2"
															: ""
													}
												>
													<NavItem
														id={item.id}
														label={item.label}
														href={item.href}
														isActive={isActive}
														hasDropdown={item.hasDropdown}
														onClick={() => setIsOpen(false)}
														navSizeClass="text-6xl max-md:text-3xl"
														idSizeClass="text-xl max-md:text-base"
													/>
												</div>
											)}
										</div>
									);
								})}
							</nav>
						</div>

						{/* Right: Large CTA, vertically centered */}
						<div className="w-1/5 flex flex-col justify-center items-end max-xl:w-full max-xl:items-center max-xl:mt-12">
							<a
								href="/contact"
								className="navbar-cta-animate group flex flex-col items-end max-xl:items-center text-right leading-tight"
								style={{ wordBreak: "break-word" }}
							>
								<span className="flex items-center">
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
									<span className="text-2xl max-xl:text-xl max-md:text-base font-extrabold uppercase tracking-widest text-white group-hover:text-[var(--primary-color)] transition-colors duration-300">
										LET'S CREATE
									</span>
								</span>
								<span className="text-2xl max-xl:text-xl max-md:text-base font-extrabold uppercase tracking-widest text-[var(--primary-color)] relative mt-2">
									SOLUTIONS
									<span className="block w-0 group-hover:w-full h-1 bg-[var(--primary-color)] transition-all duration-500 absolute left-0 -bottom-1"></span>
								</span>
							</a>
						</div>
					</div>
				</div>
			</div>

			<div className="fixed bottom-4 right-4 z-50">
				<div className="bg-white dark:bg-gray-800 rounded-full h-[34px] shadow-md hover:shadow-xl transition-shadow duration-200">
					<DarkModeToggle />
				</div>
			</div>
		</>
	);
};

export default FullscreenNav;
