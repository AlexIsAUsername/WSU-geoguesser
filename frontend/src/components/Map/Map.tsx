import React, { useState, useCallback } from 'react';
import { Marker } from '@react-google-maps/api';
import { GoogleMap } from '@react-google-maps/api';
import { LoadScript } from '@react-google-maps/api';
import { string } from 'three/webgpu';

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
}

const MyGoogleMap = ({ apiKey }: MapProps) => {
    const [marker, setMarker] = useState<MarkerType>();

    const onMapClick = useCallback((event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
            setMarker({
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
            })
        }
    }, []);

    return (
        <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
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

export default MyGoogleMap;
