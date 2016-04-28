var unirest = require('unirest');
var request = require('request');
var mashKey = "bDPDcJeR9BmshPk8xl2oUBZ4mM14p1xzufRjsnWu3DBQ4E9fq0";

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
		var searchUrl = 'http://search.3taps.com/category=' + req.body.category;
		var refUrl = 'http://reference.3taps.com/categories';
		var options = {
			url: searchUrl,
			headers: {
				auth_token: 'b0993c5fbee380615cad20627a188801'
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

		request.get(options, callback);
	},

};