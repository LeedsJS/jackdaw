define(['components', 'lang'], function(componentRegistry, lang){

  // an entity has behavior/properties and interactions in the game
  var Entity = function(components, props){
    components = components || [];
    if('string' == typeof components) {
      components = components.split(/,\s*/);
    }
    this.components = components;
    lang.mixin(this, props);
  };
  
  function callComponentsFunc(name) {
    return function() {
      var ent = this, 
          args = Array.prototype.slice.call(arguments), 
          i=0, 
          componentList = ent.components || [],
          component = null;

      args.unshift(ent);

      for(; i<componentList.length; i++){
        component = componentRegistry.get(componentList[i]);
        if(!component) {
          throw "entity init: no valid component registered as " + componentList[i];
        }
        if(component && 'function' === typeof component[name]) {
          component[name].apply(component, args);
        }
      }
      return ent;
    };
  }
  Entity.prototype.update = callComponentsFunc('update');
  Entity.prototype.beforeUpdate = callComponentsFunc('beforeUpdate');

  Entity.prototype.init = function(){
    var attachComponents = callComponentsFunc('attach');
    return attachComponents.call(this);
  };
  Entity.prototype.removeComponents = function(){
    while(this.components.length){
      this.removeComponent(this.components[0]);
    }
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
