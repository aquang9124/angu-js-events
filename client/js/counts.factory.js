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
			$http.post('/geodata', { address: countsData[index].address })
				.then(function(result) {
					var item = JSON.parse(result.data);
					var latLng = {};
					countData[index].latitude = item.results[0].geometry.location.lat;
					countData[index].long = item.results[0].geometry.location.lng;
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