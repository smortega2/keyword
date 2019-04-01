var num_imgs = 31;
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
	generateImageGrid();
	generatePartitionGrid();
	window.location = "player.html";
}

function setInProgress(){
	return 0;
}

function generateImageGrid(){
	// grab 25 random indices
	var inds = chance.unique(chance.natural, 25, {min: 0, max: num_imgs-1});
	//put them in db
	return 0;
}

function generatePartitionGrid(){
	var grid = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
	var inds = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];

	//generate random 8 inds in that range, update grid with 1's
	var t1_inds = chance.unique(chance.natural, 8, {min: 0, max: inds.length-1});
	grid = updateGridForTeam(grid, t1_inds, inds,1);
	inds = spliceIndsArray(t1_inds,inds);

	//generate random 9 inds in that range, update grid with 2's
	var t2_inds = chance.unique(chance.natural, 9, {min: 0, max: inds.length-1});
	grid = updateGridForTeam(grid, t2_inds, inds, 2);
	inds = spliceIndsArray(t2_inds,inds);
	
	//generate random 1 ind  in that range, update grid with -1
	var b_inds = chance.unique(chance.natural, 1, {min: 0, max: inds.length-1});
	grid = updateGridForTeam(grid, b_inds, inds, -1);
	inds = spliceIndsArray(b_inds,inds);
	

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
}




