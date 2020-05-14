import React, { useEffect, useRef } from 'react';
// Esri Imports
// import Map from 'esri/Map';
// import MapView from 'esri/views/MapView';
import { loadModules } from 'esri-loader';
// Css Imports
import './App.css';

function App() {
  const mapRef = useRef<HTMLDivElement>(null);

    useEffect(
      () => {
        // lazy load the required ArcGIS API for JavaScript modules and CSS
        loadModules(['esri/Map', 'esri/views/MapView'], { css: true })
        .then(([ArcGISMap, MapView]) => {
          const map = new ArcGISMap({
            basemap: 'dark-gray'
          });

          // load the map view at the ref's DOM node
          const view = new MapView({
            container: mapRef.current,
            map: map,
            center: [-118, 34],
            zoom: 8
          });

          return () => {
            if (view) {
              // destroy the map view
              view.container = null;
            }
          };
        });
      }
    );

  return <div className="webmap" ref={mapRef} />;
}

export default App;
