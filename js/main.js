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
	if(!GameState.noDraw){
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
}
var tpsCoolDown = new CoolDown(1000);
var ticksPerSecond = 0;
var ticksThisSecond = 0;
function tick(){
	if(tpsCoolDown.isCool()){
		ticksPerSecond = ticksThisSecond;
		document.getElementById('tps').textContent = ticksPerSecond;
		ticksThisSecond = 0;
	}
	ticksThisSecond++;
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
	if(Keys.shift.pressed) {
		GameState.noDraw = true;
	} else {
		GameState.noDraw = false;
		}
	
	
	if(Keys.space.pressed) {
		GameState.showPheremones = true;
	} else {
		GameState.showPheremones = false;
	}
	
	setTimeout(tick, 0);
}
tick();







