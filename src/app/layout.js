import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/context/TheamContext";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import BackgroundEffects from "@/components/UI/BackgroundEffect";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});
const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata = {
	title: "Indiefluence",
	description: "Your trusted technology partner",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
			<body className="antialiased min-h-screen relative">
				<ThemeProvider>
					{/* Background Effects added here */}
					<BackgroundEffects />
					<Navbar />
					<main className="relative z-10">{children}</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
