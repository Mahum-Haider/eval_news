const dotenv = require('dotenv');
dotenv.config();
// dotenv.config({ path: 'path/to/.env' });
console.log(`Your API key is ${process.env.API_KEY}`);

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require('body-parser')
// Cors for cross origin allowance
var cors = require('cors')

//Require the Aylien npm package
var AYLIENTextAPI = require('aylien_textapi');
// Set Aylien API credentials
var textapi = new AYLIENTextAPI({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

// Specify the directory from where to load files
app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.get('/api', function (req, res) {
    res.send(mockAPIResponse);
})


// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})


// POST Request from Aylien Api
app.post('/api', function (req, res) {
    textapi.sentiment({
        'url': req.body.input,
        'mode': 'document'
    },	function(error, response) {
        	if (error) {
        		console.log(error)
      		}
      		res.send(response);
      	}
    );
});