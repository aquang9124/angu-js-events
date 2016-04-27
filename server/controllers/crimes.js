var unirest = require('unirest');
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
};