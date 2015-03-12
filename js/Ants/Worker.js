



function Worker(rect, colony){
	Ant.call(this, rect, colony);
	this.tasks = [];
	this.tasks.push(this.explore.bind(this));
	this.tasks.push(this.forward.bind(this));

}
Worker.prototype = Object.create(Ant.prototype, {});
Worker.prototype.update = function(){
	this.timeUntilDeath--;
	if(this.timeUntilDeath < 0) this.die();
	for(var i = 0; i < this.tasks.length; i++) this.tasks[i]();
};
Worker.prototype.forward = function(){
	this.rect.x += Math.cos(this.rotation);
	this.rect.y += Math.sin(this.rotation);
};
Worker.prototype.backward = function(){
	this.rect.x -= Math.cos(this.rotation);
	this.rect.y -= Math.sin(this.rotation);
};
Worker.prototype.explore = function(){
	var sightDistnace = 20;
	var fieldOfViewMod = 1;
	var randomPoint = new Point(							 //explore in front of ant
		this.rect.x * (Math.cos((this.rotation + (Math.random() * Math.PI - Math.PI/2)) * fieldOfViewMod) * sightDistnace),
		this.rect.y * (Math.sin((this.rotation + (Math.random() * Math.PI - Math.PI/2)) * fieldOfViewMod) * sightDistnace)
	);
	var r = Math.atan2(randomPoint.y, randomPoint.x);
	this.tasks[0] = function(){
		this.rotation -= this.rotation-r;
	}.bind(this);
	setTimeout(function(ant){
		ant.tasks[0] = ant.explore.bind(ant);
	}, 1000, this);
};




