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
			.otherwise({
				redirectTo: '/'
			});
		})
		.controller('accountsCtrl', accountsCtrl);

	function accountsCtrl() {
		
	}

} )(angular);