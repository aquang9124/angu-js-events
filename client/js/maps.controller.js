( function(angular) {
	angular
		.module('myApp')
		.controller('mapsCtrl', mapsCtrl);

	function mapsCtrl($scope, Search) {
		var vm = this;

		// Bound variables
		vm.crimeData = [];
		vm.map;
		vm.markers = [];
		vm.newSearch = Search.newSearch;
		vm.findCrimes = findCrimes;
		vm.initMap = initMap;

		// Function implementations
		function findCrimes() {
			var crimesPromise = Search.find(vm.newSearch);
			crimesPromise.then(function(result) {
				console.log(result);
				vm.crimeData = result;
				vm.initMap(vm.newSearch);
			});
		}

		function initMap(newSearch) {

			var mapOptions = {
				center: new google.maps.LatLng(newSearch.lat, newSearch.lng),
				zoom: 14,
				draggable: true,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			vm.map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

			for (var crime in vm.crimeData) {
				var crimeLoc = new google.maps.LatLng(vm.crimeData[crime].long, vm.crimeData[crime].lat);
				addMarker(crimeLoc);
			}
		}

		function addMarker(crimeLoc) {
			var marker = new google.maps.Marker({
				position: crimeLoc,
				map: vm.map,
				title: "Crime Location"
			});

			vm.markers.push(marker);
			marker.setMap(vm.map);

		}

		function setMapOnAll(map) {
			for (var i = 0; i < vm.markers.length; i++) {
				vm.markers[i].setMap(map);
			}
		}

		// Function calls
		google.maps.event.addDomListener(window, 'load', vm.findCrimes());
	}

} )(angular);