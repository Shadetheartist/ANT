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
	colonyA.render();
	for(var i = 0; i < pheromones.length; i++) pheromones[i].render();
}

function tick(){
	update();
	render();
	requestAnimationFrame(tick);
}
tick();







