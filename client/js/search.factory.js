( function(angular) {
	angular
		.module('myApp')
		.factory('Search', Search);

	function Search($http) {
		var crimeData = [];
		var newSearch = {};
		var newAddress = {};
		var factory = {
			newSearch: newSearch,
			newAddress: newAddress,
			crimeData: crimeData,
			find: find,
			retrieve: retrieve,
		};
		return factory;

		function find(newSearch) {
			return $http.post('/crimes', { end: newSearch.end, lat: newSearch.lat, lng: newSearch.lng, start: newSearch.start })
				.then(function(res) {
					crimeData = res.data;
					return res.data;
				}, 
				function(res) {
					console.log(res);
				});
		}

		function retrieve() {
			return $http.get('/tapdata')
				.then(function(res) {
					return res;
				},
				function(res) {
					console.log(res);
				});
		}
	}

} )(angular);