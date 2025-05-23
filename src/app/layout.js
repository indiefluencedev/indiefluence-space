import "./globals.css";
import { Manrope, Orbitron } from "next/font/google";
import { ThemeProvider } from "@/context/TheamContext";
import Footer from "@/components/footer/Footer";
import BackgroundEffects from "@/components/UI/BackgroundEffect";
import Sidebar from "@/components/navbar/SideNavbar";
import PixelTransition from "@/components/UI/PixelTransition";
import SlowScrollWrapper from "@/components/UI/SlowScrollWrapper";

const manrope = Manrope({
	variable: "--font-manrope",
	subsets: ["latin"],
});

const orbitron = Orbitron({
	variable: "--font-Orbitron",
	subsets: ["latin"],
	weight: "400",
});

export const metadata = {
	title: "Indiefluence Space",
	description: "Indiefluence Space - Your Digital Innovation Partner",
};

export default function RootLayout({ children }) {
	return (
		<html
			lang="en"
			className={`${manrope.variable} ${orbitron.variable}`}
			suppressHydrationWarning
		>
			<body className="antialiased min-h-screen relative">
				<ThemeProvider>
					<PixelTransition>
						<BackgroundEffects />
						<Sidebar />
						<SlowScrollWrapper speed={0.05}>
							<main className="relative z-10">{children}</main>
							<Footer />
						</SlowScrollWrapper>
					</PixelTransition>
				</ThemeProvider>
			</body>
		</html>
	);
}
