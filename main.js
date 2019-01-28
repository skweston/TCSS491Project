function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

<<<<<<< HEAD
// no inheritance
// Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale)
=======
/* ========================================================================================================== */
// Background
/* ========================================================================================================== */
>>>>>>> master
function Background(game, spritesheet) {
 
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;	

    // Where the frame starts for the background. Divide image in half then subract the half the canvas,
    // for both sx and sy. (i.e: 5600 / 2 - 800 / 2 = 2400) Allowing ship to fit to the exact middle.
    this.sx = spritesheet.naturalWidth / 2 - this.ctx.canvas.width / 2;
    this.sy = spritesheet.naturalHeight / 2 - this.ctx.canvas.height / 2;

    // This is the location to draw the background
    this.dx = 0;
    this.dy = 0;
    
    // This is the current canvas snapshot of the level
    this.frameWidth = this.ctx.canvas.width;
    this.frameHeight = this.ctx.canvas.height;

    if (spritesheet.width - this.sx < this.frameWidth) {
	this.frameWidth = this.spritesheet.width - this.sx;
    }
    if (spritesheet.height - this.sy < this.frameHeight) {
	this.frameHeight = this.spritesheet.height - this.sy;
    }
    
    this.dWidth = this.frameWidth;
    this.dHeight = this.frameHeight;
    

};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
	    	   this.sx, this.sy,
	    	   this.frameWidth, this.frameHeight,
                   this.dx, this.dy,
    		   this.dWidth, this.dHeight);
};

Background.prototype.update = function () {
   


};

<<<<<<< HEAD


function MushroomDude(game, spritesheet) {
    this.animation = new Animation(spritesheet, 189, 230, 5, 0.10, 14, true, 1);
    this.x = 0;
    this.y = 0;
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
=======
/* ========================================================================================================== */
// Boss 1
/* ========================================================================================================== */
function Boss1(game, spritesheet){
  this.animation = new Animation(spritesheet, 200, 450, 1200, 0.175, 6, true, 1);
  this.x = 300;
  this.y = 175;
  this.speed = 0;
  this.angle = 0;
  this.game = game;
  this.ctx = game.ctx;
  this.removeFromWorld = false;
>>>>>>> master
}
Boss1.prototype = new Entity();
Boss1.prototype.constructor = Boss1;

Boss1.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    if (this.x > 800) this.x = -230;
    this.angle += 5;

    Entity.prototype.update.call(this);
}

Boss1.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

function BossTurret(game, spritesheet, x, y){
  this.animation = new Animation(spritesheet, 32, 32, 672, 0.2, 21, true, 1.5);
  this.x = x;
  this.y = y;
  this.hitcenterX = this.x + 16;
  this.hitcenterY = this.y + 16;
  this.hitRadius = 16;
  this.speed = 0;
  this.angle = 0;
  this.game = game;
  this.ctx = game.ctx;
  this.removeFromWorld = false;
}
BossTurret.prototype = new Entity();
BossTurret.prototype.constructor = Boss1;

