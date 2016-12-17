angular
.module('loginapp', ['ngMaterial', 'ngMessages','ngCordova'])
.controller('Videologincontroller',Videologincontroller);
function Videologincontroller($scope,$location,$timeout,$cordovaFileTransfer) {
	
		
	
	$scope.login=function login(){
		
		/*$http({
			method  : 'POST',
			url     : 'http://192.168.1.201:8000/getlogin',
			data    : $.param({
				'user_name':$scope.Name,
				'user_password':$scope.Password
				
			}),  // pass in data as strings
			headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not 
			}).success(function(data) {
			if (data=="success")
		{
			window.location = "navbar.html";	
		}
		else{
			$scope.errormsg="Invalid UserName or Password";
		}
			
		}); */
		
	   if ($scope.Name == "test" && $scope.Password == "test")
		{
			window.location = "navbar.html";	
		}
		else{
			$scope.errormsg="Invalid UserName or Password";			
		}

	}
};