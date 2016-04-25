( function(angular) {
	angular
		.module('myApp')
		.controller('accountsCtrl', accountsCtrl);

	function accountsCtrl($location, locator) {
		var vm = this;

		locator.currentUrl = $location.url();
	}
} )(angular)