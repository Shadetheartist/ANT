

function Colony(color){
	this.queens = [];
	this.males = [];
	this.workers = [];
	this.soldiers = [];
	this.color = color;
}
Colony.prototype.update = function(){
	for(var i = 0; i < this.queens.length; i++) this.queens[i].update();
	for(var i = 0; i < this.males.length; i++) this.males[i].update();
	for(var i = 0; i < this.workers.length; i++) this.workers[i].update();
	for(var i = 0; i < this.soldiers.length; i++) this.soldiers[i].update();
};
Colony.prototype.render = function(){
	for(var i = 0; i < this.queens.length; i++) this.queens[i].render();
	for(var i = 0; i < this.males.length; i++) this.males[i].render();
	for(var i = 0; i < this.workers.length; i++) this.workers[i].render();
	for(var i = 0; i < this.soldiers.length; i++) this.soldiers[i].render();
};
Colony.prototype.seed = function(){
	this.queens.push(new Queen(new Rectangle(400,400,26,16), this));
};
