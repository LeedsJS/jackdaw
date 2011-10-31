define([], function(){
	// language utilities
	var empty = {};
	return {
		mixin: function(targ, obj) {
			for(var i in obj) {
				if(i in empty) continue;
				targ[i] = obj[i];
			}
			return targ;
		}
	};
});