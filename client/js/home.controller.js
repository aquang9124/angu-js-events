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
		vm.place;
		vm.autocomplete;
		vm.newSearch = {};
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
			// Create the autocomplete object, restricting the search to geographical location types.
			vm.autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')), {types: ['geocode']});

			// When the user selects an address from the dropdown, populate the address
			// fields in the form
			vm.autocomplete.addListener('place_changed', vm.getAddress);

		}

		function getAddress() {
			vm.place = vm.autocomplete.getPlace();
		}

		// Function calls
		$interval(vm.typeText, 130);
	}
} )(angular);