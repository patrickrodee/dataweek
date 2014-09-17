angular.module('MyApp')
	.controller('MobileCtrl', ['$scope', function($scope) {
		// $scope.screen_image = "../images/Autodesk.png";

		$scope.iphone_data = iphone_data_chart;
		$scope.ipad_data = ipad_data_chart;

	}]);