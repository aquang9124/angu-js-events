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