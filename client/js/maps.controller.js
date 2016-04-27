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
			var crimesPromise = Search.find(vm.newSearch);
			crimesPromise.then(function(result) {
				vm.crimeData = result;
				console.log(result);
			});
		}

		function initMap() {

			var mapOptions = {
				center: new google.maps.LatLng(34.22, 100),
				zoom: 14,
				draggable: true,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
			var markers = [];

			for (var crime in vm.crimeData) {
				var crimeLoc = new google.maps.LatLng(vm.crimeData[crime].long, vm.crimeData[crime].lat);

				markers.push(new google.maps.Marker({
					position: crimeLoc,
					map: map,
					title: crimeLoc
				}));

				markers[markers.length - 1]['infowin'] = new google.maps.InfoWindow({
					content: '<div>This is a marker in ' + crimeLoc + '</div>'
				});

				google.maps.event.addListener(markers[marker.length - 1], 'click', function() {
					this['infowin'].open(map, this);
				});
			}

		}

		// Function calls
		vm.findCrimes();
	}

} )(angular);