/*global google*/
import { useEffect } from 'react';


export function useGeocoding(clientAddress, doctors, setSortedDoctors) {
    useEffect(() => {
        initMap();
    
        function initMap() {
          if (typeof google === 'undefined') {
            console.error('Google Maps API not available.');
            return;
          }
          let key = "AIzaSyDZRcNlZiVZWcu0yyMsRNnOUHmL3X9SPt0"
          const googleScript = document.createElement('script');
          googleScript.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
          googleScript.onload = () => {
            geocodeClientAddress();
          };
          googleScript.onerror = () => {
            console.error('Error loading Google Maps API');
          };
          document.head.appendChild(googleScript);
        }
    
        function geocodeClientAddress() {
          // Step 1: Geocode client's address
          const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            clientAddress
          )}&key=AIzaSyDZRcNlZiVZWcu0yyMsRNnOUHmL3X9SPt0`;
    
          fetch(geocodeUrl)
            .then((response) => response.json())
            .then((data) => {
              if (data.status !== 'OK' || data.results.length === 0) {
                throw new Error('Unable to geocode client address.');
              }
    
              // Extract client's latitude and longitude
              const clientLatitude = data.results[0].geometry?.location?.lat;
              const clientLongitude = data.results[0].geometry?.location?.lng;
    
              
              if (!clientLatitude || !clientLongitude) {
                throw new Error('Invalid client address data.');
              }
    
              // Step 2: Calculate distances and sort the list of doctors
              const distancePromises = doctors.map((doctor) => {
                console.log('Geocoding address:', doctor.address)
                const doctorGeocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                  doctor.address
                )}&key=AIzaSyDZRcNlZiVZWcu0yyMsRNnOUHmL3X9SPt0`;
    
                return fetch(doctorGeocodeUrl)
                  .then((response) => response.json())
                  .then((doctorData) => {
                    if (doctorData.status !== 'OK' || doctorData.results.length === 0) {
                      throw new Error(`Unable to geocode doctor address: ${doctor.address}`);
                      return null;
                    }
    
                    // Calculate distance using Haversine formula or other methods
                    const doctorLatitude = doctorData.results[0].geometry?.location?.lat;
                    const doctorLongitude = doctorData.results[0].geometry?.location?.lng;
                    const distance = calculateDistance(
                      clientLatitude,
                      clientLongitude,
                      doctorLatitude,
                      doctorLongitude
                    );
    
                    return { ...doctor, distance, latitude: doctorLatitude, longitude: doctorLongitude };
                  })
                  .catch((error) => {
                    console.error(`An error occurred while geocoding doctor address: ${doctor.address}`, error);
                    return null; // Skip doctor in case of error
                  });
              });
    
              Promise.all(distancePromises)
                .then((sortedDoctors) => {
                  sortedDoctors = sortedDoctors.filter((doctor) => doctor !== null);
                  sortedDoctors.sort((a, b) => a.distance - b.distance);
                  setSortedDoctors(sortedDoctors);
    
                  // Step 4: Display the map
                  const map = new google.maps.Map(document.getElementById('map'), {
                    center: { lat: clientLatitude, lng: clientLongitude },
                    zoom: 10,
                  });
                  const markerOptions = 
                {
                  position: { lat: clientLatitude, lng: clientLongitude },
                  map: map,
                  title: clientAddress,
                  icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                }
                const marker = new google.maps.Marker(markerOptions);
    
                  // Step 5: Add markers to the map
                  sortedDoctors.forEach((doctor) => {
                    const marker = new google.maps.Marker({
                      position: { lat: doctor.latitude, lng: doctor.longitude },
                      map: map,
                      title: doctor.name,
                    });
    
                    const infoWindow = new google.maps.InfoWindow({
                      content: `
                        <div>
                          <h5>${doctor.name}</h5>
                          <h3>${doctor.distance.toFixed(2)} miles</h3>
                          <p>${doctor.address}</p>
                        </div>
                      `,
                    });
    
                    marker.addListener('click', () => {
                      infoWindow.open(map, marker);
                      const doctorCard = document.getElementById(`doctor-${doctor._id}`);
                      if (doctorCard) {
                        doctorCard.scrollIntoView({ behavior: 'smooth' });
                      }
                    });
                  });
                })
                .catch((error) => {
                  console.error('An error occurred:', error);
                });
            })
            .catch((error) => {
              console.error('An error occurred:', error);
            });
        }
    
        // Helper function to calculate distance between two points using Haversine formula
        function calculateDistance(lat1, lon1, lat2, lon2) {
          const R = 6371; // Radius of the earth in kilometers
          const dLat = deg2rad(lat2 - lat1);
          const dLon = deg2rad(lon2 - lon1);
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const distance = R * c; // Distance in kilometers
          return distance * 0.621371; // Convert to miles
        }
    
        function deg2rad(deg) {
          return deg * (Math.PI / 180);
        }
      }, [clientAddress, doctors]);
    
  }
