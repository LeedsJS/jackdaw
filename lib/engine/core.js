define(['lang', 'dom', 'logger', 'event'], function(lang, dom, logger, event){
	var _instance = null;
	var Engine = function(args){

		// mixin args into instance
		lang.mixin(this, args || {});
		
		// singleton: store reference to the instance
		_instance = this;
		
		if(this.constructor) {
			return this.constructor.apply(this, arguments);
		} 
		return this;
	};
	
	Engine.prototype = {
		constructor: function(args){
			logger.log("default Engine constructor");
		},
		start: function(config){
			config = config || {};
			var canvas = dom.byId(config.canvasNode);
			
			logger.log("jackdaw engine start stub");
			logger.log("using canvas at: ", canvas);
			logger.log("current map/level: ", this._level);
		},
		get: function(name){
			return this[name];
		},
		set: function(name) {
			// look for a setter for this attribute
			var setter = this['_set'+name[0].toUpperCase() + name.substring(1) + 'Attr'];
			if(setter) {
				// pass the value(s) over to the setter and let it return
				return setter.apply(this, Array.prototype.slice.call(arguments, 1))
			} else {
				// just set the property
				this[name] = arguments[1];
				return this;
			}
		}
	}
	
	// extending engine class to be Evented");
	lang.extend(Engine, event.Evented);
	
	return {
		getInstance: function(){
			return _instance;
		},
		Engine: Engine
	}
})