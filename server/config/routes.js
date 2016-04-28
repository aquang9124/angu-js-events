var crimes = require('../controllers/crimes.js');

module.exports = function(app) {
	app.post('/crimes', function(req, res) {
		crimes.show(req, res);
	});

	app.post('/tapdata', function(req, res) {
		crimes.retrieve(req, res);
	});
}
