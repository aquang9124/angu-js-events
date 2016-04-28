( function (angular) {
	angular
		.module('myApp', ['ngRoute', 'ngSanitize'])
		.config(function($routeProvider) {
			$routeProvider
			.when('/', {
				templateUrl: 'partials/home_alt.html',
				controller: 'homeCtrl',
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