

(function VideoController($angular) {
	
	var q_id= new Array();
	var mn=0;
	var progress=0;
	var k=1,j;
	var z=0,g=0;
	var countTimer;
	var timerVar;
    var testend;
	var ans;
	var answers;
	var marks_assigned;
	var hour,minute,seconds;
	//var t=0;
	var x=1,y=1,w=1,u=1,m=1,wt=1,an=1,noq=1;
	var count=0;
	var jk=1,pgrs=1;
	var aans;
	var totalmarks=0;
	var wait_time=0;
	var answers=0;
	var videoend=0; var se=1;
	var no_of_questions;
	var feedback_questions;
	var total_questions;
	var progInc,ac;
	var noq=1;
	var timer;
	var progress=0;
	var waittime= new Array();
    var timetaken= new Array();
	var answered= new Array();
	var answerkey= new Array();
	var questionkey= new Array();
	var marksassigned= new Array();
    /**
		* @module ngVideo
		* @author Adam Timberlake
		* @link https://github.com/Wildhoney/ngVideo
		* @controller VideoController
		* @param $scope {Object}
	*/
    $angular.module(APP_NAME).controller('VideoController',function($scope,$timeout,video,$http,$localStorage,$mdDialog,$interval) {
		
		
		$scope.timetaken1= new Array();
		$scope.answered1= new Array();
		$scope.questionkey1= new Array();
		$scope.marksassigned1= new Array();
		$scope.waittime1= new Array();
		$scope.total=0;
		$scope.sum= new Array();
		$scope.sum1=new Array();
		$scope.likequestion=new Array();
		
		
		$scope.selected_test_id = localStorage.getItem('test_id');
		var taketest1=0;var taketest=0;
		$scope.jsondata=$.parseJSON(localStorage.getItem('jsondata'));
		var jsondata=$scope.jsondata['test_id'];
		
		
		$http({
			method  : 'POST',
			url     : 'http://192.168.1.201:8000/gettest',
			data    : $.param({
				'test_id':$scope.test_id   // pass in data as strings
				
			}),  
			headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
			}).success(function(data) {
			
			// console.log(JSON.stringify(data)+" success");
			$.each(data['data'], function(p, field){
				var jsondata=(JSON.stringify(field));
				//alert(jsondata);
				$scope.testss1=JSON.parse(jsondata);
				$scope.test_id=field['test_id'];
				//alert($scope.testid);
				
				if($scope.selected_test_id == $scope.test_id )
				{
					taketest=field;	
					
					$scope.test_name=(taketest['test_name']);
					$scope.test_description=(taketest['test_description']);
					$scope.video_path=(taketest['video_path']);
					no_of_questions=(taketest['no_of_questions']);
					feedback_questions=(taketest['feedback_questions']);

				};
				
			});
			
		total_questions=no_of_questions+feedback_questions;
		
			
			/**
				* @property playlistOpen
				* @type {Boolean}
				* @default false
			*/
			$scope.playlistOpen = false;
			$scope.chkbx = false;
			$scope.qtitle = false;
			$scope.radiobtn = false;
			$scope.dropdwn = false;
			$scope.startvideo = true;
			$scope.progress = false;
			$scope.submitbtn=false;
			$scope.question=false;
			$scope.endbtn=false;
			$scope.next=false;
			$scope.report=false;
			$("#myModal").hide();
			$("#myReport").hide();
			$("#starttest").show();
			$("#clickevent").show();
			$("#dialogbox").hide();
			$("#timer1").hide();
			$("#cirtimer").hide();
			
			//$("#ques").hide();
			
			
			
			/**
				* @property videos
				* @type {Object}
				
				$scope.videos = {
				first:  '../../media/Skyfall.mp4',
				second: 'http://www.w3schools.com/html/movie.mp4'
				
			}; **/
			$scope.videos = {
				first: $scope.video_path
			};	
			
			//alert("video_path"+$scope.video_path);
			/**
				* @method playVideo
				* @param sourceUrl {String}
				* @return {void}
			*/
			$scope.playVideo = function playVideo(sourceUrl) {
				video.addSource('mp4', sourceUrl, true);
				
			};
			
			/**
				* @method getVideoName
				* @param videoModel {Object}
				* @return {String}
			*/
			$scope.getVideoName = function getVideoName(videoModel) {
				
				switch (videoModel.src) {
					case ($scope.videos.first): return test_name;
					default: return "Unknown Video";
				}
				
			};
			
			// Add some video sources for the player!
			video.addSource('mp4', $scope.videos.first);
			$scope.playvideo = function playvideo() {
				$scope.startvideo = false;
				$scope.progress = true;
				var video = document.getElementById('video1');
				$scope.playvideo1();
				$("#starttest").hide();
				//$("#dialogbox").dialog('open');
			};
			
			
			
			
			
			
			$scope.playvideo1=function playvideo1() {
				if((window.matchMedia("(orientation: landscape)").matches)){
					
					var iteration=0;
					var currtime;
					var video = document.getElementById('video1');
					
					//$scope.wait_time=(taketest['question'][iteration]['wait_time']);	
					$scope.question_id=(taketest['question'][iteration]['question_id']);	
					$scope.Pause_time=(taketest['question'][iteration]['Pause_time']);
					
					//alert($scope.wait_time);
					video.addEventListener("timeupdate", function() {
						stop=true;
						if (currtime==$scope.Pause_time && stop) {
							
							
							this.pause();
							$scope.wait(iteration);
							
							iteration++;
							
						}
						currtime= this.currentTime.toFixed(0);
						if (iteration <= taketest['question'].length-1)
						{
							
							//$scope.wait_time=(taketest['question'][iteration]['wait_time']);	
							$scope.question_id=(taketest['question'][iteration]['question_id']);	
							$scope.Pause_time=(taketest['question'][iteration]['Pause_time']);
							$scope.answers=(taketest['question'][iteration]['answers']);
							
						}
						else
						{
							
							$scope.submitbtn=false;
							$scope.question=true;
							$scope.endbtn=true;
							$("#myModal").show();
							$("#clickevent").show();
							//$scope.showConfirm();
							
							
							stop=false;
							
							this.pause();
						}	
					}, false);
					
					//suppose that video src has been already set properly
					video.load();
					video.play();    //must call this otherwise can't seek on some browsers, e.g. Firefox 4
					}else { alert("portrait");
					//clearInterval(progInc);
				}
				
				
			}
			
			
			$scope.wait= function wait(z,iteration){
				progress=0;
				$scope.ctime();
				
				var question_id=(taketest['question'][z]['question_id']);
				var question_type=(taketest['question'][z]['question_type']);
				var question_title=(taketest['question'][z]['question_title']);
				answers=(taketest['question'][z]['answers']);
				wait_time=(taketest['question'][z]['wait_time']);
				marks_assigned=(taketest['question'][z]['marks_assigned']);	 
				
				//alert(wt);
				
				waittime[wt]=wait_time;
				wt++;
				answerkey[w]=answers;
				w++;
				questionkey[u]=question_id;
				u++;
				marksassigned[m]=marks_assigned;
				m++;
				
				
				var num_of_box=(taketest['question'][z]['num_of_box']);
				$scope.qtitlesh(question_id,question_title);
				for(v=0;v<num_of_box;v++)
				{
					var id=(taketest['question'][z]['type_options'][v]['id']);
					var name=(taketest['question'][z]['type_options'][v]['name']);
					
					if(question_type=="checkbox")
					{
						$scope.checkboxx(question_id,id,name);
						
					}
					else if(question_type=="radio")
					{
						$scope.radiobutton(question_id,id,name,question_title);
					}
					else if(question_type=="dropdown")
					{
						$scope.dropdown(question_id,id,name,question_title);
						
					}
					
				}
				
				$scope.button();
				
				//alert(waittime);
				
			}
			
			
			
			$scope.button= function button()
			{
				
				$scope.submitbtn=true;
				
				$scope.question=true;
				$("#myModal").show();
				$("#dialogbox").show();
				//$( "#dialogbox" ).dialog( "open" );
				$("#clickevent").show();
				//$scope.showConfirm();
				
				
				
			}
			// $progressbar.css("width", Math.round(100 * currentQuestion / totalQuestions) + "%");
			percent=(100 * 1 / (no_of_questions));
			//percent=(100 / (no_of_questions));
			//percent=percent-1;
			$scope.submit1=function submit1()
			{
				
				
				var progressbar1 = $("#progressbar2");	
				if((ans == answers)){
					
					progressbar1.append('<div   role="progressbar" class="progress-bar progress-bar-success" style="width:'+(percent)+'%"></div>');
					
					
				}
				else if((ans!= answers)){	
					progressbar1.append('<div role="progressbar" class="progress-bar progress-bar-danger" style="width:'+
					(percent)+'%"></div>');		
					
				}
				
				var video = document.getElementById('video1');
				$("#checkboxes").html("");
				$("#radiobtn").html("");							 
				$("#select").html("");
				$("#question_title").html("");
				
				
				answered[x]= ans;
				x++;
				
				video.play();
				clearInterval(progInc);
				delete progInc;
				prog=0;
				$scope.submitbtn=false;
				$scope.question=false;
				$("#myModal").hide();
				$("#dialogbox").hide();
				$("#clickevent").hide();
				$("#timer1").hide();
				$("#cirtimer").hide();				
				$scope.endtime();
				//testend=hour + ":" + minute + ":" + seconds;
				jk=jk+1;
				noq=noq+1;				
			}
			
			
			
			$scope.qtitlesh=function qtitlesh(question_id,question_title)
			{
				
				$("#question_title").append($("<label>").text(question_title).attr('id', question_id));
				
				$scope.qtitle = true;
				
			}
			$scope.checkboxx=function checkboxx(question_id,id,name)
			{
				$("#gosubmit").attr("disabled", "disabled");
				$("#endbtn").attr("disabled", "disabled");
				
				$("#checkboxes").append($("<label>").text(name).prepend(
				$("<input>").attr('type', 'checkbox').attr('name', question_id).val(id)));
				
				$("#checkboxes").on('click', '[type=checkbox]', function () {
					console.log($(this).val());
					ans=$(this).val(); 
					$("#gosubmit").removeAttr("disabled");
					$("#endbtn").removeAttr("disabled");
					// alert($(this).val());
				});
				$scope.chkbx = true;
				
				$("#checkboxes").click(function() {				
					//$("#gosubmit").removeAttr("disabled");
					//$("#endbtn").removeAttr("disabled");	
				});	
			};
			
			$scope.radiobutton=function radiobutton(question_id,id,name)
			{
				$("#gosubmit").attr("disabled", "disabled");		
				$("#endbtn").attr("disabled", "disabled");	
				
				$("#radiobtn").append($("<label>").text(name).prepend(
				$("<input>").attr('type', 'radio').attr('name', question_id).val(id)));
				
				
				
				$("#radiobtn").on('click', '[type=radio]', function () {
					console.log($(this).val());
					ans=$(this).val();
					$("#gosubmit").removeAttr("disabled");
					$("#endbtn").removeAttr("disabled");
					// alert($(this).val());
				});
				
				$scope.radiobtn = true;
				
				$("#radiobtn").click(function() {
					//ans=$(this).val(); 
					//$("#gosubmit").removeAttr("disabled");
					//$("#endbtn").removeAttr("disabled");
				});
				
			};
			
			
			
			$scope.dropdown=function dropdown(question_id,id,name)
			{
				$("#gosubmit").attr("disabled", "disabled");		
				$("#endbtn").attr("disabled", "disabled");	
				$("#dropdown").append($("<select>").append(
				$("<option>").attr('name', question_id).val(id)
				
				));
				$("#dropdown").on('click', '[type=dropdown]', function () {
					console.log($(this).val());
					ans=$(this).val();
				});
				
				$scope.dropdwn = true;
				
				$("#dropdown").click(function() {							 
					$("#gosubmit").removeAttr("disabled");
					$("#endbtn").removeAttr("disabled");
				});
				
			}
			
			
			
			
			$scope.ctime=function ctime(video)
			{
				
				
				//window.screen.orientation.addEventListener('change', function() {
				if((window.matchMedia("(orientation: landscape)").matches)){
					timerVar = setInterval(countTimer, 1000);
					var totalSeconds = 0;
					
					function countTimer() {
						++totalSeconds;
						hour = Math.floor(totalSeconds /3600);
						minute = Math.floor((totalSeconds)/60);
						seconds = totalSeconds - (minute*60);
						
						
						testend=seconds;
						
						//document.getElementById("timer").innerHTML = seconds;
						
						$("#cirtimer").show();
      					var progressbar = document.querySelector('div[data-progress]'),
						quad1 = document.querySelector('.quad1'),
						quad2 = document.querySelector('.quad2'),
						quad3 = document.querySelector('.quad3'),
						quad4 = document.querySelector('.quad4'),
						counter = document.querySelector('.counter');
						
						
						//alert(waittime[jk]);
						
						//if(waittime[jk]!="null"){	
						if(noq<=total_questions){	
							//alert(noq);
							progInc= setInterval(incrementProg(testend),1000);
							//progInc = setInterval(incrementProg, 1000);
							// progInc = incrementProg(testend);
							
							function incrementProg(testend) {
								
								progressbar.setAttribute('data-progress', progress); //set value to attribute
								counter.textContent = waittime[jk]- parseInt(testend, 10);
								if(testend>0){
									
									var mn=100/waittime[jk];
									progress=progress+mn;
									setPie(progress);
									
									
								}
								if (testend>waittime[jk]) {
									
									clearInterval(progInc);
									delete progInc;
									
								}
							}
							
							
							
							function setPie(progress) {
								/* If progress is less than 25, modify skew angle the first quadrant */
								if (progress <= 25) {
									quad2.setAttribute('style', 'box-shadow: inset 0px 0px 0px 5px rgba(0, 0, 0, 0.5)'); 
									quad3.setAttribute('style', 'box-shadow: inset 0px 0px 0px 5px rgba(0, 0, 0, 0.5)'); 
									quad4.setAttribute('style', 'box-shadow: inset 0px 0px 0px 5px rgba(0, 0, 0, 0.5)'); 
									quad1.setAttribute('style', 'transform: skew(' + progress * (-90 / 25) + 'deg)');
									progressbar.setAttribute('style', 'box-shadow: inset 0px 0px 0px 5px blue'); 
								}
								
								/* Between 25-50, hide 1st quadrant + modify skew angle of 2nd quadrant */
								else if (progress > 25 && progress <= 50) {
									quad1.setAttribute('style', 'transform: skew(-90deg)'); // hides 1st completely
									//quad3.setAttribute('style', 'box-shadow: inset 0px 0px 0px 5px rgba(0, 0, 0, 0)'); 
									//quad4.setAttribute('style', 'box-shadow: inset 0px 0px 0px 5px rgba(0, 0, 0, 0)'); 
									quad2.setAttribute('style', 'transform: skewY(' + (progress - 25) * (90 / 25) + 'deg)');
									progressbar.setAttribute('style', 'box-shadow: inset 0px 0px 0px 5px blue'); 
								}
								
								/* Between 50-75, hide first 2 quadrants + modify skew angle of 3rd quadrant */
								else if (progress > 50 && progress <= 75) {
									quad1.setAttribute('style', 'transform: skew(-90deg)'); // hides 1st completely
									quad2.setAttribute('style', 'transform: skewY(90deg)'); // hides 2nd completely
									//quad4.setAttribute('style', 'box-shadow: inset 0px 0px 0px 5px rgba(0, 0, 0, 0)'); 
									quad3.setAttribute('style', 'transform: skew(' + (progress - 50) * (-90 / 25) + 'deg)');
									progressbar.setAttribute('style', 'box-shadow: inset 0px 0px 0px 5px orange');
								}
								
								/* Similar to above for value between 75-100 */
								else if (progress > 75 && progress <= 100) {
									quad1.setAttribute('style', 'transform: skew(-90deg)'); // hides 1st completely
									quad2.setAttribute('style', 'transform: skewY(90deg)'); // hides 2nd completely
									quad3.setAttribute('style', 'transform: skew(-90deg)'); // hides 3rd completely
									quad4.setAttribute('style', 'transform: skewY(' + (progress - 75) * (90 / 25) + 'deg)');
									progressbar.setAttribute('style', 'box-shadow: inset 0px 0px 0px 5px red');
								}
							}
							
							
							
							//window.screen.orientation.addEventListener('change', function() {
							//if((window.matchMedia("(orientation: landscape)").matches)){
							
							
							//var as=document.getElementById('second').style.animation = 'rota '+waittime[jk]+'s steps(120, end)';
							//alert(as);
							
						}
						
						
						
						
						//if((waittime[jk]!="null")&&(testend>waittime[jk])){
						if((noq<total_questions)&&(testend>waittime[jk])){
							
							var video = document.getElementById('video1');
							//$("#myModal").hide();
							//alert(noq);
							$scope.submit1();
							$("#timer").html("");
							$("#timer1").hide();
							$("#cirtimer").hide();
							$("#tim").hide();
							video.play();
							
							
							
							
							
						//}else if(waittime[jk] =="null"){
						}else if((noq==total_questions)){
						
						$("#cirtimer").hide();
						if(testend>waittime[jk]){
							$("#myModal").hide();
							$scope.end();
							
						}
						
					}
					
				}
				
			} else if((window.matchMedia("(orientation: portrait)").matches)){alert("pp"); clearInterval(progInc);}
		//});
	} 
	
	
	
	
	
	$scope.endtime = function endtime() {
		
		
		
		var video = document.getElementById('endbtn');
		clearInterval(timerVar);					
		testend =seconds;
		
		//$("#timer").html("");
		timetaken[y]= testend;
		y++;	
		$scope.question=false;
		$("#myModal").hide();
		$("#dialogbox").hide();
		$("#clickevent").hide();
		
	};	
	
	
	
	$scope.end = function end() {
		
		
		
		answered[x]= ans;
		$("#myReport").show();
		var video = document.getElementById('video1');
		$("#checkboxes").html("");
		$("#radiobtn").html("");
		$("#select").html("");
		$("#question_title").html("");
		
		$scope.endtime();
		
		
		for(t=1;t<=timetaken.length-2;t++)
		{
			
			//alert($scope.timetaken);
			
			$scope.timetaken1.push(timetaken[t]);
			$scope.answered1.push(answered[t]);
			$scope.questionkey1.push(questionkey[t]);
			$scope.marksassigned1.push(marksassigned[t]);
			$scope.waittime1.push(waittime[t]);
			$scope.total+= timetaken[t];
			//alert(marksassigned[t]);
			if(marksassigned[t]==0)
			{
				//var linkquestion=answered[t];
				var linkquestion=answered[t];
				$scope.likequestion.push(linkquestion);
				//alert("ans "+$scope.likequestion);
			}
			if(marksassigned[t]!=0){
				
				if(answered[t]==answerkey[t])
				{
					
					count=marksassigned[t];					
					$scope.sum.push(count);
					
				}else
				{
					count=0;
					
					$scope.sum.push(count);
					
					
				}
			}
			totalmarks+=count;
			//if(waittime[t]>testend){
				//alert("time");
		    //}
			
		}
		$scope.totalmarks=totalmarks;
		
		
		localStorage.setItem("test_id",$scope.selected_test_id);
		localStorage.setItem("test_name" ,$scope.test_name);
		localStorage.setItem("test_description" , $scope.test_description);
		
		
		localStorage.setItem("questionkey1" , JSON.stringify($scope.questionkey1));
		localStorage.setItem("sum" , JSON.stringify($scope.sum));
		localStorage.setItem("timetaken1" , JSON.stringify($scope.timetaken1));
		
		
		localStorage.setItem("total" , $scope.total);
		localStorage.setItem("totalmarks" , $scope.totalmarks);
		
		
		
		window.location = "navbar.html#/videoreport";
		
	}
	
	$scope.next = function next() {
		window.location = "taketest.html";	
	};
	
	window.screen.orientation.addEventListener('change', function() {
		//window.screen.orientation.onchange = function() {
		
		if (window.matchMedia("(orientation: portrait)").matches) {
			////////////alert("Please use Landscape Mode for better Result");
			var vid = document.getElementById('video1');
			vid.pause();
			$("#timer1").hide();
			//$("#cirtimer").hide();
			clearInterval(progInc);
			progInc=0;
			
			// alert(progInc);
			// document.getElementById('convideo').style.display = 'none';
			//screen.lockOrientation('landscape');
			
			// var vide=document.getElementById('video1');
			// alert(vide);
			//vide.pause();
		}
		else if($scope.startvideo == false){
			var vid = document.getElementById('video1');
			//$("#cirtimer").show();
			vid.play();
			// if (!progInc) this.start();
			
		}
	//};
	
});



//});

});



});


})(window.angular);

