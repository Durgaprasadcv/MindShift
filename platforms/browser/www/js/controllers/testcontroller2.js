
angular
.module('MyApp').controller('testController', testController);
function testController ($scope,$http,$location,$localStorage,pouchDB,$timeout,$cordovaFileTransfer) {
	
	document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady(){
		var k=0; var arr_test_id=new Array();
		var arr_test_status=new Array();
		var arr_test_count=new Array();
		var newarr= new Array(); var n=0;
		
	
		
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
		/*localDB.allDocs({include_docs: true, descending: true}, function(err, res) {
			$scope.$apply(function(){  			
				$.each(res.rows, function(p, field){				
					var jsondata=(JSON.stringify(field['doc']['data']));				  
					$scope.testss1=JSON.parse(jsondata);
				});			
			});
		});	*/
		
		//fetch each value
		//localDB.get('001', function(err, res) {
			
		$http({
			method  : 'POST',
			url     : 'http://192.168.1.201:8000/gettest',			  
			headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).success(function(res){
		
			$.each(res['data'], function(p, field){
				var jsondata=(JSON.stringify(field));				
				$scope.test_id=(field['test_id']);	
				alert($scope.test_id);
				newarr.push($scope.test_id);			
			});
			//insert
			video_db.transaction(function(transaction) {			
				
				for(j=0;j<newarr.length;j++)
				{				
					var test_id=newarr[j];
					var video_path="null";
					var count=0;						
					var download_status=1;					
					var executeQuery = "INSERT OR IGNORE INTO test_details(test_id,video_path,count,download_status) VALUES (?,?,?,?)";
					transaction.executeSql(executeQuery, [test_id,video_path,count,download_status]
					, function(tx, result) {
						console.log('Inserted');							
					},
					function(error){
						console.log('Error occurred');
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
						//alert(row['test_id']);
						//alert(arr_test_id['test_id']);
						
						arr_test_status[k]=row['download_status'];	
						arr_test_count[k]=row['count'];	
						
						if(arr_test_status[k]==1){
							
							download_video();
						}
						
					
						function download_video()
						{
							$scope.progress = true;
							var resources = [
								"http://cdn.wall-pix.net/albums/art-space/00030109.jpg",
								"http://techslides.com/demos/sample-videos/small.mp4"
								
								//"http://localhost:88/videoapp_files/tvs.mp4",
								//"http://localhost:88/videoapp_files/insur.mp4"
								
								//"http://192.168.0.151:88/videoapp_files/tvs.mp4",
								//"http://192.168.0.151:88/videoapp_files/insur.mp4"
							];												
							//for(i=0;i<arr_test_id.length;i++)
							//{
								//alert("yy "+arr_test_id[i]);
								//alert("k"+arr_test_status[i]);
								var url =encodeURI(resources[i]);
								var imageName = resources[i].split('/').pop();
								var test_id=arr_test_id[i];
								//var targetPath = cordova.file.externalRootDirectory +imageName;
								var targetPath =cordova.file.externalDataDirectory +imageName;
								
								//var targetPath =cordova.file.applicationDirectory +imageName;
								//alert(targetPath);
								//var targetPath =  "cordova.file.dataDirectory"+imageName;
								//  alert( targetPath);
								var trustHosts = true;
								var options = {};
								var newarrp = new Array();
								newarrp.push(encodeURI(resources[i]));
								//alert("h "+ newarrp);
								
								//abc();
								
								$cordovaFileTransfer.download(newarrp, targetPath, options, trustHosts)
								.then(function(result) {
									// Success!
									console.log("success");					
									
									video_db.transaction(function(transaction) {	
										
										var download_status=1;
										var executeQuery = "UPDATE test_details SET download_status=?, video_path=? WHERE test_id=?";
										transaction.executeSql(executeQuery, [download_status,targetPath,test_id],
										//On Success
										function(tx, result) {
											alert('Updated successfully');
											
											
										},
										//On Error
										function(error){alert('Something went Wrong');});	
										//alert("1 "+sql_count);					
										
										
									}); 
									
									//select
									video_db.transaction(function(transaction) {
										
										transaction.executeSql('SELECT * FROM test_details', [], function (tx, results) {	
											
											for (var i=0; i < results.rows.length; i++){
												row = results.rows.item(i);	
												//alert("up "+JSON.stringify(row));
												alert(JSON.stringify(result));
												
											} 
										}, null);
									});	
									}, function(err) {
									// Error
									console.log("error");								
									console.log(JSON.stringify(err));
									}, function (progress) {
									$timeout(function () {	
										
										var percent = Math.round((progress.loaded / progress.total) * 100);		
										if(percent>99)
										{
											$scope.progress = false;
											//alert(percent);										
										}
										var progressbar1 = $("#progressbar2");																
										progressbar1.append('<div   role="progressbar" class="progress-bar progress-bar-success" style="width:'+(percent)+'%"></div>');
									});
								});	
								
							//} 							
						}
						k++;
						
						
						//alert(arr_test_count[k]);
						//alert("count "+arr_test_count[k]);
						//alert("status "+arr_test_status);
						
					} 				
				}, null);
			});	
			
			//list color		
			$scope.listcolor = function(test_id){
				
				
				for(j=0;j<arr_test_id.length;j++)
				{
					
					//alert("yy ff"+arr_test_status[j]);
					
					
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
			
			
			//onclick function
			$scope.starttest = function(test_id) {	
				
				for(j=0;j<arr_test_status.length;j++)
				{
					
					if(arr_test_id[j]==test_id && arr_test_status[j]==0)
					{							
						
						
					}else if(arr_test_id[j]==test_id && arr_test_status[j]==1)
					{		
						localStorage.setItem("test_id" , test_id);
						
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
				
			}  // onclick function
			
		});
		
		
		
		
		
		//slider
		$('.carousel').carousel({
			interval: 2000
		});
		
		//graph
		$scope.labels = ['Test1', 'Test2', 'Test3'];
		$scope.series = ['Test 1'];
		$scope.colours = ['#717984'];
		
		$scope.data = [	
			[70, 48, 60]
		]; 
		
		
		
		//gauge
		
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
		
		
		
	}  //close device ready
	
	
	
	
	
};	