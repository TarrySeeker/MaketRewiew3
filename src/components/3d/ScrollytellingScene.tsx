"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";
import { TechnicalCore } from "./TechnicalCore";

export function ScrollytellingScene() {
    return (
        <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none bg-background">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 35 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: false }}
            >
                <color attach="background" args={["#f4f4f5"]} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} penumbra={1} intensity={2} color="#FF4500" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#ffffff" />

                <Suspense fallback={null}>
                    <TechnicalCore />
                    {/* Environment map matches industrial/studio feel */}
                    <Environment preset="studio" />
                    <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={20} blur={2.5} far={4.5} />
                </Suspense>
            </Canvas>
            {/* Overlay noise texture for cinematic feel */}
            <div
                className="absolute inset-0 z-0 opacity-10 mix-blend-multiply pointer-events-none"
                style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }}
            />
        </div>
    );
}
