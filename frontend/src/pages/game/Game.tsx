import { Viewer } from '@photo-sphere-viewer/core';
import React from 'react'
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';

const Game = () => {
    const baseUrl = 'http://localhost:4000/images';
    return (
        <div className="App">
            <ReactPhotoSphereViewer
                src='http://localhost:4000/images/Russ_112B.png'
                height={"100vh"}
                width={"100%"}
            ></ReactPhotoSphereViewer>
        </div >
    );
}


export default Game

