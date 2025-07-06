var output;
var pacman;
var loopTimer;
var numLoops = 0;
var walls = new Array();
var dots = new Array();

var ghosts = new Array();
var gDirections =new Array();

var upArrowDown= false;
var downArrowDown = false;
var leftArrowDown = false;
var rightArrowDown = false;
var direction ='right';

const PACMAN_SPEED = 10;
const GHOST_SPEED = 5;

function loadComplete(){

	 
	output = document.getElementById('output');
	pacman = document.getElementById('pacman');
	
	pacman.style.left = '280px';
	pacman.style.top = '240px';
	pacman.style.width ='40px';
	pacman.style.height='40px';
	
	ghosts[0] = document.getElementById('redGhost');
	ghosts[1] = document.getElementById('blueGhost');
	ghosts[2] = document.getElementById('greenGhost');
	ghosts[3] = document.getElementById('pinkGhost');
	

	for(var i=0; i<ghosts.length; i++){
		ghosts[i].style.left= 220 + 40*i +'px';
		ghosts[i].style.top ='40px';
	    ghosts[i].style.width ='40px';
	    ghosts[i].style.height ='40px';

	    gDirections[i] = '';
    }

	loopTimer = setInterval(loop, 50);
	
   // inside walls
	createWall(240, 200, 120, 40);
	createWall(240, 280, 120, 40);
	createWall(80, 160, 40, 160);
	createWall(480, 160, 40, 160);
	createWall(160, 240, 40, 160);
	createWall(160, 0, 40, 120);
	createWall(400, 240, 40, 160);
	createWall(400, 0, 40, 120);
	createWall(80, 80, 40, 40);
	createWall(480, 80, 40, 40);
	createWall(160, 160, 40, 40);
	createWall(400, 160, 40, 40);
	createWall(240, 80, 40, 80);
	createWall(320, 80, 40, 80);

	// top wall
	createWall(-20, 0, 640, 40);
	// left side walls
	createWall(0, 0, 40, 160);
	createWall(0, 200, 40, 200);
	// right side walls
	createWall(560, 0, 40, 160);
	createWall(560, 200, 40, 200);
	// top wall
	createWall(-20, 360, 640, 40);

	for(var row=0; row<10; row++){
		for(var col=0; col<15; col++) {
		    var dot = document.createElement('div');
			dot.className = 'dot';
			dot.style.left =col * 40 + 10 + 'px';
			dot.style.top = row * 40 + 10 + 'px';
			gameWindow.appendChild(dot);
			if( hitWall (dot) ) {
			       gameWindow.removeChild(dot);
			} else {
            			 dots.push(dot); 

           		}  
	    
	    	}
	}
	
}	
	
function createWall(left, top, width, height){
	
	
	var wall = document.createElement('div');
	
	wall.className ='wall';
	wall.style.left = left + 'px';
	wall.style.top = top + 'px';
    wall.style.width = width + 'px';
    wall.style.height = height + 'px';
    gameWindow.appendChild(wall);
	
	
	walls.push(wall);
	//output.innerHTML = walls.length;
	
	var numWalls = walls.length;
	walls[numWalls] = wall;
	//output.innerHTML = walls.length;
	
}


function loop(){
	
	numLoops++;
	tryToChangeDirection();
	//output.innerHTML = direction;
	
	var originalLeft = pacman.style.left;
	var originalTop = pacman.style.top;
	
	if(direction=='up'){
		var pacmanY = parseInt(pacman.style.top) - PACMAN_SPEED;
		if(pacmanY < -30) pacmanY = 390;
		pacman.style.top = pacmanY +'px';
	}	

	if(direction=='down'){
		var pacmanY = parseInt(pacman.style.top) + PACMAN_SPEED;
		if(pacmanY > 390) pacmanY = -30;
		pacman.style.top = pacmanY +'px';
	}		
	

	if(direction=='left'){
		var pacmanX = parseInt(pacman.style.left) - PACMAN_SPEED;
		if(pacmanX < -30) pacmanX = 590;
		pacman.style.left = pacmanX +'px';
	}

    if(direction=='right'){
		var pacmanX = parseInt(pacman.style.left) + PACMAN_SPEED;
		if(pacmanX > 590) pacmanX = -30;
		pacman.style.left = pacmanX +'px';
	}
	
	if ( hitWall(pacman) ){
		pacman.style.left = originalLeft;
		pacman.style.top = originalTop;
	}
	
	moveGhosts();
	
	for(var i=0; i<ghosts.length; i++){
		if( hittest(pacman, ghosts[i]) ){
		alert("You are Dead!!");
		clearInterval(loopTimer);
	    }	
	 }
	    
	for(var i=0; i<dots.length; i++) {
		if( hittest(dots[i], pacman) ){
			dots[i].style.display ='none';
			dots.splice(i, 1);
			output.innerHTML ='dots = ' + dots.length;
			if(dots.length ==0){
				alert('You win');
				clearInterval(loopTimer);

             }
		}

	}   
}

