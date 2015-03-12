var pheromones = [];
function Pheromone(pos, radius, colony, meaning, urgency, strength, timeRemaining){
	this.index = pheromones.length;
	this.pos = pos || new Point();
	this.radius = radius || 1;
	this.meaning = meaning || function(){};
	this.urgency = urgency || 1;
	this.strength = strength || 1;
	this.timeAlive = timeRemaining || 1000;
	this.timeRemaining = this.timeAlive;

	this.colony = colony;
}
Pheromone.prototype.update = function(){
	this.timeRemaining--;
	this.strength = this.timeRemaining / this.timeAlive;
	if(this.timeRemaining < 0) pheromones.splice(this.index, 1);
};

Pheromone.prototype.render = function(){
	ctx.save();
		ctx.beginPath();
		ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
		ctx.fillStyle = this.colony.color;
		ctx.globalAlpha = 0.3 * this.strength;
		ctx.fill();
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#000';
		ctx.stroke();
	ctx.restore();
};