import React, { useState, useEffect } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import './location.css'

const Location = ({ city = "India", setMap }) => {
  const [position, setPosition] = useState(null);
  const [zoom, setZoom] = useState(12);
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (!apiKey) return;

    const geocodeCity = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${apiKey}`
        );
        const data = await response.json();
        if (data.results?.[0]?.geometry?.location) {
          setPosition(data.results[0].geometry.location);
        }
      } catch (error) {
        console.error("Geocoding error:", error);
      }
    };

    geocodeCity();
  }, [city, apiKey]);

  if (!apiKey) {
    return <div className="map-error">Google Maps API key missing</div>;
  }

  return (
    <div className="google-map-cont">
      <span className='cutMap' onClick={() => setMap(false)}>&#10006;</span>
      <div>
        <APIProvider apiKey={apiKey}>
          <Map
            zoom={zoom}
            center={position || { lat: 0, lng: 0 }}
            gestureHandling="greedy"
            zoomControl={true}
            mapTypeControl={true}
            mapTypeId={'hybrid'}
            onZoomChanged={(event) => setZoom(event.zoom)}
          >
            {position && <Marker position={position} />}
          </Map>
        </APIProvider>
      </div>
    </div>
  );
};

export default Location;
