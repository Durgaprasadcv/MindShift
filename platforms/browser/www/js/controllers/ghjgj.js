	/*window.onbeforeunload = function() {
	return "";
	window.location = "navbar.html";
	};*/
		
/*		$(window).on('hashchange', function() {
    location.hash = "noBack";
});

function preventBack(){window.history.forward();}
  setTimeout("preventBack()", 0);
window.onunload=function(){null};*/
  
  
  
  
  
  /*window.onbeforeunload = function() { 
	
	return "Your work will be lost."; 
	
};*/

<body onload="noBack();" onpageshow="if (event.persisted) noBack();" onunload=""></body>