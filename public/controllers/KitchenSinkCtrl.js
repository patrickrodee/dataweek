angular.module('MyApp')
	.controller('KitchenSinkCtrl', ['$scope', function ($scope) {

		$scope.kitchen_greeting = 'Beyond Bar Charts & Pie Charts';

		$scope.is_mobile = false;

		$scope.current_width = $(window).width();

		if ($scope.current_width < 641) {
			$scope.is_mobile = true;
			$scope.kitchen_greeting = 'Beyond Bars & Pie';
		}

		//////////////////////////////////
		// Chart Objects /////////////////
		//////////////////////////////////

		$scope.line_data = line_data_chart;
		$scope.bar_data = bar_data_chart;
		$scope.area_data = area_data_chart;
		$scope.pie_data = pie_data_chart;
		$scope.nestedpie_data = nestedpie_data_chart;
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
		$scope.grid_data = grid_data_chart;
		$scope.map_data = map_data_chart;
		$scope.chord_data = chord_data_chart;
		$scope.rankflow_data = rankflow_data_chart;
		$scope.treemap_data = treemap_data_chart;
		$scope.wordcloud_data = wordcloud_data_chart;
		$scope.network_data = network_data_chart;
		$scope.bar_rules_data = bar_rules_data_chart;
		$scope.currency_data = currency_data_chart;
		$scope.patterns_data = patterns_data_chart;
		$scope.arrows_data = arrows_data_chart;
		$scope.images_data = images_data_chart;
		$scope.shapes_data = shapes_data_chart;
		$scope.stacked_data = stacked_data_chart;
		$scope.area_stacked_data = area_stacked_data_chart;
		$scope.drilldown_data = drilldown_data_chart;
		$scope.parent_data = parent_data_chart;
		/*
		$scope.big_data = big_data_chart;
		$scope.tooltips_data = tooltips_data_chart;
		*/
	
	
		//////////////////////////////////
		// Themes ////////////////////////
		//////////////////////////////////
		
		$scope.gotham 	= gotham_theme;
		$scope.googlish = googlish_theme;
		$scope.oceanic 	= oceanic_theme;
		
		$scope.all_charts = [
		{id: "line_chart", 			data: line_data_chart},
		{id: "bar_chart", 			data: bar_data_chart},
		{id: "area_chart", 			data: area_data_chart},
		{id: "pie_chart", 			data: pie_data_chart},
		{id: "scatter_chart", 		data: scatter_data_chart},
		{id: "radar_chart", 		data: radar_data_chart},
		{id: "stock_chart", 		data: stock_data_chart},
		{id: "bubble_chart", 		data: bubble_data_chart},
		{id: "piano_chart", 		data: piano_data_chart},
		{id: "bullet_chart", 		data: bullet_data_chart},
		{id: "gauge_chart", 		data: gauge_data_chart},
		{id: "funnel_chart", 		data: funnel_data_chart},
		{id: "venn_chart", 			data: venn_data_chart},
		{id: "pareto_chart", 		data: pareto_data_chart},
		{id: "nestedpie_chart",		data: nestedpie_data_chart},
		{id: "mixed_chart", 		data: mixed_data_chart},
		{id: "grid_chart", 			data: grid_data_chart},
		{id: "map_chart", 			data: map_data_chart},
		{id: "chord_chart", 		data: chord_data_chart},
		{id: "rankflow_chart",		data: rankflow_data_chart},
		{id: "treemap_chart", 		data: treemap_data_chart},
		{id: "wordcloud_chart", 	data: wordcloud_data_chart},
		{id: "network_chart", 		data: network_data_chart},
		{id: "bar_rules_chart", 	data: bar_rules_data_chart},
		{id: "currency_chart", 		data: currency_data_chart},
		{id: "patterns_chart", 		data: patterns_data_chart},
		{id: "arrows_chart", 		data: arrows_data_chart},
		{id: "images_chart", 		data: images_data_chart},
		{id: "shapes_chart", 		data: shapes_data_chart},
		{id: "stacked_chart", 		data: stacked_data_chart},
		{id: "area_stacked_chart", 	data: area_stacked_data_chart},
		{id: "drilldown_chart", 	data: drilldown_data_chart},
		{id: "parent_chart", 		data: parent_data_chart}
		];

		$scope.theme_actions = [
		{name: "Standard Theme",	theme: default_theme},
		{name: "Googlish Theme", 	theme: googlish_theme},
		{name: "Gotham Theme", 		theme: gotham_theme},
		{name: "Oceanic Theme", 	theme: oceanic_theme}
		]

		$scope.theme_action = {name: "Standard Theme"};
		
		$scope.renderWithTheme = function(theme) {
			angular.forEach($scope.all_charts, function(value, key) {
				//zingchart.exec(value.id, 'destroy');
				//console.log(value.id + " destroyed");
				var payload = $.extend( {id: value.id, defaultsurl: theme}, value.data);
				zingchart.render(payload);
				//console.log(value.id + " rendered");
			});
		};

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

		$scope.setdata = function(target, data) {
			zingchart.exec(target, 'setdata', data);
		}

		$scope.set_values_and_modify = function(target, values, payload) {
			$scope.setseriesvalues(target, values);
			$scope.modify(target, payload);
		};

		$scope.set_series_and_modify = function(target, values, payload) {
			$scope.setseriesdata(target, values);
			$scope.modify(target, payload);
		};

		$scope.set_series_and_modify_pie = function(target, series, payload) {
			$scope.setseriesdata(target, series);
			$scope.modify(target, payload);
		};

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

		$scope.line_action = {name: "Standard"};

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

		$scope.bar_action = {name: "Standard"};

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

		$scope.area_action = {name: "Standard"};

		$scope.area_dimension = '2D';

		/************** Pie Chart Specific **************/

		$scope.toggle_pie = function(target) {
			$scope.pie_dimension = $scope.pie_dimension == '2D' ? '3D' : '2D';
			zingchart.exec(target, 'toggledimension');
		};

		$scope.pie_chart_actions = [
		{name: "Pie", 			values: {'update': 0, 'values':[[5],[2],[7],[10]]}, 	data: {'data': { 'type':'pie', 'plot': {'slice': 0} } } },
		{name: "Donut/Ring", 	values: {'update': 0, 'values': [[5],[2],[7],[10]]}, 	data: {'data': {'type':'pie', 'plot': {'slice': 50 } } } }
		]

		$scope.pie_action = {name: "Pie"};

		$scope.pie_dimension = '2D';

		/************** Scatter Chart Specific **************/


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

		$scope.radar_action = {name: "Line"};

		/************** Stock Chart Specific **************/

		$scope.stock_chart_actions = [
		{name: "Candlestick",	data: {object:'plot',data:{'aspect':'candlestick'}}},
		{name: "Whisker", 	 	data: {object:'plot',data:{'aspect':'whisker'}}}
		]

		$scope.stock_action = {name: "Candlestick"};

		/************** Bubble Chart Specific **************/

		$scope.bubble_chart_actions = [
		{name: "Square Root",	data: {'object':'plot','data':{'scaling':'sqrt'}}},
		{name: "Scale Radius", 	data: {'object':'plot','data':{'scaling':'radius'}}},
		{name: "Area", 			data: {'object':'plot','data':{'scaling':'area'}}}
		]

		$scope.bubble_action = {name: "Square Root"};

		/************** Piano Chart Specific **************/

		$scope.piano_chart_actions = [
		{name: "Brightness",	data: {'object':'plot','data':{'aspect':'brightness'}}},
		{name: "Size", 			data: {'object':'plot','data':{'aspect':'size'}}},
		{name: "Horizontal", 	data: {'object':'plot','data':{'aspect':'horizontal'}}},
		{name: "Vertical", 		data: {'object':'plot','data':{'aspect':'vertical'}}}
		]

		$scope.piano_action = {name: "Brightness"};

		/************** Bullet Chart Specific **************/

		$scope.bullet_chart_actions = [
		{name: "Standard",	data: {'object':'plot','data':{'aspect':'standard'}}},
		{name: "Cone", 		data: {'object':'plot','data':{'aspect':'cone'}}}
		]

		$scope.bullet_action = {name: "Standard"};

		/************** Mixed Chart Specific **************/

		$scope.mixed_chart_actions = [
		{name: "Bar/Line Area",			data: {"data": {"type":"mixed","title":{"text":"Mixed - XY","height":"20px"},"plotarea":{"margin":"80 150 60 60"},"scale-y":{"line-color":"#7ca82b"},"-scale-y-2":{"values":"0:100:10","line-color":"#1db0e1"},"-scale-x-2":{"values":"1:10:2"},"series":[{"values":[8,31,12,41,24,20,16,40,9],"type":"bar","hover-state":{"visible":0}},{"values":[11,26,7,44,11,28,42,26,13],"type":"line"}]}}},
		{name: "Bar/Line Y2/Y3",		data: {"data": {"type":"mixed","title":{"text":"Mixed - XY","height":"20px"},"plotarea":{"margin":"80 150 60 60"},"scale-y":{"line-color":"#7ca82b"},"-scale-y-2":{"values":"0:100:10","line-color":"#999"},"-scale-x-2":{"values":"1:10:2"},"series":[{"values":[8,31,12,41,24,20,16,40,9],"type":"bar","hover-state":{"visible":0}},{"values":[44,11,28,42,26,13,11,26,7],"type":"line"},{"values":[10,22,8,12,29,6,15,21,25],"type":"area"}]}}},
		{name: "Bar/Line Y2/X2/Y3", 	data: {"data": {"type":"mixed","title":{"text":"Mixed - XY","height":"20px"},"plotarea":{"margin":"80 150 60 60"},"scale-y":{"line-color":"#7ca82b","label":{"text":"Y-Axis Bar Values"}},"scale-y-2":{"values":"0:100:10","line-color":"#1db0e1","label":{"text":"Y2-Axis Line Value"}},"scale-y-3":{"values":"0:100:10","line-color":"#cc3300","label":{"text":"Y3-Axis Line Value"}},"series":[{"values":[8,31,12,41,24,20,16,40,9],"type":"bar","hover-state":{"visible":0}},{"values":[26,13,11,26,7,44,11,28,42],"type":"line","scales":"scale-x,scale-y-2"},{"values":[80,72,69,56,45,61,75,80,32],"type":"line","scales":"scale-x,scale-y-3"}]}}},
		{name: "Complex Y4", 			data: {"data": {"type":"mixed","title":{"text":"Mixed - XY","height":"20px"},"plotarea":{"margin":"80 150 60 60"},"scale-y":{"line-color":"#7ca82b","label":{"text":"Y-Axis Bar Values"}},"scale-y-2":{"values":"0:100:10","line-color":"#1db0e1","label":{"text":"Y2-Axis Line Value"}},"scale-y-3":{"values":"0:1000:100","line-color":"#cc3300","label":{"text":"Y3-Axis Line Value"}},"scale-x":{"values":["1","2","3","4","5","6","7","8","9"]},"scale-x-2":{"values":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"line-color":"#cc3300"},"series":[{"values":[8,31,12,41,24,20,16,40,9],"type":"bar","hover-state":{"visible":0}},{"values":[16,23,21,36,17,14,11,28,32],"type":"line","scales":"scale-x,scale-y-2"},{"values":[730,813,910,820,760,640,811,720,940,803,710,690],"type":"line","scales":"scale-x-2,scale-y-3"}]}}},
		{name: "Bar/Line Only", 		data: {"data": {"type":"mixed","title":{"text":"Mixed - XY","height":"20px"},"labels":[{"text":"Up to 9-Y and 9-X Axis","x":"70%","y":"18%","text-align":"left","background-color":"#fff","border-radius":"6px","padding":"10px"}],"plotarea":{"margin":"80 150 60 60"},"scale-y":{"line-color":"#7ca82b","label":{"text":"Y-Axis Bar Values"}},"scale-y-2":{"values":"0:100:10","line-color":"#1db0e1","label":{"text":"Y2-Axis Line Value"}},"scale-y-3":{"values":"0:1000:100","line-color":"#cc3300","label":{"text":"Y3-Axis Line Value"}},"scale-y-4":{"values":"0:10000:1000","line-color":"#f9c332","label":{"text":"Y4-Axis Line Value"}},"scale-x":{"values":["1","2","3","4","5","6","7","8","9"]},"scale-x-2":{"values":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"line-color":"#f9c332"},"series":[{"values":[8,31,12,41,24,20,16,40,9],"type":"bar","hover-state":{"visible":0}},{"values":[26,13,11,26,7,44,11,28,42],"type":"line","scales":"scale-x,scale-y-2"},{"values":[180,320,490,500,650,501,705,500,402],"type":"line","scales":"scale-x,scale-y-3"},{"values":[7300,8103,9010,8200,7600,6400,8101,7020,9040,8003,7010,6900],"type":"line","scales":"scale-x-2,scale-y-4"}]}}}
		]

		$scope.mixed_action = {name: "Bar/Line Area"};

		/************** Bar Rules Chart Specific **************/

		$scope.bar_rules_chart_actions = [
		{name: "Bar Rules",			data: {"data": {"type":"bar","title":{"text":"Bar Rules"},"plot":{"rules":[{"rule":"%v > 0"},{"rule":"%v < 0","background-color":"#cc3300"}]},"series":[{"values":[50,-20,68,98,-35]}]}}},
		{name: "Marker Rules", 		data: {"data": {"type":"line","title":{"text":"Marker Rules"},"plot":{"marker":{"rules":[{"rule":"%v > 0"},{"rule":"%v < 0","size":"7","background-color":"#cc3300"}]}},"series":[{"values":[50,-20,68,98,-35]}]}}},
		{name: "Value Box Rules", 	data: {"data": {"type":"bar","title":{"text":"Value Box Rules"},"plot":{"value-box":{"placement":"top-in","shadow":"0","rules":[{"rule":"%v > 0","visible":"true","color":"#fff","background-color":"none"},{"rule":"%v < 0","visible":"true","color":"#fff","background-color":"#cc3300","border-radius":"4px"}]}},"series":[{"values":[50,-24,68,98,-35],"background-color":"#85bdcd"}]}}}
		]

		$scope.bar_rules_action = {name: "Bar Rules"};

		/************** Currency Chart Specific **************/

		$scope.currency_chart_actions = [
		{name: "$ - PDT",	data: {"data": {"utc":true,"timezone":-7,"subtitle":{"text":"US Dollar - PDT","rtl":0},"scale-y":{"format":"$%v"}}}},
		{name: "€ - GMT", 	data: {"data": {"utc":true,"timezone":0,"subtitle":{"text":"Euro - UTC","rtl":0},"scale-y":{"format":"€%v"}}}},
		{name: "₹ - RTL", 	data: {"data": {"subtitle":{"text":"Indian Rupee - RTL lol","rtl":1},"scale-y":{"format":"₹%v"}}}}
		]

		$scope.currency_action = {name: "$ - PDT"};

		/************** Stacked Chart Specific **************/

		$scope.stacked_chart_actions = [
		{name: "Normal",	series: barstack03, 	data: {"data":{"stack-type": 'normal'}}},
		{name: "100%", 		series: barstack02,		data: {"data":{"stack-type": '100%'}}},
		{name: "Grouped", 	series: barstack01,		data: {"data":{"stack-type": 'normal'}}}
		]

		$scope.stacked_action = {name: "Normal"};

		/************** Area Stacked Chart Specific **************/

		$scope.area_stacked_chart_actions = [
		{name: "Normal", 	data: {"data":{"stack-type": 'normal'}}},
		{name: "100%", 		data: {"data":{"stack-type": '100%'}}}
		]

		$scope.area_stacked_action = {name: "Normal"};

		/************** Area Stacked Chart Specific **************/

		$scope.toggle_tooltips = function(target) {
			if ($scope.tooltips_actions.length > 1) {
				console.log($scope.tooltips_actions.length);
				$scope.tooltips_actions = $scope.tooltips_actions_fixed;
				$scope.tooltips_current_text = "Fixed";
				$scope.setdata(target, tooltips_data_chart);
				// Reapply the ticked options
				angular.forEach( $scope.tooltips_actions, function( value, key ) {
				    if ( value.ticked === true ) {
				    	value.ticked = false;
				    }
				});
				$scope.modify(target, tooltips_data_chart_FIXED);
			}
			else {
				console.log($scope.tooltips_actions.length);
				$scope.tooltips_actions = $scope.tooltips_actions_standard;
				$scope.tooltips_current_text = "Standard";
				$scope.setdata(target, tooltips_data_chart);
				// Reapply the ticked options
				angular.forEach( $scope.tooltips_actions, function( value, key ) {
				    if ( value.ticked === true ) {
				    	value.ticked = false;
				    }
				});
				$scope.modify(target, tooltips_data_chart_STANDARD);
			}
		};

		$scope.tooltips_actions_standard = [
		{name: "Legend Item", 		data: {"object":"tooltip", "data": {"tooltip":{"text":"Student %k<br>%t Percentile: %v","text-align":"left","shadow":0,"border-radius":5,"x":null,"y":null}}}, 							ticked: false},
		{name: "X-Axis Item", 		data: {"data": {"scaleX":{"tooltip":{"visible":1,"text":"X-Axis Tooltip","background-color":"white","border-radius":5,"border-width":1,"border-color":"#ddd","height":20}}}}, 			ticked: false},
		{name: "Y-Axis Item", 		data: {"data": {"scaleY":{"tooltip":{"visible":1,"text":"Y-Axis Tooltip","background-color":"white","border-radius":5,"border-width":1,"border-color":"#ddd","height":20}}}}, 			ticked: false},
		{name: "Sticky Tooltips", 	data: {"data": {"tooltip":{"text":"Student %k<br>%t Percentile: %v","text-align":"left","shadow":0,"border-radius":5,"sticky":1,"timeout":2000,"height":null}}}, 	ticked: false},
		{name: "HTML Mode", 		data: {"object":"tooltip", "data": {"tooltip":{"html-mode":1,"height":85,"border-radius":5,"shadow":0,"x":null,"y":null,"text":"<style>th {border:1px solid #999;text-align:center;font-size:14px;padding:6px;}td{border:1px solid #999;text-align:center;font-size:14px;padding:10px;}</style><table style='border-radius:5px;'><thead><tr><th style='font-size:16px;'>%t</th></tr></thead><tbody><tr><td style='font-size:13px;'>%v%</td></tr></tbody></table>"}}}, ticked: false}
		]

		$scope.tooltips_actions_fixed = [
		{name: "Sticky Tooltips",	data: {"data": {"tooltip":{"text":"Student %k<br>%t Percentile: %v","text-align":"left","shadow":0,"border-radius":5,"sticky":1,"timeout":2000,"height":null}}}, 	ticked: false}
		]

		$scope.tooltips_actions = $scope.tooltips_actions_standard;
		$scope.modify('tooltips_chart', tooltips_data_chart_STANDARD);
		$scope.modify_tooltips = function( data ) {
			//console.log(data);
			$scope.modify('tooltips_chart', data.data);
			console.log(data.data);
		};
		$scope.tooltips_current_text = "Standard";

	}]);