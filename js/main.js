function Task(){
	this.begin = function(){};
	this.during = function(){};
	this.end = function(){};
}
    document.body.setAttribute("onkeydown", "Keys.DOWN(event);");
    document.body.setAttribute("onkeyup", "Keys.UP(event);");





var colonyA = new Colony("#00F");
colonyA.seed();

new Pheromone(new Point(500,200), 100, colonyA.queens[0]);


function update(){
	colonyA.update();
	
	for(var i = 0; i < pheromones.length; i++) pheromones[i].update();
}
function render(){
	if(GameState.clearScreen) ctx.clearRect(0, 0, 800, 800);
	ctx.scale(camera.scale.x, camera.scale.y);
	ctx.translate(camera.translate.x, camera.translate.y);

	if(GameState.showPheremones) for(var i = 0; i < pheromones.length; i++) pheromones[i].render();
	
	colonyA.render();
	
	ctx.translate(-camera.translate.x, -camera.translate.y);
	ctx.scale(1/camera.scale.x, 1/camera.scale.y);
}

function tick(){
	if(GameState.paused){
		if(Keys.s.pressed) {
			GameState.paused = false;
		}
		if(Keys.a.pressed) {
			update();
			render();
			Time.tick();
		}
	}
	else
	{
		if(Keys.w.pressed) {
			GameState.paused = true;
		}
		if(Keys.d.pressed) {
			ctx.clearRect(0, 0, 800, 800);
		}
		update();
		render();
		Time.tick();

	}
	setTimeout(tick, 0);
}
tick();







