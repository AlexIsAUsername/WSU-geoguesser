import React , {useEffect, useState } from 'react'

import PanoramaViewer from '../../components/PanoramaViewer/PanoramaViewer';
import VerifyTester from '../../components/VerifyTester/VerifyTester';
import MyGoogleMap from '../../components/Map/Map';
import getKey from '../../components/utils';

export interface Point {
    x:    number;
    y:    number;
    z:    number;
}


interface Location { 
    path: string;
    point: Point
}


const Game = () => {

    const [loc, setLoc] = useState<Location | undefined>(undefined);
    const [key, setKey] = useState<string>("");

    const [pos, setPos] = useState<Point>();


    useEffect(() => {
        fetch("http://localhost:4000/getimage") // pull base out to constant at some point
            .then((res) => res.json())
            .then((data) => {
                setLoc(data)
            })

        getKey().then((key) => {
            console.log(`KEY=${key}`);
            setKey(key!);
        })
        

    }, [])


    useEffect(() => {
        console.log(`Pos: ${JSON.stringify(pos)}`);
    }, [pos]);




    return(
        (loc && key) ? (
            <>
                <PanoramaViewer url={`http://localhost:4000${loc.path}`}></PanoramaViewer>

                <VerifyTester/>
                <MyGoogleMap 
                    apiKey={key}
                    setPos={setPos}
                />
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

