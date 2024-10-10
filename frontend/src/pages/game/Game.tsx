import React, { useEffect, useState } from 'react'

import PanoramaViewer from '../../components/PanoramaViewer/PanoramaViewer';
import Map from '../../components/Map/Map';
import getKey from '../../components/utils';

export interface Point {
    x: number;
    y: number;
    z: number;
}


interface Location {
    path: string;
    point: Point
}


const Game = () => {

    const [realLoc, setLoc] = useState<Location | undefined>(undefined);
    const [key, setKey] = useState<string>("");

    const [marker, setPos] = useState<Point>();



    useEffect(() => {
        fetch("http://localhost:4000/getimage") // pull base out to constant at some point
            .then((res) => res.json())
            .then((data) => {

                console.log("Data: " + JSON.stringify(data));
                setLoc(data)
            })

        getKey().then((key) => {
            console.log(`KEY=${key}`);
            setKey(key!);
        })


    }, [])


    useEffect(() => {
        console.log(`Pos: ${JSON.stringify(marker)}`);
    }, [marker]);

    const handleGuess = () => {
        if (!marker) {
            console.log("Error: No marker selected");
            return;
        }
    
        const guess: Point = marker;
        const actual: Point = realLoc!.point;

        console.log("guess: " + JSON.stringify(guess));
        console.log("actual: " + JSON.stringify(actual));
    
        fetch("http://localhost:4000/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ guess, actual }),
        })
            .then((response) => {
                if (response.status === 422) {


                    return response.json().then((data) => {
                        console.log("Error: " + JSON.stringify(data));
                    });
                }
                return response.json();
            })
            .then((data) => {
                console.log("Success: " + JSON.stringify(data));
                alert(JSON.stringify(data)); // all alerts need to be removed at some point bc they break shit
            })
            .catch((error: Error) => {
                console.log("Error: " + error.message);
            });
    };

    return (
        (realLoc && key) ? (
            <>
                <PanoramaViewer url={`http://localhost:4000${realLoc.path}`}></PanoramaViewer>

                {/* <VerifyTester/> */}
                <Map
                    apiKey={key}
                    setPos={setPos}
                />
                <button onClick={handleGuess}>Guess!</button>
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