BossTurret.prototype.update = function () {

<<<<<<< HEAD
// inheritance 
function Cheetah(game, spritesheet) {
    this.animation = new Animation(spritesheet, 512, 256, 2, 0.05, 8, true, 0.5);
    this.speed = 350;
    this.animation = new Animation(spritesheet, 32, 32, 9, 0.05, 9, true, 2);
    this.speed = 600;
    this.ctx = game.ctx;
    Entity.call(this, game, 0, 250);
=======
    //this.x += this.game.clockTick * this.speed;
    //if (this.x > 800) this.x = -230;
    var dx = this.game.mousex - this.x;
    var dy = this.y - this.game.mousey;
    // this should be the angle in radians
    this.angle = Math.atan2(dy,dx);
    //if we want it in degrees
    //this.angle *= 180 / Math.PI;


    if (this.game.wasclicked){
      console.log("the x of the turret: " + this.x  + " and the y: " + this.y);
      this.game.addEntity(new LaserBlast(this.game, AM.getAsset("./img/LaserBlast.png"), this.x, this.y, dx, dy));

    }


    Entity.prototype.update.call(this);
>>>>>>> master
}

BossTurret.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);

    Entity.prototype.draw.call(this);
}
function LaserBlast(game, spritesheet, xIn, yIn, dx, dy){
  this.animation = new Animation(spritesheet, 32, 32, 128, 0.15, 4, true, 1);
  this.game = game;
  this.speedX = 1;
  this.speedY = 1;
  this.dx = dx/this.speedX;
  this.dy = -dy/this.speedY;
  this.ctx = game.ctx;
  this.x = xIn; //this.game.mousex - 22;
  this.y = yIn; //this.game.mousey;
  this.lifetime = 600;
  this.removeFromWorld = false;
}
LaserBlast.prototype = new Entity();
LaserBlast.prototype.constructor = LaserBlast;

LaserBlast.prototype.update = function () {
    this.x += this.game.clockTick * this.dx;
    this.y += this.game.clockTick * this.dy;

    if (this.x > 800) this.x = -230;
    if (this.y > 800) this.y = -230;
    this.lifetime = this.lifetime - 1;
    if (this.lifetime < 0){
      this.removeFromWorld = true;
    }

    Entity.prototype.update.call(this);
}

LaserBlast.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

/* ========================================================================================================== */
// The Ship
/* ========================================================================================================== */
function TheShip(game, spritesheet) {
    this.animation = new Animation(spritesheet, 128, 128, 256, 0.03, 2, true, 1);
    this.speed = 0;
    this.x = 0;
    this.y = 0;
    this.game = game;
    this.ctx = game.ctx;
    this.removeFromWorld = false;
    Entity.call(this, game, this.x, this.y);
}

TheShip.prototype = new Entity();
TheShip.prototype.constructor = TheShip;

TheShip.prototype.update = function () {
	if (this.game.moveUp) {
		this.y -= 10;
	}

	if (this.game.moveLeft) {
		this.x -= 10;
	}

	if (this.game.moveDown) {
		this.y += 10;
	}

	if (this.game.moveRight) {
		this.x += 10;
	}
    Entity.prototype.update.call(this);
}

TheShip.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

<<<<<<< HEAD

AM.queueDownload("./img/smartBomb.png");
AM.queueDownload("./img/space1-1.png");
=======
/* ========================================================================================================== */
// Asset Manager
/* ========================================================================================================== */
var AM = new AssetManager();
// AM.queueDownload("./img/background.jpg");
AM.queueDownload("./img/shipIdle.png");
AM.queueDownload("./img/Boss1.png");
AM.queueDownload("./img/BossTurret.png");
AM.queueDownload("./img/LaserBlast.png");
>>>>>>> master

AM.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

<<<<<<< HEAD
    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/space1-1.png")));
=======
    gameEngine.addEntity(new TheShip(gameEngine, AM.getAsset("./img/shipIdle.png")));
    gameEngine.addEntity(new Boss1(gameEngine, AM.getAsset("./img/Boss1.png"), 0, 0));
    gameEngine.addEntity(new Boss1(gameEngine, AM.getAsset("./img/Boss1.png")));
    gameEngine.addEntity(new BossTurret(gameEngine, AM.getAsset("./img/BossTurret.png"), 375, 380));
    gameEngine.addEntity(new BossTurret(gameEngine, AM.getAsset("./img/BossTurret.png"), 310, 520));
    gameEngine.addEntity(new BossTurret(gameEngine, AM.getAsset("./img/BossTurret.png"), 375, 325));
    gameEngine.addEntity(new BossTurret(gameEngine, AM.getAsset("./img/BossTurret.png"), 435, 520));    
>>>>>>> master

    console.log("All Done!");
});
