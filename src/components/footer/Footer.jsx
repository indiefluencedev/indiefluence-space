"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import QuantumButton from "../UI/QuantumButton";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Register GSAP plugins
if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger, SplitText);
}

// Utility function for combining class names
const cn = (...classes) => {
	return classes.filter(Boolean).join(" ");
};

// BackgroundBeams component with all paths
const BackgroundBeams = React.memo(({ className }) => {
	const beamsRef = useRef(null);

	useEffect(() => {
		if (beamsRef.current) {
			gsap.fromTo(
				beamsRef.current,
				{ opacity: 0 },
				{
					opacity: 0.7,
					duration: 2.5,
					ease: "power2.inOut",
				},
			);
		}
	}, []);

	// Using paths from original code
	const paths = [
		"M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
		"M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867",
		"M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859",
		"M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851",
		"M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843",
		"M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835",
		"M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827",
		"M-331 -245C-331 -245 -263 160 201 287C665 414 733 819 733 819",
		"M-324 -253C-324 -253 -256 152 208 279C672 406 740 811 740 811",
		"M-317 -261C-317 -261 -249 144 215 271C679 398 747 803 747 803",
		"M-310 -269C-310 -269 -242 136 222 263C686 390 754 795 754 795",
		"M-303 -277C-303 -277 -235 128 229 255C693 382 761 787 761 787",
		"M-296 -285C-296 -285 -228 120 236 247C700 374 768 779 768 779",
		"M-289 -293C-289 -293 -221 112 243 239C707 366 775 771 775 771",
		"M-282 -301C-282 -301 -214 104 250 231C714 358 782 763 782 763",
		"M-275 -309C-275 -309 -207 96 257 223C721 350 789 755 789 755",
		"M-268 -317C-268 -317 -200 88 264 215C728 342 796 747 796 747",
		"M-261 -325C-261 -325 -193 80 271 207C735 334 803 739 803 739",
		"M-254 -333C-254 -333 -186 72 278 199C742 326 810 731 810 731",
		"M-247 -341C-247 -341 -179 64 285 191C749 318 817 723 817 723",
		"M-240 -349C-240 -349 -172 56 292 183C756 310 824 715 824 715",
		"M-233 -357C-233 -357 -165 48 299 175C763 302 831 707 831 707",
		"M-226 -365C-226 -365 -158 40 306 167C770 294 838 699 838 699",
		"M-219 -373C-219 -373 -151 32 313 159C777 286 845 691 845 691",
		"M-212 -381C-212 -381 -144 24 320 151C784 278 852 683 852 683",
		"M-205 -389C-205 -389 -137 16 327 143C791 270 859 675 859 675",
		"M-198 -397C-198 -397 -130 8 334 135C798 262 866 667 866 667",
		"M-191 -405C-191 -405 -123 0 341 127C805 254 873 659 873 659",
		"M-184 -413C-184 -413 -116 -8 348 119C812 246 880 651 880 651",
		"M-177 -421C-177 -421 -109 -16 355 111C819 238 887 643 887 643",
		"M-170 -429C-170 -429 -102 -24 362 103C826 230 894 635 894 635",
		"M-163 -437C-163 -437 -95 -32 369 95C833 222 901 627 901 627",
		"M-156 -445C-156 -445 -88 -40 376 87C840 214 908 619 908 619",
		"M-149 -453C-149 -453 -81 -48 383 79C847 206 915 611 915 611",
		"M-142 -461C-142 -461 -74 -56 390 71C854 198 922 603 922 603",
		"M-135 -469C-135 -469 -67 -64 397 63C861 190 929 595 929 595",
		"M-128 -477C-128 -477 -60 -72 404 55C868 182 936 587 936 587",
		"M-121 -485C-121 -485 -53 -80 411 47C875 174 943 579 943 579",
		"M-114 -493C-114 -493 -46 -88 418 39C882 166 950 571 950 571",
		"M-107 -501C-107 -501 -39 -96 425 31C889 158 957 563 957 563",
		"M-100 -509C-100 -509 -32 -104 432 23C896 150 964 555 964 555",
		"M-93 -517C-93 -517 -25 -112 439 15C903 142 971 547 971 547",
		"M-86 -525C-86 -525 -18 -120 446 7C910 134 978 539 978 539",
		"M-79 -533C-79 -533 -11 -128 453 -1C917 126 985 531 985 531",
		"M-72 -541C-72 -541 -4 -136 460 -9C924 118 992 523 992 523",
		"M-65 -549C-65 -549 3 -144 467 -17C931 110 999 515 999 515",
		"M-58 -557C-58 -557 10 -152 474 -25C938 102 1006 507 1006 507",
		"M-51 -565C-51 -565 17 -160 481 -33C945 94 1013 499 1013 499",
		"M-44 -573C-44 -573 24 -168 488 -41C952 86 1020 491 1020 491",
		"M-37 -581C-37 -581 31 -176 495 -49C959 78 1027 483 1027 483",
	];

	return (
		<div
			ref={beamsRef}
			className={cn(
				"absolute inset-0 flex h-full w-full items-center justify-center [mask-repeat:no-repeat] [mask-size:40px]",
				className,
			)}
		>
			<svg
				className="pointer-events-none absolute z-0 h-full w-full"
				width="100%"
				height="100%"
				viewBox="0 0 696 316"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827M-331 -245C-331 -245 -263 160 201 287C665 414 733 819 733 819M-324 -253C-324 -253 -256 152 208 279C672 406 740 811 740 811M-317 -261C-317 -261 -249 144 215 271C679 398 747 803 747 803M-310 -269C-310 -269 -242 136 222 263C686 390 754 795 754 795M-303 -277C-303 -277 -235 128 229 255C693 382 761 787 761 787M-296 -285C-296 -285 -228 120 236 247C700 374 768 779 768 779M-289 -293C-289 -293 -221 112 243 239C707 366 775 771 775 771M-282 -301C-282 -301 -214 104 250 231C714 358 782 763 782 763M-275 -309C-275 -309 -207 96 257 223C721 350 789 755 789 755M-268 -317C-268 -317 -200 88 264 215C728 342 796 747 796 747M-261 -325C-261 -325 -193 80 271 207C735 334 803 739 803 739M-254 -333C-254 -333 -186 72 278 199C742 326 810 731 810 731M-247 -341C-247 -341 -179 64 285 191C749 318 817 723 817 723M-240 -349C-240 -349 -172 56 292 183C756 310 824 715 824 715M-233 -357C-233 -357 -165 48 299 175C763 302 831 707 831 707M-226 -365C-226 -365 -158 40 306 167C770 294 838 699 838 699M-219 -373C-219 -373 -151 32 313 159C777 286 845 691 845 691M-212 -381C-212 -381 -144 24 320 151C784 278 852 683 852 683M-205 -389C-205 -389 -137 16 327 143C791 270 859 675 859 675M-198 -397C-198 -397 -130 8 334 135C798 262 866 667 866 667M-191 -405C-191 -405 -123 0 341 127C805 254 873 659 873 659M-184 -413C-184 -413 -116 -8 348 119C812 246 880 651 880 651M-177 -421C-177 -421 -109 -16 355 111C819 238 887 643 887 643M-170 -429C-170 -429 -102 -24 362 103C826 230 894 635 894 635M-163 -437C-163 -437 -95 -32 369 95C833 222 901 627 901 627M-156 -445C-156 -445 -88 -40 376 87C840 214 908 619 908 619M-149 -453C-149 -453 -81 -48 383 79C847 206 915 611 915 611M-142 -461C-142 -461 -74 -56 390 71C854 198 922 603 922 603M-135 -469C-135 -469 -67 -64 397 63C861 190 929 595 929 595M-128 -477C-128 -477 -60 -72 404 55C868 182 936 587 936 587M-121 -485C-121 -485 -53 -80 411 47C875 174 943 579 943 579M-114 -493C-114 -493 -46 -88 418 39C882 166 950 571 950 571M-107 -501C-107 -501 -39 -96 425 31C889 158 957 563 957 563M-100 -509C-100 -509 -32 -104 432 23C896 150 964 555 964 555M-93 -517C-93 -517 -25 -112 439 15C903 142 971 547 971 547M-86 -525C-86 -525 -18 -120 446 7C910 134 978 539 978 539M-79 -533C-79 -533 -11 -128 453 -1C917 126 985 531 985 531M-72 -541C-72 -541 -4 -136 460 -9C924 118 992 523 992 523M-65 -549C-65 -549 3 -144 467 -17C931 110 999 515 999 515M-58 -557C-58 -557 10 -152 474 -25C938 102 1006 507 1006 507M-51 -565C-51 -565 17 -160 481 -33C945 94 1013 499 1013 499M-44 -573C-44 -573 24 -168 488 -41C952 86 1020 491 1020 491M-37 -581C-37 -581 31 -176 495 -49C959 78 1027 483 1027 483"
					stroke="url(#paint0_radial_242_278)"
					strokeOpacity="0.05"
					strokeWidth="0.5"
				></path>

				{paths.map((path, index) => (
					<motion.path
						key={`path-` + index}
						d={path}
						stroke={`url(#linearGradient-${index})`}
						strokeOpacity="0.4"
						strokeWidth="0.5"
					></motion.path>
				))}
				<defs>
					{paths.map((path, index) => (
						<motion.linearGradient
							id={`linearGradient-${index}`}
							key={`gradient-${index}`}
							initial={{
								x1: "0%",
								x2: "0%",
								y1: "0%",
								y2: "0%",
							}}
							animate={{
								x1: ["0%", "100%"],
								x2: ["0%", "95%"],
								y1: ["0%", "100%"],
								y2: ["0%", `${93 + Math.random() * 8}%`],
							}}
							transition={{
								duration: Math.random() * 10 + 10,
								ease: "easeInOut",
								repeat: Infinity,
								delay: Math.random() * 10,
							}}
						>
							<stop stopColor="#18CCFC" stopOpacity="0"></stop>
							<stop stopColor="#18CCFC"></stop>
							<stop offset="32.5%" stopColor="#6344F5"></stop>
							<stop offset="100%" stopColor="#AE48FF" stopOpacity="0"></stop>
						</motion.linearGradient>
					))}

					<radialGradient
						id="paint0_radial_242_278"
						cx="0"
						cy="0"
						r="1"
						gradientUnits="userSpaceOnUse"
						gradientTransform="translate(352 34) rotate(90) scale(555 1560.62)"
					>
						<stop offset="0.0666667" stopColor="#d4d4d4"></stop>
						<stop offset="0.243243" stopColor="#d4d4d4"></stop>
						<stop offset="0.43594" stopColor="white" stopOpacity="0"></stop>
					</radialGradient>
				</defs>
			</svg>
		</div>
	);
});

