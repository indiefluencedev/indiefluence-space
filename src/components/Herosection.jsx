import LogoCanvas from "@/components/threeJS/LogoCanvas";
import AnimatedHeading from "./home/SharedIheading";

export default function Hero() {
	return (
		<section className="w-full flex flex-col lg:flex-row items-center justify-between p-4 md:p-8 min-h-screen">
			{/* Text section - will appear on top on mobile */}
			<div className="w-full lg:w-1/2 mt-8 lg:mt-0">
				<AnimatedHeading />
			</div>
			{/* 3D Logo - will appear at bottom on mobile */}
			<div className="w-full lg:w-1/2 h-[40vh] md:h-[50vh] lg:h-auto mb-4 lg:mb-0">
				<LogoCanvas />
			</div>
		</section>
	);
}
