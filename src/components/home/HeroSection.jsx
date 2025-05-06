'use client';

import { usePathname } from 'next/navigation';
import AnimatedHeading from './SharedIheading';

export default function HeroSection() {
	const pathname = usePathname(); // Get current route path

	return (
		<section className="w-screen flex flex-col lg:flex-row gap-0 md:h-auto xl:gap-36 2xl:gap-36 p-4 md:px-8 min-h-screen">
			{/* Logo section - appears on top on mobile */}
			<div className="relative flex items-center justify-center w-[250px] xs:w-[280px] sm:w-[320px] md:w-[380px] lg:w-[350px] xl:w-[400px] 2xl:w-[400px] 3xl:w-[500px] mx-auto lg:mx-0 order-1 lg:order-2 sm:mt-16 mt-32 md:mt-0">
				<img
					src="/svg/indiefluence-hinid-logo-circle.svg"
					alt="indiefluence hindi logo circle"
					className="w-full animate-spin-slow"
				/>
				<img
					src="/svg/indiefluence-hinid-logo.svg"
					alt="indiefluence hindi logo"
					className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] xs:w-[65px] sm:w-[75px] md:w-[90px] lg:w-[110px] xl:w-[120px] 2xl:w-[130px] 3xl:w-[140px]"
				/>
			</div>

			{/* Text section - appears below logo on mobile */}
			<div className="w-full lg:w-3/5 mt-4 sm:mt-6 lg:mt-20 xl:mt-10 order-2 lg:order-1">
				{/* Key forces remount on path change */}
				<AnimatedHeading key={pathname} />
			</div>
		</section>
	);
}
