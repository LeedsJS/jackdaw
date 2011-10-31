define(['lang', 'dom'], function(lang, dom){
	var Engine = function(){
		console.log("Engine ctor");
	};
	
	Engine.prototype = {
		start: function(config){
			config = config || {};
			var canvas = dom.byId(config.canvasNode);
			console && console.log("jackdaw engine start stub");
			console.log("using canvas at: ", canvas);
		}
	}

	
	return {
		Engine: Engine
	}
})