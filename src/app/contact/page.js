'use client';

import React from 'react';
import LogoAnimation from '@/components/reusablesection/LogoAnimation';
import { useTheme } from '@/context/TheamContext';
import {
	MdPerson,
	MdPhone,
	MdEmail,
	MdSubject,
	MdOutlineContactMail,
} from 'react-icons/md';

export default function ContactPage() {
	const { darkMode } = useTheme();

	// Shared styles
	const wrapperClass = `flex items-center gap-3 border rounded-xl px-4 py-5 ${
		darkMode ? 'border-gray-600' : 'border-gray-500'
	}`;

	const inputClass = `w-full outline-none ${
		darkMode
			? 'bg-transparent text-white placeholder-gray-400'
			: 'bg-transparent text-black placeholder-gray-800'
	}`;

	return (
		<div className="relative flex items-center min-h-screen overflow-hidden transition-colors duration-300">
			{/* Logo Animation */}
			<div className="absolute left-[-7%] top-1/2 transform -translate-y-1/3 z-0 w-[600px] h-[600px] opacity-20 xl:opacity-30">
				<LogoAnimation />
			</div>

			{/* Content */}
			<div className="relative z-10 w-full max-w-2xl mx-auto px-4 text-center pb-20 pt-36 xl:pt-20">
				<h2
					className={`text-4xl sm:text-6xl tracking-wide font-bold mb-6 leading-snug ${
						darkMode ? 'text-white' : 'text-black'
					}`}
				>
					Got <span className="text-[#FFD000]">(Koi Shaq)</span> QUESTIONS?
				</h2>

				<p className={`mb-10 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
					Whether you have a project in mind, want to collaborate, or just have a question,
					feel free to reach out. Our team is ready to help.
				</p>

				<form className="space-y-5 text-left">
					{/* Name */}
					<div className={wrapperClass}>
						<MdPerson size={24} className="text-gray-500" />
						<input type="text" placeholder="Name" className={inputClass} />
					</div>

					{/* Phone */}
					<div className={wrapperClass}>
						<MdPhone size={24} className="text-gray-500" />
						<input type="tel" placeholder="Phone" className={inputClass} />
					</div>

					{/* Email */}
					<div className={wrapperClass}>
						<MdEmail size={24} className="text-gray-500" />
						<input type="email" placeholder="Email Address" className={inputClass} />
					</div>

					{/* Subject */}
					<div className={wrapperClass}>
						<MdSubject size={24} className="text-gray-500" />
						<input type="text" placeholder="Subject" className={inputClass} />
					</div>

					{/* Message */}
					<div className={`${wrapperClass} items-start`}>
						<MdOutlineContactMail size={24} className="text-gray-500 " />
						<textarea
							rows={4}
							placeholder="How can we help you? Feel free to get in touch!"
							className={`${inputClass}  resize-none`}
						></textarea>
					</div>

					{/* Submit */}
					<button
						type="submit"
						className="px-6 py-2 rounded-full bg-lime-400 text-black font-semibold hover:bg-lime-300 transition-all"
					>
						SEND →
					</button>
				</form>
			</div>
		</div>
	);
}
