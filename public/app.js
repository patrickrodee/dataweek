angular.module('MyApp', ['ngResource','ngRoute', 'mgcrea.ngStrap'])
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
    		templateUrl: 'views/complicated-viz.html'
    	})
    	.when('/big-and-complex', {
    		templateUrl: 'views/big-and-complex.html'
    	})
    	.when('/users-move', {
    		templateUrl: 'views/users-move.html'
    	})
    	.when('/we-use', {
    		templateUrl: 'views/we-use.html'
    	})
    	.when('/data-is-changing', {
    		templateUrl: 'views/data-is-changing.html'
    	})
    	.when('/dataviz-like-ours', {
    		templateUrl: 'views/dataviz-like-ours.html'
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