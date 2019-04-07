function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function playerRouter(page){
	var turn = getUrlVars()["turn"]; // get turn from url
	var keyword = getUrlVars()["keyword"]; // get seed from url
	var url = page + "?turn=" + turn + "&keyword=" + keyword; // build new url""
	window.location = url;
}

function joinRouter(page){
	var key_input = document.getElementById("key_text").value;
	if(key_input == ""){ // check if user has entered a key
		document.getElementById("warning").innerHTML = "please enter a game key"; //prompt user to enter key in warning text
	} else if(key_input.length < 4){
		document.getElementById("warning").innerHTML = "game keys must be 4 characters"; // if incomplete key, prompt user that the key is invalid
	} else{
		if(red_keys.includes(key_input)){ // check if that key is in the red list
			window.location = page + "?turn=1" + "&keyword=" + key_input;
		} else if(blue_keys.includes(key_input)){ // check if that key is in the blue list
			window.location = page + "?turn=2" + "&keyword=" + key_input;
		} else { // if the key isn't in either list, tell user that key is incorrect
			document.getElementById("warning").innerHTML = "that is an invalid game key";
		}
	}
}







