var unirest = require('unirest');
var mashKey = "bDPDcJeR9BmshPk8xl2oUBZ4mM14p1xzufRjsnWu3DBQ4E9fq0";

modules.exports = {
	show: function(req, res) {
		unirest.get("https://jgentes-Crime-Data-v1.p.mashape.com/crime?enddate=3%2F25%2F2016&lat=37.757815&long=-122.5076392&startdate=9%3F19%2F2016")
		.header("X-Mashape-Key", mashKey)
		.header("Accept", "application/json")
		.end(function (result) {
		  console.log(result.status, result.headers, result.body);
		});
	},
};