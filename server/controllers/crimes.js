var unirest = require('unirest');
var request = require('request');
var mashKey = "bDPDcJeR9BmshPk8xl2oUBZ4mM14p1xzufRjsnWu3DBQ4E9fq0";
var authToken = 'b0993c5fbee380615cad20627a188801';

module.exports = {
	show: function(req, res) {
		unirest.get("https://jgentes-Crime-Data-v1.p.mashape.com/crime?enddate=" + req.body.end + "&lat=" + req.body.lat + "&long=" + req.body.lng + "&startdate=" + req.body.start)
		.header("X-Mashape-Key", mashKey)
		.header("Accept", "application/json")
		.end(function (result) {
			res.json(result.body);
		});
	},

	retrieve: function(req, res) {
		var searchUrl = 'http://search.3taps.com?rpp=100&category=' + req.body.category + '&lat=' + req.body.lat + '&long=' + req.body.long + '&radius=' + req.body.radius;
		console.log(searchUrl);
		var refUrl = 'http://reference.3taps.com/categories';
		var options = {
			method: 'GET',
			url: searchUrl,
			headers: {
				auth_token: authToken
			}
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
	},

};