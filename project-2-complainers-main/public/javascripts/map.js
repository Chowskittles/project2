// this script fetches complaints from the server and displays them on a map

// create a map centered in nyc with zoom level 12
const map = L.map('map').setView([40.7128, -74.0060], 12);

// add a tile layer to the map (this is how the map's background is displayed)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">openstreetmap</a> contributors',
}).addTo(map);

// fetch complaints data from the server
fetch('/complaints')
  .then(response => response.json())  // convert the response to json
  .then(complaints => {
    // loop through all complaints and add them as markers on the map
    complaints.forEach(complaint => {
      // only display complaints with latitude and longitude data
      if (complaint.latitude && complaint.longitude) {
        const marker = L.marker([complaint.latitude, complaint.longitude]).addTo(map);
        marker.bindPopup(`<b>${complaint.complaint_type}</b><br>${complaint.address}`);
      }
    });
  })
  .catch(error => {
    // log any errors
    console.error('error fetching complaints:', error);
  });
