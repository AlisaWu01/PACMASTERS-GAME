window.onload = startMenu;
var game;

function startMenu(){
	game = {
		canvas: document.getElementById("canvas"),
		context: canvas.getContext("2d"),
		table:1,
		number:1,
		level: 1,
		start: function(){
				document.addEventListener('keydown', function (e) {
					game.key = e.keyCode;});
				document.addEventListener('keyup', function (e) {
					game.key = false;});
				this.canvas.width = window.innerWidth;
				this.canvas.height = window.innerHeight;
				this.canvas.onclick = getTable;	
				drawBackground("background1",'PAC-MASTERS',"Click on a number to play the table!",'',10,'');
				levelButton = new myButton(window.innerWidth/15,window.innerHeight/8,"Level " + (game.level+1));
				
			},
		startTable: function(){
				drawBackground("background2","Welcome to table " + this.table ," click on a number to play the question!",this.table + "x",10,'');
				myButton(window.innerWidth/15,window.innerHeight/8,"Level " + (game.level+1));
				myButton(window.innerWidth/1.08,window.innerHeight/8,"Back");
				game.canvas.onclick = startQuestion;
				
			},
		clear: function() {
				this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
			},
		stop: function() {
				displaysomething();
			},
	}
	
	
	game.start();

}	
function myButton(x,y,tekst){
	this.x =x;
	this.y=y;
	(game.context).beginPath();
	(game.context).arc(x,y,70,0,Math.PI*2,false);
	(game.context).fillStyle = "rgba(255,255,255,0.5)";
	(game.context).fill();	
	(game.context).font = "30px Arial";
	(game.context).fillStyle = "black";
	(game.context).fillText(tekst,this.x-40,this.y+10);
	
	this.clear = function(){
		(game.context).clearRect(this.x-70,this.y-70,this.x+70,this.y+70);

	}
	
	
	
}
function drawBackground(background,title,caption,number,end,backgroundImage){
	 c = game.context;
	
	var img = document.getElementById(background);
	c.fillStyle=backgroundImage;
	c.fillRect(0,0,innerWidth,innerHeight);
	var pat=c.createPattern(img,"repeat");
	c.rect(0,0,canvas.width,canvas.height);
	c.fillStyle=pat;
	c.fill();
	
	//title
	c.font = "90px Impact";
	c.fillStyle = "white";
	c.fillText(title,canvas.width/3,canvas.height/8);
	c.font = "40px Impact";
	c.fillText(caption,canvas.width/3.3,canvas.height/5)
	
	//draws circles
	var x = canvas.width/8;
	var y = canvas.height/3;
	for(i=0; i <=end;i++){
		c.beginPath();
		c.arc(x,y,70,0,Math.PI*2,false);
		c.fillStyle = "rgba(255,255,255,0.5)";
		c.fill();

		x+=canvas.width/5.5;
		if(x>=canvas.width/1.1){
			y=canvas.height/1.5;
			x=canvas.width/8;
		}
	}
	
	//writes numbers
	y= canvas.height/2.7;
	x=canvas.width/9;
	for(var i=1;i<=end;i++){
		c.font = "60px Arial";
		c.fillStyle = "black";
		c.fillText(number + i,x,y);
		x+=canvas.width/5.5;
		if(x>=canvas.width/1.1){
			y=canvas.height/1.4;
			x=canvas.width/9;
		}
	}
}

	
function getNumber(event){
	var x = canvas.width/8;	
	var spceBtwn = canvas.width/5.5;
	//first row's height
	var y = canvas.height/3;
	//second rows height
	var y2 = canvas.height/1.5;
	
	mouseX = event.clientX;
	mouseY = event.clientY;
	//button functionality 1-10
	if((mouseX>x -70)&&(mouseX<x +70)&& (mouseY>y-70)&&(mouseY<y+70)){
		return 1;		
	} else if((mouseX>x+spceBtwn-70)&&(mouseX<x+spceBtwn+70)&&(mouseY>y-70)&&(mouseY<y+70)){
		return 2;
	} else if((mouseX>x+(2*spceBtwn)-70)&&(mouseX<x+(2*spceBtwn)+70)&&(mouseY>y-70)&&(mouseY<y+70)){
		return 3;
	} else if((mouseX>x+(3*spceBtwn)-70)&&(mouseX<x+(3*spceBtwn)+70)&&(mouseY>y-70)&&(mouseY<y+70)){
		return 4;
	} else if((mouseX>x+(4*spceBtwn)-70)&&(mouseX<x+(4*spceBtwn)+70)&&(mouseY>y-70)&&(mouseY<y+70)){
		return 5;
	} else if((mouseX>x -70)&&(mouseX<x +70)&& (mouseY>y2-70)&&(mouseY<y2+70)){
		return 6;
	} else if((mouseX>x+spceBtwn-70)&&(mouseX<x+spceBtwn+70)&&(mouseY>y2-70)&&(mouseY<y2+70)){
		return 7;
	} else if((mouseX>x+(2*spceBtwn)-70)&&(mouseX<x+(2*spceBtwn)+70)&&(mouseY>y2-70)&&(mouseY<y2+70)){
		return 8;
	} else if((mouseX>x+(3*spceBtwn)-70)&&(mouseX<x+(3*spceBtwn)+70)&&(mouseY>y2-70)&&(mouseY<y2+70)){
		return 9;
	} else if((mouseX>x+(4*spceBtwn)-70)&&(mouseX<x+(4*spceBtwn)+70)&&(mouseY>y2-70)&&(mouseY<y2+70)){
		return 10;
	}else if((mouseX<window.innerWidth/15+70)&&(mouseX>window.innerWidth/15-70)&&(mouseY<window.innerHeight/8+70)&&(mouseY>window.innerHeight/8-70)){
		game.level = game.level+1;
		levelButton.clear();
	}else if ((mouseX<window.innerWidth/1.08+70)&&(mouseX>window.innerWidth/1.08-70)&&(mouseY<window.innerHeight/8+70)&&(mouseY>window.innerHeight/8-70)){
		return "back";
	}
}

function getTable(event){
	game.table = getNumber(event);
	
	if(game.table>=1||game.table<=10){
	game.startTable();
	}else{
		
		game.start();
	}
}

function startQuestion(event){
	game.number = getNumber(event);
	if(game.number>=1||game.number<=10){
	playquestion();
	}else if(game.number == 'back'){
		startMenu();
	}else{
		game.startTable();
		//alert('please click on a button');
	}
	
}