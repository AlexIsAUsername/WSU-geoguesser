import React, { useState, useCallback, useEffect } from 'react';
import { Marker } from '@react-google-maps/api';
import { GoogleMap } from '@react-google-maps/api';
import { LoadScript } from '@react-google-maps/api';
import { Point } from '../../pages/game/Game';
import { generateMagicSquareNoise } from 'three/examples/jsm/Addons.js';

interface MarkerType {
    lat: number;
    lng: number;
}

const containerStyle = {
    width: '100%',
    height: '400px',
};


const center = {
    lat: 39.782072,  
    lng: -84.063429,
};


interface MapProps{
    apiKey: string
    setPos: (pos: Point) => void
}

const Map = ({ apiKey, setPos }: MapProps) => {
    const [marker, setMarker] = useState<MarkerType>();

    const onMapClick = useCallback((event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
            setMarker({
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
            })
        }
    }, []);


    useEffect(() => {
        if(marker){ // marker is undefined the on initial map load
            const newPoint: Point = {
                x: marker.lat,
                y: marker.lng,
                z: 0
            }; // hardcode zero for now until we get drop down for floor
            setPos(newPoint);
        }

    }, [marker]);

    return (
        <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={17}
                onClick={onMapClick}
            >

            {marker ? (
                <Marker position={{ lat: marker.lat, lng: marker.lng }}/> 
            ) :(
                <>Loading...</>
            )}

            </GoogleMap>
        </LoadScript>
    );
};

export default Map;
