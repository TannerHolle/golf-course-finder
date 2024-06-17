// server.js
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

app.post('/api/search', async (req, res) => {
  const { start, end } = req.body;

  try {
    // Get route from start to end
    const directionsResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${end}&key=${GOOGLE_MAPS_API_KEY}`
    );
    const route = directionsResponse.data.routes[0];

    // Get golf courses along the route
    const golfCourses = [];
    for (let leg of route.legs) {
      for (let step of leg.steps) {
        const location = step.end_location;
        const placesResponse = await axios.get(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=8046.72&type=golf_course&key=${GOOGLE_MAPS_API_KEY}`
        );
        golfCourses.push(...placesResponse.data.results);
      }
    }

    res.json(golfCourses);
  } catch (error) {
    console.error('Error fetching route or golf courses:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
