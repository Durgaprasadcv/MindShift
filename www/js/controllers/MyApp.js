
angular
.module('MyApp').config(function ($routeProvider) {	
	$routeProvider
	.when('/view', {
		
		templateUrl: 'views/sample.html'
			}).when("/home", {
			templateUrl : "taketest.html",
			controller: 'testController as ctrl'
			}) .when("/allreport", {
			templateUrl : "allreport.html",
			controller: 'inputController'
			}).when("/videoreport", {
			templateUrl : "reportsample.html",
			controller: 'Videoreport'
			}).when("/videocard1", {
			templateUrl : "videocard.html",
			controller: 'Videoreport'
			}).when("/view_profile", {
			templateUrl : "view_profile.html",
			controller: 'profilecontroller'
			}).otherwise({
			redirectTo:"/view",
			controller: 'testController as ctrl'
		});  
	});	