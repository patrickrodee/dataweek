angular.module('MyApp')
	.directive('zingchart', function() {
		return {
			restrict: "A",
			scope: {
				options: '=zcData'
			},
			link: function($scope, $elem, attrs) {
				var options = $.extend( {id: attrs.id, defaultsurl: path_to_theme }, $scope.options );
				zingchart.render( options );
			}
		}
	});