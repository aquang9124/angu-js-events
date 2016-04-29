( function(angular) {
	angular
		.module('myApp')
		.controller('countsCtrl', countsCtrl);

	function countsCtrl($scope, Search, Count) {
		var vm = this;

		// Bound variables
		vm.map;
		vm.myData;
		vm.markers = [];
		vm.newSearch = Search.newSearch;
		vm.newAddress = Search.newAddress;
		vm.countsData = [];
		vm.locale;
		vm.getCount = getCount;
		vm.makeValid = makeValid;
		vm.findLatLng = findLatLng;
		vm.initMap = initMap;

		// Function Calls
		angular.element(document).ready(function() {
			vm.getCount();
		});

		// Function implementations

		// Function to get the data from counted API
		function getCount() {
			vm.loading = true;
			var countsPromise = Count.find(vm.newAddress);

			countsPromise
				.then(function(result) {
					vm.countsData = result;
					vm.makeValid();
					console.log(vm.countsData);
					vm.findLatLng();
					var promise = new Promise(function(resolve, reject) {
						var data = Count.grab();

						if (data) 
						{
							resolve(data);
						}
						else
						{
							reject(Error("It Broke"));
						}
					});
					promise
						.then(function(result) {
							console.log(result);
							vm.loading = false;
							vm.initMap();
					});
				});
		}

		// Makes the addresses returned from the counted API valid addresses
		function makeValid() {
			for (var item in vm.countsData) {
				var splitAddress = vm.countsData[item].address.split(" ");
				var validAddress = [];
				for (var i = 0; i < splitAddress.length; i++) {
					if (splitAddress[i] !== 'and')
					{
						validAddress.push(splitAddress[i]);
					}
					else
					{
						vm.countsData[item].address = validAddress.join(" ");
						break;
					}
				}
			}

			return true;
		}

		// Function to find and add lat and lng to each object in counted array
		function findLatLng() {
			for (var i = 0; i < vm.countsData.length; i++) {
				Count.retrieveLoc(vm.countsData, i);
			}

			return true;
		}

		// Initializes google maps
		function initMap() {
			console.log(vm.newSearch);
			var mapCenter = new google.maps.LatLng(vm.newSearch.lat, vm.newSearch.lng);
			var mapOptions = {
				center: mapCenter,
				zoom: 13,
				draggable: true,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			vm.map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

			for (var data in vm.myData) {
				console.log(vm.myData[data].lat);
				var location = new google.maps.LatLng(vm.myData[data].lat, vm.myData[data].lng);

				addMarker(location);
			}
		}

		// Function to add a Google Maps marker, only gets called from within initMap
		function addMarker(location) {
			var marker = new google.maps.Marker({
				position: location,
				map: vm.map,
				title: "Crime Location",
				clickable: true
			});

			marker.info = new google.maps.InfoWindow({
				content: "<div>" + "Nothing Yet" + "</div>"
			});

			google.maps.event.addListener(marker, 'click', function() {
				marker.info.open(vm.map, marker);
			});

			vm.markers.push(marker);
		}
	

	}

} )(angular);