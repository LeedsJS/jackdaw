define(['lang', 'components'], function(lang, componentRegistry){
  function Component(props){
    if(! props.name) {
      throw "component: 'name' property is required";
    }
    
    lang.mixin(this, props);
    componentRegistry.register(this);
  }
  
  Component.prototype = {
    attach: function(entity) {
      console.log(this.name + " component stub attach method, called on: ", entity);
    },
    update: function(entity) {
      // console.log(this.name + " component stub update method, called on: ", entity);
    },
    detach: function(entity) {
      console.log(this.name + " component stub detach method, called on: ", entity);
    }
  };
  
  return Component;
});