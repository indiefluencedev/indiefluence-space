// LogoMarquee.js
import { useEffect, useRef } from "react";
import gsap from "gsap";

// Dummy logo data (reuse your actual list or pass via props if preferred)
const clientLogos = [
	{ id: 1, name: "Client 1", logo: "/api/placeholder/160/80" },
	{ id: 2, name: "Client 2", logo: "/api/placeholder/160/80" },
	{ id: 3, name: "Client 3", logo: "/api/placeholder/160/80" },
	{ id: 4, name: "Client 4", logo: "/api/placeholder/160/80" },
	{ id: 5, name: "Client 5", logo: "/api/placeholder/160/80" },
	{ id: 6, name: "Client 6", logo: "/api/placeholder/160/80" },
	{ id: 7, name: "Client 7", logo: "/api/placeholder/160/80" },
	{ id: 8, name: "Client 8", logo: "/api/placeholder/160/80" },
	{ id: 9, name: "Client 9", logo: "/api/placeholder/160/80" },
	{ id: 10, name: "Client 10", logo: "/api/placeholder/160/80" },
];

export default function LogoMarquee() {
	const logosRowOneRef = useRef(null);
	const logosRowTwoRef = useRef(null);

	useEffect(() => {
		const firstRow = logosRowOneRef.current;
		const secondRow = logosRowTwoRef.current;

		if (firstRow && secondRow) {
			gsap.to(firstRow, {
				x: "-50%",
				duration: 20,
				repeat: -1,
				ease: "none",
			});

			gsap.to(secondRow, {
				x: "50%",
				duration: 20,
				repeat: -1,
				ease: "none",
			});
		}
	}, []);

	return (
		<section className="w-full py-12 overflow-hidden border-b border-gray-200 [data-dark-mode='true']:border-gray-800">
			<div className="w-full overflow-hidden mb-12">
				<div className="flex" ref={logosRowOneRef} style={{ width: "200%" }}>
					{[...clientLogos, ...clientLogos].map((client, index) => (
						<div key={`row1-${client.id}-${index}`} className="flex-shrink-0 mx-8">
							<div className="w-40 h-20 bg-gray-100 [data-dark-mode='true']:bg-gray-800 flex items-center justify-center">
								<img src={client.logo} alt={client.name} className="max-w-full max-h-full" />
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="w-full overflow-hidden">
				<div className="flex" ref={logosRowTwoRef} style={{ width: "200%" }}>
					{[...clientLogos.reverse(), ...clientLogos.reverse()].map((client, index) => (
						<div key={`row2-${client.id}-${index}`} className="flex-shrink-0 mx-8">
							<div className="w-40 h-20 bg-gray-100 [data-dark-mode='true']:bg-gray-800 flex items-center justify-center">
								<img src={client.logo} alt={client.name} className="max-w-full max-h-full" />
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
