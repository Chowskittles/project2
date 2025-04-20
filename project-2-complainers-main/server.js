const express = require('express');
const path = require('path');
const app = express();

// Set up Handlebars (view engine)
app.set('view engine', 'hbs');  // Tell Express to use Handlebars for rendering views
app.set('views', path.join(__dirname, 'views'));  // Where to find the views folder

// Serve static files (e.g., images, stylesheets, JS) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Example data (you'd replace this with real data)
const complaints = [
    { complaint_type: 'Noise', borough: 'Manhattan', latitude: 40.7128, longitude: -74.0060 },
    { complaint_type: 'Illegal Parking', borough: 'Brooklyn', latitude: 40.6782, longitude: -73.9442 },
];

// Route to render the homepage
app.get('/', (req, res) => {
    // The route renders the index.hbs file and passes data to it
    res.render('index', { complaints });
});

// Start the server (listens on port 3000 or Glitch's auto-assigned port)
app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running');
});
