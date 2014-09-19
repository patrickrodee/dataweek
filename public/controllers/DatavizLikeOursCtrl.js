angular.module('MyApp')
	.controller('DatavizLikeOursCtrl', ['$scope', function($scope) {
		
		// DEFAULT IMAGE
		$scope.screen_image = "../images/Standard.png";

		$scope.standard_data = 	standard_chart_data;
		$scope.autodesk_data = 	autodesk_chart_data;
		$scope.tesla_data = 	tesla_chart_data;
		$scope.paypal_data = 	paypal_chart_data;
		$scope.nike_data = 		nike_chart_data;

		$scope.all_themes = [
		{name: "Standard", 	theme: 'standard'},
		{name: "Autodesk", 	theme: 'autodesk'},
		{name: "Tesla", 	theme: 'tesla'},
		{name: "Paypal", 	theme: 'paypal'},
		{name: "Nike", 		theme: 'nike'}
		]

		$scope.current_theme = {name: "Standard"};	

		$scope.new_screen = function(type, $index) {
			$scope.selectedIndex = $index;
			/* MIXPANEL TRACKING GOES HERE
			$analytics.eventTrack('eventName', );
			*/
			if (type == 'standard') {
				$scope.screen_image = '../images/Standard.png';
				zingchart.exec('designers_chart', 'setdata', $scope.standard_data);
			}
			else if (type == 'autodesk') {
				$scope.screen_image = '../images/Autodesk.png';
				zingchart.exec('designers_chart', 'setdata', $scope.autodesk_data);
			}
			else if (type == 'tesla') {
				$scope.screen_image = '../images/Tesla.png';
				zingchart.exec('designers_chart', 'setdata', $scope.tesla_data);
			}
			else if (type == 'paypal') {
				$scope.screen_image = '../images/Paypal.png';
				zingchart.exec('designers_chart', 'setdata', $scope.paypal_data);
			}
			else if (type == 'nike') {
				$scope.screen_image = '../images/Nike.png';
				zingchart.exec('designers_chart', 'setdata', $scope.nike_data);
			}
		};

		$scope.selectedIndex = 0; // Whatever the default selected index is, use -1 for no selection

		$scope.itemClicked = function ($index) {
			$scope.selectedIndex = $index;
		};

		$scope.new_screen('standard', 0);
	}]);