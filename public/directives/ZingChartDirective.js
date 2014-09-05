angular.module('MyApp')
	.directive('zingchart', function() {
		return {
			restrict: "A",
			scope: {
				options: '=zcData'
			},
			link: function($scope, $elem, attrs) {
				var options = $.extend( {id: attrs.id, defaultsurl: path_to_theme, width: "99%" }, $scope.options );
				zingchart.render( options );
			}
		}
	});

/*
angular.module('MyApp')
	.directive('modify', [function () {
		return {
			restrict: 'A',
			scope: {
				options: "=newData",
				target: "=targetChart"
			},
			link: function ($scope, $elem, attrs) {
				zingchart.exec( $scope.target, 'modify', $scope.options );
			}
		}
	}]);
*/