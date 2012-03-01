define(['component', 'lang'], function(Component, lang){

  var idCounter = 0;

  // an entity has behavior/properties and interactions in the game
  var Entity = function(components, props){
    if(!(props || components)) return; // subclassing?

    components = components || [];
    if('string' == typeof components) {
      components = components.split(/,\s*/);
    }
    this.components = components;
    lang.mixin(this, props);
    if(!this.id) {
      this.id = Entity.nextId();
    }
    Entity.register(this);
  };
  Entity.nextId = function(stem){
    return (stem || 'ent_') + (idCounter++);
  };
  Entity.create = function(components, props){
    return new Entity(components, props);
  };
  
  // an entity registry - a dictionary with 
  // entity name => entity function
  var _registry = {};

  // getter/setter for the Entity registry
  Entity.register =  function(ent){
    if(!ent.id){
      throw "Entity.register: cant register entity without an id property";
    }
    if(_registry[ent.id]) {
      throw "Entity.register: " + ent.id + " entity is already registered";
    }
    _registry[ent.id] = ent;
    return Entity;
  }; 
  Entity.emptyRegistry = function(){
    for(var name in _registry){
      _registry[name] = null;
      delete _registry[name];
    }
  };
  // getter
  Entity.get = function(name){
    return _registry[name];
  };
  // to facilitate debugging
  Entity._registry = _registry;

  function callComponentsFunc(name) {
    return function() {
      var ent = this, 
          args = Array.prototype.slice.call(arguments), 
          i=0, 
          componentList = ent.components || [],
          component = null;

      args.unshift(ent);

      for(; i<componentList.length; i++){
        component = Component.get(componentList[i]);
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
    component = Component.get(name);
    component.detach(this);
    var idx = this.components.indexOf(name);
    if(idx > -1) {
      this.components.splice(idx, 1);
    }
    return this;
  };
  
  return Entity;
});
