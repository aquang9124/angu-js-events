var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './client')));

app.listen(8000, function() {
	console.log('Make something amazing.');
});