angular.module('MyApp')
	.directive('zingchart', function() {
		return {
			restrict: "A",
			scope: {
				options: '=zcData',
				output_type: '=?zcOutput'
			},
			link: function($scope, $elem, attrs) {
				var options = $.extend( {id: attrs.id, defaultsurl: default_theme }, $scope.output_type, $scope.options );
				zingchart.render( options );
			}
		}
	});