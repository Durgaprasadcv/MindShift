
	app.controller('downloadcontroller', downloadcontroller);
         function downloadcontroller ($scope,$http,$location,$localStorage) {
				
	
	$scope.testm = [
		{test_image: 'assets/images/img3.jpg',test_description:'RTR series 2012 full features',test_id:1,test_name:"TVS Apache"},
		{test_image: 'assets/images/img4.jpg',test_description:'What Is Life Insurance?',test_id:2,test_name:"Life Insurance"}
	];
	
	//new FileManager().download_file('http://www.intelligrape.com/images/logo.png','E://uploaded',Log('downloaded success'));

	/*url="E://uploaded";
	
	$scope.storeIntelligrapeLogo=function storeIntelligrapeLogo(){
  var url = "http://www.intelligrape.com/images/logo.png"; // image url
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
     // var imagePath = fs.root.fullPath + "/logo.png"; // full file path
     
	imagePath = url + "/logo.png"; // full file path
      var fileTransfer = new FileTransfer();
      fileTransfer.download(url, imagePath, function (entry) {
               console.log(entry.fullPath); // entry is fileEntry object
      }, function (error) {
               console.log("Some error");
      });
   })
	}*/

//$scope.storeIntelligrapeLogo();
	/*$.getJSON("button.json", function(result){	
		
		$.each(result['data'], function(p, field){
		
		var test_id=(field['test_id']);
		var test_name=(field['test_name']);
		var test_description=(field['test_description']);
		var test_image=(field['test_image']);
		
		if(test_id==''){
		$scope.error_message="No Test";
		}
		else{
		var test = new Array();
		
		test['test_id']=test_id;
		test['test_name']=test_name;
		test['test_description']=test_description;
		test['test_image']=test_image;
		
		
		
		$scope.testss.push(test);
		
		//$scope.testss.push(test['test_id']);
		//$scope.testss.push(test['test_name']);
		
		}
		//console.log("a "+$scope.testss);
		//console.log("testid "+a);
		//console.log("testid "+$scope.testss);
		});
		
		
	}); */
	
	
	//$scope.init = function () {
	//angular.element(document).ready(function () {
var res;
		$.getJSON("button.json", function(result){	
			
			$scope.testss=result.data;
			//$scope.res=result.data;
			//localStorage.setItem("res" , JSON.stringify($scope.res));
				// $scope.testss=JSON.parse(localStorage.getItem('res'));
				// console.log( "ready!jj" );
		});
		console.log($scope.testss );
	
//}); 

//};
$scope.starttest = function(test_id) {	
	//location.reload();
	
	localStorage.setItem("test_id" , test_id);
	$scope.test_id=localStorage.setItem("test_id" , test_id);
	//alert($scope.test_id);
//alert( localStorage.setItem("test_id" , testno));
window.location.href = "videocard.html";

};


$http({
	method  : 'POST',
	url     : 'http://192.168.1.201:8000/gettest',
	data    : $.param({
    'test_id':$scope.test_id
	
	}),  // pass in data as strings
	headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
}).success(function(data) {
							 
							// console.log(JSON.stringify(data)+" success");
							$.each(data, function(p, field){
								var jsondata=(JSON.stringify(field));
								//alert(jsondata);
								$scope.testss1=JSON.parse(jsondata);
							//	$scope.jsondata=localStorage.setItem("jsondata" , JSON.stringify(jsondata));
								
							});
                          });
	
	
};	