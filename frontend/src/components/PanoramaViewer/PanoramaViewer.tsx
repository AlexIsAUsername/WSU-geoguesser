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
        <Canvas className='canvas'>
            <Suspense fallback={null}>
                <Panorama url='http://localhost:4000/images/Neuro_Engineering_Rehabilitation_and_Degeneration_Lab.png'/>
                <OrbitControls enableZoom={false} />
            </Suspense>
        </Canvas>
    );
};

export default PanoramaViewer;
