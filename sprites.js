//written by Alisa(613708)
//draws the player and other objects
function component(width, height, color, x, y, type,columns,rows) {
	
				
    this.type = type;
	this.columns = columns;
	this.rows = rows;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
	this.srcX;
	this.srcY=0;
	this.framewidth = this.width/this.columns;
	this.frameheight = this.height/this.rows;
	
	//which frame is displaying
	this.currentFrame = 0;
	this.updateFrame = function(){
		
		if (type == 'image'){
			
			this.image = new Image();
			this.image.src = color;
			(game.context).drawImage(this.image,this.x,this.y,this.width,this.height);
			
		}else if (type == "sprite") {
			this.currentFrame = (++this.currentFrame) % this.columns;
			this.srcX= this.currentFrame*this.framewidth;
			
			this.image = new Image();
			this.image.src = color;
			(game.context).drawImage(this.image,this.srcX,this.srcY,this.framewidth,this.frameheight,this.x,this.y,this.framewidth,this.frameheight);

        
        }else{ (game.context).fillStyle = color;
				(game.context).fillRect(this.x, this.y, this.width, this.height);}
				
	}
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.framewidth);
        var mytop = this.y;
        var mybottom = this.y + (this.frameheight);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.framewidth);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.frameheight)-10;
        var crash = true;
        if ((mybottom < othertop) || (otherbottom < mytop) || (myright < otherleft) || (otherright < myleft)) {
            crash = false;
        }
        return crash;
    }
	
}
//this function only works with sprite sheets w/ resolution 200x200px
function moveMent(character){
	character.updateFrame();

	
	if(game.key==37){
		character.currentFrame = (++character.currentFrame) % character.columns;
		character.updateFrame();
		character.x -=6;
		character.srcY=50;
		
		
	}else if (game.key==39){
		character.x +=6;
		character.srcY=100;
		character.currentFrame = (++character.currentFrame) % character.columns;
		character.updateFrame();
		
	}else if(game.key==38){
		character.y -=6;
		character.srcY=0;
		character.currentFrame = (++character.currentFrame) % character.columns;
		character.updateFrame();
	}else if(game.key==40){
		character.y +=6;
		character.srcY=150;
		character.currentFrame = (++character.currentFrame) % character.columns;
		character.updateFrame();
	}
	
	
}
	
