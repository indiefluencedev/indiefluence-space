import "./globals.css";
import { Manrope, Orbitron } from "next/font/google";
import { ThemeProvider } from "@/context/TheamContext";
// import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import BackgroundEffects from "@/components/UI/BackgroundEffect";
import Sidebar from "@/components/navbar/SideNavbar";

const manrope = Manrope({
	variable: "--font-manrope",
	subsets: ["latin"],
});

const orbitron = Orbitron({
	variable: "--font-Orbitron",
	subsets: ["latin"],
	weight: "400", // Share Tech only comes in 400 weight
});

export const metadata = {
	title: "Indiefluence",
	description: "Your trusted technology partner",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={`${manrope.variable} ${orbitron.variable}`}>
			<body
				className="antialiased min-h-screen relative"
				suppressHydrationWarning={true}
			>
				<ThemeProvider>
					{/* Background Effects added here */}
					<BackgroundEffects />
					{/* <Navbar /> */}
					<Sidebar />
					<main className="relative z-10">{children}</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
