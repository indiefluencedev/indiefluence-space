"use client";
import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";
import { DRACOLoader } from "three-stdlib";
import gsap from "gsap";

const LogoCanvas = () => {
  const mountRef = useRef();
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const modelRef = useRef(null);
  const animationRef = useRef(null);

  // Flag to track if component is mounted
  const isMounted = useRef(false);

  // Only track window width when needed for responsive changes
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    // Initialize scene only once
    if (!sceneRef.current) {
      initScene();
    }

    isMounted.current = true;

    // Cleanup function
    return () => {
      isMounted.current = false;
      cleanupScene();
    };
  }, []);

  // Handle resize events with debouncing
  useEffect(() => {
    let resizeTimer;

    const handleResize = () => {
      // Avoid expensive calculations during rapid resize events
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!isMounted.current) return;

        const newIsMobile = window.innerWidth < 768;
        if (newIsMobile !== isMobile) {
          setIsMobile(newIsMobile);
          updateSceneForScreenSize(newIsMobile);
        }

        if (cameraRef.current && rendererRef.current && mountRef.current) {
          cameraRef.current.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
          renderScene();
        }
      }, 250); // 250ms debounce
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, [isMobile]);

  // Initialize the 3D scene
  const initScene = () => {
    const container = mountRef.current;
    if (!container) return;

    // Create scene only once
    sceneRef.current = new THREE.Scene();

    // Camera setup
    const aspect = container.clientWidth / container.clientHeight;
    cameraRef.current = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    cameraRef.current.position.z = isMobile ? 35 : 30;

    // Renderer with optimized settings
    rendererRef.current = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance", // Prefer GPU performance
      precision: "mediump" // Use medium precision for better performance
    });
    rendererRef.current.setSize(container.clientWidth, container.clientHeight);
    rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current.outputColorSpace = THREE.SRGBColorSpace; // Updated from sRGBEncoding
    container.appendChild(rendererRef.current.domElement);

    // Simplified lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 2, 5);
    sceneRef.current.add(ambientLight, directionalLight);

    // Load model with low-polygon setting
    loadModel();
  };

  // Load the 3D model with optimized settings
  const loadModel = () => {
    // Cache loader to reuse
    const loader = new GLTFLoader();

    // Add loading optimization - specify lower detail
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    loader.setDRACOLoader(dracoLoader);

    // Load model with optimized settings
    loader.load(
      "/models/logo.glb",
      (gltf) => {
        if (!isMounted.current) return;

        const loadedModel = gltf.scene;

        // Optimize the model
        loadedModel.traverse((child) => {
          if (child.isMesh) {
            // Reduce shadow complexity
            child.castShadow = false;
            child.receiveShadow = false;

            // Optimize geometries
            if (child.geometry) {
              child.geometry.dispose(); // Clean up any temporary buffers
            }
          }
        });

        // Apply scale based on screen size
        const modelScale = isMobile ? 1.6 : 2;
        loadedModel.scale.set(modelScale, modelScale, modelScale);
        loadedModel.position.set(0, isMobile ? -2 : 0, 0);

        // Store reference and add to scene
        modelRef.current = loadedModel;
        sceneRef.current.add(loadedModel);

        // Setup animations after model load
        setupAnimations();

        // Initial render
        renderScene();
      },
      // Progress callback - could add loading indicator
      undefined,
      // Error callback
      (error) => {
        console.error("Error loading model:", error);
      }
    );
  };

  // Set up animations with performance optimizations
  const setupAnimations = () => {
    if (!modelRef.current) return;

    // Kill any existing animations
    gsap.killTweensOf(modelRef.current.rotation);

    // Initial animation - only run once
    gsap.fromTo(
      modelRef.current.rotation,
      { y: -Math.PI * 2 },
      {
        y: 0,
        duration: 2,
        ease: "power2.out",
        onUpdate: renderScene
      }
    );

    // Continuous rotation with reduced updates
    gsap.to(modelRef.current.rotation, {
      y: Math.PI * 2,
      duration: 15,
      ease: "none",
      repeat: -1,
      onUpdate: () => {
        // Only render when animation updates to save CPU
        if (isMounted.current) {
          renderScene();
        }
      }
    });

    // Only add event listeners on desktop
    if (!isMobile && mountRef.current) {
      // Use passive event listeners for better performance
      mountRef.current.addEventListener("mouseenter", handleMouseEnter, { passive: true });
      mountRef.current.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    }
  };

  // Handle mouse interactions
  const handleMouseEnter = () => {
    if (!modelRef.current || !isMounted.current) return;

    gsap.to(modelRef.current.position, {
      y: 0.3,
      duration: 1,
      ease: "power2.out",
      onUpdate: renderScene
    });

    // Optimize by not changing timeScale directly
    gsap.killTweensOf(modelRef.current.rotation);
    gsap.to(modelRef.current.rotation, {
      y: Math.PI * 2,
      duration: 5, // Faster duration instead of timeScale
      ease: "none",
      repeat: -1,
      onUpdate: renderScene
    });
  };

  const handleMouseLeave = () => {
    if (!modelRef.current || !isMounted.current) return;

    gsap.to(modelRef.current.position, {
      y: 0,
      duration: 1,
      ease: "power2.out",
      onUpdate: renderScene
    });

    // Reset rotation animation
    gsap.killTweensOf(modelRef.current.rotation);
    gsap.to(modelRef.current.rotation, {
      y: Math.PI * 2,
      duration: 15, // Back to normal speed
      ease: "none",
      repeat: -1,
      onUpdate: renderScene
    });
  };

  // Update scene based on screen size
  const updateSceneForScreenSize = (mobile) => {
    if (!modelRef.current || !cameraRef.current) return;

    // Update camera
    cameraRef.current.position.z = mobile ? 35 : 30;

    // Update model
    const scale = mobile ? 1.6 : 2;
    modelRef.current.scale.set(scale, scale, scale);
    modelRef.current.position.y = mobile ? -2 : 0;

    // Render once after updates
    renderScene();
  };

  // Render the scene - called only when needed
  const renderScene = () => {
    if (rendererRef.current && sceneRef.current && cameraRef.current && isMounted.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
  };

  // Clean up resources properly
  const cleanupScene = () => {
    // Cancel any pending animation frame
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    // Remove event listeners
    if (mountRef.current) {
      mountRef.current.removeEventListener("mouseenter", handleMouseEnter);
      mountRef.current.removeEventListener("mouseleave", handleMouseLeave);
    }

    // Clean up Three.js resources
    if (rendererRef.current) {
      rendererRef.current.dispose();

      if (mountRef.current && rendererRef.current.domElement) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
    }

    // Clean up GSAP animations
    if (modelRef.current) {
      gsap.killTweensOf(modelRef.current.rotation);
      gsap.killTweensOf(modelRef.current.position);
    }

    // Dispose of geometries and materials
    if (sceneRef.current) {
      sceneRef.current.traverse((object) => {
        if (object.geometry) {
          object.geometry.dispose();
        }

        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    }
  };

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[250px] sm:min-h-[300px] md:min-h-[400px] lg:h-[100vh]"
    />
  );
};

export default LogoCanvas;
