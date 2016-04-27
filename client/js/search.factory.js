( function(angular) {
	angular
		.module('myApp')
		.factory('Search', Search);

	function Search($http) {
		var factory = {
			find: find,
		};
		return factory;

		function find(newSearch, callback) {
			console.log(newSearch);
			$http.post('/crimes', 
				{ end: newSearch.end, lat: newSearch.lat, lng: newSearch.lng, start: newSearch.start })
				.then(function(res) {
					callback(res);
				}, 
				function(res) {
					console.log(res);
				});
		}
	}

} )(angular);