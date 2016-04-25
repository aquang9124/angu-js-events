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