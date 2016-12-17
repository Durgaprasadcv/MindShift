
angular
.module('MyApp').controller('testController', testController);
function testController ($scope,$http,$location,$localStorage,pouchDB,$timeout,$cordovaFileTransfer) {
	
	var k=0; var arr_test_id=new Array();
	var arr_test_status=new Array();
	var arr_test_count=new Array();
	
	
	document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady(){
	
	//slider
	$('.carousel').carousel({
		  interval: 2000
		});
		
		//graph
		$scope.labels = ['Test1', 'Test2', 'Test3'];
    $scope.series = ['Test 1', 'Test 2'];
	$scope.colours = ['#717984'];
	
    $scope.data = [	
		[70, 48, 60]
	];
		FusionCharts.ready(function(){
			var fusioncharts = new FusionCharts({
				type: 'angulargauge',
				renderAt: 'chart-container',
				width: '350',
				height: '200',
				dataFormat: 'json',
				dataSource: {
					"chart": {
						"caption": "Total Test",
						"subcaption": "Current Test",
						"lowerLimit": "1",
						"upperLimit": "4",
						"theme": "fint"
					},
					"colorRange": {
						"color": [{
							"minValue": "0",
							"maxValue": "2",
							"code": "#e44a00"
							}, {
							"minValue": "2",
							"maxValue": "3",
							"code": "#f8bd19"
							}, {
							"minValue": "3",
							"maxValue": "4",
							"code": "#6baa01"
						}]
					},
					"dials": {
						"dial": [{
							"value": "2"
						}]
					}
				}
			}
			);
			fusioncharts.render();
		});
		
		var video_db = window.openDatabase("Database.db", "1.0", "Cordova Demo", 200000);
		
	
	
		var localDB = new PouchDB('app1');
		var remoteDB = new PouchDB('http://106.187.53.245:5984//main_videoapp');
		
			//sync
		localDB.sync(remoteDB, {live: true, retry:true });
		
		localDB.allDocs({include_docs: true, descending: true}, function(err, res) {
			$scope.$apply(function(){  			
				$.each(res.rows, function(p, field){				
					var jsondata=(JSON.stringify(field['doc']['data']));				  
					//$scope.testss1=JSON.parse(jsondata);
					//alert(jsondata);
				});			
			});
		});	
		var newarr= new Array(); var n=0;
		newarr=[1,2];
		
		
		$http({
			method  : 'POST',
			url     : 'http://192.168.1.201:8000/gettest',
		
			  
			headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).success(function(res){
			
			$.each(res, function(p, field){
			var jsondata=(JSON.stringify(field));			
			$scope.testss1=JSON.parse(jsondata);
			//$scope.test_id=(field['test_id']);				
								
		});						
	});
		
		$http({
			method  : 'POST',
			url     : 'http://192.168.1.201:8000/gettest',			  
			headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).success(function(res){
		
			$.each(res['data'], function(p, field){
				var jsondata=(JSON.stringify(field));				
				$scope.test_id=(field['test_id']);	
				alert($scope.test_id);
		       //newarr.push($scope.test_id);			
			});
		
		video_db.transaction(function(transaction) {
			
			for(j=0;j<newarr.length;j++)
			{	
				var test_id=newarr[j];
				//alert(test_id);
				var count=0;						
				var download_status=1;
				var executeQuery = "INSERT OR IGNORE INTO test_details(test_id,count,download_status) VALUES (?,?,?)";
				transaction.executeSql(executeQuery, [test_id,count,download_status]
				, function(tx, result) {
					console.log('Inserted');					
				},
				function(error){
					console.log('Error occurredaaaa');
				});
			}
		}); 
		
		//select
		video_db.transaction(function(transaction) {
			
			transaction.executeSql('SELECT * FROM test_details', [], function (tx, results) {	
				
				for (var i=0; i < results.rows.length; i++){
					row = results.rows.item(i);	
					//alert(JSON.stringify(row));
					arr_test_id[k]=row['test_id'];
					alert(row['test_id']);
					//alert(arr_test_id['test_id']);
					
					arr_test_status[k]=row['download_status'];	
					arr_test_count[k]=row['count'];	
					//alert(arr_test_count[k]);
					//alert("count "+arr_test_count[k]);
					//alert("status "+arr_test_status);
					k++;										
				} 				
			}, null);
		});	
		
		
		var i=0,tid=0;
		var test_id;
		var video_id=new Array();
		var video_path=new Array();
		$scope.progress = true;
		
		
		$scope.listcolor = function(test_id){
			//	alert(test_id);
			//alert("yy "+arr_test_id[test_id]);
			for(j=0;j<arr_test_id.length;j++)
			{
				
				
				if(arr_test_id[j]==test_id &&arr_test_status[j]==1)
				{
					
					return {
						
						"background-color" : "white"
					} 
					
				}else if(arr_test_id[j]==test_id &&arr_test_status[j]==2)
				{				
					//alert("coral");
					return {
						"color" : "white",
						"background-color" : "coral"
					} 
					
				}else if(arr_test_id[j]==test_id &&arr_test_status[j]==3)
				{				
					//alert("coral");
					return {
						"color" : "white",
						"background-color" : "red"
					} 
					
				}else if(arr_test_id[j]==test_id &&arr_test_status[j]==4)
				{			
					//alert("green");
					return {
						"color" : "white",
						"background-color" : "green"
					} 
				}
				
			}	
		}
		
		
		
		$scope.starttest = function(test_id) {	
			
			for(j=0;j<arr_test_status.length;j++)
			{
				
				if(arr_test_id[j]==test_id && arr_test_status[j]==0)
				{							
					window.location.href = "navbar.html";	
					
				}else if(arr_test_id[j]==test_id && arr_test_status[j]==1)
				{		
					localStorage.setItem("test_id" , test_id);
					$scope.test_id=localStorage.setItem("test_id" , test_id);
					window.location.href = "videocard.html";	
					
				}else if(arr_test_id[j]==test_id && arr_test_status[j]==2)
				{				
					localStorage.setItem("test_id" , test_id);
					$scope.test_id=localStorage.setItem("test_id" , test_id);
					window.location.href = "videocard.html";	
					
				} else if(arr_test_id[j]==test_id && arr_test_status[j]==3)
				{				
					window.location.href = "navbar.html#/allreport";	
					
				} else if(arr_test_id[j]==test_id && arr_test_status[j]==4)
				{				
					window.location.href = "navbar.html#/allreport";	
					
				} 
			}
			
		}
		
		}); //http
		
	} //device ready	
	
	
	
};	