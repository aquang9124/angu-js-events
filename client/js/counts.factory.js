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
			grab: grab,
		};

		return factory;

		// function implementations
		function find(newAddress) {
			return $http.post('/counts', { state: newAddress.administrative_area_level_1 })
				.then(function(result) {
						countData = JSON.parse(result.data);
						return JSON.parse(result.data);
					},
					function(err) {
						console.log(err);
					});
		}

		function retrieveLoc(countsData, index) {
			$http.post('/geodata', { address: countsData[index].address })
				.then(function(result) {
					var item = JSON.parse(result.data);
					countData[index].latitude = item.results[0].geometry.location.lat.toString();
					countData[index].long = item.results[0].geometry.location.lng.toString();
				},
				function(err) {
					console.log(err);
				});
		}

		function grab() {
			return countData;
		}

	}

} )(angular);