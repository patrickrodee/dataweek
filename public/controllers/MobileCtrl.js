angular.module('MyApp')
	.controller('MobileCtrl', ['$scope', function($scope) {
		// $scope.screen_image = "../images/Autodesk.png";

		$scope.iphone_data = iphone_data_chart;
		$scope.ipad_data = ipad_data_chart;

		$scope.mobile_greeting = 'Anytime. Anywhere.';

		// Initial Value
		$scope.is_mobile = false;

		// Get width of window
		$scope.current_width = $(window).width();

		if ($scope.current_width < 641) {
			$scope.is_mobile = true;
			$scope.mobile_greeting = 'Yes. Obviously.';
		}

	}]);