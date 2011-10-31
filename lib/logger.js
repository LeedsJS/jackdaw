define(['event'], function(){
	return {
		log: function(msg) {
			console && console.log("LOG: " + msg);
		}
	}
})