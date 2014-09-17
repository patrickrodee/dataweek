angular.module('MyApp')
	.controller('WeUseCtrl', ['$scope', function ($scope) {
		
		$scope.current_width = $(window).width();

		$scope.less_than_1240 = false;

		// Using 1373 because the header is bigger than the screen
		// and that's where the width value is coming from
		if ($scope.current_width < 1373) {
			$scope.less_than_1240 = true;
		}

	}])