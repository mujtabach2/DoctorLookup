import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Map() {
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Initialize the map
    async function initMap() {
      const mapOptions = {
        zoom: 4,
        center: { lat: -28, lng: 138 }
      };
      const mapElement = document.getElementById("map");
      const newMap = new window.google.maps.Map(mapElement, mapOptions);
      setMap(newMap);
    }

    // Load the Google Maps API script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDZRcNlZiVZWcu0yyMsRNnOUHmL3X9SPt0`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      initMap();
    };

    document.head.appendChild(script);

    // Clean up
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (map) {
      // Function to handle search and create markers
      async function handleSearch() {
        try {
          const response = await axios.get("/api/search"); // Replace with your server endpoint for search
          const searchResults = response.data;

          // Loop through the search results and create markers
          searchResults.forEach(result => {
            const markerOptions = {
              position: { lat: result.lat, lng: result.lng },
              map: map
            };
            new window.google.maps.Marker(markerOptions);
          });
        } catch (error) {
          console.log("Error performing search:", error);
        }
      }

      handleSearch();
    }
  }, [map]);

  return <div id="map" style={{ width: "100%", height: "400px" }}></div>;
}

