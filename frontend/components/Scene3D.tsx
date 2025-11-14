"use client";
import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function Model({ url }: { url: string }) {
    const meshRef = useRef<THREE.Group>(null);
    const gltf = useGLTF(url);
    const zoomProgress = useRef(0);
    const isZooming = useRef(true);

    useEffect(() => {
        if (gltf.scene) {
            // Center the model
            const box = new THREE.Box3().setFromObject(gltf.scene);
            const center = box.getCenter(new THREE.Vector3());
            gltf.scene.position.sub(center);

            // Scale the model to fit nicely
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 4 / maxDim;
            gltf.scene.scale.multiplyScalar(scale);
        }
    }, [gltf]);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // Zoom in animation
        if (isZooming.current) {
            zoomProgress.current += delta * 0.5; // Adjust speed of zoom

            if (zoomProgress.current >= 1) {
                zoomProgress.current = 1;
                isZooming.current = false;
            }

            // Ease-out animation
            const easedProgress = 1 - Math.pow(1 - zoomProgress.current, 3);
            meshRef.current.position.z = THREE.MathUtils.lerp(-5, 0, easedProgress);
        } else {
            // Auto-rotate after zoom completes
            meshRef.current.rotation.y += delta * 0.1; // Rotation speed
        }
    });

    return <primitive ref={meshRef} object={gltf.scene} position={[0, 0, -5]} />;
}

export default function Scene3D() {

    useEffect(() => {
        useGLTF.preload("/silent_hill-library.glb");
    }, []);


    // ============================================

    return (
        <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 1]} fov={100} />

            {/* Lighting - Adjust these if your model appears too dark/bright */}
            <ambientLight intensity={1} />
            <directionalLight position={[20, 20, 5]} intensity={1} />
            <directionalLight position={[-20, -20, -5]} intensity={1} />
            <pointLight position={[10, 10, 5]} intensity={1} />

            <Model url="/silent_hill-library.glb" />

        </Canvas>
    );
}