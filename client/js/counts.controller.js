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