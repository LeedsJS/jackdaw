define(['lang', 'components'], function(lang, componentRegistry){
  function Component(props){
    if(! props.name) {
      throw "component: 'name' property is required";
    }
    if(components[props.name]) {
      throw "component: " + props.name + " component is already registered";
    }
    
    lang.mixin(this, props);
    components[this.name] = this;
  }
  
  Component.prototype = {
    init: function(entity) {
      console.log(this.name + " component stub init method, called on: ", entity);
    },
    update: function(entity) {
      console.log(this.name + " component stub update method, called on: ", entity);
    }
  };
});