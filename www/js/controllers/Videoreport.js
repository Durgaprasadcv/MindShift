angular
.module('MyApp').controller('Videoreport', Videoreport);




function Videoreport ($scope,$mdDialog,$localStorage,pouchDB) {
	// $scope.reports = store.get('reports');
	
	$localStorage.testreport = new Array();
	$localStorage.report=new Array();
	
	var mainarr=new Array();
	
	
	
	$scope.finalresult=new Array();
	
	$scope.test_id=localStorage.getItem('test_id');
	$scope.test_name=localStorage.getItem('test_name');
	$scope.test_description=localStorage.getItem('test_description');
	
	
	$scope.question_no=JSON.parse(localStorage.getItem('questionkey1'));
	$scope.marks_per_question=JSON.parse(localStorage.getItem('sum'));
	$scope.answer_time=JSON.parse(localStorage.getItem('timetaken1'));
	
	
	$scope.total_time=localStorage.getItem('total');
	$scope.total_marks=localStorage.getItem('totalmarks');
	
	$scope.finalresult.push({test_id:$scope.test_id});
	$scope.finalresult.push({test_name:$scope.test_name});
	$scope.finalresult.push({test_description:$scope.test_description});
	$scope.finalresult.push({question_no:$scope.question_no});
	$scope.finalresult.push({marks_per_question:$scope.marks_per_question});
	$scope.finalresult.push({answer_time:$scope.answer_time});
	$scope.finalresult.push({total_time:$scope.total_time});
	$scope.finalresult.push({total_marks:$scope.total_marks});
	
	//alert("finalresult "+$scope.finalresult);
	var jsonresult=JSON.stringify($scope.finalresult);
	
	localStorage.setItem("final_report" , JSON.stringify($scope.finalresult));
	//alert("finalresult json"+jsonresult);
	
	
	
	
	
	
	var db = window.openDatabase("Database.db", "1.0", "Cordova Demo", 200000);
	
	
	//create
	db.transaction(function(transaction) {
		transaction.executeSql('CREATE TABLE IF NOT EXISTS reports (id integer primary key, newdata text)', [],
		function(tx, result) {
			console.log("Table  created successfully");
		},
		function(error) {
			console.log("Error occurred while creating the table.");
		});
	});
	
	
	//insert
	var json_result=(JSON.stringify($scope.finalresult));
	var newdata=json_result;
	
	//select
	db.transaction(function(transaction) {
		transaction.executeSql('SELECT * FROM reports', [], function (tx, results) {
			var no_of_rows=(results.rows.length); 
			
			
			for (var i=0; i < results.rows.length; i++){
				//row = results.rows.item(i);
				row = results.rows.item(i);
				//alert(row['newdata']);
				//return angular.extend({}, results.rows);
				//  console.log("row is " + JSON.stringify(row));
				var test=(row);
				//$localStorage.report=test;
				
				$scope.tests=(test.id);
				
				
				//console.log($scope.tests);
				console.log( $scope.tests);
				$scope.$apply();					 
			}  
		}, null);
		
		
	});
	
	
	
	/*$.ajax({
		
        type: 'POST',
        data:json_result,
        url: 'http://192.168.1.201:8000/test_report',
		
		beforeSend: function(xhr){
		var readystatehook = xhr.onreadystatechange;
		
		xhr.onreadystatechange = function(){
		//readystatehook.apply(this, []);
		//console.log('fired');
		if (xhr.readyState == 4 && xhr.status == 200) {
		//responseText code
		}
		// else ifs for readystate 3 2 and 1 gives a console log
		else {
		console.log("request failed...");
		
		}
		};
		},
        success: function(data){
		console.log(data);
		alert('Your data was successfully added');
        },
		
        error: function(){
		console.log(data);
		alert('There was an error adding your data');
        }
		});
	*/
	
	
	
	
	//update	
	var count;
	var test_id=$scope.test_id;	
	var download_status;
	
	if($scope.total_marks<3)
				{
					var download_status=2; // marks 2 count 2					
				}
				else 
				{
					download_status=4;
					
				}
	
	
	
	video_db.transaction(function(transaction) {
		var executeQuery = "SELECT * FROM test_details WHERE test_id=?";
		transaction.executeSql(executeQuery, [$scope.test_id],
		//On Success
		function(tx, results) {
			for (var i=0; i < results.rows.length; i++){
				row1 = results.rows.item(i);	
				var sql_count=row1['count'];
			//	alert("rr "+ sql_count);
				
				if($scope.total_marks<3 && sql_count<3)
				{
					var download_status=2; // marks 2 count 2
                    sql_count++;
					
					var executeQuery = "UPDATE test_details SET download_status=?,count=? WHERE test_id=?";
					transaction.executeSql(executeQuery, [download_status,sql_count,test_id],
					//On Success
					function(tx, result) {console.log('Updated successfully');},
					//On Error
					function(error){console.log('Something went Wrong');});	
                    //alert("1 "+sql_count);					
				}
				else if($scope.total_marks<3 && sql_count >=3)
				{
					download_status=3;
					var executeQuery = "UPDATE test_details SET download_status=? WHERE test_id=?";
					transaction.executeSql(executeQuery, [download_status,test_id],
					//On Success
					function(tx, result) {console.log('Updated successfully');},
					//On Error
					function(error){console.log('Something went Wrong');});	
					//alert("2 "+sql_count);
				}else 
				{
					download_status=4; //completed
					
					var executeQuery = "UPDATE test_details SET download_status=? WHERE test_id=?";
					transaction.executeSql(executeQuery, [download_status,test_id],
					//On Success
					function(tx, result) {console.log('Updated successfully');},
					//On Error
					function(error){console.log('Something went Wrong');});	
				}
				
			}
			
		},
		//On Error
		function(error){console.log('Something went Wrong');});
	});
	
	video_db.transaction(function(transaction) {
			
			transaction.executeSql('SELECT * FROM test_details', [], function (tx, results) {	
				
				for (var i=0; i < results.rows.length; i++){
					row = results.rows.item(i);	
					var arr_test_id=row['test_id'];
					
					
					var arr_test_status=row['download_status'];	
					var arr_test_count=row['count'];	
					
					
				} 				
			}, null);
		});	
	
/*	video_db.transaction(function(transaction) {
		//alert($scope.total_marks);
		var executeQuery = "UPDATE test_details SET download_status=?,count=? WHERE test_id=?";
		transaction.executeSql(executeQuery, [download_status,count,test_id],
		//On Success
		function(tx, result) {console.log('Updated successfully');},
		//On Error
		function(error){console.log('Something went Wrong');});
});*/
	
	
	
	//video_db.transaction(function(transaction) {
		
	/*	transaction.executeSql('SELECT * FROM test_details', [], function (tx, results) {	
			
			for (var i=0; i < results.rows.length; i++){
				row = results.rows.item(i);	
				alert(JSON.stringify(row));
				var sql_count=row['count'];	
				var sql_status=row['download_status'];	
				//sql_count++;
				//alert("count"+ sql_status);
				/*if($scope.total_marks<3 &&  sql_count<4)
				{
					var download_status=2; // marks 2 count 2
					 sql_count++;
					  count=sql_count;
					alert("1 "+ sql_count);
				}
				else if($scope.total_marks<3 &&  sql_count==3)
				{
					download_status=4;
					alert("2 "+sql_count);
				}else 
				{
					download_status=3; //completed
					alert("3 "+sql_count);
				}
		var executeQuery = "UPDATE test_details SET download_status=?,count=? WHERE test_id=?";
		transaction.executeSql(executeQuery, [download_status,count,test_id],
		//On Success
		function(tx, result) {alert('Updated successfully');},
		//On Error
				function(error){alert('Something went Wrong');});*/
				
		/*	} 
		}, null);
	});	
	*/
	
	
	
	
	
};