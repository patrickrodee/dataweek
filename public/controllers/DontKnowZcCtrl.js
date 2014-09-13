angular.module('MyApp')
	.controller('DontKnowZcCtrl', ['$scope', function ($scope) {

		// PROVIDER DROPDOWN

		$scope.provider_options = [
		{name: "ZingChart"},
		{name: "C3JS"},
		{name: "AmCharts"},
		{name: "FusionCharts"},
		{name: "HighCharts"}
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

		// DESTROY RESULT-CONTAINER'S CHILDREN

		$scope.reset_container = function() {
			$('#result-container').empty();
			$('#result-container').append( '<div id="resulting-chart"></div>' );
		}

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
			output = "FusionCharts rendered a " + size + " point " + type + " in " + time_elapsed + "s";
			$scope.displayResults(output);
		};

		$scope.fusion = function(chart_type, values) {
			FusionCharts.ready($scope.fusion_render(chart_type, values));
		};


		$scope.c3js = function (type, values) {
			var chartdata = {
				bindto: '#resulting-chart',
				data: {
					columns: [values]
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
			var time_after = new Date().getTime();
			var time_elapsed = (time_after - time_before)/1000;
			time_elapsed = time_elapsed.toString();
			var output = "AmCharts rendered a " + (values.length - 1) + " point " + type.toLowerCase() + " in " + time_elapsed + "s";
			$scope.displayResults(output);
		}

		$scope.amcharts = function (chart_type, values) {
			AmCharts.ready($scope.amcharts_render(chart_type, values));
		};

		$scope.hcIsDone = function () {
			$scope.hc_time_after = new Date().getTime();
		}

		$scope.highcharts = function (chart_type, values) {
			var time_before = new Date().getTime();
			var chartdata = {
				chart: {
					zoomType: 'x',
					animation: false,
					events: {
						load: function() {
							$scope.hcIsDone();
						}
					}
				},
				title: {
					text: null
				},
				xAxis: {
					type: 'linear'
				},
				yAxis: {
					title: null
				},
				legend: {
					enabled: false
				},
				plotOptions: {
					line: {
						animation: 0,
						lineWidth: 1
					},
					area: {
						animation: 0,
						lineWidth: 1
					},
					column: {
						animation: 0
					}
				},
				series: [
					{
						data: values
					}
				]
			}
			
			switch(chart_type) {
				case 'Line Chart':
					chartdata['series'][0]['type'] = 'line';
					break;
				case 'Area Chart':
					chartdata['series'][0]['type'] = 'area';
					break;
				case 'Bar Chart':
					chartdata['series'][0]['type'] = 'column';
					break;
			}
			$('#resulting-chart').highcharts(chartdata);
			var time_elapsed = ($scope.hc_time_after - time_before)/1000;
			time_elapsed = time_elapsed.toString();
			return "HighCharts rendered a " + (values.length -1) + " point " + chart_type.toLowerCase() + " in " + time_elapsed + "s";
		}

		$scope.zcIsDone = function() {
			$scope.zc_time_after = new Date().getTime();
		}

		$scope.zingchart_render = function (type, values) {
			var chartdata = {
				backgroundColor: '#fff',
				plotarea: {
					margin: 'dynamic'
				},
				scaleY: {
					lineWidth: 0,
					guide: {
						lineStyle: 'solid'
					},
					tick: {
						visible: false
					},
					minValue: 'auto'
				},
				scaleX: {
					maxItems: 10,
					lineWidth: 0,
					short: true,
					tick: {
						lineColor: '#ccc',
						lineWidth: 1
					},
					guide: {
						visible: false
					},
					normalize: true,
					zooming: true
				},
				scrollX: {},
				plot: {
					mode : 'fast',
					exact: true
				},
				crosshairX: {},
				series: [
					{
						values: values
					}
				]
			};
			switch(type) {
				case 'Line Chart':
					chartdata['type'] = 'line';
					chartdata['series'][0]['line-width'] = 1;
					chartdata['series'][0]['shadow'] = false;
					break;
				case 'Area Chart':
					chartdata['type'] = 'area';
					chartdata['series'][0]['line-width'] = 1;
					chartdata['series'][0]['shadow'] = false;
					break;
				case 'Bar Chart':
					chartdata['type'] = 'vbar';
					chartdata['series'][0]['background-color'] = '#369';
					chartdata['series'][0]['shadow'] = false;
					break;
			}
		
			zingchart.DEV.SORTTOKENS = 0;
			zingchart.DEV.PLOTSTATS = 0;
			zingchart.DEV.DOMFRAGMENTS = 1;
			zingchart.DEV.RESOURCES = 0;
			zingchart.DEV.SAVESOURCE = 0;
			zingchart.TIMEOUT = 0;
			zingchart.FASTWIDTH = 1;
			var time_before = new Date().getTime();
			zingchart.render({
				id: 'resulting-chart',
				output: 'svg',
				hideprogresslogo: true,
				events: {
					load: function() {
						$scope.zcIsDone();
					}
				},
				data: chartdata
			});
			// RENDERER GOES HERE
			var time_elapsed = ($scope.zc_time_after - time_before)/1000;
			time_elapsed = time_elapsed.toString();
			return "ZingChart rendered a " + (values.length -1) + " point " + type.toLowerCase() + " in " + time_elapsed + "s";
		};

		// GO SPEEDTEST GO

		$scope.GO_SPEEDTEST_GO = function(provider, type, size) {
			$scope.reset_container();
			if (provider == 'ZingChart') {
				$scope.vs_speed_results = $scope.zingchart_render(type, size);
			}
			else if (provider == "C3JS") {
				$scope.vs_speed_results = $scope.c3js(type, size);
			}
			else if (provider == "HighCharts") {
				$scope.vs_speed_results = $scope.highcharts(type, size);
			}
			else if (provider == "AmCharts") {
				$scope.amcharts(type, size);
			}
			else if (provider == "FusionCharts") {
				$scope.fusion(type, size);
			}
		};

	}])