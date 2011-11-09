define([
	'lang', 
	'engine/core', 
	'event',
	'levels/sprites'
	], function(lang, engine, event, images){
	// levels could be data driven? so ajax for ./level.txt or ./level.json 

	// thought was to use an ascii representation of the map
	// which we can easily parse and render
	
	// in this example, we've got walls, corners and a door
	// the engine will know how to parse and build this level
	var layout = ''+
		'/-E---------------\\\n'+
		'|                 |\n'+
		'| G               D\n'+
		'\_________________/'+
	'';
	var level = {}; //probably we'll provide a class to spin instances off of
	var game = engine.getInstance();

	var eventHandles = [
		game.listen("levelexit", function(evt){
			if(evt.target && evt.target == level){
				console.log("example level exited");
			}
			// level.onEnter
		}),
		game.listen("levelenter", function(evt){
			console.log("example level entered");
			level.onEnter();
		}), 
		game.listen("update", function(arg){
			level.onUpdate(arg);
		}),
		game.listen("afterupdate", function(arg){
			level.render(arg);
		})
	]
	
	return lang.mixin(level, {
		id: 'example',
		map: layout,
		onEnter: function(){
			game.emit('log', "you entered the 'example' room");
			
			var img = images.shift();
			this.someEntity = {
				image: img,
				x: 0, y: 0, width: 50, height: 50,
				xdir: 1, ydir: 1
			};
		},
		onExit: function(){
			game.emit('log', "you left the 'example' room");
		},
		onUpdate: function(evt){
			var speed = 150, // px/second
				// cap delta and distance to travel at 15ms 
				distance = Math.ceil(evt.dt / 1000 * speed);
			var canvas = game.config.canvasNode, 
				ent = this.someEntity, 
				xdir = ent.xdir, 
				ydir = ent.ydir; // TODO: use a heading
			var x = ent.x, y = ent.y;
			if(x < 0 || x + ent.width > canvas.width) { 
				xdir *= -1;
				ent.xdir = xdir;
			}
			if(y < 0 || y + ent.height > canvas.height) { 
				ydir *= -1 
				ent.ydir = ydir;
			}
			x += (distance * xdir);
			y += (distance * ydir);
			ent.x = x; 
			ent.y = y;
		},
		render: function(){
			var canvas = game.config.canvasNode,
				ctx = canvas.getContext("2d");
				ctx.clearRect( 0, 0, canvas.width, canvas.height );
			var ent = this.someEntity;
			ctx.drawImage(ent.image, ent.x, ent.y, ent.width, ent.height);
		},
		
		D: function(){
			game.emit('log', "this is the door object, checking in");
			// can store private data, state by closure
			var isOpen = false;
			// if we have a library of game objects
			// we could instantiate/extend here
			return {
				// states, rules for this object?
			}
		},
		G: function(){
			game.emit('log', "this is a Grue");
			// should instantiate/extend NPC class here
			return {
				// states, rules for this object?
			}
		},
		E: function(){
			console.log("this the exit; another Door");
			return {
				// states, rules for this object?
			}
		}
	});
});