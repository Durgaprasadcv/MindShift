var testpath= "taketest.html";
var allreportpath= "allreport.html";
var reportpath= "reportsample.html";
var videopath= "videocard.html";
var url= "http://192.168.1.201:8000/gettest";



var sqdb = window.openDatabase("testcontrol.db", "1.0", "Cordova Demo", 200000);

         //create
		   sqdb.transaction(function(transaction) {
			transaction.executeSql('CREATE TABLE IF NOT EXISTS test_con (id integer primary key, test_id integer, test_taken_status integer)', [],
			function(tx, result) {
				console.log("Table  created successfully");
			},
			function(error) {
				console.log("Error occurred while creating the table.");
			});
			});