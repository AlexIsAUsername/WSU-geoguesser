import React, { useState, useCallback } from 'react';
import { Marker } from '@react-google-maps/api';
import { GoogleMap } from '@react-google-maps/api';
import { LoadScript } from '@react-google-maps/api';

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

const MyGoogleMap: React.FC = () => {
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
        <LoadScript googleMapsApiKey="">
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
