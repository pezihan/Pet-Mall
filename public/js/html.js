if (document.documentElement && document.documentElement.clientWidth){
		var winWidth = document.documentElement.clientWidth; 
        var Ohtml = document.getElementsByTagName("html");
        var htmlFont = winWidth / 1536
        Ohtml[0].style.fontSize = htmlFont + "px"
}

window.onresize = function(){
    var winWidth = document.documentElement.clientWidth; 
        var Ohtml = document.getElementsByTagName("html");
        var htmlFont = winWidth / 1536
        Ohtml[0].style.fontSize = htmlFont + "px"
}