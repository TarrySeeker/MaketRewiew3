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
            // Calculate a rough progress based on window height (assume 3 screens = 2000px scrollable)
            const maxScroll = typeof window !== "undefined" ? window.innerHeight * 2 : 2000;
            setScrollProgress(Math.min(latest / maxScroll, 1));
        });
    }, [scrollY]);

    const groupRef = useRef<THREE.Group>(null);
    const headRef = useRef<THREE.Mesh>(null);
    const bodyRef = useRef<THREE.Mesh>(null);
    const gear1Ref = useRef<THREE.Mesh>(null);
    const gear2Ref = useRef<THREE.Mesh>(null);
    const ringRef = useRef<THREE.Mesh>(null);

    // Industrial metallic materials
    const metalMaterial = new THREE.MeshStandardMaterial({
        color: "#888888",
        metalness: 0.9,
        roughness: 0.2,
    });

    const darkMetalMaterial = new THREE.MeshStandardMaterial({
        color: "#222222",
        metalness: 0.8,
        roughness: 0.5,
    });

    const neonMaterial = new THREE.MeshStandardMaterial({
        color: "#FF4500",
        emissive: "#FF4500",
        emissiveIntensity: 0.8,
        metalness: 0.5,
        roughness: 0.2,
    });

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        const offset = scrollProgress;

        // Rotate the whole composition slowly over time + scroll
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
            groupRef.current.rotation.y,
            offset * Math.PI * 2 + state.clock.elapsedTime * 0.2,
            0.1
        );
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
            groupRef.current.rotation.x,
            offset * Math.PI * 0.5,
            0.1
        );

        // Apple-style teardown logic (parts separate as you scroll)
        const explodeFactor = Math.pow(offset, 1.5) * 8; // increases as you scroll down

        if (headRef.current) {
            headRef.current.position.y = THREE.MathUtils.lerp(headRef.current.position.y, 1.5 + explodeFactor * 0.5, 0.1);
            headRef.current.rotation.z += delta * 2;
        }

        if (bodyRef.current) {
            bodyRef.current.position.y = THREE.MathUtils.lerp(bodyRef.current.position.y, 0, 0.1);
        }

        if (ringRef.current) {
            ringRef.current.position.y = THREE.MathUtils.lerp(ringRef.current.position.y, -explodeFactor * 0.2, 0.1);
            ringRef.current.rotation.x += delta;
            ringRef.current.rotation.y += delta * 0.5;
        }

        if (gear1Ref.current) {
            gear1Ref.current.position.x = THREE.MathUtils.lerp(gear1Ref.current.position.x, 1 + explodeFactor * 0.8, 0.1);
            gear1Ref.current.position.z = THREE.MathUtils.lerp(gear1Ref.current.position.z, explodeFactor * 0.5, 0.1);
            gear1Ref.current.rotation.z -= delta * 3;
        }

        if (gear2Ref.current) {
            gear2Ref.current.position.x = THREE.MathUtils.lerp(gear2Ref.current.position.x, -1 - explodeFactor * 0.8, 0.1);
            gear2Ref.current.position.z = THREE.MathUtils.lerp(gear2Ref.current.position.z, -explodeFactor * 0.5, 0.1);
            gear2Ref.current.rotation.z += delta * 3;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Tool Head (Drill bit / spindle) */}
            <mesh ref={headRef} position={[0, 1.5, 0]} material={metalMaterial}>
                <cylinderGeometry args={[0.2, 0.5, 2, 8]} />
            </mesh>

            {/* Main Body (Motor housing) */}
            <mesh ref={bodyRef} position={[0, 0, 0]} material={darkMetalMaterial}>
                <boxGeometry args={[1.5, 2.5, 1.5]} />
            </mesh>

            {/* Details on Body */}
            <mesh position={[0, 0, 0.8]} material={neonMaterial}>
                <boxGeometry args={[0.5, 1, 0.1]} />
            </mesh>

            {/* Glowing Energy Ring */}
            <mesh ref={ringRef} position={[0, 0, 0]} material={neonMaterial}>
                <torusGeometry args={[1.2, 0.05, 16, 32]} />
            </mesh>

            {/* Internal Gears (exposed during teardown) */}
            <mesh ref={gear1Ref} position={[0.5, 0, 0]} material={metalMaterial} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.6, 0.6, 0.2, 12]} />
            </mesh>
            <mesh ref={gear2Ref} position={[-0.5, 0, 0]} material={metalMaterial} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.4, 0.4, 0.2, 12]} />
            </mesh>
        </group>
    );
}
