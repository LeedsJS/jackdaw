define(['lang'], function(lang){
  
  function Component(props){
    if(!props) return; // subclassing?
    if(!props.name) {
      throw "component: 'name' property is required";
    }
    lang.mixin(this, props);
    Component.register(this);
  }

  // a component registry - a dictionary with 
  // component name => component function
  var _registry = {};

  // getter/setter for the Component registry
  Component.register =  function(comp){
    if(!comp.name){
      throw "components: cant register component without a name property";
    }
    if(_registry[comp.name]) {
      throw "components: " + comp.name + " component is already registered";
    }
    _registry[comp.name] = comp;
    return Component;
  }; 
  Component.emptyRegistry = function(){
    // TODO: does unregistering components need to do cleanup on attached entities?
    for(var name in _registry){
      _registry[name] = null;
      delete _registry[name];
    }
  };
  // getter
  Component.get = function(name){
    return _registry[name];
  };
  // to facilitate debugging
  Component._registry = _registry;
  
  
  Component.prototype = {
    attach: function(entity) {
      //console.log(this.name + " component stub attach method, called on: ", entity);
    },
    update: function(entity) {
      // console.log(this.name + " component stub update method, called on: ", entity);
    },
    detach: function(entity) {
      // throw new Error("Detach must be implemented so the component can be removed from an entity");
      //console.log(this.name + " component stub detach method, called on: ", entity);
    }
  };
  return Component;
});
