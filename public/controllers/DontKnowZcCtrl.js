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
		{name: "1k", 	value: oneK},
		{name: "10k", 	value: tenK},
		{name: "50k", 	value: fiftyK},
		{name: "100k", 	value: onehundredK},
		{name: "200k", 	value: twohundredK},
		{name: "400k", 	value: fourhundredK}
		]

		$scope.selected_size = {name: "Choose a data size"};

		// SPEED RESULTS
		
		$scope.vs_speed_results = "";

		// CHECK THAT ALL CHOICES HAVE BEEN FILLED AND READY TO RUN

		$scope.not_ready = true;

		$scope.check_status = function() {
			if ($scope.selected_provider.name !== "Choose a library" && $scope.selected_chart.name !== "Choose a chart type" && $scope.selected_size.name !== "Choose a data size") {
				$scope.not_ready = false;
			}
			else {
				$scope.not_ready = true;
			}
		};

		// SPECIFIC RENDER FUNCTIONS

		function fusioncharts_render (type, values) {
			// FusionCharts Line Chart
			if (type == 'Line Chart') {
				FusionCharts.ready(function() {
					var chartdata = {
						type: 'line',
						renderAt: 'resulting-chart',
						width: '100%',
						height: '100%',
						dataFormat: 'json',
						dataSource: {
							chart: {
								drawAnchors: 0, 
								animation: 0,
								showshadow: 0,
								linethickness: 1,
								showvalues: 0,
								xAxisName: '',
								yAxisName: '',
								theme: 'fint'
							},
							data: values
						}
					}
					var chart = new FusionCharts(chartdata);
					var time_before = new Date().getTime();
					chart.render();
					var time_after = new Date().getTime();
				});
			}
			// FusionCharts Area Chart
			else if (type == 'Area Chart') {
				FusionCharts.ready(function() {
					var chartdata = {
						type: 'area2d',
						renderAt: 'resulting-chart',
						width: '100%',
						height: '100%',
						dataFormat: 'json',
						dataSource: {
							chart: {
								drawAnchors: 0, 
								animation: 0,
								showshadow: 0,
								linethickness: 1,
								showvalues: 0,
								xAxisName: '',
								yAxisName: '',
								theme: 'fint'
							},
							data: values
						}
					}
					var chart = new FusionCharts(chartdata);
					var time_before = new Date().getTime();
					chart.render();
					var time_after = new Date().getTime();
				});
			}
			// FusionCharts Bar Chart
			else if (type == 'Bar Chart') {
				FusionCharts.ready(function() {
					var chartdata = {
						type: 'column2d',
						renderAt: 'resulting-chart',
						width: '100%',
						height: '100%',
						dataFormat: 'json',
						dataSource: {
							chart: {
								drawAnchors: 0, 
								animation: 0,
								showshadow: 0,
								linethickness: 1,
								showvalues: 0,
								xAxisName: '',
								yAxisName: '',
								theme: 'fint'
							},
							data: values
						}
					}
					var chart = new FusionCharts(chartdata);
					var time_before = new Date().getTime();
					chart.render();
					var time_after = new Date().getTime();
				});
			}
			var time_elapsed = (time_after - time_before)/1000;
			time_elapsed = time_elapsed.toString();
			return "FusionCharts rendered a " + values.length + " point " + type.toLowerCase() + " in " + typetime_elapsed + "s";
		};

		function c3js_render (type, values) {
			if (type == 'Line Chart') {
				var chartdata = {
					bindto: '#resulting-chart',
					data: {
						columns: values;
					},
					type: {
						'line'
					}
					point: {
						show: false
					},
					legend: {
						show: false
					},
					axis: {
						x: {
							tick: {
								count: 11
							}
						}
					}
				};
				var time_before = new Date().getTime();
				c3.generate(chartdata);
				var time_after = new Date().getTime();
			}
			else if (type == 'Area Chart') {
				var chartdata = {
					bindto: '#resulting-chart',
					data: {
						columns: values;
					},
					type: {
						'area'
					}
					point: {
						show: false
					},
					legend: {
						show: false
					},
					axis: {
						x: {
							tick: {
								count: 11
							}
						}
					}
				};
				var time_before = new Date().getTime();
				c3.generate(chartdata);
				var time_after = new Date().getTime();
			}
			else if (type == 'Bar Chart') {
				var chartdata = {
					bindto: '#resulting-chart',
					data: {
						columns: values;
					},
					type: {
						'bar'
					}
					point: {
						show: false
					},
					legend: {
						show: false
					},
					axis: {
						x: {
							tick: {
								count: 11
							}
						}
					}
				};
				var time_before = new Date().getTime();
				c3.generate(chartdata);
				var time_after = new Date().getTime();
			}
			var time_elapsed = (time_after - time_before)/1000;
			time_elapsed = time_elapsed.toString();
			return "C3JS rendered a " + values.length + " point " + type.toLowerCase() + " in " + typetime_elapsed + "s";
		};

		function amcharts_render (type, values) {
			var time_before = new Date().getTime();
			// RENDERER GOES HERE
			var time_after = new Date().getTime();
			var time_elapsed = (time_after - time_before)/1000;
			time_elapsed = time_elapsed.toString();
			return "AmCharts rendered a " + values.length + " point " + type.toLowerCase() + " in " + typetime_elapsed + "s";
		};

		function zingchart_render (type, values) {
			var time_before = new Date().getTime();
			// RENDERER GOES HERE
			var time_after = new Date().getTime();
			var time_elapsed = (time_after - time_before)/1000;
			time_elapsed = time_elapsed.toString();
			return "ZingChart rendered a " + values.length + " point " + type.toLowerCase() + " in " + typetime_elapsed + "s";
		};

		// GO SPEEDTEST GO

		$scope.GO_SPEEDTEST_GO = function(provider, type, size) {
			if (provider == 'ZingChart') {
				$scope.vs_speed_results = zingchart_render(type, size);
			}
			else if (provider == "C3JS") {
				$scope.vs_speed_results = c3js_render(type, size);
			}
			else if (provider == "AmCharts") {
				$scope.vs_speed_results = amcharts_render(type, size);
			}
			else if (provider == "FusionCharts") {
				$scope.vs_speed_results = fusioncharts_render(type, size);
			}
		};

	}])