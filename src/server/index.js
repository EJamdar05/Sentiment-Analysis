//requirments and other boiler plate code
const dotenv = require('dotenv');
dotenv.config();
const apiKey = process.env.LICENSE_KEY;
var axios = require('axios')
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express()

app.use(express.static('dist'))
app.use(cors());
console.log(__dirname)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
    console.log(`Your API key is ${process.env.LICENSE_KEY}`)
})

/*app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})*/

//when the user sumbits a string, this function is 
//called and will contact the api to obtain the info
//and if successful, send the data over
app.post('/urlData', async(req,res)=>{
  const userLink = req.query.text;
  axios.post(`https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&lang=en&txt=${userLink}`)
  .then(resp=>{
    res.send(resp.data);
  })
  .catch(error=>{
    console.log(`Error: ${error}`)
  })
})