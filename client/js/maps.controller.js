( function(angular) {
	angular
		.module('myApp')
		.controller('mapsCtrl', mapsCtrl);

	function mapsCtrl($scope, Search, Category) {
		var vm = this;

		// Bound variables
		vm.crimeData = [];
		vm.map;
		vm.markers = [];
		vm.newSearch = Search.newSearch;
		vm.findCrimes = findCrimes;
		vm.getTaps = getTaps;
		vm.initMap = initMap;

		// Function calls
		angular.element(document).ready(function() {
			vm.getTaps();
			// vm.findCrimes();
		});

		// Function implementations
		function findCrimes() {
			vm.loading = true;
			var crimesPromise = Search.find(vm.newSearch);
			crimesPromise.then(function(result) {
				vm.crimeData = result;
				vm.loading = false;
				vm.initMap(vm.newSearch);
			});
		}

		function getTaps() {
			console.log(vm.newSearch);
			var tapsPromise = Category.retrieve(vm.newSearch);
			tapsPromise.then(function(result) {
				console.log(result);
			});
		}

		function initMap(newSearch) {
			var convRadius = newSearch.radius * 1600;

			var mapOptions = {
				center: new google.maps.LatLng(newSearch.lat, newSearch.lng),
				zoom: 14,
				draggable: true,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			vm.map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

			var circle = new google.maps.Circle({
				map: vm.map,
				radius: convRadius,
				fillColor: '#0099ff',
				center: new google.maps.LatLng(newSearch.lat, newSearch.lng)
			});

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

	}

} )(angular);