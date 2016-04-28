( function (angular) {
	angular
		.module('myApp', ['ngRoute', 'ngSanitize'])
		.config(function($routeProvider) {
			$routeProvider
			.when('/', {
				templateUrl: 'partials/main.html',
				controller: 'homeCtrl',
				controllerAs: 'vm'
			})
			.when('/counts', {
				templateUrl: 'partials/counts.html',
				controller: 'countsCtrl',
				controllerAs: 'vm'
			})
			.when('/posts', {
				templateUrl: 'partials/map_alt.html',
				controller: 'postsCtrl',
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