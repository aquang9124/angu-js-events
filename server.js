var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './client')));

require('./server/config/routes.js')(app);

app.listen(port, function() {
	console.log('Make something amazing.');
});