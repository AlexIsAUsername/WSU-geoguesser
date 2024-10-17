import React, { useEffect, useState } from 'react';

import PanoramaViewer from '../../components/PanoramaViewer/PanoramaViewer';
import Map from '../../components/Map/Map';
import getKey from '../../components/utils';
import { useNavigate } from 'react-router-dom';
import "./Game.css";

export interface Point {
    x: number;
    y: number;
    z: number;
}

interface Location {
    path: string;
    point: Point;
}

const Game = () => {
    const [realLoc, setLoc] = useState<Location | undefined>(undefined);
    const [key, setKey] = useState<string>('');
    const [marker, setPos] = useState<Point>();
    const nav = useNavigate();

    useEffect(() => {
        fetch('http://localhost:4000/getimage')
            .then((res) => res.json())
            .then((data) => {
                setLoc(data);
            });

        getKey().then((key) => {
            setKey(key!);
        });
    }, []);

    useEffect(() => {
        console.log(`Pos: ${JSON.stringify(marker)}`);
    }, [marker]);

    const handleGuess = () => {
        if (!marker) {
            console.log('Error: No marker selected');
            return;
        }

        const guess: Point = marker;
        const actual: Point = realLoc!.point;

        fetch('http://localhost:4000/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ guess, actual }),
        })
            .then((response) => {
                if (response.status === 422) {
                    return response.json().then((data) => {
                        console.log('Error: ' + JSON.stringify(data));
                    });
                }
                return response.json();
            })
            .then((data) => {
                nav('/score', { state: data.dist });
            })
            .catch((error: Error) => {
                console.log('Error: ' + error.message);
            });
    };

    return realLoc && key ? (
        <div className="game-container">
            <div className="game-content">
                <div className="panorama-viewer">
                    <PanoramaViewer url={`http://localhost:4000${realLoc.path}`} />
                </div>
                <div className="map-container">
                    <Map apiKey={key} setPos={setPos} />
                </div>
            </div>
            <div className="button-group">
                <button className="styled-button" onClick={handleGuess}>
                    Guess!
                </button>
            </div>
        </div>
    ) : (
        <div className="loading-container">
            <h1>Loading...</h1>
            <p>Pretend there is a skeleton screen here</p>
        </div>
    );
};

export default Game;
