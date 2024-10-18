import React, { act, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { FeatureCollection, Point } from 'geojson';
import "./Score.css";
import maplibregl from 'maplibre-gl';
import { Point as MyPoint} from '../game/Game';

const Score = () => {

    const { state } = useLocation();
    const nav = useNavigate();
    const dist = state[0];
    const guess: MyPoint = state[1];
    const actual: MyPoint = state[2];
    const styleURL = state[3]; // this url should contain api key 

    console.log(`Guess: ${JSON.stringify(guess)}, actual ${JSON.stringify(actual)}`)

    const [score, setScore] = useState<number | undefined>();

    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maplibregl.Map | null>(null);

    const initialCenter: [number, number] = [-84.063429, 39.782072];


    useEffect(() => {

        fetch("http://localhost:4000/score", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ dist })
        })
            .then((res) => {

                if (res.status != 200) {
                    alert("sum went wrong");
                    return;
                }

                return res.json();
            })
            .then((data) => {
                const s = data.score;
                setScore(s);
            })
        // after we have the score n stuff, we can do the map

        map.current = new maplibregl.Map({
            container: mapContainer.current!,
            style: styleURL,
            center: initialCenter,
            zoom: 16,
        });


        const places: FeatureCollection<Point> = {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {
                  description: 'Guess',
                  icon: 'marker',
                },
                geometry: {
                  type: 'Point',
                  coordinates: [guess.y, guess.x],
                },
              },
              {
                type: 'Feature',
                properties: {
                  description: 'True Location',
                  icon: 'embassy',
                },
                geometry: {
                  type: 'Point',
                  coordinates: [actual.y, actual.x], // You had the same coordinates for guess here
                },
              },
            ],
          };

        map.current.on('load', () => {

            map.current!.setLayoutProperty('country-label', 'text-field', [
                'get',
                'name_en',
              ]);


            map.current!.addSource('places', {
                'type': 'geojson',
                'data': places
            }); 


            map.current!.addSource('route', {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [
                            [guess.y, guess.x], // this is backwards bc the api says so
                            [actual.y, actual.x]
                        ]
                    }
                }
            });
            map.current!.addLayer({
                'id': 'route',
                'type': 'line',
                'source': 'route',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': '#F00',
                    'line-width': 8
                }
            });


            map.current!.addLayer({
                'id': 'poi-labels',
                'type': 'symbol',
                'source': 'places',
                'layout': {
                    'text-field': ['get', 'description'],
                    'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
                    'text-radial-offset': 0.5,
                    'text-justify': 'auto',
                    'icon-image': ['concat', ['get', 'icon'], '_15']
                }
            });
        });




    }, [score]) // on mount  or score load??


    return (
        <div className="container">
            <div className="score-display">Score: {score}</div>
            <div ref={mapContainer} style={{ width: '70%', height: '70%', position: 'relative' }}></div>
            <div className="button-group">
                <button className="styled-button" onClick={() => nav("/game")}>Play Again</button>
                <button className="styled-button" onClick={() => nav("/home")}>Home</button>
            </div>
        </div>
    )
}


export default Score;