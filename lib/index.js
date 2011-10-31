define(['lang', 'engine/core'], function(lang, engine){
	var game = new engine.Engine;
	
	game._setLevelAttr = function(data) {
		this._level = data;
		console.log("got level data: ", data);
	};
	
	// load levels
	require('levels/example', function(level){
		game.set("level", level);
	});
	
	return game;
});