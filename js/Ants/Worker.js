



function Worker(rect, colony){
	Ant.call(this, rect, colony);
	this.tasks = [];
	this.tasks.push(this.explore.bind(this));
	this.tasks.push(this.forward.bind(this));
	this.tasks.push(this.pheromoneCheck.bind(this));
	
	
	this.lookingAtTest = new Point();
}
Worker.prototype = Object.create(Ant.prototype, {});
Worker.prototype.update = function(){
	this.timeUntilDeath--;
	if(this.timeUntilDeath < 0) this.die();
	for(var i = 0; i < this.tasks.length; i++) this.tasks[i]();
};
Worker.prototype.render = function(){
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
Worker.prototype.forward = function(){
	this.rect.x += Math.cos(this.rotation);
	this.rect.y += Math.sin(this.rotation);
};
Worker.prototype.backward = function(){
	this.rect.x -= Math.cos(this.rotation);
	this.rect.y -= Math.sin(this.rotation);
};
Worker.prototype.pheromoneCheck = function(){
	
};
Worker.prototype.explore = function(){
	var sightDistnace = 200;
	var fieldOfViewMod = 0.9;
	var randomPoint = new Point(							 //explore in front of ant
		this.rect.x + Math.cos((this.rotation + (Math.random() * Math.PI) - Math.PI/2) * fieldOfViewMod) * sightDistnace,
		this.rect.y + Math.sin((this.rotation + (Math.random() * Math.PI) - Math.PI/2) * fieldOfViewMod) * sightDistnace
	);
	
	var r = Math.atan2(randomPoint.y- this.rect.y,  randomPoint.x - this.rect.x);
	
	this.tasks[0] = function(){
		this.rotation = r;
	}.bind(this);
	
	new Timeout(function(ant){
		ant.tasks[0] = ant.explore.bind(ant);
	}, 100, this);
};




