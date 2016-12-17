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