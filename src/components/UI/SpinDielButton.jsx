"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

// Spin Dial Text Component - Only activates on hover
const SpinDialText = ({ text = "BUTTON", isHovering, duration = 0.5 }) => {
  const charRefs = useRef([]);

  useEffect(() => {
    if (!isHovering) return;

    // Cancel any existing animations
    charRefs.current.forEach(ref => {
      if (ref) gsap.killTweensOf(ref);
    });

    // Create quick spin animations with slight stagger
    charRefs.current.forEach((charEl, index) => {
      if (!charEl) return;

      const targetChar = text[index];

      gsap.fromTo(
        charEl,
        { innerHTML: Math.random() > 0.5 ? "0" : "A" },
        {
          duration: duration,
          innerHTML: targetChar,
          ease: "steps(5)",
          delay: index * 0.03, // Very short stagger
          onUpdate: function() {
            // During animation, show random characters
            if (this.progress() < 0.8) {
              const randomChar = Math.random() > 0.5 ?
                String.fromCharCode(65 + Math.floor(Math.random() * 26)) : // A-Z
                Math.floor(Math.random() * 10).toString(); // 0-9
              charEl.innerHTML = randomChar;
            } else {
              // Final character
              charEl.innerHTML = targetChar;
            }
          }
        }
      );
    });
  }, [isHovering, text, duration]);

  return (
    <span className="inline-flex">
      {text.split('').map((char, index) => (
        <span
          key={index}
          ref={el => charRefs.current[index] = el}
          className="inline-block font-mono"
          style={{ width: '0.8em', textAlign: 'center' }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

// Button 1: Yellow Minimal with Arrow Animation
export const Button1 = ({
  text = "LET'S TALK",
  onClick,
  className = "",
  size = "md"
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const arrowRef = useRef(null);

  // Size classes mapping
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base"
  };

  useEffect(() => {
    if (!arrowRef.current) return;

    if (isHovering) {
      gsap.to(arrowRef.current, {
        x: 5,
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(arrowRef.current, {
        x: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [isHovering]);

  return (
    <button
      className={`bg-[#fbcc03] text-black font-medium relative overflow-hidden ${sizeClasses[size]} ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={onClick}
    >
      <div className="flex items-center justify-center">
        <SpinDialText text={text} isHovering={isHovering} duration={0.4} />
        <div ref={arrowRef} className="inline-block ml-2 relative">
          <svg
            className="w-3 h-3 sm:w-4 sm:h-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12H19M19 12L13 6M19 12L13 18"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </button>
  );
};

// Button 2: Blue with Yellow Border and Rotating Arrow
export const Button2 = ({
  text = "LET'S TALK",
  onClick,
  className = "",
  size = "md"
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const arrowRef = useRef(null);
  const buttonRef = useRef(null);

  // Size classes mapping
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base"
  };

  useEffect(() => {
    if (!arrowRef.current || !buttonRef.current) return;

    if (isHovering) {
      gsap.to(arrowRef.current, {
        rotation: 45,
        duration: 0.3,
        ease: "back.out(1.5)"
      });
      gsap.to(buttonRef.current, {
        backgroundColor: "#fbcc03",
        color: "#395299",
        duration: 0.3
      });
    } else {
      gsap.to(arrowRef.current, {
        rotation: 0,
        duration: 0.3
      });
      gsap.to(buttonRef.current, {
        backgroundColor: "#395299",
        color: "white",
        duration: 0.3
      });
    }
  }, [isHovering]);

  return (
    <button
      ref={buttonRef}
      className={`bg-[#395299] text-white font-medium border-2 border-[#fbcc03] tracking-wide ${sizeClasses[size]} ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={onClick}
    >
      <div className="flex items-center justify-center">
        <SpinDialText text={text} isHovering={isHovering} duration={0.3} />
        <div ref={arrowRef} className="inline-block ml-2 relative">
          <svg
            className="w-3 h-3 sm:w-4 sm:h-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5L19 12M19 12L12 19M19 12H5"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </button>
  );
};

// Button 3: Black with Yellow Underline (Enhanced version with color change)
export const Button3 = ({
  text = "LET'S TALK",
  onClick,
  className = "",
  size = "md"
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const underlineRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  // Size classes mapping
  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-4 text-sm",
    lg: "px-8 py-6 text-base"
  };

  useEffect(() => {
    if (!underlineRef.current || !textRef.current || !buttonRef.current) return;

    if (isHovering) {
      // Animate underline
      gsap.to(underlineRef.current, {
        width: "100%",
        duration: 0.3,
        ease: "power2.out"
      });

      // Animate text up slightly
      gsap.to(textRef.current, {
        y: -3,
        duration: 0.2
      });

      // Change button color to blue and text to yellow
      gsap.to(buttonRef.current, {
        backgroundColor: "#395299",
        color: "#fbcc03",
        duration: 0.3
      });
    } else {
      // Reset animations
      gsap.to(underlineRef.current, {
        width: "0%",
        duration: 0.3
      });

      gsap.to(textRef.current, {
        y: 0,
        duration: 0.2
      });

      // Reset colors to black background and white text
      gsap.to(buttonRef.current, {
        backgroundColor: "black",
        color: "white",
        duration: 0.3
      });
    }
  }, [isHovering]);

  return (
    <button
      ref={buttonRef}
      className={`bg-black text-white font-medium relative overflow-hidden ${sizeClasses[size]} ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={onClick}
    >
      <div ref={textRef} className="flex items-center justify-center relative z-10">
        <SpinDialText text={text} isHovering={isHovering} duration={0.25} />
        <svg
          className="w-3 h-3 sm:w-4 sm:h-4 ml-2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 12H19M19 12L13 6M19 12L13 18"
            stroke={isHovering ? "#fbcc03" : "white"}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div
        ref={underlineRef}
        className="absolute bottom-0 left-0 h-1 bg-[#fbcc03] w-0"
      ></div>
    </button>
  );
};

// NEW BUTTON 4: Sliding Fill Animation
export const Button4 = ({
  text = "GET STARTED",
  onClick,
  className = "",
  size = "md"
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const bgFillRef = useRef(null);
  const textRef = useRef(null);

  // Size classes mapping
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base"
  };

  useEffect(() => {
    if (!bgFillRef.current || !textRef.current) return;

    if (isHovering) {
      // Animate the fill
      gsap.to(bgFillRef.current, {
        y: "0%",
        duration: 0.4,
        ease: "power2.out"
      });

      // Change text color
      gsap.to(textRef.current, {
        color: "white",
        duration: 0.3,
        delay: 0.1
      });
    } else {
      // Reset animations
      gsap.to(bgFillRef.current, {
        y: "100%",
        duration: 0.4
      });

      gsap.to(textRef.current, {
        color: "#395299",
        duration: 0.3
      });
    }
  }, [isHovering]);

  return (
    <button
      className={`border-2 border-[#395299] font-medium relative overflow-hidden ${sizeClasses[size]} ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={onClick}
    >
      {/* Background fill that slides up */}
      <div
        ref={bgFillRef}
        className="absolute inset-0 bg-[#395299] translate-y-full"
      />

      {/* Text content */}
      <div ref={textRef} className="flex items-center justify-center relative z-10 text-[#395299]">
        <SpinDialText text={text} isHovering={isHovering} duration={0.3} />
        <svg
          className="w-3 h-3 sm:w-4 sm:h-4 ml-2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5L19 12M19 12L12 19M19 12H5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </button>
  );
};

// NEW BUTTON 5: Pulse Effect Button
export const Button5 = ({
  text = "EXPLORE NOW",
  onClick,
  className = "",
  size = "md"
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const buttonRef = useRef(null);
  const pulseRef = useRef(null);

  // Size classes mapping
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base"
  };

  useEffect(() => {
    if (!buttonRef.current || !pulseRef.current) return;

    if (isHovering) {
      // Pulse animation
      gsap.fromTo(
        pulseRef.current,
        {
          scale: 0,
          opacity: 0.8
        },
        {
          scale: 1.5,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          repeat: -1
        }
      );

      // Button subtle scaling
      gsap.to(buttonRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: "back.out(1.5)"
      });
    } else {
      // Kill pulse animation
      gsap.killTweensOf(pulseRef.current);
      gsap.set(pulseRef.current, {
        scale: 0,
        opacity: 0
      });

      // Reset button scale
      gsap.to(buttonRef.current, {
        scale: 1,
        duration: 0.3
      });
    }
  }, [isHovering]);

  return (
    <button
      className={`bg-[#fbcc03] text-black font-medium relative ${sizeClasses[size]} ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={onClick}
    >
      {/* Pulse effect */}
      <div
        ref={pulseRef}
        className="absolute inset-0 bg-[#fbcc03] rounded-full pointer-events-none opacity-0"
      />

      {/* Button content */}
      <div
        ref={buttonRef}
        className="flex items-center justify-center relative z-10"
      >
        <SpinDialText text={text} isHovering={isHovering} duration={0.4} />
        <svg
          className="w-3 h-3 sm:w-4 sm:h-4 ml-2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 12H19M19 12L13 6M19 12L13 18"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </button>
  );
};

// NEW BUTTON 6: 3D Push Effect
export const Button6 = ({
  text = "JOIN NOW",
  onClick,
  className = "",
  size = "md"
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const buttonRef = useRef(null);
  const shadowRef = useRef(null);

  // Size classes mapping
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base"
  };

  useEffect(() => {
    if (!buttonRef.current || !shadowRef.current) return;

    if (isPressed) {
      // Pressed state - push down
      gsap.to(buttonRef.current, {
        y: 4,
        duration: 0.1
      });
      gsap.to(shadowRef.current, {
        opacity: 0.1,
        height: "2px",
        duration: 0.1
      });
    } else if (isHovering) {
      // Hover state
      gsap.to(buttonRef.current, {
        y: 0,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(shadowRef.current, {
        opacity: 0.5,
        height: "8px",
        duration: 0.3
      });
    } else {
      // Normal state
      gsap.to(buttonRef.current, {
        y: 0,
        scale: 1,
        duration: 0.3
      });
      gsap.to(shadowRef.current, {
        opacity: 0.3,
        height: "6px",
        duration: 0.3
      });
    }
  }, [isHovering, isPressed]);

  return (
    <div className="relative">
      {/* Shadow element */}
      <div
        ref={shadowRef}
        className="absolute bottom-0 left-0 right-0 h-6 bg-black opacity-30 blur-sm"
      />

      {/* Button element */}
      <button
        ref={buttonRef}
        className={`bg-[#395299] text-white font-medium relative ${sizeClasses[size]} ${className}`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setIsPressed(false);
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onClick={onClick}
      >
        <div className="flex items-center justify-center relative z-10">
          <SpinDialText text={text} isHovering={isHovering} duration={0.3} />
          <svg
            className="w-3 h-3 sm:w-4 sm:h-4 ml-2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5L19 12M19 12L12 19M19 12H5"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
    </div>
  );
};

// Demo component to display all button variations
export const ButtonDemo = () => {
  return (
    <div className="p-8 flex flex-col space-y-12 items-center bg-white">
      <h2 className="text-2xl font-bold mb-8">Button Variations</h2>

      <div className="space-y-4 w-full max-w-md">
        <h3 className="text-lg font-semibold">Variation 1: Yellow Minimal</h3>
        <div className="p-6 bg-gray-100 flex justify-center">
          <Button1 text="LET'S TALK" />
        </div>
      </div>

      <div className="space-y-4 w-full max-w-md">
        <h3 className="text-lg font-semibold">Variation 2: Blue with Yellow Border</h3>
        <div className="p-6 bg-gray-100 flex justify-center">
          <Button2 text="LET'S TALK" />
        </div>
      </div>

      <div className="space-y-4 w-full max-w-md">
        <h3 className="text-lg font-semibold">Variation 3: Black to Blue with Yellow Text</h3>
        <div className="p-6 bg-gray-100 flex justify-center">
          <Button3 text="LET'S TALK" />
        </div>
      </div>

      <div className="space-y-4 w-full max-w-md">
        <h3 className="text-lg font-semibold">Variation 4: Sliding Fill</h3>
        <div className="p-6 bg-gray-100 flex justify-center">
          <Button4 text="GET STARTED" />
        </div>
      </div>

      <div className="space-y-4 w-full max-w-md">
        <h3 className="text-lg font-semibold">Variation 5: Pulse Effect</h3>
        <div className="p-6 bg-gray-100 flex justify-center">
          <Button5 text="EXPLORE NOW" />
        </div>
      </div>

      <div className="space-y-4 w-full max-w-md">
        <h3 className="text-lg font-semibold">Variation 6: 3D Push Effect</h3>
        <div className="p-6 bg-gray-100 flex justify-center">
          <Button6 text="JOIN NOW" />
        </div>
      </div>
    </div>
  );
};
