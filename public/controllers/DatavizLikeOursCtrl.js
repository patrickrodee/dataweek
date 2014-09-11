angular.module('MyApp')
	.controller('DatavizLikeOursCtrl', ['$scope', function($scope) {
		$scope.screen_image = "../images/Autodesk.png";

		$scope.new_screen = function(type) {
			if (type == 'autodesk') {
				$scope.screen_image = '../images/Autodesk.png';
			}
			else if (type == 'tesla') {
				$scope.screen_image = '../images/Tesla.png';
			}
			else if (type == 'paypal') {
				$scope.screen_image = '../images/Paypal.png';
			}
			else if (type == 'nike') {
				$scope.screen_image = '../images/Nike.png';
			}
		};
	}]);