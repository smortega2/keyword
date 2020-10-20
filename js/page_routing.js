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
	console.log("key_input", key_input);
	if(key_input == ""){ // check if user has entered a key
		document.getElementById("warning").innerHTML = "please enter a game key"; //prompt user to enter key in warning text
	} else if(key_input.length < 4){
		document.getElementById("warning").innerHTML = "game keys must be 4 characters"; // if incomplete key, prompt user that the key is invalid
	} else{
		if(red_keys.includes(key_input)){ // check if that key is in the red list
			console.log('red');
			console.log(red_keys.indexOf(key_input));
			window.location = page + "?turn=1" + "&keyword=" + key_input;
		} else if(blue_keys.includes(key_input)){ // check if that key is in the blue list
			console.log('blue');
			console.log(blue_keys.indexOf(key_input));
			window.location = page + "?turn=2" + "&keyword=" + key_input;
		} else { // if the key isn't in either list, tell user that key is incorrect
			document.getElementById("warning").innerHTML = "that is an invalid game key";
		}
	}
}

// opens page in new tab
function newTabRouter(page){
	var turn = getUrlVars()["turn"]; // get turn from url
	var keyword = getUrlVars()["keyword"]; // get keyword from url
	var url = page + "?turn=" + turn + "&keyword=" + keyword; // build new url""
	window.open(url, "_blank"); 
}







