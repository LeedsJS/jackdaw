define([], function(){
	return {
		byId: function(stringOrNode){
			return (stringOrNode && "string" == typeof stringOrNode) ? 
				document.getElementById(stringOrNode) : stringOrNode;
		}		
	}
});