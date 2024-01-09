
//  const express = require('express');
//  const axios = require('axios');
//  const app = express();
 
//  // Set up Google Geocoding API key
 
 
//  app.get('/api/search', async (req, res) => {
//    try {
//      // Retrieve search parameters from the request (e.g., req.query.address)
//      const { address } = req.query;
 
//      // Convert the address to geographic coordinates using Google Geocoding API
//      const coordinates = await geocodeAddress(address);
 
//      // Process the search request and retrieve the search results based on the coordinates
//      const searchResults = performSearch(coordinates); // Replace 'performSearch' with your own search function
 
//      // Return the search results as a JSON response
//      res.json(searchResults);
//    } catch (error) {
//      console.log('Error performing search:', error);
//      res.status(500).json({ error: 'An error occurred during the search.' });
//    }
//  });
 
//  // Define your search function
//  function performSearch(coordinates) {
//    // Implement your search logic here
//    // This function should process the search request, perform any necessary operations (e.g., query a database), and return the search results
 
//    // Example search results
//    const searchResults = [
//      { name: 'Result 1', lat: coordinates.lat, lng: coordinates.lng },
//      // Add more search results as needed
//    ];
 
//    // Perform the search based on the coordinates
 
//    return searchResults;
//  }
 
//  // Geocode an address using Google Geocoding API
//  async function geocodeAddress(address) {
//    const encodedAddress = encodeURIComponent(address);
//    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_API_KEY}`;
 
//    const response = await axios.get(geocodingUrl);
//    const { results } = response.data;
 
//    // Extract the coordinates from the geocoding response
//    if (results.length > 0) {
//      const { lat, lng } = results[0].geometry.location;
//      return { lat, lng };
//    }
 
//    throw new Error('Unable to geocode the provided address.');
//  }
 
 