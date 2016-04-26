( function(angular) {
	angular
		.module('myApp')
		.controller('homeCtrl', homeCtrl);

	function homeCtrl() {
		var vm = this;

		// Bound variables
		vm.header = [{ message: 'Crime Data' }, { message: 'With Google Maps' }];
		vm.cIndex = 0;
		vm.newSearch = {};
		vm.switchHeaders = switchHeaders;
		vm.startSearch = startSearch;

		// Function implementations
		function switchHeaders(current) {
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
	}
} )(angular);