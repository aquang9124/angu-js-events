( function(angular) {
	angular
		.module('myApp')
		.controller('mapsCtrl', mapsCtrl);

	function mapsCtrl($scope, Search) {
		var vm = this;

		// Bound variables
		vm.crimeData = [];
		vm.newSearch = Search.newSearch;
		vm.findCrimes = findCrimes;
		vm.initMap = initMap;

		// Function implementations
		function findCrimes() {
			Search.find(vm.newSearch, function(data) {
				vm.crimeData = data.body;
			});
		}

		function initMap() {
			var options = {
				enableHighAccuracy: true
			};

			var mapOptions = {
				center: new google.maps.LatLng(34.22, 100),
				zoom: 14,
				draggable: true,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

			if (navigator.geolocation) 
			{
				navigator.geolocation.getCurrentPosition(function(pos)
				{
					var position = {
						lat: pos.coords.latitude,
						lng: pos.coords.longitude
					};

					map.setCenter(position);

					var marker = new google.maps.Marker({
						position: position,
						map: map,
						title: 'Hello World!'
					});
				}, 
				function(err) {
					alert('Unable to get location: ' + err.message);
				}, options);
			}
		}

		// Function calls
		vm.findCrimes();
	}

} )(angular);