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
};