function Queen(rect, colony){
	Ant.call(this, rect, colony);
	this.timeUntilDeath = 2592000 * 24; //2 years
	this.spawnAnt = function(delay){
		new Timeout(function(queen){
			var randomSpawnDistanceFromQueen = 20;
			var center = queen.rect.center();
			var size = new Point(8, 3);
			queen.colony.workers.push(
				new Worker(
					new Rectangle(
						center.x + Math.random() * randomSpawnDistanceFromQueen * 2 - randomSpawnDistanceFromQueen - (size.x/2), 
						center.y + Math.random() * randomSpawnDistanceFromQueen * 2 - randomSpawnDistanceFromQueen - (size.y/2),
						size.x, 
						size.y
					),
					queen.colony
				)
			);
			queen.spawnAnt(260);
		}, delay, this);
	}
	this.spawnAnt(0);
}
Queen.prototype = Object.create(Ant.prototype, {});

Queen.prototype.update = function(){

};
Queen.prototype.toString = function(){
	return "Queen : " + this.energy;
};