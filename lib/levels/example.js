define(['lang'], function(lang){
	// levels could be data driven? so ajax for ./level.txt or ./level.json 

	// thought was to use an ascii representation of the map
	// which we can easily parse and render
	
	// in this example, we've got walls, corners and a door
	// the engine will know how to parse and build this level
	var layout = ''+
		'/-----------------\\\n'+
		'|-----------------|\n'+
		'|-----------------D\n'+
		'\_________________/'+
	'';
	var level = {}; //probably we'll provide a class to spin instances off of
	
	return lang.mixin(level, {
		id: 'example',
		map: layout,
		onEnter: function(){
			console.log("you entered the 'example' room");
		},
		onExit: function(){
			console.log("you left the 'example' room");
		},
		D: function(){
			console.log("this is the door object, checking in");
			// can store private data, state by closure
			var isOpen = false;
			// if we have a library of game objects
			// we could instantiate/extend here
			return {
				// states, rules for this object?
			}
		}
	});
});