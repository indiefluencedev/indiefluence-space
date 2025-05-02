import AnimatedHeading from "./SharedIheading";

export default function HeroSection() {
	return (
		<section className="w-screen flex flex-col lg:flex-row items-center justify-between p-4 md:p-8 min-h-screen">
			{/* Text section - will appear on top on mobile */}
			<div className="w-full lg:w-1/2 mt-8 lg:mt-0">
				<AnimatedHeading />
			</div>

			<div className="relative flex items-center justify-center w-[400px] md:w-[500px] mx-auto">
				<img
					src="/svg/indiefluence-hinid-logo-circle.svg"
					alt="indiefluence hindi logo circle"
					className="w-full animate-spin-slow"
				/>
				<img
					src="/svg/indiefluence-hinid-logo.svg"
					alt="indiefluence hindi logo"
					className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90px] md:w-[140px]"
				/>
			</div>
		</section>
	);
}
