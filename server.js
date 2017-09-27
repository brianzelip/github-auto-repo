const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// via https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// When client hits my-site.glitch.me/addRepo, log body data from the form submit
app.post('/addRepo', function(req, res) {
  console.log('req', req.body);
  res.redirect('http://google.com');
  // res.send('pop');
});
