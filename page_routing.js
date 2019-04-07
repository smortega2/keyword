function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function goToImageBoard(){
	var turn = getUrlVars()["turn"]; // get turn from url
	var seed = getUrlVars()["seed"]; // get seed from url
	var url = "image_board.html?turn=" + turn + "&seed=" + seed; // build new url""
	window.location = url;
}

function goToPartitionBoard(){
	var turn = getUrlVars()["turn"]; // get turn from url
	var seed = getUrlVars()["seed"]; // get seed from url
	var url = "partition_board.html?turn=" + turn + "&seed=" + seed; // build new url""
	window.location = url;
}

function join_goToImageBoard(){
	// check if user has entered a key
	//		if not, prompt user to enter key in warning text
	//		if incomplete key, prompt user that the key is invalid
	// check if that key is in the red list
	//		then set turn to 1 and seed to key
	// check if that key is in the blue list
	//		then set turn to 2 and seed to key
	// if the key isn't in either list, tell user that key is incorrect

	var key_input = document.getElementById("key_text").value;
	if(key_input == ""){
		document.getElementById("warning").innerHTML = "please enter a game key";
	} else if(key_input.length < 4){
		document.getElementById("warning").innerHTML = "game keys must be 4 characters";
	} else{
		if(red_keys.includes(key_input)){
			window.location = "image_board.html?turn=1" + "&seed=" + key_input;
		} else if(blue_keys.includes(key_input)){
			window.location = "image_board.html?turn=2" + "&seed=" + key_input;
		} else {
			document.getElementById("warning").innerHTML = "that is an invalid game key";
		}
	}
	console.log(key_input);
}

function join_goToPartitionBoard(){
	var key_input = document.getElementById("key_text").value;
	if(key_input == ""){
		console.log("please enter a key");
	} else if(key_input.length < 4){
		console.log("the key must be 4 characters long");
	} else{
		if(red_keys.includes(key_input)){
			window.location = "partition_board.html?turn=1" + "&seed=" + key_input;
		} else if(blue_keys.includes(key_input)){
			window.location = "partition_board.html?turn=2" + "&seed=" + key_input;
		} else {
			console.log("incorrect key");
		}
	}
	console.log(key_input);
}







