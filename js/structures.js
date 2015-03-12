
//POINT ************************************************************************ POINT
function Point(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}
Point.prototype.render = function () {
    ctx.fillRect(this.x, this.y, 1, 1);
};
Point.prototype.toString = function () {
    return "(" + this.x + ":" + this.y + ")";
};
Point.prototype.within = function(pointB, accuracy){
    if(!isNaN(accuracy)) accuracy = new Point(accuracy, accuracy);
    var x = (this.x < pointB.x + accuracy.x && this.x > pointB.x - accuracy.x);
    var y = (this.y < pointB.y + accuracy.y && this.y > pointB.y - accuracy.y);
    return (x && y);
};
Point.prototype.toVector2 = function(){
    return new Vector2(this.x, this.y);
};


//VECTOR2 ************************************************************************ VECTOR2
function Vector2(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}
Vector2.prototype.normalize = function () {
    var tempVector = new Vector2();
    var magnitude = Math.abs(Math.sqrt(this.x * this.x + this.y * this.y));
    tempVector.x = this.x /= magnitude;
    tempVector.y = this.y /= magnitude;
    return tempVector;
};
Vector2.prototype.magnitude = function () {
    return new Vector2(Math.sqrt(this.x * this.x), Math.sqrt(this.y * this.y));
};
Vector2.prototype.add = function (b) {
    return new Vector2(this.x + b.x, this.y + b.y);
};
Vector2.prototype.sub = function (b) {
    return new Vector2(this.x - b.x, this.y - b.y);
};
Vector2.add = function (a, b) {
    return new Vector2(a.x + b.x, a.y + b.y);
};
Vector2.sub = function (a, b) {
    return new Vector2(a.x - b.x, a.y - b.y);
};
Vector2.getDistance = function (a, b) {
    return Math.sqrt(Math.sqaure(b.sub(a).x) + Math.sqaure(b.sub(a).y));
};
Vector2.prototype.toString = function () {
    return "(" + this.x + ":" + this.y + ")";
};
Vector2.prototype.render = function () {
    ctx.fillRect(this.x, this.y, 1, 1);
};
Vector2.prototype.within = function(pointB, accuracy){
    if(!isNaN(accuracy)) accuracy = new Point(accuracy, accuracy);
    var x = (this.x < pointB.x + accuracy.x && this.x > pointB.x - accuracy.x);
    var y = (this.y < pointB.y + accuracy.y && this.y > pointB.y - accuracy.y);
    return (x && y);
};
//RECTANGLE ************************************************************************ RECTANGLE
function Rectangle(x, y, w, h) {
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 20;
    this.h = h || 20;
}
Rectangle.prototype.center = function () {
    return new Vector2(this.x + this.w / 2, this.y + this.h / 2);
};
Rectangle.prototype.pos = function () {
    return new Vector2(this.x, this.y);
};
Rectangle.prototype.render = function () {
    ctx.fillRect(this.x, this.y, this.w, this.h);
};
Rectangle.prototype.renderVerts = function () {
    ctx.fillRect(this.x, this.y, 1, 1);
    ctx.fillRect(this.x, this.y + this.h, 1, 1);
    ctx.fillRect(this.x + this.w, this.y, 1, 1);
    ctx.fillRect(this.x + this.w, this.y + this.h, 1, 1);
};
Rectangle.prototype.isCollide = function (b) {
    return !(
        ((this.y + this.h) < (b.y)) ||
        (this.y > (b.y + b.h)) ||
        ((this.x + this.w) < b.x) ||
        (this.x > (b.x + b.w))
    );
}

//FunctionList ************************************************************************ FunctionList
function FunctionList() {
    this.list = [];
}
FunctionList.prototype.invokeList = function () {
    for (var i = 0; i < this.list.length; i++) {
        this.list[i]();
    }
};