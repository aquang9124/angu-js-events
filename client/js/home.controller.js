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
		vm.switchHeaders = switchHeaders;
		vm.startSearch = startSearch;
		vm.typeText = typeText;
		vm.initAutocomplete = initAutocomplete;
		vm.geoLocate = geoLocate;

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
			// vm.autocomplete.addListener('place_changed', fillInAddress);
			// Let's not do this for now.
		}

		// Bias the autocomplete object to the user's geographical location,
      	// as supplied by the browser's 'navigator.geolocation' object.
		function geoLocate() {
			initAutocomplete();
			if (navigator.geolocation)
			{
				navigator.geolocation.getCurrentPosition(function(position) {
					var geolocation = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					};
					var circle = new google.maps.Circle({
						center: geolocation,
						radius: position.coords.accuracy
					});
					vm.autocomplete.setBounds(circle.getBounds());
				});
			}
		}

		// Function calls
		$interval(vm.typeText, 130);
	}
} )(angular);