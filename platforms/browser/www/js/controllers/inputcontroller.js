

angular
    .module('MyApp').controller('inputController', function($scope,$http, $location,$localStorage) {
	$scope.mark = [
		{image: 'assets/images/bak.jpg',testno:01,description:'RTR series 2012 full features',questions:3,totalmarks:2},
		{image: 'assets/images/bak.jpg',testno:02,description:'What Is Life Insurance?',questions:4,totalmarks:2}
	];
	

});	