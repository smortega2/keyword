// var turn = 0;
var num_red_selected = 0;
var num_blue_selected = 0;
/*
 * 
*/
function setupGame(){
	var turn = generateTurn();
	var keyword = generateKeyword(turn);
	window.location = "player.html?turn=" + turn + "&keyword=" + keyword;
}

/*
 * Routes to join game page
*/
function joinGame(){
	window.location = "join_game.html"
}

/*
 * Generates random keyword from red or blue list
*/
function generateKeyword(turn){
	var keyword = "";
	if(turn == 1){
		var i = chance.unique(chance.natural, 1, {min: 0, max: red_keys.length-1});
		keyword = red_keys[i];
	} else {
		var i = chance.unique(chance.natural, 1, {min: 0, max: blue_keys.length-1});
		keyword = blue_keys[i];
	}
	return keyword;
}

/*
 * Generates a random number to determine if turn will be 1 or 2
*/
function generateTurn(){
	var r = chance.unique(chance.natural, 1, {min: 1, max: 100});
	if(r <= 50) return 1;
	else return 2;
}

/*
 * Generates a set of 25 indices, seeded with keyword
 * Those indices are used to grab 25 images from the possible set of images
*/
function generateImageGrid(){
	// grab 25 random indices
	var seed = getUrlVars()["keyword"];
	var chance_seeded = new Chance(seed);
	var inds = chance_seeded.unique(chance_seeded.natural, 25, {min: 0, max: image_urls.length-1});
	var img_board = [];
	while(inds.length) img_board.push(inds.splice(0,5));
	console.log("img_board", img_board)
	return img_board;
}

/*
 * Generates set of indices for player 1 and player 2, which determine which tiles will be theirs
 * Also generates 1 tile for the bomb
*/
function generatePartitionGrid(turn){
	var grid = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
	var inds = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];

	var num_t1_tiles = (turn == 1) ? 9 : 8;
	var num_t2_tiles = (turn == 1) ? 8 : 9;

	var seed = getUrlVars()["keyword"];
	var chance_seeded = new Chance(seed);
	//generate random 8 inds in that range, update grid with 1's
	var t1_inds = chance_seeded.unique(chance_seeded.natural, num_t1_tiles, {min: 0, max: inds.length-1});
	grid = updateGridForTeam(grid, t1_inds, inds,1);
	inds = spliceIndsArray(t1_inds,inds);

	//generate random 9 inds in that range, update grid with 2's
	var t2_inds = chance_seeded.unique(chance_seeded.natural, num_t2_tiles, {min: 0, max: inds.length-1});
	grid = updateGridForTeam(grid, t2_inds, inds, 2);
	inds = spliceIndsArray(t2_inds,inds);
	
	//generate random 1 ind  in that range, update grid with -1
	var b_inds = chance_seeded.unique(chance_seeded.natural, 1, {min: 0, max: inds.length-1});
	grid = updateGridForTeam(grid, b_inds, inds, -1);
	inds = spliceIndsArray(b_inds,inds);
	
	console.log("grid", grid);
	return grid;
}

/*
 * Sets grid value to the value of the player for each of their tiles
*/
function updateGridForTeam(grid, t_inds, inds, num){
	var grid_inds = t_inds.map(i => inds[i]);
	for(var i=0; i < grid_inds.length; i++){
		ind = grid_inds[i];
		var x = (Math.floor(ind/5));
		var y = (ind%5);
		grid[x][y] = num;
	}
	return grid;
}

/*
 * Removes used indices from set of generated indices
*/
function spliceIndsArray(t_inds,inds){
	t_inds.sort(function(a, b){return b - a});
	for(var i=0; i < t_inds.length;i++){
		inds.splice(t_inds[i],1);
	}
	return inds;
}

