( function(angular) {
	angular
		.module('myApp')
		.factory('Count', Count);

	function Count($http) {
		var countData = [];
		var factory = {
			countData: countData,
			find: find,
			retrieveLoc: retrieveLoc,
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

		function retrieveLoc(countsData, index) {
			console.log(countsData[index].address);
			$http.post('/geodata', { address: countsData[index].address })
				.then(function(result) {
					var item = JSON.parse(result.data);
					countData[index].lat = item.results[0].geometry.location.lat;
					countData[index].lng = item.results[0].geometry.location.lng;
					console.log(countData[index]);
				},
				function(err) {
					console.log(err);
				});
		}
	}

} )(angular);