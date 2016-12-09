var app = angular.module('MyApp', ['ngMaterial','ngRoute', 'ngMessages','ngStorage','ngVideo']);
app.controller('AppCtrl', function($scope, $mdSidenav) {
	
	
	
	
	$scope.showMobileMainHeader = true;
	$scope.openSideNavPanel = function() {
		$mdSidenav('left').open();
	};
	$scope.closeSideNavPanel = function() {
		$mdSidenav('left').close();
	};




});