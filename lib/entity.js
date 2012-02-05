define(['components'], function(componentRegistry){

  // an entity has behavior/properties and interactions in the game
  var Entity = function(components){
    components = components || [];
    if('string' == typeof components) {
      components = components.split(/,\s*/);
    }
    this.components = components;
  };

  Entity.prototype.init = function(){
    var i=0, 
        componentList = this.components,
        component = null;
    
    for(; i<componentList.length; i++){
      component = componentRegistry[ componentList[i] ];
      if('function' !== typeof component) {
        throw "entity init: no component registered as " + componentList[i];
      }
      component.init(this);
    }
  };
  
  return Entity;
});