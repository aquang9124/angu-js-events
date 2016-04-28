var crimes = require('../controllers/crimes.js');
var counts = require('../controllers/counts.js');

module.exports = function(app) {
	app.post('/crimes', function(req, res) {
		crimes.show(req, res);
	});

	app.post('/tapdata', function(req, res) {
		crimes.retrieve(req, res);
	});

	app.post('/counts', function(req, res) {
		counts.show(req, res);
	});
};
