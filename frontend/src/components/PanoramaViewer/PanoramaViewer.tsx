import React, { Suspense } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';

interface PanoProps{
    url: string
}

const Panorama = ({ url }: PanoProps) => {
    const texture = useTexture(url);

    return (
        <mesh>
            <sphereGeometry args={[500, 60, 40]} />
            <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </mesh>
    );
};

const PanoramaViewer = () => {
    return (
        <Canvas>
            <Suspense fallback={null}>
                <Panorama url='http://localhost:4000/images/Russ_112B.png'/>
                <OrbitControls enableZoom={false} />
            </Suspense>
        </Canvas>
    );
};

export default PanoramaViewer;
