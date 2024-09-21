import React, { Suspense } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';

const Panorama = () => {
    const texture = useTexture('http://localhost:4000/images/Russ_112B.png'); // Load your panoramic image

    return (
        <mesh>
            {/* Sphere for 360° view */}
            <sphereGeometry args={[500, 60, 40]} />
            <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </mesh>
    );
};

const PanoramaViewer = () => {
    return (
        <Canvas>
            <Suspense fallback={null}>
                <Panorama />
                <OrbitControls enableZoom={false} />
            </Suspense>
        </Canvas>
    );
};

export default PanoramaViewer;