BackgroundBeams.displayName = "BackgroundBeams";

const Footer = () => {
	// Create refs for GSAP animations
	const footerRef = useRef(null);
	const taglineRef = useRef(null);
	const emailRef = useRef(null);
	const leftLinksRef = useRef(null);
	const rightAddressRef = useRef(null);
	const ctaButtonRef = useRef(null);
	const connectSectionRef = useRef(null);
	const arrowRef = useRef(null);

	useEffect(() => {
		// Set up GSAP animations
		const ctx = gsap.context(() => {
			// Initial animation for the footer container
			gsap.fromTo(
				footerRef.current,
				{ opacity: 0 },
				{ opacity: 1, duration: 1.2, ease: "power2.out" },
			);

			// Tagline animation
			gsap.fromTo(
				taglineRef.current,
				{ opacity: 0, y: -20 },
				{ opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)", delay: 0.3 },
			);

			// Email animation with text reveal
			if (emailRef.current) {
				// First, make sure the email is visible
				gsap.set(emailRef.current, { opacity: 1 });

				// Then split the text into characters
				const splitEmail = new SplitText(emailRef.current, { type: "chars" });

				// Animate each character
				gsap.fromTo(
					splitEmail.chars,
					{
						opacity: 0,
						scale: 0,
						y: 20,
						rotationX: -90,
					},
					{
						opacity: 1,
						scale: 1,
						y: 0,
						rotationX: 0,
						duration: 1,
						stagger: 0.03,
						ease: "back.out(1.7)",
						delay: 0.5,
					},
				);
			}

			// Content sections animation - staggered zig-zag pattern
			gsap.fromTo(
				leftLinksRef.current,
				{ opacity: 0, x: -30 },
				{ opacity: 1, x: 0, duration: 0.8, ease: "power2.out", delay: 0.7 },
			);

			gsap.fromTo(
				rightAddressRef.current,
				{ opacity: 0, x: 30 },
				{ opacity: 1, x: 0, duration: 0.8, ease: "power2.out", delay: 0.9 },
			);

			// CTA Button animation
			gsap.fromTo(
				ctaButtonRef.current,
				{ opacity: 0, scale: 0.8 },
				{
					opacity: 1,
					scale: 1,
					duration: 0.7,
					ease: "elastic.out(1, 0.5)",
					delay: 1.1,
				},
			);

			// Let's Connect section animation
			if (connectSectionRef.current) {
				gsap.fromTo(
					connectSectionRef.current,
					{ opacity: 0, y: 50 },
					{
						opacity: 1,
						y: 0,
						duration: 1.5,
						ease: "power4.out",
						delay: 1.3,
					},
				);
			}

			// Arrow animation
			gsap.fromTo(
				arrowRef.current,
				{
					opacity: 0,
					x: -20,
					rotation: -45,
				},
				{
					opacity: 1,
					x: 0,
					rotation: 0,
					duration: 1,
					ease: "elastic.out(1, 0.5)",
					delay: 1.6,
				},
			);
		});

		// Clean up
		return () => ctx.revert();
	}, []);

	return (
		<footer
			ref={footerRef}
			className="relative w-full h-auto min-h-[800px] flex flex-col items-center justify-center overflow-hidden bg-black py-16 px-4"
		>
			{/* Background Effect */}
			<BackgroundBeams className="opacity-70" />

			{/* Content Container */}
			<div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col h-full">
				{/* Top Section - TagLine */}
				<div className="mb-10 md:mb-12 mt-8">
					<p
						ref={taglineRef}
						className="text-sm md:text-base lg:text-lg text-white/70"
					>
						Uncover the potency of SquadHub.ai
					</p>
				</div>

				{/* Middle Section with better layout */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
					{/* Email - now in a single line with more space */}
					<div className="lg:col-span-8 mb-8 lg:mb-0">
						<h2
							ref={emailRef}
							className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white border-b border-white/20 pb-3 whitespace-nowrap overflow-hidden text-ellipsis"
						>
							venu@indiefluence.in
						</h2>
					</div>

					{/* CTA Button - better positioned with more space */}
					<div className="lg:col-span-4 flex items-center justify-start lg:justify-end">
						<div ref={ctaButtonRef} className="w-full lg:w-auto">
							<QuantumButton
								text="GET-STARTED"
								className="w-full md:w-64 h-14 text-lg"
								onClick={() => console.log("Get Started clicked")}
							/>
						</div>
					</div>

					{/* Bottom section with links and address */}
					<div className="lg:col-span-6 mt-12 lg:mt-20" ref={leftLinksRef}>
						<ul className="space-y-4 md:space-y-6">
							<li>
								<a
									href="#"
									className="text-white hover:text-white/80 transition-colors text-lg md:text-xl group flex items-center"
								>
									<span className="inline-block w-0 group-hover:w-4 transition-all duration-300 h-[1px] bg-white mr-0 group-hover:mr-2"></span>
									Products
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-white hover:text-white/80 transition-colors text-lg md:text-xl group flex items-center"
								>
									<span className="inline-block w-0 group-hover:w-4 transition-all duration-300 h-[1px] bg-white mr-0 group-hover:mr-2"></span>
									Pricing
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-white hover:text-white/80 transition-colors text-lg md:text-xl group flex items-center"
								>
									<span className="inline-block w-0 group-hover:w-4 transition-all duration-300 h-[1px] bg-white mr-0 group-hover:mr-2"></span>
									Contact Us
								</a>
							</li>
						</ul>
					</div>

					{/* Address section */}
					<div
						ref={rightAddressRef}
						className="lg:col-span-6 mt-12 lg:mt-20 lg:text-right"
					>
						<h3 className="text-white text-lg md:text-xl font-medium mb-3">
							Office
						</h3>
						<address className="text-white/70 not-italic text-base md:text-lg">
							Plot 151,
							<br />
							Sector-2 Industrial Area,
							<br />
							Kurukshetra, Haryana, 136118
						</address>
					</div>
				</div>

				{/* LET'S CONNECT Section - improved positioning */}
				<div ref={connectSectionRef} className="w-full mt-24 md:mt-36 lg:mt-48">
					<div className="flex items-center overflow-hidden">
						{/* Text that grows in size based on breakpoints */}
						<h1 className="text-4xl sm:text-5xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[11rem] font-bold text-white text-left whitespace-nowrap">
							LET'S <br /> CONNECT
						</h1>

						{/* Arrow positioned right next to the text */}
						<div ref={arrowRef} className="ml-4 sm:ml-6 md:ml-8 lg:ml-10">
							<svg
								width="30"
								height="30"
								viewBox="0 0 80 80"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className="text-white sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 2xl:w-28 2xl:h-28"
							>
								<path
									d="M16 64L64 16"
									stroke="currentColor"
									strokeWidth="4"
									strokeLinecap="square"
								/>
								<path
									d="M24 16H64V56"
									stroke="currentColor"
									strokeWidth="4"
									strokeLinecap="square"
								/>
							</svg>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