/*
 * Removes hoverable property of clicked images
 * Adds team color to selected image
 * Updates game state values
*/
function updateImageColor(id){
	document.getElementById(id).style.opacity = "0.3";
	$("#" + id).removeClass('hoverable_img');

	wrap_id = id.slice(0, 2) + "_w" + id.slice(2);
	var color = document.getElementById(wrap_id).getAttribute("card_color");

	if(color == "red"){
		document.getElementById(wrap_id).style.background = "red";
		num_red_selected++;
	}if(color == "blue"){
		document.getElementById(wrap_id).style.background = "blue";
		num_blue_selected++;
	}
	var turn = getTurn();
	gameOverCheck(turn);
}

/*
 * checks if either player has won
*/
function gameOverCheck(turn){
	if(turn == 2 && num_blue_selected == 9){
		openModal("Blue Wins!", "blue");
	} else if(turn == 1 && num_blue_selected == 8){
		openModal("Blue Wins!", "blue");
	} else if(turn == 1 && num_red_selected == 9){
		openModal("Red Wins!", "#8a0f0f");
	} else if(turn == 2 && num_red_selected == 8){
		openModal("Red Wins!", "#8a0f0f");
	}
}

/*
 * Gets turn variable from the url
*/
function getTurn(){
	return getUrlVars()["turn"];
}

/*
 * Sets turn text
*/
function displayTurn(turn){
	if(turn == 1){
		document.getElementById("team").innerHTML = "Red";
		document.getElementById("team").style.color = "red";
	} else if(turn == 2){
		document.getElementById("team").innerHTML = "Blue";
		document.getElementById("team").style.color = "blue";
	}
	
}

/*
 * Displays colors/ images for each tile in imageboard
*/
function displayImageBoard(){
	displayKeyword();
	var turn = getTurn();
	displayTurn(turn);
	var img_board = generateImageGrid(); // getGameBoard();
	var game_board = generatePartitionGrid(turn);
	for(var i=0; i < 5; i++){
		for(var j=0; j < 5; j++){
			var wrap_id = "im_w" + i + j;
			var img_id = "im" + i + j;
			var img_url_ind = img_board[i][j];

			document.getElementById(img_id).src=image_urls[img_url_ind];

			// save color to be displayed later to prevent early showing of colors
			if(game_board[i][j] == 2){ // blue tile
				document.getElementById(wrap_id).setAttribute("card_color", "blue");
			} else if(game_board[i][j] == 1){ //set to red
				document.getElementById(wrap_id).setAttribute("card_color", "red");
			} else if(game_board[i][j] == -1){ // set to gray
				document.getElementById(wrap_id).setAttribute("card_color", "gray");
				if(img_id != null) document.getElementById(img_id).onclick = bombClicked;
			}

			
		}
	}
}

/*
 * Ends game and indicates bomb has been selected
*/
function bombClicked(){
	openModal("You selected the bomb!", "white");
}

/*
 * Opens game over modal
*/
function openModal(text, color){
	var modal = document.getElementById('myModal');
	modal.style.display = "block";
	document.getElementById('modal_sub').innerHTML = text;
	document.getElementById('modal_sub').style.color = color;
}

/*
 * Sets color of each tile in partition board
*/
function displayPartitionBoard(){
	displayKeyword();
	var turn = getTurn();
	displayTurn(turn);
	var game_board = generatePartitionGrid(turn); // getPartitionGrid();

	for(var i=0; i < 5; i++){
		for(var j=0; j < 5; j++){
			var wrap_id = "im_w" + i + j;
			setBackgroundColor(game_board[i][j], wrap_id, null);
		}
	}
}

/*
 * Sets color of tile
*/
function setBackgroundColor(player, wrap_id, img_id){
	if(player == 2){ // blue tile
		document.getElementById(wrap_id).style.background = "blue";
	} else if(player == 1){ //set to red
		document.getElementById(wrap_id).style.background = "red";
	} else if(player == -1){ // set to gray
		document.getElementById(wrap_id).style.background = "gray";
		if(img_id != null) document.getElementById(img_id).onclick = bombClicked;
	}
}

/*
 * Displays keyword text
*/
function displayKeyword(){
	var keyword = getUrlVars()["keyword"];
	document.getElementById("key_text").innerHTML = keyword;
}





