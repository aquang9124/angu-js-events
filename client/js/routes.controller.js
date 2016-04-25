( function(angular) {
	angular
		.module('myApp')
		.controller('routesCtrl', routesCtrl);

	function routesCtrl($location) {
		var vm = this;

		vm.isActive = function(currentUrl) {
			return currentUrl === $location.url();
		};
	}

} )(angular)