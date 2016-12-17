angular
	.module('MyApp').controller('testController', testController);

function testController($scope, $http, $location, $localStorage, pouchDB, $timeout, $cordovaFileTransfer) {

	var k = 0;
	var arr_test_id = new Array();
	var arr_test_status = new Array();
	var arr_test_count = new Array();
	var arr_test_path = new Array();
	var arr_id = new Array();
	var arr_path = new Array();
	var newarr = new Array();

	//document.addEventListener("deviceready", onDeviceReady, false);
	//function onDeviceReady()
	{

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
		FusionCharts.ready(function () {
			var fusioncharts = new FusionCharts({
				type: 'angulargauge',
				renderAt: 'chart-container',
				width: '350',
				height: '170',
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
							"maxValue": "4",
							"code": "#e44a00"
						}]
					},
					"dials": {
						"dial": [{
							"value": "2"
						}]
					}
				}
			});
			fusioncharts.render();
		});

		//	var video_db = window.openDatabase("Database.db", "1.0", "Cordova Demo", 200000);



		//var localDB = new PouchDB('app1');
		//	var remoteDB = new PouchDB('http://106.187.53.245:5984//main_videoapp');

		//sync
		//localDB.sync(remoteDB, {live: true, retry:true });

		/*localDB.allDocs({include_docs: true, descending: true}, function(err, res) {
			$scope.$apply(function(){  			
				$.each(res.rows, function(p, field){				
					var jsondata=(JSON.stringify(field['doc']['data']));				  
					//$scope.testss1=JSON.parse(jsondata);labels
					//alert(jsondata);
				});			
			});
		});	*/

		//newarr=[1,2];


		$http({
			method: 'POST',
			url: 'http://192.168.1.201:8000/gettest',


			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).success(function (res) {

			$.each(res, function (p, field) {
				var jsondata = (JSON.stringify(field));
				console.log(jsondata);
				$scope.testss1 = JSON.parse(jsondata);
				$scope.test_id = (field['test_id']);

			});
		});

		$http({
			method: 'POST',
			url: 'http://192.168.1.201:8000/gettest',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).success(function (res) {

			$.each(res['data'], function (p, field) {
				var jsondata = (JSON.stringify(field));
				$scope.test_id = (field['test_id']);
				$scope.video_path = (field['video_path']);
				arr_id.push($scope.test_id);
				arr_path.push($scope.video_path);

			});

			video_db.transaction(function (transaction) {

				for (j = 0; j < arr_id.length; j++) {
					var test_id = arr_id[j];
					var video_path = arr_path[j];
					var count = 0;
					var download_status = 1;
					var executeQuery = "INSERT OR IGNORE INTO test_details(test_id,video_path,count,download_status) VALUES (?,?,?,?)";
					transaction.executeSql(executeQuery, [test_id, video_path, count, download_status], function (tx, result) {
							console.log('Inserted');
						},
						function (error) {
							console.log('Error occurred');
						});
				}
			});
			var resources = [
				"http://cdn.wall-pix.net/albums/art-space/00030109.jpg",
				"http://techslides.com/demos/sample-videos/small.mp4"

				//"http://localhost:88/videoapp_files/tvs.mp4",
				//"http://localhost:88/videoapp_files/insur.mp4"

				//"http://192.168.0.151:88/videoapp_files/tvs.mp4",
				//"http://192.168.0.151:88/videoapp_files/insur.mp4"
			];

			//select
			video_db.transaction(function (transaction) {

				transaction.executeSql('SELECT * FROM test_details', [], function (tx, results) {

					for (var i = 0; i < results.rows.length; i++) {
						row = results.rows.item(i);
						arr_test_id[k] = row['test_id'];
						arr_test_path[k] = row['video_path'];
						arr_test_status[k] = row['download_status'];
						arr_test_count[k] = row['count'];
						//if(arr_test_status[k]==0){

						var url = encodeURI(arr_test_path[k]);

						var imageName = url.split('/').pop();
						var test_id = arr_id[i];
						var targetPath = cordova.file.externalDataDirectory + imageName;
						//var targetPath =  "cordova.file.dataDirectory"+imageName;							 
						var trustHosts = true;
						var options = {};
						var newarrp = new Array();
						newarrp.push(url);
						alert("path" + newarrp);
						$scope.progress = true;
						$cordovaFileTransfer.download(newarrp, targetPath, options, trustHosts)
							.then(function (result) {
								// Success!
								alert("success");

								video_db.transaction(function (transaction) {

									var download_status = 1;
									var executeQuery = "UPDATE test_details SET download_status=? WHERE test_id=?";
									transaction.executeSql(executeQuery, [download_status, test_id],
										//On Success
										function (tx, result) {
											alert('Updated successfully');
										},
										//On Error
										function (error) {
											alert('Something went Wrong');
										});
									//alert("1 "+sql_count);					


								});

								//select
								video_db.transaction(function (transaction) {

									transaction.executeSql('SELECT * FROM test_details', [], function (tx, results) {

										for (var i = 0; i < results.rows.length; i++) {
											row = results.rows.item(i);
											alert(JSON.stringify(row));
										}
									}, null);
								});


								//alert(JSON.stringify(result));
							}, function (err) {
								// Error
								console.log("error");
								console.log(JSON.stringify(err));
							}, function (progress) {
								$timeout(function () {

									var percent = Math.round((progress.loaded / progress.total) * 100);
									//if(percent>99)
									//{
									$scope.progress = false;
									//alert(percent);

									//}
									var progressbar1 = $("#progressbar2");
									progressbar1.append('<div   role="progressbar" class="progress-bar progress-bar-success" style="width:' + (percent) + '%"></div>');
								});
							});

						//}

						//alert(arr_test_count[k]);
						//alert("count "+arr_test_count[k]);
						//alert("status "+arr_test_status);
						k++;
					}
				}, null);
			});


			$scope.listcolor = function (test_id) {
				//	alert(test_id);
				//alert("yy "+arr_test_id[test_id]);
				for (j = 0; j < arr_test_id.length; j++) {


					if (arr_test_id[j] == test_id && arr_test_status[j] == 1) {

						return {

							"background-color": "white"
						}

					} else if (arr_test_id[j] == test_id && arr_test_status[j] == 2) {
						//alert("coral");
						return {
							"color": "white",
							"background-color": "coral"
						}

					} else if (arr_test_id[j] == test_id && arr_test_status[j] == 3) {
						//alert("coral");
						return {
							"color": "white",
							"background-color": "red"
						}

					} else if (arr_test_id[j] == test_id && arr_test_status[j] == 4) {
						//alert("green");
						return {
							"color": "white",
							"background-color": "green"
						}
					}

				}
			}



			$scope.starttest = function (test_id) {


				for (j = 0; j < arr_test_status.length; j++) {

					if (arr_test_id[j] == test_id && arr_test_status[j] == 0) {
						window.location.href = "navbar.html";

					} else if (arr_test_id[j] == test_id && arr_test_status[j] == 1) {
						localStorage.setItem("test_id", test_id);
						$scope.test_id = localStorage.setItem("test_id", test_id);
						window.location.href = "videocard.html";

					} else if (arr_test_id[j] == test_id && arr_test_status[j] == 2) {
						localStorage.setItem("test_id", test_id);
						$scope.test_id = localStorage.setItem("test_id", test_id);
						window.location.href = "videocard.html";

					} else if (arr_test_id[j] == test_id && arr_test_status[j] == 3) {
						window.location.href = "navbar.html#/allreport";

					} else if (arr_test_id[j] == test_id && arr_test_status[j] == 4) {
						window.location.href = "navbar.html#/allreport";

					}
				}

			}

		}); //http

	} //device ready	

	function abc() {
		//var newarr=new Array();
		//newarr=[1,2];



	}

};