( function(angular) {
	angular
		.module('myApp')
		.controller('mapsCtrl', mapsCtrl);

	function mapsCtrl($scope, Search, Category) {
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

	}

} )(angular);