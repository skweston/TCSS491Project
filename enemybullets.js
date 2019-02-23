/* ========================================================================================================== */
// LaserBlaster
/* ========================================================================================================== */


function LaserBlast(game, angle){
	this.pWidth = 32;
	this.pHeight = 32;
	this.scale = 1;
	this.animation = new Animation(AM.getAsset("./img/LaserBlast.png"), this.pWidth, this.pHeight, 128, 0.15, 4, true, this.scale);
	this.name = "EnemyProjectile";

	this.x = 0;
	this.y = 0;
	this.xMid = -100;
	this.yMid = -100;
	this.radius = 4 * this.scale;
	this.angle = angle;

	this.lifetime = 500;
	this.damage = 7;
	this.maxSpeed = 300;
	this.velocity = {x: 10, y: 10};

	this.game = game;
	this.ctx = game.ctx;
	this.removeFromWorld = false;
  }

LaserBlast.prototype = new Entity();
LaserBlast.prototype.constructor = LaserBlast;

LaserBlast.prototype.update = function () {
	this.x += this.velocity.x * this.game.clockTick;
	this.y += this.velocity.y * this.game.clockTick;

	this.xMid = (this.x + (this.pWidth * this.scale / 2)) - 1;
	this.yMid = (this.y + (this.pHeight * this.scale / 2)) - 1;

	var speed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
	if(speed > this.maxSpeed) {
		var ratio = this.maxSpeed / speed;
		this.velocity.x *= ratio;
		this.velocity.y *= ratio;
	  }


	  var ent = this.game.ship;
	  if(!ent.rolling && Collide(this, ent)) {
		  ent.takeDamage(this.damage);
		  this.removeFromWorld = true;
	  }

	  this.lifetime -= 1;
	  if (this.lifetime < 0) {
		  this.removeFromWorld = true;
	  }

	  Entity.prototype.update.call(this);
  }

LaserBlast.prototype.draw = function () {
	if(onCamera(this)){
		this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, this.angle);
	}
	if (SHOW_HITBOX) {
		this.ctx.beginPath();
		this.ctx.strokeStyle = "Red";
		this.ctx.lineWidth = 1;
		this.ctx.arc(this.xMid, this.yMid, this.radius * this.scale, 0, Math.PI * 2, false);
		this.ctx.stroke();
		this.ctx.closePath();
	}

	Entity.prototype.draw.call(this);
}
