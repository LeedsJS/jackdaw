define(['lang', 'dom', 'logger'], function(lang, dom, logger){
	var Engine = function(){
		logger.log("Engine ctor");
	};
	
	Engine.prototype = {
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

	
	return {
		Engine: Engine
	}
})