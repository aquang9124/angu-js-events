( function(angular) {
	angular
		.module('myApp')
		.directive('loading', loading);

	function loading($http) {
		return {
			restrict: 'A',
			link: function(scope, elem, attrs) {
				scope.isLoading = function() {
					return $http.pendingRequests.length > 0;
				};

				scope.$watch(scope.isLoading, function(v) {
					if (v)
					{
						elem.show();
					}
					else
					{
						elem.hide();
					}
				});
			}
		};
	}

} )(angular);