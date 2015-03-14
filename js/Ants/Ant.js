function Ant(rect, colony){
	this.rect = rect;
	this.colony = colony;
	this.rotation = 0;
	this.color = "#000";
	this.energy = 100;
	this.timeUntilDeath = 2592000; //1 month
}
Ant.prototype.render = function(){
	var padding = 1;
	var center = this.rect.center();
	ctx.save();
		ctx.translate(center.x, center.y);
		ctx.rotate(this.rotation);
		ctx.translate(-center.x, -center.y);
		ctx.fillStle = this.color;
		this.rect.render();
		ctx.fillStyle = this.colony.color;
		new Rectangle(this.rect.x+padding, this.rect.y+padding, this.rect.w-padding*2, this.rect.h-padding*2).render();
	ctx.restore();
};
Ant.prototype.update = function(){
	
};
Ant.prototype.die = function(){
	
};
Ant.prototype.toString = function(){
	return this.constructor.name + " : " + this.energy;
};