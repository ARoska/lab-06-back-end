'use strict';

// Loads dotenv to manage variables
require('dotenv').config();

// Loads express to do the heavy lifting of the server
const express = require('express');

// Establishes PORT number
const PORT = process.env.PORT || 3000
const app = express();


// Creates the routes (paths) from APIs that the user can access the server
app.get('/location', (request, response) => {
  const locationData = searchToLong(request.query.data);
  response.send(locationData);
});

// Listener for requests
app.listen(PORT, () => console.log(`App is up on ${PORT}`));

// Helper Functions

//Error Handler
function handleError(err, res) {
  console.error(err);
  if (res) res.status(500).send('Sorry, something went wrong');
}

function searchToLatLong(query) {
  const geoData = require('./data/geo.json');
  const location = new Location(query, geoData);
  console.log('location in searchToLatLong()', location);
  return location;
}

function Location(query, res) {
  console.log('res in Location()', res);
  this.seach_query = query;
  this.formatted_query = res.results[0].formatted_address;
  this.latitude = res.results[0].geometry.location.lat;
  this.longitude = res.results[0].geometry.location.lng;
}

function getWeather() {
  const darkskyData = require('./data/darksky.json');


  darkskyData.daily.data.forEach(day => {
    weatherSummaries.push(new Weather(day));
  });
  return 
}

function Weather(day) {
  this.forecast = day.summary;
  this.time = new Date(day.time * 1000).toString().slice(0, 15);
}

