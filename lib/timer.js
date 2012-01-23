define(function(){

  var Loop = function(args){
    args = args || {};
    for(var i in args){
      this[i] = args[i];
    }
    this.lastUpdated = undefined;
  },
  proto = Loop.prototype;
  proto.fps = 1000/60;
  proto.maxDelta = 1000/15;

  proto.start = function(){
    var loop = this;
    this._timer && clearInterval(this._timer);
    this._timer = setInterval(function(){
      var now = +new Date;
      var dt = Math.min(loop.maxDelta, loop.lastUpdated?now-loop.lastUpdated:0);
      loop.lastUpdated = now;
      loop.tick({
        ts: loop.lastUpdated,
        dt: dt
      });
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
