function Camera(){
	this.scale = new Vector2(1, 1);
	this.translate = new Vector2();
	this.mouseIsDown = false;
	this.initialPos = new Vector2();
	this.zoomAmount = 0.05;
}
Camera.prototype.mouseDown = function(pos){
	this.mouseIsDown = true;
	
	this.initialPos.x = pos.x - this.translate.x * this.scale.x;
	this.initialPos.y = pos.y - this.translate.y * this.scale.y;
	
	for(var i = 0; i < colonies.length; i++){
		var colony = colonies[i];
		for(var o = 0; o < colonies[i].queens.length; o++){
			if(colony.queens[i].rect.isCollide(new Rectangle((pos.x / this.scale.x) - this.translate.x, (pos.y / this.scale.y) - this.translate.y , 0, 0))){
				document.getElementById('info').textContent = colony.queens[i];
				break;
			}
		}
		for(var o = 0; o < colonies[i].workers.length; o++){
			if(colony.workers[i].rect.isCollide(new Rectangle((pos.x / this.scale.x) - this.translate.x, (pos.y / this.scale.y) - this.translate.y , 0, 0))){
				document.getElementById('info').textContent = colony.workers[i];
				break;
			}
		}
		for(var o = 0; o < colonies[i].soldiers.length; o++){
			if(colony.soldiers[i].rect.isCollide(new Rectangle((pos.x / this.scale.x) - this.translate.x, (pos.y / this.scale.y) - this.translate.y , 0, 0))){
				document.getElementById('info').textContent = colony.soldiers[i];
				break;
			}
		}
		for(var o = 0; o < colonies[i].males.length; o++){
			if(colony.males[i].rect.isCollide(new Rectangle((pos.x / this.scale.x) - this.translate.x, (pos.y / this.scale.y) - this.translate.y , 0, 0))){
				document.getElementById('info').textContent = colony.males[i];
				break;
			}
		}
	}
};
Camera.prototype.mouseUp = function(pos){
	this.mouseIsDown = false;
};
Camera.prototype.mouseMove = function(pos){
	if(this.mouseIsDown){
		this.translate.x = (pos.x - this.initialPos.x) / this.scale.x;
		this.translate.y = (pos.y - this.initialPos.y) / this.scale.y;
	}
};
Camera.prototype.mouseWheel = function(e){
	var mouseWheelDirection = Math.max(-1, Math.min(1, (e.wheelDelta)));
	this.scale.x += (this.zoomAmount * mouseWheelDirection);
	this.scale.y += (this.zoomAmount * mouseWheelDirection);
	
	if(this.scale.x < 0.05) this.scale.x = 0.05;
	if(this.scale.y < 0.05) this.scale.y = 0.05;
}

var camera = new Camera();

canvas.addEventListener('mousedown', function(evt) {
	var mousePos = getMousePos(canvas, evt);
	camera.mouseDown(mousePos);
}, false);
canvas.addEventListener('mouseup', function(evt) {
	var mousePos = getMousePos(canvas, evt);
	camera.mouseUp(mousePos);
}, false);
canvas.addEventListener('mousemove', function(evt) {
	var mousePos = getMousePos(canvas, evt);
	camera.mouseMove(mousePos);
}, false);
canvas.addEventListener('mousewheel', function(e) {
	camera.mouseWheel(e);
}, false);

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
		return new Vector2(
			evt.clientX - rect.left,
			evt.clientY - rect.top
		);
}