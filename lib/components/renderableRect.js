define([
  'component',
  'engine/core',
  'canvasRenderer'
], function(Component, engine, renderer){ 
  var game = engine.getInstance();
  return new Component({
    name: "renderableRect",
    attach: function (ent) {
          
    },
    update: function (ent) {
      renderer.addRectToRender(ent);
    },
    detach: function (ent) {
      
    }
  });

});
