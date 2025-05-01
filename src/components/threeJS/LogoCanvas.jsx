"use client";
import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";
import gsap from "gsap";

const LogoCanvas = () => {
	const mountRef = useRef();
	const [model, setModel] = useState(null);
	const requestRef = useRef();
	const [windowWidth, setWindowWidth] = useState(
		typeof window !== "undefined" ? window.innerWidth : 0
	);

	useEffect(() => {
		// Update window width on mount
		setWindowWidth(window.innerWidth);

		const container = mountRef.current;
		if (!container) return;

		// Scene setup
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			45,
			container.clientWidth / container.clientHeight,
			0.1,
			1000,
		);

		// Adjust camera position based on screen size
		const isMobile = windowWidth < 768;
		camera.position.set(0, 0, isMobile ? 35 : 30); // Pull back more on mobile

		const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
		renderer.setSize(container.clientWidth, container.clientHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		container.appendChild(renderer.domElement);

		// Lights
		const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
		const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
		directionalLight.position.set(2, 2, 5);
		scene.add(ambientLight, directionalLight);

		// Load model
		const loader = new GLTFLoader();
		loader.load("/models/logo.glb", (gltf) => {
			const loadedModel = gltf.scene;
			// Scale based on screen size
			const modelScale = isMobile ? 1.6 : 2;
			loadedModel.scale.set(modelScale, modelScale, modelScale);
			loadedModel.rotation.set(0, 0, 0); // Reset rotation
			loadedModel.position.set(0, isMobile ? -2 : 0, 0); // Adjust position for mobile
			scene.add(loadedModel);
			setModel(loadedModel);

			// Initial render
			renderer.render(scene, camera);

			// Setup GSAP animations after model is loaded
			setupAnimations(loadedModel);
		});

		// Animation function using GSAP
		const setupAnimations = (modelObject) => {
			// Initial smooth reveal animation
			gsap.from(modelObject.rotation, {
				y: -Math.PI * 2,
				duration: 2,
				ease: "power2.out",
			});

			// Continuous gentle rotation animation
			gsap.to(modelObject.rotation, {
				y: Math.PI * 2,
				duration: 15,
				ease: "none",
				repeat: -1,
				onUpdate: () => {
					renderer.render(scene, camera);
				},
			});

			// Optional hover effect - only on desktop
			if (windowWidth >= 768) {
				container.addEventListener("mouseenter", () => {
					gsap.to(modelObject.position, {
						y: 0.3,
						duration: 1,
						ease: "power2.out",
					});
					gsap.to(modelObject.rotation, {
						timeScale: 3,
						duration: 1,
					});
				});
				container.addEventListener("mouseleave", () => {
					gsap.to(modelObject.position, {
						y: 0,
						duration: 1,
						ease: "power2.out",
					});
					gsap.to(modelObject.rotation, {
						timeScale: 1,
						duration: 1,
					});
				});
			}
		};

		// Animation loop to keep rendering
		const animate = () => {
			renderer.render(scene, camera);
			requestRef.current = requestAnimationFrame(animate);
		};
		requestRef.current = requestAnimationFrame(animate);

		// Handle resize
		const handleResize = () => {
			setWindowWidth(window.innerWidth);

			if (container) {
				camera.aspect = container.clientWidth / container.clientHeight;
				camera.updateProjectionMatrix();
				renderer.setSize(container.clientWidth, container.clientHeight);

				// Update model position and scale on resize
				if (model) {
					const isMobile = window.innerWidth < 768;
					model.scale.set(isMobile ? 1.6 : 2, isMobile ? 1.6 : 2, isMobile ? 1.6 : 2);
					model.position.y = isMobile ? -2 : 0;
				}

				renderer.render(scene, camera);
			}
		};

		window.addEventListener("resize", handleResize);

		// Cleanup
		return () => {
			if (requestRef.current) {
				cancelAnimationFrame(requestRef.current);
			}
			if (container && renderer.domElement) {
				container.removeChild(renderer.domElement);
			}
			window.removeEventListener("resize", handleResize);

			// Kill all GSAP animations to prevent memory leaks
			if (model) {
				gsap.killTweensOf(model.rotation);
				gsap.killTweensOf(model.position);
			}
		};
	}, [windowWidth]);

	return (
		<div
			ref={mountRef}
			className="w-full h-full min-h-[250px] sm:min-h-[300px] md:min-h-[400px] lg:h-[100vh]"
		/>
	);
};

export default LogoCanvas;
