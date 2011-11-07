define(function(){

	var Loop = function(args){
		args = args || {};
		for(var i in args){
			this[i] = args[i];
		}
	}, 
	proto = Loop.prototype;
	proto.fps = 1000/60;
	
	proto.start = function(){
		var loop = this;
		this._timer && clearInterval(this._timer);
		this._timer = setInterval(function(){
			loop.tick(+new Date);
		}, this.fps);
	};
	proto.pause = function(){
		this._timer && clearInterval(this._timer);
	};
	proto.stop = function(){
		this._timer && clearInterval(this._timer);
	};
	
	return {
		Loop: Loop
	};
});