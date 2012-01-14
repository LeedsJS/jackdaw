define([
	'lang', 
	'engine/core', 
	'event',
	'levels/sprites'
	], function(lang, engine, event, images){
		var game = engine.getInstance();
		return {
			enter: function(){
				game.emit('log', "level two");
			},
			exit: function(){
				game.emit('log', "you left the 'example' room");
			},
			update: function(){
				//game.emit("level.complete");
				
			},
			render: function(){
				var canvas = game.config.canvasNode,
					ctx = canvas.getContext("2d");
				
				ctx.clearRect( 0, 0, canvas.width, canvas.height );
							
				ctx.font = "20pt Arial";
				ctx.fillText("Level Two. Walk through the door to enter level three.", 50, 50);
	
			},
			unLoad: function(){
				// this is called before a level is deleted
				// unload assets here and clean up (if needed)
			}
		};
});
