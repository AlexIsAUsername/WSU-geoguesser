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

const PanoramaViewer = ({ url }: PanoProps) => {

    
    return (
        <Canvas className='canvas'>
            <Suspense fallback={null}>
                <Panorama url={url}/>
                <OrbitControls enableZoom={false} />
            </Suspense>
        </Canvas>
    );
};

export default PanoramaViewer;
