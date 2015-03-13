function Task(){
	this.begin = function(){};
	this.during = function(){};
	this.end = function(){};
}






var colonyA = new Colony("#F55");
colonyA.seed();

pheromones.push(new Pheromone(new Point(200,200), 100, colonyA));


function update(){
	colonyA.update();
	
	for(var i = 0; i < pheromones.length; i++) pheromones[i].update();
}
function render(){
	ctx.clearRect(0, 0, 800, 800);
	ctx.scale(camera.scale.x, camera.scale.y);
	ctx.translate(camera.translate.x, camera.translate.y);

	colonyA.render();
	for(var i = 0; i < pheromones.length; i++) pheromones[i].render();

	ctx.translate(-camera.translate.x, -camera.translate.y);
	ctx.scale(1/camera.scale.x, 1/camera.scale.y);
}

function tick(){
	update();
	render();
	Time.tick();
	setTimeout(tick, 0);
}
tick();







