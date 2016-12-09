app.controller('Videoreport', Videoreport);





function Videoreport ($scope,$mdDialog,$localStorage) {
	// $scope.reports = store.get('reports');
	
	$localStorage.report=new Array();
	
	
	
	
	/*$scope.test_id=localStorage.getItem('test_id');
		$scope.test_name=localStorage.getItem('test_name');
		$scope.test_description=localStorage.getItem('test_name');
		$scope.answertime=localStorage.getItem('timetaken1');
		$scope.totalmarks=localStorage.getItem('totalmarks');
		$scope.question_no=localStorage.getItem('questionkey1');
		$scope.marksperquestion=localStorage.getItem('sum');
	$scope.totaltime=localStorage.getItem('total'); */
	
	
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
	var jsonresult=JSON.stringify($scope.finalresult);
	
	
	
	
	//update	
	
	var test_id=$scope.test_id;	
	var test_taken_status=1;
	
	sqdb.transaction(function(transaction) {
		var executeQuery = "UPDATE test_con SET test_taken_status=? WHERE test_id=?";
		transaction.executeSql(executeQuery, [test_taken_status,test_id],
		//On Success
		function(tx, result) {alert('Updated successfully');alert(test_id);},
		//On Error
		function(error){alert('Something went Wrong');});
	});
	
};