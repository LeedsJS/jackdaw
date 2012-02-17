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

	var after = function(fn, after, scope) {
		// create a function that calls the original then the 'after' function
		return function(){
			var ret = fn.apply(this, arguments);
			after.apply(scope || this, arguments);
			return ret;
		};
	};
	var partial = function(fn){
		// create a function that calls original with the given arguments
		var args = Array.prototype.slice.call(arguments, 1);
		return function(callArgs){
			return fn.apply(this, args.concat(arguments));
		};
	};

	var around = function(fn, before, scope) {
		// create a function that calls the 'before' function, then the original
		return function(){
			before.apply(scope || this, arguments);
			return fn.apply(this, arguments);
		};
	};
	
	var extend = function(clazz, proto){
		mixin(clazz.prototype, proto);
		// mixin the new proto in directly. 
		// TODO: handle property name collisions
		return clazz;
	};
		
	return {
		mixin: mixin, 
		createObject: createObject,
		extend: extend,
		after: after,
		partial: partial
	};
});