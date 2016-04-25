// This factory is currently unnecessary but could be repurposed later
( function(angular) {
	angular
		.module('myApp')
		.factory('locator', locator);

	function locator($location) {
		var factory = {
			currentUrl: $location.url(),
		};

		return factory;
	}

} )(angular)