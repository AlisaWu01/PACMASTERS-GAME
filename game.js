/**The problem with the interval is that it has to be stopt by the function called bij the setinterval command (in our case, updateGameArea). 
Easiest way to deal with that is to make it global. **/
var interval;


/*In this function all the pieces are made. 
(player, moving and not moving other obstacles) 
Since you now know how to work with it, I used a 2 dimensional array **/
function playquestion(){
	//The array for all pieces
	var myPieces = [];
	//the player
	myPieces[0] = new component(200, 200, "pacmansprite2.png", window.innerWidth/2, window.innerHeight/1.1,'sprite',4,4);
	//an array for the answers blocks
	myPieces[1]=[];
	//an other array for the answers
	var possibleanswers = [];
	var arrayMax = game.table*10;
	var limit = arrayMax + 1;
	for (var i = 0; i < arrayMax; i++) 
	{
		possibleanswers.push(Math.floor(Math.random()*limit));
	}				
	//random answers
	for(var i=0;i<game.level+2;i++){
		possibleanswers[i]=Math.floor(Math.random()*possibleanswers.length+1);
		while (possibleanswers[i]===game.table*game.number) {
		possibleanswers[i]=Math.floor(Math.random()*possibleanswers.length+1); }
	myPieces[1][i]=new component(720, 125, "jelly.png",((window.innerWidth-50)/(game.level+3))*(i+1),100,'sprite',8,1);
	}		
	
/* this was our idea of how to check that answers are not repeating but it doesnt work
		while (possibleanswers[i]==possibleanswers[i+1]){
			possibleanswers[i+1]=Math.floor(Math.random()*possibleanswers.length+1);
		}
		while (possibleanswers[i]==possibleanswers[i+2]){
			possibleanswers[i+2]=Math.floor(Math.random()*possibleanswers.length+1);
		}
		while (possibleanswers[i]==possibleanswers[i+3]){
			possibleanswers[i+3]=Math.floor(Math.random()*possibleanswers.length+1);
		}
		while (possibleanswers[i]==possibleanswers[i+3]){
			possibleanswers[i+3]=Math.floor(Math.random()*possibleanswers.length+1);
		}
		myPieces[1][i]=new component(40, 10, "blue",(window.innerWidth/(game.level+3))*(i+1),200);
*/
	
	//the correct answer
	var rightindex=Math.floor(Math.random()*(game.level+2));
	possibleanswers[rightindex]=game.table*game.number;
	
	//an array for the moving blocks
	myPieces[2]=[];
	var y = 220;
	for(var i=0;i<game.level+3;i++){
		myPieces[2][i]=new component(80, 125, "anchor1.png", (window.innerWidth/50)*(5+13*i), y, "image",1,1);
	}
	//here we set the interval for the update of the gamearea
	interval = setInterval(function(){updateGameArea(myPieces,possibleanswers,rightindex);/*	runSprite(jellyFish);*/}, 100);
	}


//Checking if the player crashes with any other piece or if the blocks hit the bottom
function crashes(pieces,index){
	for (i = 0; i < pieces[1].length; i += 1) {
        if (pieces[0].crashWith(pieces[1][i])) {
			if(i==index){
				//Hooray, the right answer is selected
				alert("Hooray");
				game.startTable();
				return true;
			} else {
				alert("bad luck try again")
				game.startTable();
				
				//wrong answer
				return true;
			}
        }
    }
	for (i = 0; i < pieces[2].length; i += 1) {
        if (pieces[0].crashWith(pieces[2][i])||pieces[2][i].y>game.canvas.height) {
			//the player is hit by a block or blocks hit the bottom
			alert("bad luck try again")
				game.startTable();
            return true;
        }
    }
	return false;
}

function updateGameArea(pieces,answers,index) {
	//see if there is a crash, if so stop the interval for updating the game area
	if(crashes(pieces,index)){
		clearInterval(interval);
		//and how to continue now?
		//alert("Now what?")
		
	} 
	
		drawBackground('level1background','','','',-1,'');
		moveMent(pieces[0]);
		//draw the question
		var ctx = game.context;
		ctx.fillStyle = "#000";
		ctx.font = "70px Arial";
		ctx.fillText(game.number+" x "+game.table+" = ", 730, 111);
		
		//draw the moving blocks on their new possition
		for (i = 0; i < pieces[2].length; i += 1) {
			pieces[2][i].y += 2;
			//pieces[2][i].update();
			pieces[2][i].updateFrame();
		}

		//draw the player and check the keys
		pieces[0].speedX = 0; 
		pieces[0].speedY = 0;
		
		//redraw the blocks with the answers
		for(j=0;j<pieces[1].length;j++){
			pieces[1][j].updateFrame();
			//pieces[1][j].update();
			ctx.fillStyle = "#000";
			ctx.font = "50px Arial";
			ctx.fillText(answers[j], (window.innerWidth/(game.level+3))*(j+1),170,);
		}
	}


