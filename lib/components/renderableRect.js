define([
  'component',
  'canvasRenderer'
], function(Component, renderer){ 
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
