( function(angular) {
	angular
		.module('myApp')
		.controller('mapsCtrl', mapsCtrl);

	function mapsCtrl($scope, Search) {
		var vm = this;

		// Bound variables
		vm.newSearch = Search.newSearch;
		vm.crimeData = [];
		vm.findCrimes = findCrimes;
		// Function calls and other stuff
		function findCrimes() {
			Search.find(vm.newSearch, function(data) {
				vm.crimeData = data.body;
				console.log(data.body);
			});
		}
		// Function implementations
		vm.findCrimes();
	}

} )(angular);