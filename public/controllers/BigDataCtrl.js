angular.module('MyApp')
	.controller('BigDataCtrl', ['$scope', function ($scope) {

		//////////////////////////////////
		// Chart Objects /////////////////
		//////////////////////////////////

		$scope.interact_data = interact_data_chart;

	    $scope.evaluate_data_plot_rules = evaluate_data_plot_rules_chart;

		$scope.evaluate_data_marker_rules = evaluate_data_marker_rules_chart;

		$scope.annotate_data = annotate_data_chart;

		// ACTIONS /////////////////

		$scope.point_options = [
			{name: "10,000", value: 10000},
			{name: "25,000", value: 25000},
			{name: "50,000", value: 50000},
			{name: "100,000", value: 100000}
		];

		$scope.points_to_render = $scope.point_options[0];

		$scope.time_to_render = "0.357s";

		$scope.modify = function(target, payload) {
			zingchart.exec(target, 'modify', payload);
		};

		$scope.timeToRun = function(number_of_points) {
			var newVals0 = generateRandomNumbers(number_of_points/5);
	    	var newVals1 = generateRandomNumbers(number_of_points/5);
	    	var newVals2 = generateRandomNumbers(number_of_points/5);
	    	var newVals3 = generateRandomNumbers(number_of_points/5);
	    	var newVals4 = generateRandomNumbers(number_of_points/5);
	    	var new_data = { "data": { "series": [ { "values" : newVals0 }, { "values" : newVals1 }, { "values" : newVals2 }, {"values" : newVals3 }, {"values" : newVals4 } ] } };
	    	var time_before = new Date().getTime();
	    	$scope.modify('interact-demo', new_data);
	    	var time_after = new Date().getTime();
	    	var time_to_render = (time_after-time_before)/1000;
	    	time_to_render.toString();
	    	$scope.time_to_render = time_to_render + "s";
		};

		// $scope.points_to_render = $scope.timeToRun('interact-demo', $scope.point_options[0].value);

	}])