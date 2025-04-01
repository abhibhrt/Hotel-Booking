import React, { useState, useEffect } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

const Location = ({ city = "India", setMap }) => {
  const [position, setPosition] = useState(null);  // To store the coordinates of the location
  const [zoom, setZoom] = useState(12); // Default zoom level
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY; // Get the Google Maps API key from env variables

  useEffect(() => {
    if (!apiKey) return;  // If no API key, don't proceed

    const geocodeCity = async () => {
      try {
        // Sending request to Google Geocoding API to get coordinates of the city
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${apiKey}`
        );
        const data = await response.json();
        if (data.results?.[0]?.geometry?.location) {
          // If valid location data exists, set position
          setPosition(data.results[0].geometry.location);
        }
      } catch (error) {
        console.error("Geocoding error:", error); // Catch and log any errors from API
      }
    };

    geocodeCity();
  }, [city, apiKey]); // Runs when city or apiKey changes

  if (!apiKey) {
    // If API key is missing, show an error message
    return <div className="map-error">Google Maps API key missing</div>;
  }

  return (
    <div className="google-map-cont">
      <span className='cutMap' onClick={() => setMap(false)}>&#10006;</span>  {/* Close button for the map */}
      <div>
        <APIProvider apiKey={apiKey}>
          <Map
            zoom={zoom} // Zoom level for the map
            center={position || { lat: 0, lng: 0 }} // Default center if no position is set
            gestureHandling="greedy" // Allow all gestures like dragging and zooming
            zoomControl={true} // Enable zoom controls
            mapTypeControl={true} // Enable map type controls (satellite, hybrid, etc.)
            mapTypeId={'hybrid'} // Set map type to 'hybrid'
            onZoomChanged={(event) => setZoom(event.zoom)} // Update zoom level when changed
          >
            {position && <Marker position={position} />}  {/* Show a marker if position is set */}
          </Map>
        </APIProvider>
      </div>
    </div>
  );
};

export default Location;
