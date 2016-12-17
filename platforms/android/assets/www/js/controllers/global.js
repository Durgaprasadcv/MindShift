var testpath= "taketest.html";
var allreportpath= "allreport.html";
var reportpath= "reportsample.html";
var videopath= "videocard.html";
var url= "http://192.168.1.201:8000/gettest";



		/*var localDB = new PouchDB('app1');
		var remoteDB = new PouchDB('http://106.187.53.245:5984//main_videoapp');
		
		//sync
		localDB.sync(remoteDB, {live: true, retry:true });*/
		
		
		
var video_db = window.openDatabase("Database.db", "1.0", "Cordova Demo", 200000);
		/*\\video_db.transaction(function(transaction) {
			var executeQuery = "DROP TABLE IF EXISTS test_details";
			transaction.executeSql(executeQuery, [],
			function(tx, result) {console.log('Table deleted successfully.');},
			function(error){console.log('Error occurred while droping the table.');}
			);
		});*/
		
		//create
		video_db.transaction(function(transaction) {
			transaction.executeSql('CREATE TABLE IF NOT EXISTS test_details (id integer PRIMARY KEY, test_id integer UNIQUE, video_path text, count integer, download_status integer)', [],
			function(tx, result) {
				console.log("Table  created successfully");
			},
			function(error) {
				console.log("Error occurred while creating the table.");
			});
		});