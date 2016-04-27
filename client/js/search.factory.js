( function(angular) {
	angular
		.module('myApp')
		.factory('Search', Search);

	function Search($http) {
		var crimeData = [];
		var newSearch = {};
		var factory = {
			newSearch: newSearch,
			crimeData: crimeData,
			find: find,
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
	}

} )(angular);