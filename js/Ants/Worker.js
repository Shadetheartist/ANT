function Worker(rect, colony) {
    Ant.call(this, rect, colony);
    this.tasks = [];
    this.ignoredPheromones = [];
    this.laidPheromones = [];
    this.randomValue = 0;
    this.currentlyInPheromone = undefined;
    this.tasks.push(this.explore.bind(this));
    this.tasks.push(this.forward.bind(this));
    this.tasks.push(this.pheromoneCheck.bind(this));
    this.pheromoneCheck();

}
Worker.prototype = Object.create(Ant.prototype, {});
Worker.prototype.update = function () {
    this.timeUntilDeath--;
    if (this.timeUntilDeath < 0) this.die();
    for (var i = 0; i < this.tasks.length; i++) this.tasks[i]();
};
Worker.prototype.render = function () {
    var padding = 1;
    var center = this.rect.center();
    ctx.save();
    ctx.translate(center.x, center.y);
    ctx.rotate(this.rotation);
    ctx.translate(-center.x, -center.y);
    ctx.fillStle = this.color;
    this.rect.render();
    ctx.fillStyle = this.colony.color;
    new Rectangle(this.rect.x + padding, this.rect.y + padding, this.rect.w - padding * 2, this.rect.h - padding * 2).render();
    ctx.restore();

};
Worker.prototype.forward = function () {
    this.rect.x += Math.cos(this.rotation);
    this.rect.y += Math.sin(this.rotation);
};
Worker.prototype.backward = function () {
    this.rect.x -= Math.cos(this.rotation);
    this.rect.y -= Math.sin(this.rotation);
};
Worker.prototype.pheromoneCheck = function () {
	var options = [];
    for (var i = 0; i < pheromones.length; i++) {

        var pheromone = pheromones[i];

        var dx = this.rect.x - pheromone.pos.x;
        var dy = this.rect.y - pheromone.pos.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < pheromone.radius){
			options.push(pheromone);
			pheromone.timeRemaining++;
		}

    }
	if(options.length > 0) this.inPheromone(options[0]);
	else this.currentlyInPheromone = undefined;

};
Worker.prototype.inPheromone = function (pheromone) {
    this.currentlyInPheromone = pheromone;
    if (pheromone.ant === this) return;

    for (var i = 0; i < this.ignoredPheromones.length; i++) {
        if (this.ignoredPheromones[i] === pheromone) return;
    }
    this.ignoredPheromones.push(pheromone);

}

Worker.prototype.explore = function () {

    //explore in front of ant
    var sightDistnace = 200;
    var fieldOfViewMod = 0.8;
    var randomPoint = new Point(
        this.rect.x + Math.cos((this.rotation + (Math.random() * Math.PI) - Math.PI / 2) * fieldOfViewMod) * sightDistnace,
        this.rect.y + Math.sin((this.rotation + (Math.random() * Math.PI) - Math.PI / 2) * fieldOfViewMod) * sightDistnace
    );
    var r = Math.atan2(randomPoint.y - this.rect.y, randomPoint.x - this.rect.x);
    this.tasks[0] = function () {
        this.rotation = r;
    }.bind(this);


    if (this.currentlyInPheromone === undefined) {
        var newPheromone = new Pheromone(false);
        newPheromone.pos = new Point(this.rect.x, this.rect.y);
        newPheromone.radius = 150;
        newPheromone.ant = this;
        if (this.laidPheromones.length > 0) {
            if (this.laidPheromones[this.laidPheromones.length - 1].backward != newPheromone)
                this.laidPheromones[this.laidPheromones.length - 1].forward = newPheromone;
        }
        if (this.laidPheromones[this.laidPheromones.length - 1] != newPheromone)
            newPheromone.backward = this.laidPheromones[this.laidPheromones.length - 1];

        this.laidPheromones.push(newPheromone);
        pheromones.push(newPheromone);
    } else if (this.currentlyInPheromone.forward !== undefined) {
        this.randomValue = (Math.random() * Math.PI - Math.PI / 2) * 0.5
        this.tasks[0] = this.follow.bind(this);
    }

    new Timeout(function (ant) {
        ant.tasks[0] = ant.explore.bind(ant);
    }, 50, this);

};

Worker.prototype.follow = function (pos) {
    if (this.currentlyInPheromone !== undefined) {
        if (this.currentlyInPheromone.forward !== undefined) {
            var r = Math.atan2(this.currentlyInPheromone.forward.pos.y - this.rect.y, this.currentlyInPheromone.forward.pos.x - this.rect.x);
            this.tasks[0] = function () {
                this.rotation = r + this.randomValue;
            }.bind(this);
        }
        
    }

}