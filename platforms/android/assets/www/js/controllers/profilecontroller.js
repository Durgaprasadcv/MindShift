
angular
    .module('MyApp').controller('profilecontroller', function($scope) {


	$scope.profile = [
		{image: 'assets/images/bak.jpg',name:'Gaurav',address:'Shri Nivas, Bangalore',mob:9954567865,email:'gtest@gmail.com'}	
	];
alert($scope.profile);

});	