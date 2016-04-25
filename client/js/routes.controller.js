( function(angular) {
	angular
		.module('myApp')
		.controller('routesCtrl', routesCtrl);

	function routesCtrl($location, locator) {
		var vm = this;
		vm.location = locator;

	}
} )(angular)