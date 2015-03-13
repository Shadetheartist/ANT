function Time(){}
Time.current = 0;
Time.timeOuts = [];

Time.tick = function(){
	Time.current++;
	for(var i = 0; i< Time.timeOuts.length; i++){
		if(Time.timeOuts[i] !== null) Time.timeOuts[i].checkAndCall();
	}
};

function Timeout(callback, time, params){
	this.timeSet = Time.current + time;
	this.callback = callback;
	this.params = params;
	this.index = Time.timeOuts.length;
	Time.timeOuts.push(this);
}
Timeout.prototype.checkAndCall =function(){
	if(this.timeSet < Time.current) {
		this.callback(this.params);
		Time.timeOuts[this.index] = null;
	}
};