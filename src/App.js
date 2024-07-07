// src/App.js

import React, { useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import MapComponent from './components/MapComponent';
import VoiceControl from './components/VoiceControl';
import './App.css';

const App = () => {
  const [map, setMap] = useState(null);
  const processCommand = (command) => {
    console.log("Processing command:", command);
    const lowerCaseCommand = command.toLowerCase();
    if (lowerCaseCommand.includes('zoom to')) {
      const location = lowerCaseCommand.split('zoom to')[1].trim();
      zoomToLocation(location);
    }
  };
  const zoomToLocation = (location) => {
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=YOUR_MAPBOX_ACCESS_TOKEN`)
      .then(response => response.json())
      .then(data => {
        const coords = data.features[0].center;
        map.setView([coords[1], coords[0]], 13); // Zoom to the location
      });
  };


  return (
    <div className="App">
      <VoiceControl processCommand={processCommand} />
      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "100vh", width: "100%" }} whenCreated={setMap}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
};

export default App;
