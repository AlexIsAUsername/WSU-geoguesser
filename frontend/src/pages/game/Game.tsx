import React , {useEffect, useState } from 'react'

import PanoramaViewer from '../../components/PanoramaViewer/PanoramaViewer';
import VerifyTester from '../../components/VerifyTester/VerifyTester';
import MyGoogleMap from '../../components/Map/Map';

interface Location { 
    path: string;
    x:    number;
    y:    number;
    z:    number;
}


const Game = () => {

    const [loc, setLoc] = useState<Location | undefined>(undefined)

    useEffect(() => {
        fetch("http://localhost:4000/getimage") // pull base out to constant at some point
            .then((res) => res.json())
            .then((data) => {
                setLoc(data)
            })

    }, [])

    return(
        loc ? (
            <>
                <PanoramaViewer url={`http://localhost:4000${loc.path}`}></PanoramaViewer>

                <VerifyTester/>
                <MyGoogleMap/>
            </>
        ) : (
            <div> 
                <h1> Loading... </h1>
                <p> Pretend there is a skeleton screen here</p>

            </div>
        )
    )
}


export default Game

