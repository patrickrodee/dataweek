angular.module('MyApp')
	.controller('DontKnowZcCtrl', ['$scope', function ($scope) {

		// PROVIDER DROPDOWN

		$scope.provider_options = [
		{name: "ZingChart"},
		{name: "C3JS"},
		{name: "AmCharts"},
		{name: "FusionCharts"}
		]

		$scope.selected_provider = {name: "Choose a library"};

		// CHART DROPDOWN
		
		$scope.chart_options = [
		{name: "Line Chart"},
		{name: "Area Chart"},
		{name: "Bar Chart"}
		]

		$scope.selected_chart = {name: "Choose a chart type"};

		// SIZE DROPDOWN
		
		$scope.size_options = [
		{name: "1k", 	value: 1},
		{name: "10k", 	value: 10},
		{name: "50k", 	value: 50},
		{name: "100k", 	value: 100},
		{name: "200k", 	value: 200},
		{name: "400k", 	value: 400}
		]

		$scope.selected_size = {name: "Choose a data size"};

		$scope.not_ready = true;

		$scope.check_status = function() {
			if ($scope.selected_provider.name !== "Choose a library" && $scope.selected_chart.name !== "Choose a chart type" && $scope.selected_size.name !== "Choose a data size") {
				$scope.not_ready = false;
			}
			else {
				$scope.not_ready = true;
			}
		};

		function zingchart_render (values) {
			return true;
		};

		function c3js_render (values) {
			return true;
		};

		function amcharts_render (values) {
			return true;
		};

		function fusioncharts_render (values) {
			return true;
		};

		$scope.GO_SPEEDTEST_GO = function() {
			if ($scope.selected_provider == 'ZingChart') {

			}
		}

	}])