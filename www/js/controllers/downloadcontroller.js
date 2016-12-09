
	app.controller('downloadcontroller', downloadcontroller);
         function downloadcontroller ($scope,$http,$location,$localStorage) {
				

	 alert("good");			
/*document.addEventListener("deviceready", onDeviceReady, false);



function onDeviceReady() {

//request the persistent file system

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess,

 fileSystemFail);

}



function fileSystemSuccess(fileSystem) {

    var directoryEntry = fileSystem.root; // to get root path to directory

    directoryEntry.getDirectory("../uploaded", {create: true, exclusive: false},

 onDirectorySuccess, onDirectoryFail);

    var rootdir = fileSystem.root;

    var fp = rootdir.fullPath;

    fp = fp+"/../uploaded/image_name.png";

    var fileTransfer = new FileTransfer();

   fileTransfer.download("https://www.google.co.in/search?q=cat+png+images&espv=2&tbm=isch&imgil=HI_p9LFYXzwaHM%253A%253BPF70qAsiuRR7wM%253Bhttp%25253A%25252F%25252Fpngimg.com%25252Fimg%25252Fanimals%25252Fcat&source=iu&pf=m&fir=HI_p9LFYXzwaHM%253A%252CPF70qAsiuRR7wM%252C_&usg=__3HcCieRcfKXgh31l6ySg4YwE24w%3D&biw=1517&bih=735&dpr=0.9&ved=0ahUKEwjPhdbjqPXPAhVKu48KHW2DDl8QyjcIOA&ei=afoOWI-tA8r2vgTthrr4BQ#imgrc=HI_p9LFYXzwaHM%3A",fp,  

        function(entry) {

         alert("download complete: " + entry.fullPath);

     },

     function(error) {

         alert("download error source " + error.source);

         alert("download error target " + error.target);

         alert("upload error code" + error.code);

     }

    );

}

function onDirectorySuccess(parent) {

    console.log(parent);
	alert(parent);

}

 

function onDirectoryFail(error) {

    alert("Unable to create new directory: " + error.code);

}

 

function fileSystemFail(evt) {

    console.log(evt.target.error.code);

}
*/



var fileName = "myImage.png";  
var fileTransfer = new FileTransfer();

var uri = encodeURI("https://www.google.co.in/search?q=cat+png+images&espv=2&tbm=isch&imgil=HI_p9LFYXzwaHM%253A%253BPF70qAsiuRR7wM%253Bhttp%25253A%25252F%25252Fpngimg.com%25252Fimg%25252Fanimals%25252Fcat&source=iu&pf=m&fir=HI_p9LFYXzwaHM%253A%252CPF70qAsiuRR7wM%252C_&usg=__3HcCieRcfKXgh31l6ySg4YwE24w%3D&biw=1517&bih=735&dpr=0.9&ved=0ahUKEwjPhdbjqPXPAhVKu48KHW2DDl8QyjcIOA&ei=afoOWI-tA8r2vgTthrr4BQ#imgrc=HI_p9LFYXzwaHM%3A");   

var filePath = "../uploaded/myImage.png";

fileTransfer.download(
    uri,
    filePath,
    function(entry) {
        alert("download complete: " + entry.fullPath);
        console.log("download complete: " + entry.fullPath);
    },
    function(error) {  
        alert("download error source/target/code:\n" + error.source +" \n||| "+error.target+" \n||| "+error.code);
     console.log("download error source/target/code " + error.source+" / "+error.target+" / "+error.code); 
    }  
); 
	
};	