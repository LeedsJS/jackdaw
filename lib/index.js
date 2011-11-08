define(['lang', 'engine/core'], function(lang, engine){

	var game = new engine.Engine({
		_setLevelAttr: function(data) {
		    if(this._level){
		        // send level exit event
	    		this.emit("levelexit", [this._level]);
		    }
			this._level = data;
    		this.emit("levelenter", [this._level]);
		}
	});
	
	// disover levels?
	
	// load levels
	
	require('levels/example', function(level){
		game.set("level", level);
	});
	

	return game;
});