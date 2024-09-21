import { Viewer } from '@photo-sphere-viewer/core';
import React , {useEffect } from 'react'

import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';
import PanoramaViewer from '../../components/PanoramaViewer/PanoramaViewer';

const Game = () => {
    // const baseUrl = 'http://localhost:4000/images';
    // return (
    //     <div className="App">
    //         <ReactPhotoSphereViewer
    //             src='http://localhost:4000/images/Russ_112B.png'
    //             height={"100vh"}
    //             width={"100%"}
    //         ></ReactPhotoSphereViewer>
    //     </div >
    // );


    // useEffect(() => {
    //     const shperePlayerInstance = ReactPhotoSphereViewer({
    //         panorama: `http://localhost:4000/images/Russ_112B.png`
    //     });

    //     // unmount component instructions
    //     return () => {
    //         shperePlayerInstance.destroy();
    //     };
    // }, [src]); // will only be called when the src prop gets updated


    // return (
    //     <div ref={sphereElementRef} />
    // );

    return(
        <PanoramaViewer></PanoramaViewer>
    )
}


export default Game

