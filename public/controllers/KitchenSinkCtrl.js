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
		$scope.bullet_data = bullet_data_chart;
		$scope.gauge_data = gauge_data_chart;
		$scope.funnel_data = funnel_data_chart;
		$scope.venn_data = venn_data_chart;
		$scope.pareto_data = pareto_data_chart;
		$scope.mixed_data = mixed_data_chart;

		//////////////////////////////////
		// Actions ///////////////////////
		//////////////////////////////////

		$scope.modify = function(target, payload) {
			zingchart.exec(target, 'modify', payload);
		};

		$scope.setseriesvalues = function(target, data) {
			zingchart.exec(target, 'setseriesvalues', data);
		};

		$scope.setseriesdata = function(target, series) {
			zingchart.exec(target, 'setseriesdata', series);
		};

		$scope.set_values_and_modify = function(target, values, payload) {
			$scope.setseriesvalues(target, values);
			$scope.modify(target, payload);
		};

		$scope.set_series_and_modify_pie = function(target, series, payload) {
			$scope.setseriesdata(target, series);
			$scope.modify(target, payload);
		}

		/************** Line Chart Specific **************/

		$scope.toggle_line = function(target) {
			$scope.line_dimension = $scope.line_dimension == '2D' ? '3D' : '2D';
			zingchart.exec(target, 'toggledimension');
		};

		$scope.line_chart_actions = [
		{name: "Standard", data: {'object':"plot",'data': {"aspect": 'segmented'}}},
		{name: "Spline", data: {'object':"plot",'data' : {"aspect": 'spline'}}},
		{name: "Stepped", data: {'object':"plot",'data' : {"aspect": 'stepped'}}},
		{name: "Jumped", data: {'object':"plot",'data' : {"aspect": 'jumped'}}}
		]

		$scope.line_action = $scope.line_chart_actions[0];

		$scope.line_dimension = '2D';

		/************** Bar Chart Specific **************/

		$scope.toggle_bar = function(target) {
			$scope.bar_dimension = $scope.bar_dimension == '2D' ? '3D' : '2D';
			zingchart.exec(target, 'toggledimension');
		};

		$scope.bar_chart_actions = [
		{name: "Standard", data: {'object':"plot",'data': {"aspect": 'standard'}}},
		{name: "Cone", data: {'object':"plot",'data' : {"aspect": 'cone'}}},
		{name: "Cylinder", data: {'object':"plot",'data' : {"aspect": 'cylinder'}}},
		{name: "Pyramid", data: {'object':"plot",'data' : {"aspect": 'pyramid'}}}
		]

		$scope.bar_action = $scope.bar_chart_actions[0];

		$scope.bar_dimension = '2D';

		/************** Area Chart Specific **************/

		$scope.toggle_area = function(target) {
			$scope.area_dimension = $scope.area_dimension == '2D' ? '3D' : '2D';
			zingchart.exec(target, 'toggledimension');
		};

		$scope.area_chart_actions = [
		{name: "Standard", data: {'object':"plot",'data': {"aspect": 'standard'}}},
		{name: "Spline", data: {'object':"plot",'data' : {"aspect": 'spline'}}},
		{name: "Stepped", data: {'object':"plot",'data' : {"aspect": 'Stepped'}}}
		]

		$scope.area_action = $scope.area_chart_actions[0];

		$scope.area_dimension = '2D';

		/************** Pie Chart Specific **************/

		$scope.toggle_pie = function(target) {
			$scope.pie_dimension = $scope.pie_dimension == '2D' ? '3D' : '2D';
			zingchart.exec(target, 'toggledimension');
		};

		$scope.pie_chart_actions = [
		{name: "Pie", 			values: {'update': 0, 'values':[[5],[2],[7],[10]]}, 								data: {'data': { 'type':'pie', 'plot': {'slice': 0} } } },
		{name: "Donut/Ring", 	values: {'update': 0, 'values': [[5],[2],[7],[10]]}, 								data: {'data': {'type':'pie', 'plot': {'slice': 50 } } } },
		{name: "Nested", 		values: {'update': 0, 'values': [ [5,6,3,8], [8,3,5,1], [7,10,3,6], [3,9,9,5] ] }, 	data: { 'data': { "type": 'nestedpie',"plot":{"slice":0,"value-box":{"visible":false}}}}}
		]

		$scope.pie_action = $scope.pie_chart_actions[0];

		$scope.is_nested_pie = false;

		$scope.pie_dimension = '2D';

		/************** Scatter Chart Specific **************/

		/*

		$scope.toggle_scatter = function(target) {
			$scope.scatter_dimension = $scope.scatter_dimension == '2D' ? '3D' : '2D';
			zingchart.exec(target, 'toggledimension');
		};

		$scope.scatter_chart_actions = [
		{name: "Standard", data: {'object':"plot",'data': {"aspect": 'standard'}}},
		{name: "Spline", data: {'object':"plot",'data' : {"aspect": 'spline'}}},
		{name: "Stepped", data: {'object':"plot",'data' : {"aspect": 'Stepped'}}}
		]

		$scope.scatter_action = $scope.scatter_chart_actions[0];

		$scope.scatter_dimension = '2D';

		*/

		/************** Radar Chart Specific **************/

		/*
		$scope.toggle_radar = function(target) {
			$scope.radar_dimension = $scope.radar_dimension == '2D' ? '3D' : '2D';
			zingchart.exec(target, 'toggledimension');
		};
		*/

		$scope.radar_chart_actions = [
		{name: "Line", 		series: radar_data_chart_series,	data: {'object':'plot','data':{'aspect':'line'}}},
		{name: "Area", 		series: radar_data_chart_series, 	data: {'object':'plot','data':{'aspect':'area'}}},
		{name: "Rose", 		series: radar_data_chart_series, 	data: {'object':'plot','data':{'aspect':'rose'}}},
		{name: "Dots", 		series: radar_data_chart_series, 	data: {'object':'plot','data':{'aspect':'dots'}}},
		{name: "Mixed", 	series: radar_data_chart_mixed, 	data: {}}
		]

		$scope.radar_action = $scope.radar_chart_actions[0];

		/************** Stock Chart Specific **************/

		$scope.stock_chart_actions = [
		{name: "Candlestick",	data: {object:'plot',data:{'aspect':'candlestick'}}},
		{name: "Whisker", 	 	data: {object:'plot',data:{'aspect':'whisker'}}}
		]

		$scope.stock_action = $scope.stock_chart_actions[0];

		/************** Bubble Chart Specific **************/

		$scope.bubble_chart_actions = [
		{name: "Square Root",	data: {'object':'plot','data':{'scaling':'sqrt'}}},
		{name: "Scale Radius", 	data: {'object':'plot','data':{'scaling':'radius'}}},
		{name: "Area", 			data: {'object':'plot','data':{'scaling':'area'}}}
		]

		$scope.bubble_action = $scope.bubble_chart_actions[0];

		/************** Piano Chart Specific **************/

		$scope.piano_chart_actions = [
		{name: "Brightness",	data: {'object':'plot','data':{'aspect':'brightness'}}},
		{name: "Size", 			data: {'object':'plot','data':{'aspect':'size'}}},
		{name: "Horizontal", 	data: {'object':'plot','data':{'aspect':'horizontal'}}},
		{name: "Vertical", 		data: {'object':'plot','data':{'aspect':'vertical'}}}
		]

		$scope.piano_action = $scope.piano_chart_actions[0];

		/************** Bullet Chart Specific **************/

		$scope.bullet_chart_actions = [
		{name: "Standard",	data: {'object':'plot','data':{'aspect':'standard'}}},
		{name: "Cone", 		data: {'object':'plot','data':{'aspect':'cone'}}}
		]

		$scope.bullet_action = $scope.bullet_chart_actions[0];

		/************** Mixed Chart Specific **************/

		$scope.mixed_chart_actions = [
		{name: "Bar/Line Area",			data: {'object':'plot','data':{'aspect':'brightness'}}},
		{name: "Bar/Line Y2/Y3", 		data: {'object':'plot','data':{'aspect':'size'}}},
		{name: "Bar/Line Y2/X2/Y3", 	data: {'object':'plot','data':{'aspect':'horizontal'}}},
		{name: "Complex Y4", 			data: {'object':'plot','data':{'aspect':'vertical'}}},
		{name: "Bar/Line Only",			data: {}}
		]

		$scope.mixed_action = $scope.mixed_chart_actions[0];

	}]);