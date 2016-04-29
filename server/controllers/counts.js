var request = require('request');

module.exports = {
	show: function(req, res) {
		var countedUrl = 'http://thecountedapi.com/api/counted?state=' + req.body.state + '&city=' + req.body.city;
		var options = {
			method: 'GET',
			url: countedUrl
		};

		function callback(err, response, body) {
			if (!err && response.statusCode == 200)
			{
				res.json(body);
			}
			else
			{
				res.json(err);
			}
		}

		request(options, callback);
	},

	getGeo: function(req, res) {
		var geoUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + req.body.address + '&key=AIzaSyB99XQamcdZpKoSal7Jx5BX0zw96xVJEhM';
		var options = {
			method: 'GET',
			url: geoUrl
		};

		function callback(err, response, body) {
			if (!err && response.statusCode == 200)
			{
				console.log(body);
				res.json(body);
			}
			else
			{
				res.json(err);
			}
		}

		request(options, callback);
	}
};