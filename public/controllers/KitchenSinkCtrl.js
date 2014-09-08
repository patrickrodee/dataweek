angular.module('MyApp')
	.controller('KitchenSinkCtrl', ['$scope', function ($scope) {

		//////////////////////////////////
		// Chart Objects /////////////////
		//////////////////////////////////

		$scope.line_data = line_data_chart;
		$scope.bar_data = bar_data_chart;
		$scope.area_data = area_data_chart;
		$scope.pie_data = pie_data_chart;
		$scope.scatter_data = scatter_data_chart;
		$scope.radar_data = radar_data_chart;
		$scope.stock_data = stock_data_chart;
		$scope.bubble_data = bubble_data_chart;
		$scope.piano_data = piano_data_chart;
	}]);