define(['event'], function(event){

	event.listen("log", function(msg){
        try{
        if(console && console.log){
		    console.log("LOG: " + msg);
        }
        } catch(e){

        }
	});
	return {
		log: function(msg) {
			event.emit('log', msg);
		}
	}
});
