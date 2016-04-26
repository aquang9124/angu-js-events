( function(angular) {
	angular
		.module('myApp')
		.controller('homeCtrl', homeCtrl);

	function homeCtrl($interval) {
		var vm = this;

		// Bound variables
		vm.header = [{ message: 'Crime Map' }, { message: 'With Google Maps' }];
		vm.words = ["Hello!    ", "Fill out the form below to get crime information!    "];
		vm.wordCount = 0;
		vm.charCount = 0;
		vm.instructions = "";
		vm.cIndex = 0;
		vm.placeSearch;
		vm.autocomplete;
		vm.newSearch = {};
		vm.componentForm = {
			street_number: 'short_name',
			route: 'long_name',
			locality: 'long_name',
			administrative_area_level_1: 'short_name',
			country: 'long_name',
			postal_code: 'short_name'
		};
		vm.switchHeaders = switchHeaders;
		vm.startSearch = startSearch;
		vm.typeText = typeText;
		vm.initAutocomplete = initAutocomplete;

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
			console.log(vm.newSearch);
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
			vm.autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')), {types: ['geocode']});
		}

		// Function calls
		$interval(vm.typeText, 130);
	}
} )(angular);