( function(angular) {
	angular
		.module('myApp')
		.factory('Category', Category);

	function Category($http) {

	    var postings = [];

		var factory = {
			retrieve: retrieve,
			postings: postings,
		};

		return factory;

		// Function Implementations
		function retrieve(newSearch) {
			return $http.post('/tapdata', { category: newSearch.category, radius: newSearch.radius, lat: newSearch.lat, long: newSearch.lng })
				.then(function(result) {
					postings = JSON.parse(result.data);
					return JSON.parse(result.data);
				},
				function(err) {
					console.log(err);
				});
		}
	}

} )(angular);