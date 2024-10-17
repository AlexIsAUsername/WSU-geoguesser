import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css'; // Import MapLibre CSS

interface Point {
    x: number;
    y: number;
    z: number;
}

interface MapProps {
    apiKey: string;
    setPos: (pos: Point) => void;
}

enum STYLE {
    OUTDOOR = "outdoor",
    STREETS_DARK = "streets-dark",
    STREETS = "streets", 
    WINTER = "winter",
    SATELLITE = "satellite"
}

const Map = ({ apiKey, setPos }: MapProps) => {
    const mapContainer = useRef<HTMLDivElement>(null); 
    const map = useRef<maplibregl.Map | null>(null); 
    const markerRef = useRef<maplibregl.Marker | null>(null);

    const [style, setStyle] = useState<STYLE>(STYLE.OUTDOOR);

    const initialCenter: [number, number] = [-84.063429, 39.782072]; 

    useEffect(() => {
        if (map.current) return; 

        console.log("Initializing map");

        map.current = new maplibregl.Map({
            container: mapContainer.current!,// shouldnt be null atm
            style: `https://api.maptiler.com/maps/${style}/style.json?key=${apiKey}`,
            center: initialCenter,
            zoom: 17,
        });

        map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

        map.current.on('click', (e) => {
            const { lng, lat } = e.lngLat;

            if (markerRef.current) {
                markerRef.current.setLngLat([lng, lat]);
            } else {
                markerRef.current = new maplibregl.Marker()
                    .setLngLat([lng, lat])
                    .addTo(map.current!);
            }

            const newPoint: Point = {
                x: lat,
                y: lng,
                z: 0,
            };
            setPos(newPoint);
        });

    }, [apiKey, setPos]);

    useEffect(() => {
        if (map.current) {
            map.current.setStyle(`https://api.maptiler.com/maps/${style}/style.json?key=${apiKey}`);
        }
    }, [style]); // ehhhh prolly dont need the key

    const handleStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStyle(e.target.value as STYLE);
    };

    return (
        <div style={{ width: '100%', height: '400px', position: 'relative' }}>
            <select className='' value={style} onChange={handleStyleChange}>
                {Object.values(STYLE).map(style => (
                    <option key={style} value={style}>
                        {style}
                    </option>
                ))}
            </select>
            <div ref={mapContainer} style={{ width: '100%', height: '100%', position: 'absolute' }} />
        </div>
    );
};

export default Map;
