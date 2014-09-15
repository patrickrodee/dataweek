angular.module('MyApp')
	.controller('NavCtrl', ['$scope', '$aside', function ($scope, $aside) {
		
		// CHECK WIDTH OF SCREEN
		$scope.current_width = screen.width;

		$scope.not_presentation = true;

		if ($scope.current_width >= 2560) {
			$scope.not_presentation = false;
		}

	}])