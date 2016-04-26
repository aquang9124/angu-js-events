( function(angular) {
	angular
		.module('myApp')
		.directive('myMaps', myMaps);

	function myMaps() {
		var directive = {
			link: link,
			replace: true,
			templateUrl: '/js/templates/angu_maps.html',
			restrict: 'EA'
		};
		return directive;

		function link(scope, element, attrs) {
			var options = {
				enableHighAccuracy: true
			};

			var mapOptions = {
				center: new google.maps.LatLng(34.22, 100),
				zoom: 16,
				draggable: true,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			var map = new google.maps.Map(element[0], mapOptions);

			if (navigator.geolocation) 
			{
				navigator.geolocation.getCurrentPosition(function(pos)
				{
					var position = {
						lat: pos.coords.latitude,
						lng: pos.coords.longitude
					};

					map.setCenter(position);

					var marker = new google.maps.Marker({
						position: position,
						map: map,
						title: 'Hello World!'
					});
				}, 
				function(err) {
					alert('Unable to get location: ' + err.message);
				}, options);
			}
		}
	}
} )(angular);