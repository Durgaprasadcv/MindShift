
	app.controller('testController', testController);
         function testController ($scope,$http,$location,$localStorage) {
				
				
	$scope.testm = [
		{test_image: 'assets/images/img3.jpg',test_description:'RTR series 2012 full features',test_id:1,test_name:"TVS Apache"},
		{test_image: 'assets/images/img4.jpg',test_description:'What Is Life Insurance?',test_id:2,test_name:"Life Insurance"}
	];

		
		$.getJSON("button.json", function(result){	
			
			$scope.testss=result.data;
			
		});
		console.log($scope.testss );

$scope.starttest = function(test_id) {	
	localStorage.setItem("test_id" , test_id);
	$scope.test_id=localStorage.setItem("test_id" , test_id);
window.location.href = "videocard.html";

};




var newarr= new Array(); var a=1;
		$.getJSON("button.json", function(result){	
			
			//$scope.testss=result.data;
			//alert(JSON.stringify(result.data));
			$.each(result['data'], function(p, field){				
				var jsondata=(JSON.stringify(field['test_id']));				  
				//$scope.testss1=JSON.parse(jsondata);
				
			newarr[a]=field['test_id'];
			//alert(newarr[a]);
				a++;
			});
		});
			
		
		
//insert
sqdb.transaction(function(transaction) {
			
		for(j=1;j<newarr.length;j++)
		{
				//alert(newarr[j]);					
				var test_id=newarr[j];								
				var test_taken_status=0;
				var executeQuery = "INSERT INTO test_con(test_id,test_taken_status) VALUES (?,?)";
				transaction.executeSql(executeQuery, [test_id,test_taken_status]
				, function(tx, result) {
				console.log('Inserted');
				//alert(test_id);
				},
				function(error){
				console.log('Error occurred');
				});
		}
}); 

//select
sqdb.transaction(function(transaction) {
							transaction.executeSql('SELECT * FROM test_con', [], function (tx, results) {	
							
								for (var i=0; i <results.rows.length; i++){
									//alert("nu "+newarr[i]);
									test_id = JSON.stringify(results.rows.item(i).test_id);				
									test_status = JSON.stringify(results.rows.item(i).test_taken_status);				
									//alert("dd  "+row);	
									//alert("dd  "+test_status);	
									if(test_id==2 && test_status==1)
									{
								    alert(test_id);
										//document.getElementById("colr").style.background = "pink";
										  $scope.mycolor = {
                                           "background-color" : "red"
										  }
										  alert($scope.mycolor);
									}
									
								} 
							}, null);
						});	



		//delete
		/* sqdb.transaction(function(transaction) {
		 var executeQuery = "DROP TABLE IF EXISTS test_con";
		 transaction.executeSql(executeQuery, [],
		 function(tx, result) {alert('Table deleted successfully.');},
		 function(error){alert('Error occurred while droping the table.');}
		 );
		}); */
		
		
		
		  this.topDirections = ['left', 'up'];
            this.bottomDirections = ['down', 'right'];
            this.isOpen = false;
            this.availableModes = ['md-fling', 'md-scale'];
            this.selectedMode = 'md-fling';
            this.availableDirections = ['up', 'down', 'left', 'right'];
            this.selectedDirection = 'up';

};	