( function(angular) {
	angular
		.module('myApp')
		.controller('mapsCtrl', mapsCtrl);

	mapsCtrl.$inject = ['$location', 'locator'];

	function mapsCtrl($location, locator) {
		var vm = this;
		locator.currentUrl = $location.url();
	}
	
} )(angular)