( function(angular) {
	angular
		.module('myApp')
		.controller('mapsCtrl', mapsCtrl);

	function mapsCtrl($scope, Search, Category) {
		var vm = this;

		// Bound variables
		vm.crimeData = [];
		vm.taps = [];
		vm.map;
		vm.markers = [];
		vm.newSearch = Search.newSearch;
		vm.findCrimes = findCrimes;
		vm.getTaps = getTaps;
		vm.initMap = initMap;
		vm.initAltMap = initAltMap;

		// Function calls
		angular.element(document).ready(function() {
			vm.findCrimes();
		});

		// Function implementations

		// This function gets data from the crime data API
		function findCrimes() {
			vm.loading = true;
			var crimesPromise = Search.find(vm.newSearch);
			crimesPromise.then(function(result) {
				vm.crimeData = result;
				vm.loading = false;
				vm.initMap(vm.newSearch);
			});
		}

		// Function to get data from 3taps API
		function getTaps() {
			vm.newSearch.radius = vm.newSearch.radius + 'mi';
			vm.loading = true;
			var tapsPromise = Category.retrieve(vm.newSearch);
			tapsPromise.then(function(result) {
				console.log(result.postings);
				vm.taps = result.postings;
				vm.loading = false;
				vm.initAltMap(vm.newSearch);
			});
		}

		// initMap function that works with the crime data api
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

		// Alternative to initMap that was made for use with 3taps API
		function initAltMap(newSearch) {
			var mapCenter = new google.maps.LatLng(newSearch.lat, newSearch.lng);
			var mapOptions = {
				center: mapCenter,
				zoom: 13,
				draggable: true,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			vm.map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

			for (var tap in vm.taps) {
				var tapLoc = new google.maps.LatLng(vm.taps[tap].location.lat, vm.taps[tap].location.long);
				var postHeading = vm.taps[tap].heading;

				addMarker(tapLoc, postHeading);
			}
		}

		// Function to add a Google Maps marker, only gets called from within initMap or initAltMap
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