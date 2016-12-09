app.config(function ($routeProvider) {
	
		$routeProvider
    .when("/home", {
        templateUrl : "taketest.html",
		 //template: '<div>hi how are you</div>'
		 controller: 'testController'
    }) .when("/allreport", {
        templateUrl : "allreport.html",
		 //template: '<div>hi how are you</div>'
		 controller: 'inputController'
    }).when("/videoreport", {
        templateUrl : "reportsample.html",
		 //template: '<div>hi how are you</div>'
		 controller: 'Videoreport'
    }).when("/videocard1", {
        templateUrl : "videocard.html",
		 //template: '<div>hi how are you</div>'
		 controller: 'Videoreport'
    }).otherwise({
			redirectTo:"/home",
			controller: 'testController'
		});
	
 
    //  console.debug("current path", window.location, window.location.href);
 // use the HTML5 History API
   // $locationProvider.html5Mode(true);	  
});