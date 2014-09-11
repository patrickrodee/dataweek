angular.module('MyApp')
	.controller('ComplicatedVizCtrl', ['$scope', function($scope) {

		$scope.chart_json = complicated_chart_data;

		$scope.editable_json = JSON.stringify($scope.chart_json, null, '\t');

		$scope.$watch('editable_json', function() {
			try {
				$scope.json_to_render = JSON.parse($scope.editable_json);
				zingchart.exec('complicated_chart', 'setdata', $scope.json_to_render);
			}
			catch(exp) {

			};
		});

	}]);