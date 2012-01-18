define(['lang', 'engine/core'], function(lang, engine){

	var game = new engine.Engine({
		_setLevelAttr: function(data) {
		    if(this._level){
		        // send level exit event
	    		this.emit("levelexit", [{
					target: this._level
				}]);
		    }
			this._level = data;
    		this.emit("levelenter", [{
				target: this._level
			}]);
		}
	});
	
	// discover levels?
	
	// load levels
	
	require('levels/example', function(level){
		game.set("level", level);
	});
	

	return game;
});
