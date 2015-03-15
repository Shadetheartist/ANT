var pheromones = [];
function Pheromone(pos, radius, ant, meaning, urgency, strength, timeRemaining){
	this.index = pheromones.length;
	this.pos = pos || new Point();
	this.radius = radius || 1;
	this.meaning = meaning || function(){};
	this.urgency = urgency || 1;
	this.strength = strength || 1;
	this.timeAlive = timeRemaining || 10000;
	this.maxTimeAlive = 2000
	this.timeRemaining = this.timeAlive;
	this.ant = ant;
	this.color = undefined;

	this.forward = undefined;
	this.backward = undefined;
	
	if(pos!==false)pheromones.push(this);
}
Pheromone.prototype.update = function(){
	this.timeRemaining--;
	this.strength = (this.timeRemaining / this.timeAlive) / 2;
	if(this.strength > 0.5) this.strength = 0.5;
	if(this.timeRemaining < 0){
		var i = this.index;
		pheromones.splice(this.index, 1);
		for(i; i < pheromones.length; i++){
			pheromones[i].index--;
		}
	}
};

Pheromone.prototype.render = function(){
	ctx.save();
		ctx.beginPath();
		ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
		ctx.fillStyle = this.color || this.ant.colony.color;
		ctx.globalAlpha = 0.1 * this.strength;
		ctx.fill();
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#000';
		if(this.backward){
			ctx.moveTo(this.pos.x, this.pos.y);
			ctx.lineTo(this.backward.pos.x, this.backward.pos.y);
		}
		ctx.stroke();
	ctx.restore();
};













