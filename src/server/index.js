const dotenv = require('dotenv');
dotenv.config();
// dotenv.config({ path: 'path/to/.env' });
console.log(`Your API key is ${process.env.API_KEY}`);

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require('body-parser')
var cors = require('cors')
var aylien = require("aylien_textapi");
// You could call it aylienapi, or anything else
var textapi = new aylien({
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

app.use(express.static('dist'))
console.log(JSON.stringify(mockAPIResponse))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.get('/test', function (req, res) {
    res.json(mockAPIResponse);
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})


// GET Request from Aylien Api
app.get('/api', function (req, res) {
    textapi.sentiment({
        text: req.query.input,
        mode: 'Document'
      }, function(error, response) {
        if (error === null) {
        	console.log("response is sent");
            res.send(response);
        } else {
        	console.log(error);
        }
      });
});



