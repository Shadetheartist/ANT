function Task(){
	this.begin = function(){};
	this.during = function(){};
	this.end = function(){};
}
    document.body.setAttribute("onkeydown", "Keys.DOWN(event);");
    document.body.setAttribute("onkeyup", "Keys.UP(event);");




var c1 = new Colony("#00F")
c1.seed();
colonies.push(c1);

function update(){

	for(var i = 0; i < colonies.length; i++) colonies[i].update();
	for(var i = 0; i < pheromones.length; i++) pheromones[i].update();

}
function render(){
	if(GameState.clearScreen) ctx.clearRect(0, 0, 800, 800);
	ctx.scale(camera.scale.x, camera.scale.y);
	ctx.translate(camera.translate.x, camera.translate.y);

	if(GameState.showPheremones){
		for(var i = 0; i < pheromones.length; i++) pheromones[i].render();
	}
	
	for(var i = 0; i < colonies.length; i++) colonies[i].render();
	
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
		render();
	}
	else
	{
		if(Keys.w.pressed) {
			GameState.paused = true;
		}
		update();
		render();
		Time.tick();
	}
	
	if(Keys.d.pressed) {
		GameState.clearScreen = false;
	} else {
		GameState.clearScreen = true;
	}
	
	setTimeout(tick, 0);
}
tick();







