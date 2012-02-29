define(['components', 'lang'], function(componentRegistry, lang){

  var idCounter = 0;

  // an entity has behavior/properties and interactions in the game
  var Entity = function(components, props){
    components = components || [];
    if('string' == typeof components) {
      components = components.split(/,\s*/);
    }
    this.components = components;
    lang.mixin(this, props);
    if(!this.id) {
      this.id = Entity.nextId();
    }
    Entity.registry.register(this);
  };
  Entity.nextId = function(stem){
    return (stem || 'ent_') + (idCounter++);
  };

  // a component registry - a dictionary with 
  // component name => component function
  var _registry = Entity.registry = {
    empty: function(){
      console.log("Entity registry.empty()");
      // TODO: does unregistering components need to do cleanup on attached entities?
      for(var name in _registry){
        _registry[name] = null;
        delete _registry[name];
      }
    },
    get: function(name){
      return _registry[name];
    },
    remove: function(id){
      delete _registry[id];
    },
    register: function(ent){
      if(!ent.id){
        throw "Entity: cant register entity without an id property";
      }
      if(_registry[ent.id]) {
        throw "Entity: " + ent.id + " entity is already registered";
      }
      _registry[ent.id] = ent;
      return this;
    }
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
