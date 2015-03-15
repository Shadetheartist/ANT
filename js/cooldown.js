function CoolDown(time) {
    this.time = time;
    this.timeStarted = Date.now();
}
CoolDown.prototype.isCool = function () {
    if (this.time + this.timeStarted <= Date.now()) {
        this.timeStarted = Date.now();
        return true;
    }
    return false;
};
CoolDown.prototype.timeLeft = function () {
    return Date.now() - this.timeStarted + this.time;
};