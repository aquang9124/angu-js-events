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
				var crimeLoc = new google.maps.LatLng(vm.crimeData[crime].lat, vm.crimeData[crime].long);
				var crimeDesc = vm.crimeData[crime].description;
				addMarker(crimeLoc, crimeDesc);
			}
		}

		function addMarker(crimeLoc, crimeDesc) {
			var marker = new google.maps.Marker({
				position: crimeLoc,
				map: vm.map,
				title: "Crime Location",
				clickable: true
			});

			marker.info = new google.maps.InfoWindow({
				content: "<div>" + crimeDesc + "</div>"
			});

			google.maps.event.addListener(marker, 'click', function() {
				marker.info.open(vm.map, marker);
			});

			vm.markers.push(marker);
		}

		function setMapOnAll(map) {
			for (var i = 0; i < vm.markers.length; i++) {
				vm.markers[i].setMap(map);
			}
		}

		// Function calls
		angular.element(document).ready(function() {
			vm.findCrimes();
		});
	}

} )(angular);