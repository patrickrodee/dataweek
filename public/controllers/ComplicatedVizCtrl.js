angular.module('MyApp')
.controller('ComplicatedVizCtrl', ['$scope', function($scope) {

		$scope.chart_json = complicated_chart_data;

		$scope.editable_json = JSON.stringify($scope.chart_json, null, '\t').replace(/(\u005B)\s*(\d)/g, '$1$2').replace(/(\d\u002C?)[\s*|\n]+/g, '$1');

		$scope.aceLoaded = function(_editor) {
			_editor.setOptions({
					enableBasicAutocompletion: true,
					enableSnippets: true,
					enableLiveAutocompletion: true
			});
			_editor.setFontSize(16);
		};
		
		$scope.$watch('editable_json', function() {
			try {
				$scope.json_to_render = JSON.parse($scope.editable_json);
				zingchart.exec('complicated_chart', 'setdata', $scope.json_to_render);
			}
			catch(exp) {

			};
		});

}]);