function moveGhosts(){
	for(var i=0; i<ghosts.length; i++){
	    var gX = parseInt(ghosts[i].style.left);
		var gY = parseInt(ghosts[i].style.top);
		
		var gNewDirection;
		var gOppositeDirection;



		if(gDirections[i]=='left') gOppositeDirection = 'right';
		else if(gDirections[i]=='right') gOppositeDirection = 'left';
		else if(gDirections[i]=='down') gOppositeDirection = 'up';
		else if(gDirections[i]=='up') gOppositeDirection = 'down';
	
		do{ 
			ghosts[i].style.left = gX + 'px';
			ghosts[i].style.top = gY + 'px';
				 
			do{
				var r = Math.floor(Math.random()*4);
				if(r==0) gNewDirection = 'right';
				else if(r==1) gNewDirection = 'left';
				else if(r==2) gNewDirection = 'down';
				else if(r==3) gNewDirection = 'up';
			} while( gNewDirection == gOppositeDirection );
			
			if(gNewDirection =='right'){
				if(gX>590) gX=-30;
				ghosts[i].style.left =gX + GHOST_SPEED +'px';
			}
			else if(gNewDirection =='left'){
				if(gX < -30) gX= 590;
				ghosts[i].style.left =gX - GHOST_SPEED +'px';
			}
			else if(gNewDirection =='down'){
				if(gY > 390) gY= -30;
				ghosts[i].style.top =gY + GHOST_SPEED +'px';
			}
			else if(gNewDirection =='up'){
				if(gY <-30) gY= 390;
				ghosts[i].style.top =gY - GHOST_SPEED +'px';
			}
			
		} while( hitWall(ghosts[i]) );

			
		gDirections[i] = gNewDirection;	
	}
			
}

function hitWall(element){
	var hit = false;
	for(var i=0; i<walls.length; i++){
		if( hittest(walls[i], element) ) hit = true;
	}
	return hit;
}
	

document.addEventListener('keydown',function(event){
	
	//output.innerHTML = event.keyCode;
	
	if(event.keyCode==37) leftArrowDown = true;
	if(event.keyCode==38) upArrowDown = true;
	if(event.keyCode==39) rightArrowDown = true;
	if(event.keyCode==40) downArrowDown = true;
	
});


document.addEventListener('keyup',function(event){
	if(event.keyCode==37) leftArrowDown = false;
	if(event.keyCode==38) upArrowDown = false;
	if(event.keyCode==39) rightArrowDown = false;
	if(event.keyCode==40) downArrowDown = false;
});

function tryToChangeDirection(){
	
	var originalLeft = pacman.style.left;
	var originalTop = pacman.style.top;

	if(leftArrowDown) {
		
		//leftArrowDown = true;
		pacman.style.left = parseInt(pacman.style.left) - PACMAN_SPEED +'px';
		if( ! hitWall(pacman) ){
			direction = 'left';
		    pacman.className = "flip-horizontal";
	    }
	}	
	if(upArrowDown) {
		//upArrowDown = true;
		pacman.style.top = parseInt(pacman.style.top) - PACMAN_SPEED +'px';
		if( ! hitWall(pacman) ){
			direction = 'up';
		    pacman.className = "rotate270";
	    }
	}	
	if(rightArrowDown) {
		//rightArrowDown = true;
		pacman.style.left = parseInt(pacman.style.left) + PACMAN_SPEED +'px';
		if( ! hitWall(pacman) ){
			direction = 'right';
		    pacman.className ="";
	    }
	}	
	if(downArrowDown) {
       //downArrowDown = true;
       pacman.style.top = parseInt(pacman.style.top) + PACMAN_SPEED +'px';
		if( ! hitWall(pacman) ){
			direction = 'down';
	        pacman.className = "rotate90";
        }
    } 
	
  pacman.style.left = originalLeft;
  pacman.style.top = originalTop;
   
		
}
	



	
