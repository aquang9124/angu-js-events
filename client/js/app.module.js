( function (angular) {
	angular
		.module('myApp', ['ngRoute', 'ngSanitize'])
		.config(function($routeProvider) {
			$routeProvider
			.when('/', {
				templateUrl: 'partials/lognreg.html',
				controller: 'accountsCtrl',
				controllerAs: 'vm'
			})
			.when('/maps', {
				templateUrl: 'partials/maps.html',
				controller: 'mapsCtrl',
				controllerAs: 'vm'
			})
			.otherwise({
				redirectTo: '/'
			});
		});

} )(angular);