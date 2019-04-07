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