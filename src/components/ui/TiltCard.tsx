"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    intensity?: number; // How much the card tilts (default: 15)
}

export function TiltCard({ children, className = "", intensity = 15 }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    // Fallback for mobile (disable tilt for performance/UX)
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Framer Motion Values
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Mouse move handler
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current || isMobile) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Calculate mouse position relative to center of card (-0.5 to 0.5)
        const mouseX = (e.clientX - rect.left) / width - 0.5;
        const mouseY = (e.clientY - rect.top) / height - 0.5;

        x.set(mouseX);
        y.set(mouseY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Heavy Return Spring physics (User choice 3: A - heavy return assumed)
    const springConfig = { damping: 30, stiffness: 100, mass: 2 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    // Map mouse values to rotation degrees
    const rotateX = useTransform(springY, [-0.5, 0.5], [intensity, -intensity]);
    const rotateY = useTransform(springX, [-0.5, 0.5], [-intensity, intensity]);

    // Glare effect calculation (Frosted glass soft white - User choice 2: A)
    const glareX = useTransform(springX, [-0.5, 0.5], [100, -100]);
    const glareY = useTransform(springY, [-0.5, 0.5], [100, -100]);
    const glareOpacity = useTransform(x, [-0.5, 0, 0.5], [0.3, 0, 0.3]);

    if (isMobile) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={`relative perspective-1000 ${className}`}
            whileHover={{ scale: 1.02 }} // slight lift
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            {/* Glare Layer */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-50 rounded-none mix-blend-overlay"
                style={{
                    opacity: glareOpacity,
                    background: "radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)",
                    x: glareX,
                    y: glareY,
                }}
            />
            {children}
        </motion.div>
    );
}
