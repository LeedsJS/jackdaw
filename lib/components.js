define([], function(){
  
  // a component registry - a dictionary with 
  // component name => component function
  var registry = {};
  
  return {
    _registry: registry,
    empty: function(){
      console.log("component registry.empty()");
      // TODO: does unregistering components need to do cleanup on attached entities?
      for(var name in registry){
        registry[name] = null;
        delete registry[name];
      }
    },
    get: function(name){
      return registry[name];
    },
    register: function(comp){
      if(!comp.name){
        throw "components: cant register component without a name property";
      }
      if(registry[comp.name]) {
        throw "components: " + comp.name + " component is already registered";
      }
      registry[comp.name] = comp;
      return this;
    }
  };
  
});
