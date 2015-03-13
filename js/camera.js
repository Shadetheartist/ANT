function Camera(){
	this.scale = new Vector2(1, 1);
	this.translate = new Vector2();
	this.mouseIsDown = false;
	this.initialPos = new Vector2();
	this.zoomAmount = 0.1;

}
Camera.prototype.mouseDown = function(pos){
	this.mouseIsDown = true;
	this.initialPos.x = pos.x - this.translate.x * this.scale.x;
	this.initialPos.y = pos.y - this.translate.y * this.scale.y;
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
	this.scale.x += this.zoomAmount * mouseWheelDirection;
	this.scale.y += this.zoomAmount * mouseWheelDirection;
	if(this.scale.x < 0.1) this.scale.x = 0.1;
	if(this.scale.y < 0.1) this.scale.y = 0.1;
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