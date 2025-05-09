import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Client logos data
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

// Testimonials data
const testimonials = [
	{
		id: "t001",
		quote:
			"Their advisory services transformed our tech strategy completely. The fractional CTO they provided gave us insights we never would have discovered on our own.",
		author: "Sarah Johnson",
		position: "CEO, InnovateTech",
		company: "InnovateTech",
		image: "/api/placeholder/120/120",
	},
	{
		id: "t002",
		quote:
			"The system architecture they designed has scaled flawlessly as we've grown from 10,000 to over 1 million users. Their expertise in building robust, future-proof systems is unmatched.",
		author: "Michael Chen",
		position: "CTO, ScaleUp Solutions",
		company: "ScaleUp Solutions",
		image: "/api/placeholder/120/120",
	},
	{
		id: "t003",
		quote:
			"Their backend development team delivered a solution that not only met our complex requirements but exceeded our performance expectations by 300%.",
		author: "Elena Rodriguez",
		position: "VP of Engineering, DataFlow",
		company: "DataFlow",
		image: "/api/placeholder/120/120",
	},
	{
		id: "t004",
		quote:
			"Our user engagement metrics doubled after implementing their frontend development recommendations. The UI is intuitive, responsive, and our customers love it.",
		author: "James Wilson",
		position: "Product Director, UserFirst",
		company: "UserFirst",
		image: "/api/placeholder/120/120",
	},
	{
		id: "t005",
		quote:
			"Their DevOps implementation reduced our deployment time from days to minutes. The efficiency gains have been transformative for our development cycle.",
		author: "Aisha Patel",
		position: "Lead Developer, CloudNative",
		company: "CloudNative",
		image: "/api/placeholder/120/120",
	},
];

