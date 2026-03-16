"use client";

import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "framer-motion";
import * as THREE from "three";

export function TechnicalCore() {
    const { scrollY } = useScroll();
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        return scrollY.onChange((latest) => {
            const maxScroll = typeof window !== "undefined" ? window.innerHeight * 2 : 2000;
            setScrollProgress(Math.min(latest / maxScroll, 1));
        });
    }, [scrollY]);

    const groupRef = useRef<THREE.Group>(null);
    const bitRef = useRef<THREE.Mesh>(null);
    const chuckRef = useRef<THREE.Mesh>(null);
    const bodyRef = useRef<THREE.Mesh>(null);
    const handleRef = useRef<THREE.Mesh>(null);
    const triggerRef = useRef<THREE.Mesh>(null);
    const batteryRef = useRef<THREE.Mesh>(null);

    const metalMaterial = new THREE.MeshStandardMaterial({
        color: "#555555",
        metalness: 0.9,
        roughness: 0.15,
    });

    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: "#1a1a2e",
        metalness: 0.3,
        roughness: 0.6,
    });

    const accentMaterial = new THREE.MeshStandardMaterial({
        color: "#FF4500",
        emissive: "#FF4500",
        emissiveIntensity: 0.5,
        metalness: 0.5,
        roughness: 0.3,
    });

    const darkMaterial = new THREE.MeshStandardMaterial({
        color: "#111111",
        metalness: 0.4,
        roughness: 0.7,
    });

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        const offset = scrollProgress;

        groupRef.current.rotation.y = THREE.MathUtils.lerp(
            groupRef.current.rotation.y,
            offset * Math.PI * 1.5 + state.clock.elapsedTime * 0.15,
            0.08
        );
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
            groupRef.current.rotation.x,
            -0.2 + offset * Math.PI * 0.3,
            0.08
        );

        const explode = Math.pow(offset, 1.5) * 6;

        if (bitRef.current) {
            bitRef.current.position.z = THREE.MathUtils.lerp(bitRef.current.position.z, 3.5 + explode * 0.8, 0.1);
            bitRef.current.rotation.z += delta * 8;
        }
        if (chuckRef.current) {
            chuckRef.current.position.z = THREE.MathUtils.lerp(chuckRef.current.position.z, 2.2 + explode * 0.4, 0.1);
            chuckRef.current.rotation.z += delta * 4;
        }
        if (batteryRef.current) {
            batteryRef.current.position.y = THREE.MathUtils.lerp(batteryRef.current.position.y, -1.8 - explode * 0.5, 0.1);
        }
        if (handleRef.current) {
            handleRef.current.position.y = THREE.MathUtils.lerp(handleRef.current.position.y, -0.8 - explode * 0.2, 0.1);
        }
    });

    return (
        <group ref={groupRef} rotation={[0, 0, Math.PI * 0.1]}>
            {/* Drill Bit - спиральное сверло */}
            <mesh ref={bitRef} position={[0, 0, 3.5]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.06, 0.12, 2.5, 8]} />
                <meshStandardMaterial color="#cccccc" metalness={0.95} roughness={0.1} />
            </mesh>
            {/* Spiral on bit */}
            <mesh position={[0, 0, 3.8]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.1, 0.02, 8, 16, Math.PI * 3]} />
                <meshStandardMaterial color="#999999" metalness={0.9} roughness={0.15} />
            </mesh>

            {/* Chuck - патрон */}
            <mesh ref={chuckRef} position={[0, 0, 2.2]} rotation={[Math.PI / 2, 0, 0]} material={metalMaterial}>
                <cylinderGeometry args={[0.35, 0.25, 0.8, 12]} />
            </mesh>

            {/* Main Body - корпус дрели */}
            <mesh ref={bodyRef} position={[0, 0, 0.8]}>
                <capsuleGeometry args={[0.5, 2, 8, 16]} />
                <primitive object={bodyMaterial} attach="material" />
            </mesh>

            {/* Accent stripe on body */}
            <mesh position={[0, 0.52, 1.2]}>
                <boxGeometry args={[0.6, 0.06, 1.5]} />
                <primitive object={accentMaterial} attach="material" />
            </mesh>
            <mesh position={[0, -0.52, 1.2]}>
                <boxGeometry args={[0.6, 0.06, 1.5]} />
                <primitive object={accentMaterial} attach="material" />
            </mesh>

            {/* Ventilation grills */}
            {[0.4, 0.6, 0.8, 1.0, 1.2].map((z, i) => (
                <mesh key={i} position={[0.51, 0, z]} rotation={[0, Math.PI / 2, 0]}>
                    <boxGeometry args={[0.15, 0.04, 0.02]} />
                    <primitive object={darkMaterial} attach="material" />
                </mesh>
            ))}

            {/* Handle - рукоятка */}
            <mesh ref={handleRef} position={[0, -0.8, 0.3]} rotation={[0.3, 0, 0]}>
                <capsuleGeometry args={[0.3, 1.5, 8, 16]} />
                <primitive object={darkMaterial} attach="material" />
            </mesh>

            {/* Trigger - курок */}
            <mesh ref={triggerRef} position={[0, -0.3, 0.9]}>
                <boxGeometry args={[0.15, 0.4, 0.15]} />
                <primitive object={accentMaterial} attach="material" />
            </mesh>

            {/* Battery Pack - аккумулятор */}
            <mesh ref={batteryRef} position={[0, -1.8, 0.3]}>
                <boxGeometry args={[0.7, 0.6, 0.9]} />
                <primitive object={bodyMaterial} attach="material" />
            </mesh>
            {/* Battery accent */}
            <mesh position={[0, -1.55, 0.3]}>
                <boxGeometry args={[0.72, 0.05, 0.92]} />
                <primitive object={accentMaterial} attach="material" />
            </mesh>

            {/* Speed selector on top */}
            <mesh position={[0, 0.55, 1.5]}>
                <cylinderGeometry args={[0.12, 0.12, 0.08, 16]} />
                <primitive object={accentMaterial} attach="material" />
            </mesh>
        </group>
    );
}
