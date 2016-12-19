/*var app = angular.module('MyApp', ['ngMaterial','ngRoute', 'ngMessages','ngStorage','ngVideo','pouchdb']);

app.controller('AppCtrl', function($scope) {
});*/

angular
    .module('MyApp', [
	'ngMaterial','ngRoute', 'ngMessages','ngStorage','ngVideo','pouchdb','ui.bootstrap','ngCordova','chart.js']);
	
	
angular
    .module('MyApp').controller('AppCtrl', function($scope, $mdSidenav) {
	
	$scope.showMobileMainHeader = true;
	$scope.openSideNavPanel = function() {
		$mdSidenav('left').open();
	};
	$scope.closeSideNavPanel = function() {
	 document.getElementById("s-main-menu").style.width = "0";
	};
	
});
angular
    .module('MyApp').controller("Reportcontroller", function ($scope) {
	$scope.labels = ['Dept1', 'Dept2', 'Dept3', 'Dept4', 'Dept5', 'Dept6', 'Dept7'];
	$scope.series = ['Group A', 'Group B'];
	$scope.colours = ['#717984', '#F1C40F'];
	$scope.data = [
		[65, 59, 80, 81, 56, 55, 40],
		[28, 48, 40, 19, 86, 27, 90]
	];
});




angular
    .module('MyApp').controller("Report1controller",function ($scope) {
    $scope.labels = ['Memb1', 'Memb2', 'Memb3', 'Memb4', 'Memb5', 'Memb6', 'Memb7'];
    $scope.series = ['Test 1', 'Test 2'];
	$scope.colours = ['#717984', '#F1C40F'];
	
    $scope.data = [
		[65, 59, 80, 81, 56, 55, 40],
		[28, 48, 40, 19, 86, 27, 90]
	];
});