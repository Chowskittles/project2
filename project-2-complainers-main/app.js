// importing required modules
const express = require('express'); // express is a web framework for node.js
const fetch = require('node-fetch');  // fetch is used to make api calls to nyc 311
const path = require('path');  // path helps us manage file paths
const hbs = require('hbs');  // hbs is the handlebars template engine
const app = express();  // create an express app

// setting up the port for the server to listen on
const port = process.env.PORT || 4321;  // use the port from environment or default to 4321

// setting up middleware to serve static files (like css, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));  // serve files from the "public" folder

// set handlebars as the template engine for rendering html
app.set('view engine', 'hbs');

// setting up the views and partials directories for handlebars (optional but good practice)
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// create a route for the home page
app.get('/', (req, res) => {
  res.render('index', {
    title: '311 complaints map',  // title to display in the browser
    body: 'welcome to the nyc 311 complaints map!'  // body text to display on the page
  });
});

// create a route to fetch complaints data from the nyc 311 api
app.get('/complaints', async (req, res) => {
  try {
    // make a get request to the nyc 311 api endpoint
    const response = await fetch('https://data.cityofnewyork.us/resource/fhrw-4uyv.json');
    const complaints = await response.json();  // convert the response to json

    // send the complaints data back to the frontend as json
    res.json(complaints);
  } catch (error) {
    // if there's an error, log it and send a failure response
    console.error('error fetching complaints:', error);
    res.status(500).send('error fetching complaints');
  }
});

// start the server and listen on the specified port
app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
