define(['lang', 'engine/core'], function(lang, engine){
	var game = new engine.Engine({
		_setLevelAttr: function(data) {
			this._level = data;
			console.log("got level data: ", data);
		}		
	});
	
	console.log("acreated Engine instance, game.emit:", typeof game.emit);
	// load levels
	require('levels/example', function(level){
		game.set("level", level);
		
		// do stuff, then
		level.onEnter();
	});
	
	return game;
});