export default function ClientsTestimonialsSection() {
	const logosRowOneRef = useRef(null);
	const logosRowTwoRef = useRef(null);
	const testimonialsRef = useRef(null);
	const testimonialsContainerRef = useRef(null);
	const testimonialElementsRef = useRef([]);

	useEffect(() => {
		// Animate logos in opposite directions
		const firstRow = logosRowOneRef.current;
		const secondRow = logosRowTwoRef.current;

		if (firstRow && secondRow) {
			// First row animation (left to right)
			gsap.to(firstRow, {
				x: "-50%",
				duration: 20,
				repeat: -1,
				ease: "none",
			});

			// Second row animation (right to left)
			gsap.to(secondRow, {
				x: "50%",
				duration: 20,
				repeat: -1,
				ease: "none",
			});
		}

		// Testimonials horizontal scroll (left to right)
		const section = testimonialsRef.current;
		const container = testimonialsContainerRef.current;

		if (!section || !container) return;

		// Calculate the total width for horizontal scrolling
		const totalWidth = testimonials.length * 100;

		// Set width of container
		gsap.set(container, {
			width: `${totalWidth}%`,
		});

		// Create horizontal scroll effect
		const horizontalScroll = gsap.timeline({
			scrollTrigger: {
				trigger: section,
				start: "top top",
				end: `+=${totalWidth}%`,
				pin: true,
				scrub: 1,
				anticipatePin: 1,
				invalidateOnRefresh: true,
			},
		});

		// Animate testimonials container to move horizontally (left to right)
		horizontalScroll.fromTo(
			container,
			{ x: () => -(container.scrollWidth - window.innerWidth) },
			{
				x: 0,
				ease: "none",
			},
		);

		// Set up individual testimonial animations
		testimonialElementsRef.current.forEach((el, index) => {
			gsap.fromTo(
				el,
				{ x: 100, opacity: 0 },
				{
					x: 0,
					opacity: 1,
					duration: 1,
					scrollTrigger: {
						trigger: el,
						containerAnimation: horizontalScroll,
						start: "right left",
						end: "right center",
						scrub: true,
					},
				},
			);
		});

		// Clean up ScrollTrigger when component unmounts
		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	}, []);

	return (
		<>
			{/* Header Section */}
			<section className="w-full h-[400px] flex flex-col justify-center items-center border-b border-gray-200 [data-dark-mode='true']:border-gray-800">
				<div className="w-full max-w-7xl mx-auto px-8">
					<div className="flex justify-between items-center w-full">
						<div className="flex items-center">
							<span className="text-sm font-mono opacity-50">CLIENTS</span>
						</div>
						<h1 className="text-5xl md:text-6xl font-bold text-center">
							Trusted by industry
							<br />
							leaders worldwide
						</h1>
						<div className="flex items-center">
							<span className="text-sm font-mono opacity-50">/006</span>
						</div>
					</div>
				</div>
			</section>

			{/* Logos Marquee Section with Heading between stripes */}
			<section className="w-full py-12 overflow-hidden border-b border-gray-200 [data-dark-mode='true']:border-gray-800">
				{/* First row of logos - moves left to right */}
				<div className="w-full overflow-hidden mb-12">
					<div className="flex" ref={logosRowOneRef} style={{ width: "200%" }}>
						{/* Duplicate logos for continuous effect */}
						{[...clientLogos, ...clientLogos].map((client, index) => (
							<div
								key={`row1-${client.id}-${index}`}
								className="flex-shrink-0 mx-8"
							>
								<div className="w-40 h-20 bg-gray-100 [data-dark-mode='true']:bg-gray-800 flex items-center justify-center">
									<img
										src={client.logo}
										alt={client.name}
										className="max-w-full max-h-full"
									/>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Heading and text between the logo strips */}
				{/* <div className="w-full mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Our Clients
          </h2>
          <p className="text-lg text-center max-w-2xl mx-auto opacity-70">
            We're proud to work with leading companies across industries, from
            promising startups to established enterprises.
          </p>
        </div> */}

				{/* Second row of logos - moves right to left */}
				{/* <div className="w-full overflow-hidden">
          <div className="flex" ref={logosRowTwoRef} style={{ width: "200%" }}>

            {[...clientLogos.reverse(), ...clientLogos.reverse()].map(
              (client, index) => (
                <div
                  key={`row2-${client.id}-${index}`}
                  className="flex-shrink-0 mx-8"
                >
                  <div className="w-40 h-20 bg-gray-100 [data-dark-mode='true']:bg-gray-800 flex items-center justify-center">
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-w-full max-h-full"
                    />
                  </div>
                </div>
              ),
            )}
          </div>
        </div> */}
			</section>

			{/* Testimonials Horizontal Scroll Section */}
			<section
				ref={testimonialsRef}
				className="w-full h-screen overflow-hidden relative"
			>
				<div
					ref={testimonialsContainerRef}
					className="absolute top-0 left-0 h-full flex"
				>
					{testimonials.map((testimonial, index) => (
						<div
							key={testimonial.id}
							ref={(el) => (testimonialElementsRef.current[index] = el)}
							className="w-screen h-full flex items-center px-8 md:px-16 border-b border-gray-200 [data-dark-mode='true']:border-gray-800"
						>
							<div className="w-full h-full flex flex-col md:flex-row items-center">
								{/* Left side with image */}
								<div className="w-full md:w-1/2 h-3/4 bg-gray-100 [data-dark-mode='true']:bg-gray-800 flex items-center justify-center">
									<div className="relative w-3/4 h-3/4">
										<img
											src="/api/placeholder/800/600"
											alt={`${testimonial.company} project`}
											className="w-full h-full object-cover"
										/>
										<div className="absolute -bottom-4 -right-4 bg-white [data-dark-mode='true']:bg-gray-900 p-4 shadow-lg">
											<img
												src={testimonial.image}
												alt={testimonial.company}
												className="w-24 h-12 object-contain"
											/>
										</div>
									</div>
								</div>

								{/* Right side with content */}
								<div className="w-full md:w-1/2 h-full flex flex-col justify-center pl-8">
									<div className="flex items-center">
										<span className="text-sm font-mono opacity-50 mb-2">
											T/{testimonial.id}
										</span>
									</div>

									<div className="text-4xl md:text-5xl font-serif mb-8">"</div>

									<p className="text-lg md:text-2xl max-w-xl mb-12 font-serif italic">
										{testimonial.quote}
									</p>

									<div className="flex items-center">
										<div className="w-12 h-12 rounded-full overflow-hidden mr-4">
											<img
												src={testimonial.image}
												alt={testimonial.author}
												className="w-full h-full object-cover"
											/>
										</div>
										<div>
											<h4 className="font-bold">{testimonial.author}</h4>
											<p className="text-sm opacity-70">
												{testimonial.position}, {testimonial.company}
											</p>
										</div>
									</div>

									<button className="mt-12 border-2 border-default  text-default px-8 py-3 hover:bg-black hover:text-default  transition-all w-fit flex items-center group">
										<span>READ CASE STUDY</span>
										<svg
											className="ml-4 w-4 h-4 group-hover:translate-x-1 transition-transform"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M13 5L20 12L13 19"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M3 12H20"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</button>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Progress indicator */}
				<div className="absolute bottom-8 left-0 w-full flex justify-center gap-2">
					{testimonials.map((testimonial, index) => (
						<div
							key={index}
							className="w-2 h-2 rounded-full bg-gray-400 opacity-30 [data-current='true']:opacity-100"
						></div>
					))}
				</div>
			</section>
		</>
	);
}
