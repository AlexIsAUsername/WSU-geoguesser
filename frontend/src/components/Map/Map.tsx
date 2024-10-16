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
    // this useRef caused me so much pain. 
    const map = useRef<maplibregl.Map | null>(null);
    const markerRef = useRef<maplibregl.Marker | null>(null);

    const [style, setStyle] = useState<STYLE>(STYLE.OUTDOOR)

    const initialCenter: [number, number] = [-84.063429, 39.782072]; 

    useEffect(() => {
        console.log("ran use effect")
        if (!mapContainer.current) return; 

        map.current = new maplibregl.Map({
            container: mapContainer.current ,
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

    }, [apiKey, setPos, style]);    

    const handleStyleChange = ((e: React.ChangeEvent<HTMLSelectElement>) => {
        setStyle(e.target.value as STYLE);
        // theoretically, there should be a really simple map.setStyle func, but I wasn't able to get
        // that to work, so we have this hacky way of just changing the url instead 
    })

    return (
        <div style={{ width: '100%', height: '400px', position: 'relative' }}>
            <select value={style} onChange={handleStyleChange}>
                {Object.values(STYLE).map(style => {
                    return <option key={style} value={style}>
                        {style}
                    </option>
                })}
            </select>
            <div ref={mapContainer} style={{ width: '100%', height: '100%', position: 'absolute' }} />
        </div>
    );

};

export default Map;
