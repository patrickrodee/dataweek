angular.module('MyApp', ['ngResource','ngRoute', 'mgcrea.ngStrap', 'multi-select'])
  .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
    	.when('/', {
    		templateUrl: 'views/home.html'
    	})
    	.when('/big-data', {
    		templateUrl: 'views/big-data.html',
            controller: 'BigDataCtrl'
    	})
    	.when('/complicated-viz', {
    		templateUrl: 'views/complicated-viz.html',
            controller: 'ComplicatedVizCtrl'
    	})
    	.when('/kitchen-sink', {
    		templateUrl: 'views/kitchen-sink.html',
            controller: 'KitchenSinkCtrl'
    	})
    	.when('/users-move', {
    		templateUrl: 'views/users-move.html',
            controller: 'MobileCtrl'
    	})
    	.when('/we-use', {
    		templateUrl: 'views/we-use.html'
    	})
    	.when('/data-is-changing', {
    		templateUrl: 'views/data-is-changing.html'
    	})
    	.when('/dataviz-like-ours', {
    		templateUrl: 'views/dataviz-like-ours.html',
            controller: 'DatavizLikeOursCtrl'
    	})
    	.when('/dont-know-zc', {
    		templateUrl: 'views/dont-know-zc.html'
    	})
    	.when('/cant-code', {
    		templateUrl: 'views/cant-code.html'
    	})
    	.otherwise({
    		redirectTo: '/'
    	});
  }]);