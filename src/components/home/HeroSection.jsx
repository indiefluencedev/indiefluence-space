'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import AnimatedHeading from './SharedIheading';
import LogoAnimation from '@/components/reusablesection/LogoAnimation'; // ✅ Import the component

export default function HeroSection() {
	const pathname = usePathname();

	return (
		<section className="w-screen flex flex-col lg:flex-row gap-0 md:h-auto xl:gap-36 2xl:gap-36 p-4 md:px-8 min-h-screen">
			{/* Logo section */}
			<LogoAnimation/>

			{/* Text section */}
			<div className="w-full lg:w-3/5 mt-4 sm:mt-6 lg:mt-20 xl:mt-10 order-2 lg:order-1">
				<AnimatedHeading key={pathname} />
			</div>
		</section>
	);
}
