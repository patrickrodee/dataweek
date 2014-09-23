angular.module('MyApp')
	.controller('DataIsChangingCtrl', ['$scope', function ($scope){

		// Initial Charts

		$scope.pushing_data 	= pushing_data_chart;

		$scope.pulling_data 	= pulling_data_chart;

		$scope.pushing_data_go	= pushing_data_chart_go;

		$scope.pulling_data_go	= pulling_data_chart_go;

		// Initialize Pushing & Pulling

		$scope.startpushing = function() {
			zingchart.exec('pushing-demo', 'setdata', pushing_data_go);
		}

		$scope.startpulling = function() {
			zingchart.exec('pulling-demo', 'setdata', pulling_data_go);
		}

		zingchart.complete = function (chart) {
			if (chart.id == 'pushing-demo') {
				zingchart.exec('pushing-demo', 'setdata', pushing_data_chart_go);
			}
			else if (chart.id == 'pulling-demo') {
				zingchart.exec('pulling-demo', 'setdata', pulling_data_chart_go);
			}
		}

		

		// Initial Toggles

		$scope.pushing_state = 'Stop Pushing';

		$scope.pulling_state = 'Stop Pulling';

		// Button Actions

		$scope.togglepushing = function() {
			if ($scope.pushing_state == 'Start Pushing') {
				$scope.pushing_state = 'Stop Pushing';
				zingchart.exec('pushing-demo', 'startfeed');
				$analytics.eventTrack('Push Demo Started');
			}
			else {
				$scope.pushing_state = 'Start Pushing';
				zingchart.exec('pushing-demo', 'stopfeed');
				$analytics.eventTrack('Push Demo Stopped');
			}
		}

		$scope.togglepulling = function() {
			if ($scope.pulling_state == 'Start Pulling') {
				$scope.pulling_state = 'Stop Pulling';
				zingchart.exec('pulling-demo', 'startfeed');
				$analytics.eventTrack('Pull Demo Started');
			}
			else {
				$scope.pulling_state = 'Start Pulling';
				zingchart.exec('pulling-demo', 'stopfeed');
				$analytics.eventTrack('Pull Demo Stopped');
			}
		}
	}])