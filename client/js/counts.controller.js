( function(angular) {
	angular
		.module('myApp')
		.controller('countsCtrl', countsCtrl);

	function countsCtrl($scope, Search, Count) {
		var vm = this;

		// Bound variables
		vm.newAddress = Search.newAddress;
		vm.getCount = getCount;

		// Function Calls
		angular.element(document).ready(function() {
			vm.getCount();
		});

		// Function implementations
		function getCount() {
			vm.loading = true;
			var countsPromise = Count.find(vm.newAddress);
		}

	}

} )(angular);