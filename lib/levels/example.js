define(['lang', 'engine/core', 'event'], function(lang, engine, event){
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
	
	return lang.mixin(level, {
		id: 'example',
		map: layout,
		onEnter: function(){
			event.emit('/log', "you entered the 'example' room");
		},
		onExit: function(){
			event.emit('/log', "you left the 'example' room");
		},
		D: function(){
			event.emit('/log', "this is the door object, checking in");
			// can store private data, state by closure
			var isOpen = false;
			// if we have a library of game objects
			// we could instantiate/extend here
			return {
				// states, rules for this object?
			}
		},
		G: function(){
			event.emit('/log', "this is a Grue");
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