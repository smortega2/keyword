var num_imgs = 31;
var turn = 0;
var num_red_selected = 0;
var num_blue_selected = 0;
function setupGame(){
	//  game set to inprogress in db 
	// 	image grid is generated
	// 	partition grid is generated
	// 	choose to be a cluegiver
	// 		choose a team (red or blue)
	// 		see the partition grid
	// 	or
	// 	a guesser
	// 		see the image grid
	setInProgress();
	setTurn();
	generateImageGrid();
	generatePartitionGrid();
	window.location = "player.html";
}

function setInProgress(){
	return 0;
}

function setTurn(){
	var r = chance.unique(chance.natural, 1, {min: 1, max: 100});
	if(r <= 50) turn = 1;
	else turn = 2;
}

function generateImageGrid(){
	// grab 25 random indices
	var inds = chance.unique(chance.natural, 25, {min: 0, max: num_imgs-1});
	img_board = [];
	while(inds.length) img_board.push(inds.splice(0,5));

	//put them in db
	return 0;
}

function generatePartitionGrid(){
	var grid = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
	var inds = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];

	var num_t1_tiles = 0;
	var num_t2_tiles = 0;
	if(turn == 1){
		num_t1_tiles = 9;
		num_t2_tiles = 8;
	}  else if (turn ==2){
		num_t1_tiles = 8;
		num_t2_tiles = 9;
	}
	//generate random 8 inds in that range, update grid with 1's
	var t1_inds = chance.unique(chance.natural, num_t1_tiles, {min: 0, max: inds.length-1});
	grid = updateGridForTeam(grid, t1_inds, inds,1);
	inds = spliceIndsArray(t1_inds,inds);

	//generate random 9 inds in that range, update grid with 2's
	var t2_inds = chance.unique(chance.natural, num_t2_tiles, {min: 0, max: inds.length-1});
	grid = updateGridForTeam(grid, t2_inds, inds, 2);
	inds = spliceIndsArray(t2_inds,inds);
	
	//generate random 1 ind  in that range, update grid with -1
	var b_inds = chance.unique(chance.natural, 1, {min: 0, max: inds.length-1});
	grid = updateGridForTeam(grid, b_inds, inds, -1);
	inds = spliceIndsArray(b_inds,inds);
	
	game_board = grid;
	console.log(grid);
	return 0;
}

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

function spliceIndsArray(t_inds,inds){
	t_inds.sort(function(a, b){return b - a});
	for(var i=0; i < t_inds.length;i++){
		inds.splice(t_inds[i],1);
	}
	return inds;
}

function updateImageColor(id){
	document.getElementById(id).style.opacity = "0.3";
	$("#" + id).removeClass('hoverable_img');

	wrap_id = id.slice(0, 2) + "_w" + id.slice(2);
	var color = document.getElementById(wrap_id).style.background;

	// for(var i=0; i < 5; i++){
	// 	for(var j=0; j < 5; j++){
	// 		console.log("id: " + i + j);
	// 		console.log(document.getElementById(id).style.zIndex);
	// 	}
	// }
	if(color == "red"){
		num_red_selected++;
	}if(color == "blue"){
		num_blue_selected++;
	}

	gameOverCheck();
}

function gameOverCheck(){
	if(turn == 2 && num_blue_selected == 9){
		openModal("Blue Wins!", "blue");
	} else if(turn == 1 && num_blue_selected == 8){
		openModal("Blue Wins!", "blue");
	} else if(turn == 1 && num_red_selected == 9){
		openModal("Red Wins!", "red");
	} else if(turn == 2 && num_red_selected == 8){
		openModal("Red Wins!", "red");
	}
}

function getTurn(){
	return 0;
}

function getGameBoard(){
	return 0;
}

function displayTurn(){
	if(turn == 1){
		document.getElementById("team").innerHTML = "Red";
		document.getElementById("team").style.color = "red";
	} else if(turn == 2){
		document.getElementById("team").innerHTML = "Blue";
		document.getElementById("team").style.color = "blue";
	}
	
}

function displayImageBoard(){
	setTurn(); //getTurn();
	displayTurn();
	generateImageGrid(); // getGameBoard();
	generatePartitionGrid();
	for(var i=0; i < 5; i++){
		for(var j=0; j < 5; j++){
			var wrap_id = "im_w" + i + j;
			var img_id = "im" + i + j;
			var img_url_ind = img_board[i][j];
			document.getElementById(img_id).src=image_urls[img_url_ind];
			if(game_board[i][j] == 2){
				// set to blue
				document.getElementById(wrap_id).style.background = "blue";
			} else if(game_board[i][j] == 1){
				//set to red
				document.getElementById(wrap_id).style.background = "red";
			} else if(game_board[i][j] == -1){
				// set to gray
				document.getElementById(img_id).onclick = bombClicked;
				document.getElementById(wrap_id).style.background = "gray";
			}
		}
	}
}

function bombClicked(){
	openModal("You selected the bomb :(", "white");
	return 0;
}

function openModal(text, color){
	var modal = document.getElementById('myModal');
	modal.style.display = "block";
	document.getElementById('modal_sub').innerHTML = text;
	document.getElementById('modal_sub').style.color = color;
}

function displayPartitionBoard(){
	setTurn(); //getTurn();
	displayTurn();
	generatePartitionGrid(); // getPartitionGrid();
	for(var i=0; i < 5; i++){
		for(var j=0; j < 5; j++){
			var wrap_id = "im_w" + i + j;

			if(game_board[i][j] == 2){
				// set to blue
				document.getElementById(wrap_id).style.background = "blue";
			} else if(game_board[i][j] == 1){
				//set to red
				document.getElementById(wrap_id).style.background = "red";
			} else if(game_board[i][j] == -1){
				// set to gray
				document.getElementById(wrap_id).style.background = "gray";
			}
		}
	}
}






