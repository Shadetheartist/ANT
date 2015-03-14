function coolDown(time) {
    this.time = time;
    this.timeStarted = Date.now();
}
coolDown.prototype.isCool = function () {
    if (this.time + this.timeStarted <= Date.now()) {
        this.timeStarted = Date.now();
        return true;
    }
    return false;
};
coolDown.prototype.timeLeft = function () {
    return Date.now() - this.timeStarted + this.time;
};