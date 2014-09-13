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
		
		$scope.vs_speed_results = "Compare ZingChart's speed versus other viz libraries";

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
		
		$scope.displayResults = function(result) {
			$scope.vs_speed_results = result;
		};

		// Renderer is defined instead of being passed anonymously to avoid issues with private variables
		$scope.fusion_render = function (chart_type, values) {
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
					data: []
				}
			};

			switch(chart_type) {
				case 'Line Chart':
					chartdata.type = 'line';
					break;
				case 'Area Chart':
					chartdata.type = 'area2d';
					break;
				case 'Bar Chart':
					chartdata.type = 'column2d';
					break
			}

			for (var i=0;i<values.length;i++) {
				chartdata.dataSource.data.push({label:i, value: values[i]});
			}
			var chart = new FusionCharts(chartdata);
			var time_before = new Date().getTime();
			chart.render();
			var time_after = new Date().getTime();
			var time_elapsed = (time_after - time_before)/1000;
			time_elapsed = time_elapsed.toString();
			var size = values.length - 1;
			size = size.toString();
			var type = chart_type.toLowerCase();
			// console.log(size);
			// console.log(type);
			// console.log(time_elapsed);
			output = "FusionCharts rendered a " + size + " point " + type + " in " + time_elapsed + "s";
			$scope.displayResults(output);
		};

		$scope.fusion = function(chart_type, values) {
			// FusionCharts Line Chart
			var type = chart_type;
			var vals = values;
			FusionCharts.ready($scope.fusion_render(type, vals));
		};


		$scope.c3js = function (type, values) {
			var chartdata = {
				bindto: '#resulting-chart',
				data: {
					columns: [values],
					type: 'line'
				},
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
			switch(type) {
				case 'Line Chart':
					chartdata['data']['type'] = 'line';
					break;
				case 'Bar Chart':
					chartdata['data']['type'] = 'bar';
					break;
				case 'Area Chart':
					chartdata['data']['type'] = 'area';
					break;
			}
			var time_before = new Date().getTime();
			c3.generate(chartdata);
			var time_after = new Date().getTime();
			var time_elapsed = (time_after - time_before)/1000;
			time_elapsed = time_elapsed.toString();
			return "C3JS rendered a " + (values.length - 1) + " point " + type.toLowerCase() + " in " + time_elapsed + "s";

		};

		$scope.amIsDone = function() {
			$scope.am_time_after = new Date().getTime();
		}

		$scope.am_time_after;

		$scope.amcharts_render = function(type, values) {
			var chartdata = [];
			for (var i=0;i<values.length;i++) {
					chartdata.push({idx:i, value: values[i]});
			}
			// Initial time
			var time_before = new Date().getTime();
			var chart = new AmCharts.AmSerialChart();
			chart.dataProvider = chartdata;
			chart.categoryField = 'idx';
			chart.addListener('init', function() {
				$scope.amIsDone();
			});

			chart.autoMargins = false;
			chart.marginRight = 0;
			chart.marginLeft = 0;
			chart.marginBottom = 0;
			chart.marginTop = 0;

			var categoryAxis = chart.categoryAxis;
			categoryAxis.inside = true;
			categoryAxis.gridAlpha = 0;
			categoryAxis.tickLength = 0;
			categoryAxis.axisAlpha = 0;

			var valueAxis = new AmCharts.ValueAxis();
			valueAxis.dashLength = 4;
			valueAxis.axisAlpha = 0;
			chart.addValueAxis(valueAxis);

			var graph = new AmCharts.AmGraph();					
			graph.valueField = 'value';
			graph.lineColor = '#369';
			switch(type) {
				case 'Line Chart':
					graph.type = 'line';
					break;
				case 'Area Chart':
					graph.type = 'line';
					graph.fillAlphas = 0.3;
					break;
				case 'Bar Chart':
					graph.type = 'column';
					break;
			}
			chart.addGraph(graph);

			var chartCursor = new AmCharts.ChartCursor();
			chart.addChartCursor(chartCursor);
			
			chart.write('resulting-chart');
			var time_elapsed = ($scope.am_time_after - time_before)/1000;
			time_elapsed = time_elapsed.toString();
			var output = "AmCharts rendered a " + (values.length - 1) + " point " + type.toLowerCase() + " in " + time_elapsed + "s";
			$scope.displayResults(output);
		}

		$scope.amcharts = function (chart_type, values) {
			var type = chart_type;
			var vals = values;
			AmCharts.ready($scope.amcharts_render(type, vals));
		};

		function zingchart_render (type, values) {
			var time_before = new Date().getTime();
			// RENDERER GOES HERE
			var time_after = new Date().getTime();
			var time_elapsed = (time_after - time_before)/1000;
			time_elapsed = time_elapsed.toString();
			return "ZingChart rendered a " + values.length + " point " + type.toLowerCase() + " in " + time_elapsed + "s";
		};

		// GO SPEEDTEST GO

		$scope.GO_SPEEDTEST_GO = function(provider, type, size) {
			if (provider == 'ZingChart') {
				$scope.vs_speed_results = zingchart_render(type, size);
			}
			else if (provider == "C3JS") {
				$scope.vs_speed_results = $scope.c3js(type, size);
			}
			else if (provider == "AmCharts") {
				$scope.amcharts(type, size);
			}
			else if (provider == "FusionCharts") {
				$scope.fusion(type, size);
			}
		};

	}])