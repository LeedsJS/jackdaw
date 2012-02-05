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
      component = componentRegistry.get(componentList[i]);
      if(!(component && 'function' === typeof component.attach)) {
        throw "entity init: no valid component registered as " + componentList[i];
      }
      component.attach(this);
    }
    return this;
  };
  
  Entity.prototype.removeComponent = function(name){
    component = componentRegistry.get(name);
    component.detach(this);
    var idx = this.components.indexOf(name);
    if(idx > -1) {
      this.components.splice(idx, 1);
    }
    return this;
  };
  
  return Entity;
});