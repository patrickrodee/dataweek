angular.module('MyApp')
	.directive('zingchart', function() {
		return {
			restrict: "A",
			scope: {
				options: '=zcData'
			},
			link: function($scope, $elem, attrs) {
				var options = $.extend( {id: attrs.id, defaultsurl: default_theme }, $scope.options );
				zingchart.render( options );
			}
		}
	});