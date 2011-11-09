define(['event'], function(event){
	event.listen("log", function(msg){
		console && console.log("LOG: " + msg);
	});
	return {
		log: function(msg) {
			event.emit('log', msg);
		}
	}
});