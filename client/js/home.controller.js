( function(angular) {
	angular
		.module('myApp')
		.controller('homeCtrl', homeCtrl);

	function homeCtrl($interval, Search) {
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
			Search.find(vm.newSearch, function(data) {
				vm.crimeData = data;
			});
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
				console.log(vm.newSearch.lat);
				console.log(vm.newSearch.lng);
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