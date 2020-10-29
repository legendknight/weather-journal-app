/* set dependencies*/

//  projectData for api
projectData = {};

//  create express object
const express = require('express');
const con = express();
//Create a server running on port 3000
const port = 3000;
const server = con.listen(port, listening);
// Add server callback function testing server is running 
function listening() {
  console.log(`running on localhost: ${port}`);
};
//  create bodyParser object
const bodyParser = require('body-parser');

//Here we are configuring to use body-parser 
con.use(bodyParser.urlencoded({
  extended: false
}));
con.use(bodyParser.json());
// create cors object for sharing 
const cors = require('cors');
con.use(cors());
console.log('CORS-enabled')
// locate website folder 
con.use(express.static('website'));

// POST route for setuping values
con.post('/add', addInfo);

function addInfo(req, res) {
  const g = req.body;
  //server anticipating Data samples :temperature,date,user response
  try {
    projectData['temp'] = g.temp;
    projectData['date'] = g.date;
    projectData['content'] = g.userData;
  } catch (error) {
    console.log("error", error);
  }
};

// Callback function to -- GET '/val'
con.get('/value', getInfo);

function getInfo(req, res) {
  res.send(projectData);
}