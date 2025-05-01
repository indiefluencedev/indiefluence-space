import HeroSection from "@/components/Herosection";
// import ThreeCanvas from "@/components/threeJS/LogoCanvas";
// import Image from "next/image";

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<HeroSection />
			{/* <ThreeCanvas /> */}
		</div>
	);
}
