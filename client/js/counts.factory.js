( function(angular) {
	angular
		.module('myApp')
		.factory('Count', Count);

	function Count($http) {
		var countData = [];
		var factory = {
			countData: countData,
			find: find,
		};

		return factory;

		// function implementations
		function find(newAddress) {
			return $http.post('/counts', { state: newAddress.administrative_area_level_1, city: newAddress.locality })
				.then(function(result) {
						countData = JSON.parse(result.data);
						return JSON.parse(result.data);
					},
					function(err) {
						console.log(err);
					});
		}
	}

} )(angular);