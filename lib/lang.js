define([], function(){
	// language utilities
	var empty = {};
	
	var mixin = function(targ, obj) {
		for(var i in obj) {
			if(i in empty) continue;
			targ[i] = obj[i];
		}
		return targ;
	}; 
	
	var createObject = function(thing, props) {
		// delegation with mixin. 
		var FN = function(){};
		FN.prototype = thing; 
		var obj = new FN;
		if(props) {
			mixin(obj, props);
		}
		return obj;
	};
	
	var extend = function(clazz, proto){
		mixin(clazz.prototype, proto);
		// mixin the new proto in directly. 
		// TODO: handle property name collisions
		return clazz;
	}

		
	return {
		mixin: mixin, 
		createObject: createObject,
		extend: extend
	};
});