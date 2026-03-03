"use client";

import dynamic from "next/dynamic";

const ScrollytellingSceneClient = dynamic(
    () => import("@/components/3d/ScrollytellingScene").then((mod) => mod.ScrollytellingScene),
    { ssr: false, loading: () => <div className="fixed inset-0 bg-background -z-10" /> }
);

export function ScrollytellingSceneWrapper() {
    return <ScrollytellingSceneClient />;
}
