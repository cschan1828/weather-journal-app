// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
// Callback to debug
const port = 6080;
const server = app.listen(port, () => {
  console.log(`Running on localhost ${port}`);
});

// Initialize all route with a callback function
// Callback function to complete GET '/all'
app.get('/all', (req, res) => {
  res.send(projectData);
});

// Post Route
app.post('/add', (req, res) => {

  let data = req.body;
  projectData=data;
  console.log(projectData);

  res.send(true);
});

app.get('/', (req, res) => {
  res.send("Hello");
});
