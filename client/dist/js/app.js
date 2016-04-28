( function (angular) {
	angular
		.module('myApp', ['ngRoute', 'ngSanitize'])
		.config(function($routeProvider) {
			$routeProvider
			.when('/', {
				templateUrl: 'partials/home.html',
				controller: 'homeCtrl',
				controllerAs: 'vm'
			})
			.when('/maps', {
				templateUrl: 'partials/maps.html',
				controller: 'mapsCtrl',
				controllerAs: 'vm'
			})
			.otherwise({
				redirectTo: '/'
			});
		});

} )(angular);
( function(angular) {
	angular
		.module('myApp')
		.controller('accountsCtrl', accountsCtrl);

	function accountsCtrl() {
		var vm = this;
	}

} )(angular);
( function(angular) {
	angular
		.module('myApp')
		.controller('homeCtrl', homeCtrl);

	function homeCtrl($scope, $interval, $location, Search) {
		var vm = this;

		// Bound variables
		vm.header = [{ message: 'Crime Map' }, { message: 'With Google Maps' }];
		vm.words = ["Hello!    ", "Fill out the form below to get crime information!    "];
		vm.wordCount = 0;
		vm.charCount = 0;
		vm.instructions = "";
		vm.cIndex = 0;
		vm.crimeData = [];
		vm.place;
		vm.autocomplete;
		vm.newSearch = {
			radius: 3,
		};
		vm.switchHeaders = switchHeaders;
		vm.startSearch = startSearch;
		vm.typeText = typeText;
		vm.initAutocomplete = initAutocomplete;
		vm.getAddress = getAddress;

		// Watches
		$scope.$watch('vm.newSearch', function() {
			Search.newSearch = vm.newSearch;
		});

		// Function implementations
		function switchHeaders() {
			if (vm.cIndex === 0)
			{
				vm.cIndex = 1;
			}
			else
			{
				vm.cIndex = 0;
			}
		}

		function startSearch() {
			$location.path('/maps');
		}

		function typeText() {
			vm.instructions = vm.instructions + vm.words[vm.wordCount][vm.charCount++];

			if (vm.charCount > vm.words[vm.wordCount].length)
			{
				vm.wordCount++;
				vm.charCount = 0;
				vm.instructions = "";

				if (vm.wordCount == vm.words.length)
				{
					vm.wordCount = 0;
				}
			}
		}

		function initAutocomplete() {
			// Create the autocomplete object, restricting the search to geographical location types.
			vm.autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')), {types: ['geocode']});

			// When place is selected, call vm.getAddress.
			vm.autocomplete.addListener('place_changed', vm.getAddress);

		}

		function getAddress() {
			// Use getPlace method to grab data about that location
			vm.place = vm.autocomplete.getPlace();

			// If vm.place has geometry data then set lat and lng in the newSearch object.
			if (vm.place.geometry)
			{
				vm.newSearch.lat = vm.place.geometry.location.lat();
				vm.newSearch.lng = vm.place.geometry.location.lng();
			}
			else
			{
				// Otherwise we console log that no geo data was found.
				console.log('No geometry data found');
			}
		}

		// Function calls
		$interval(vm.typeText, 130);
	}
} )(angular);
( function(angular) {
	angular
		.module('myApp')
		.directive('loading', loading);

	function loading($http) {
		return {
			restrict: 'A',
			link: function(scope, elem, attrs) {
				scope.isLoading = function() {
					return $http.pendingRequests.length > 0;
				};

				scope.$watch(scope.isLoading, function(v) {
					if (v)
					{
						elem.show();
					}
					else
					{
						elem.hide();
					}
				});
			}
		};
	}

} )(angular);
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
		vm.getTaps = getTaps;
		vm.initMap = initMap;

		// Function calls
		angular.element(document).ready(function() {
			vm.getTaps();
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
			Search.retrieve();
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
( function(angular) {
	angular
		.module('myApp')
		.directive('myMaps', myMaps);

	function myMaps() {
		var directive = {
			link: link,
			replace: true,
			templateUrl: '/js/templates/angu_maps.html',
			restrict: 'EA'
		};
		return directive;

		function link(scope, element, attrs) {
			var options = {
				enableHighAccuracy: true
			};

			var mapOptions = {
				center: new google.maps.LatLng(34.22, 100),
				zoom: 14,
				draggable: true,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			var map = new google.maps.Map(element[0], mapOptions);

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
	}
} )(angular);
( function(angular) {
	angular
		.module('myApp')
		.controller('routesCtrl', routesCtrl);

	function routesCtrl($location) {
		var vm = this;

		// Bound variables
		vm.isActive = isActive;

		// Function implementations
		function isActive(currentUrl) {
			return currentUrl === $location.url();
		};
	}

} )(angular);
( function(angular) {
	angular
		.module('myApp')
		.factory('Search', Search);

	function Search($http) {
		var crimeData = [];
		var newSearch = {};
		var factory = {
			newSearch: newSearch,
			crimeData: crimeData,
			find: find,
			retrieve: retrieve,
		};
		return factory;

		function find(newSearch) {
			return $http.post('/crimes', { end: newSearch.end, lat: newSearch.lat, lng: newSearch.lng, start: newSearch.start })
				.then(function(res) {
					crimeData = res.data;
					return res.data;
				}, 
				function(res) {
					console.log(res);
				});
		}

		function retrieve() {
			return $http.get('/tapdata')
				.then(function(res) {
					return res;
				},
				function(res) {
					console.log(res);
				});
		}
	}

} )(angular);