( function (angular) {
	angular
		.module('myApp', ['ngRoute', 'ngSanitize', 'highcharts-ng'])
		.config(function($routeProvider) {
			$routeProvider
			.when('/', {
				templateUrl: 'partials/main.html',
				controller: 'homeCtrl',
				controllerAs: 'vm'
			})
			.when('/counts', {
				templateUrl: 'partials/counts.html',
				controller: 'countsCtrl',
				controllerAs: 'vm'
			})
			.when('/posts', {
				templateUrl: 'partials/map_alt.html',
				controller: 'postsCtrl',
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
		.factory('Category', Category);

	function Category($http) {

	    var postings = [];

		var factory = {
			retrieve: retrieve,
			postings: postings,
		};

		return factory;

		// Function Implementations
		function retrieve(newSearch) {
			return $http.post('/tapdata', { category: newSearch.category, radius: newSearch.radius, lat: newSearch.lat, long: newSearch.lng })
				.then(function(result) {
					postings = JSON.parse(result.data);
					return JSON.parse(result.data);
				},
				function(err) {
					console.log(err);
				});
		}
	}

} )(angular);
( function(angular) {
	angular
		.module('myApp')
		.controller('countsCtrl', countsCtrl);

	function countsCtrl($scope, Search, Count) {
		var vm = this;

		// Bound variables
		vm.map;
		vm.myData;
		vm.chartConfig = {};
		vm.markers = [];
		vm.newSearch = Search.newSearch;
		vm.newAddress = Search.newAddress;
		vm.countsData = [];
		vm.countWhites = 0;
		vm.countAsians = 0;
		vm.countLatinos = 0;
		vm.countBlacks = 0;
		vm.countUnknown = 0;
		vm.knife = 0;
		vm.none = 0;
		vm.gun = 0;
		vm.car = 0;
		vm.bbgun = 0;
		vm.mystery = 0;
		vm.locale;
		vm.getCount = getCount;
		vm.makeValid = makeValid;
		vm.findLatLng = findLatLng;
		vm.initMap = initMap;
		vm.getData = getData;
		vm.convertData = convertData;

		// Function Calls
		angular.element(document).ready(function() {
			vm.getData();
			// vm.getCount();
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
					vm.findLatLng();
					var promise = new Promise(function(resolve, reject) {
						vm.myData = Count.grab();

						if (vm.myData) 
						{
							resolve(vm.myData);
						}
						else
						{
							reject(Error("It Broke"));
						}
					});
					promise
						.then(function(result) {
							console.log(result);
							// Map initialization is broken for now
							vm.initMap(result);
							vm.loading = false;
						});
				});
		}

		function getData() {
			vm.loading = true;
			var dataPromise = Count.find(vm.newAddress);

			dataPromise.then(function(result) {
				vm.countsData = result;
				vm.convertData();
				vm.loading = false;

				//This is not a highcharts object. It just looks a little like one!
				vm.chartConfig = {

				options: {
					//This is the Main Highcharts chart config. Any Highchart options are valid here.
					//will be overriden by values specified below.
					chart: {
						type: 'pie'
					},
					plotOptions: {
						pie: {
							allowPointSelect: true,
							cursor: 'pointer',
							showInLegend: true
						},
					},
					tooltip: {
						style: {
							padding: 10,
							fontWeight: 'bold'
						}
					}
				},
				//The below properties are watched separately for changes.

				//Series object (optional) - a list of series using normal Highcharts series options.
				series: [{
					name: 'Armed With',
					colorByPoint: true,
					data: [{
						name: 'Unarmed',
						y: vm.none,
						color: '#006600'
					}, {
						name: 'Firearm',
						y: vm.gun,
						color: '#ffff00'
					}, {
						name: 'Non-lethal Firearm',
						y: vm.bbgun,
						color: '#ff3300'
					}, {
						name: 'Vehicle',
						y: vm.car,
						color: '#8000ff'
					}, {
						name: 'Knife',
						y: vm.knife,
						color: '#ffccff'
					}, {
						name: 'Mystery',
						y: vm.mystery,
						color: '#009999'
					}]
				},	
				{ 
					name: 'Ethnicity',
					colorByPoint: true,
					data: [{
						name: 'Hispanic/Latino',
						y: vm.countLatinos
					}, {
						name: 'Black',
						y: vm.countBlacks
					}, {
						name: 'Asian/Pacific Islander',
						y: vm.countAsians
					}, {
						name: 'White',
						y: vm.countWhites
					}, {
						name: 'Unknown',
						y: vm.countUnknown
					}] 
				}],
				//Title configuration (optional)
				title: {
					text: 'Graphs'
				},
				//Boolean to control showing loading status on chart (optional)
				//Could be a string if you want to show specific loading text.
				loading: false,
				//Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
				//properties currentMin and currentMax provided 2-way binding to the chart's maximum and minimum
				xAxis: {
					currentMin: 0,
					currentMax: 20,
					title: {text: 'values'}
				},
				//Whether to use Highstocks instead of Highcharts (optional). Defaults to false.
				useHighStocks: false,
				//size (optional) if left out the chart will default to size of the div or something sensible.
				//function (optional)
			};
			});
		}

		// Function to convert the JSON data into numbers for use with pie chart
		function convertData() {
			for (var data in vm.countsData) {
				if (vm.countsData[data].race === "White")
				{
					vm.countWhites += 1;
				}
				else if (vm.countsData[data].race === "Hispanic/Latino")
				{
					vm.countLatinos += 1;
				}
				else if (vm.countsData[data].race === "Black")
				{
					vm.countBlacks += 1;
				}
				else if (vm.countsData[data].race === "Asian/Pacific Islander")
				{
					vm.countAsians += 1;
				}
				else
				{
					vm.countUnknown += 1;
				}
			}

			for (var data in vm.countsData) {
				if (vm.countsData[data].armed === "No")
				{
					vm.none += 1;
				}
				else if (vm.countsData[data].armed === "Knife")
				{
					vm.knife += 1;
				}
				else if (vm.countsData[data].armed === "Firearm")
				{
					vm.gun += 1;
				}
				else if (vm.countsData[data].armed === "Non-lethal firearm")
				{
					vm.bbgun += 1;
				}
				else if (vm.countsData[data].armed === "Vehicle")
				{
					vm.car += 1;
				}
				else
				{
					vm.mystery += 1;
				}
			}

			return true;
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
		function initMap(locData) {
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
				console.log(vm.myData[data].latitude);
				console.log(vm.myData[data]);
				console.log(vm.myData[data].age);
				var location = new google.maps.LatLng(vm.myData[data].latitude, vm.myData[data].long);

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
( function(angular) {
	angular
		.module('myApp')
		.controller('homeCtrl', homeCtrl);

	function homeCtrl($scope, $interval, $location, Search, Category) {
		var vm = this;

		// Bound variables
		vm.header = 'Crime Map';
		vm.words = ["Hello!    ", "Fill out the form below to get information!    "];
		vm.wordCount = 0;
		vm.charCount = 0;
		vm.instructions = "";
		vm.cIndex = 0;
		vm.crimeData = [];
		vm.place;
		vm.placeSearch;
		vm.autocomplete;
		vm.newSearch = {
			radius: 3,
		};
		vm.componentForm = {
			street_number: 'short_name',
			route: 'long_name',
			locality: 'long_name',
  			administrative_area_level_1: 'short_name'
		};
		vm.newAddress = {};
		vm.categories = Category.categories;
		vm.switchHeaders = switchHeaders;
		vm.startSearch = startSearch;
		vm.typeText = typeText;
		vm.initAutocomplete = initAutocomplete;
		vm.initAutoComp = initAutoComp;
		vm.getAddress = getAddress;
		vm.mapCrimes = mapCrimes;

		// Watches
		$scope.$watch('vm.newSearch', function() {
			Search.newSearch = vm.newSearch;
		});

		$scope.$watch('vm.newAddress', function() {
			Search.newAddress = vm.newAddress;
		});

		// Function implementations

		// Function to switch headers on main page
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

		// Function that changes the view over to the posts partial
		function startSearch() {
			// 
			// $location.path('/posts');
			$location.path('/counts');
		}

		function mapCrimes() {
			$location.path('/maps');
		}

		// Function that types out the text in the directions div
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

		// This function initializes the autocomp and adds a listener for place_changed
		function initAutocomplete() {
			// Create the autocomplete object, restricting the search to geographical location types.
			vm.autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')), {types: ['geocode']});

			// When place is selected, call vm.getAddress.
			vm.autocomplete.addListener('place_changed', vm.getAddress);

		}

		// Function that gets the lat and lng from the address input
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

		// This function initializes the autocomp and adds a listener for place_changed
		function initAutoComp() {
			vm.autocomplete = new google.maps.places.Autocomplete(
				(document.getElementById('autocomplete')),
      			{types: ['geocode']});

			vm.autocomplete.addListener('place_changed', splitAddress);
		}

		// This function executes whenever the place_changed event fires
		function splitAddress() {
			vm.place = vm.autocomplete.getPlace();

			// If vm.place has geometry data then set lat and lng in the newSearch object.
			if (vm.place.geometry)
			{
				vm.newSearch.lat = vm.place.geometry.location.lat();
				vm.newSearch.lng = vm.place.geometry.location.lng();
			}
			
			for (var i = 0; i < vm.place.address_components.length; i++) {
				var addressType = vm.place.address_components[i].types[0];

				if (vm.componentForm[addressType]) {
					var val = vm.place.address_components[i][vm.componentForm[addressType]];
					vm.newAddress[addressType] = val;
				}
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
		.controller('postsCtrl', postsCtrl);

	function postsCtrl($scope, Search, Category) {
		var vm = this;

		// Bound variables
		vm.taps = [];
		vm.newSearch = Search.newSearch;
		vm.getTaps = getTaps;

		// Function calls
		angular.element(document).ready(function() {
			vm.getTaps();
			// vm.findCrimes();
		});

		// Function implementations

		// Function to get data from 3taps API
		function getTaps() {
			vm.newSearch.radius = vm.newSearch.radius + 'mi';
			var tapsPromise = Category.retrieve(vm.newSearch);
			
			tapsPromise.then(function(result) {
				console.log(result.postings);
				vm.taps = result.postings;
			});
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
		var newAddress = {};
		var factory = {
			newSearch: newSearch,
			newAddress: newAddress,
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