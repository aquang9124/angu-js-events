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