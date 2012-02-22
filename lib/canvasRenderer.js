define(['lang'], function(lang){
  var renderer = {
    name: 'canvasRenderer',
    init: function(){
      var doc = document, 
          id = this.name, 
          count = 0;
      if(!this.canvasNode){
        var node = this.canvasNode = doc.createElement("canvas");
        while(doc.getElementById(id)){
          id = this.name + (count++);
        }
        node.id = id;
        document.body.appendChild( node );
      }
    },
    render: function(scene) {
      // simple renderer to draw a list of objects to a canvas, no camera, no projector
      var ctx = this.canvasNode.getContext("2d"), 
          objects = scene.getRenderList(); // projector.projectScene(scene, camera)?
      
      this.clear();
      
      objects.forEach(function(obj, idx){
        if(obj.sprite) {
          var ent = obj, 
              sprite = obj.sprite, 
              animFrame = obj.spriteFrameIdx, 
              img = sprite.img;
          var drawArgs = [    
              img,                                            // image
              sprite.offsetx + (animFrame * sprite.w),        // source-x
              sprite.offsety,                                 // source-y
              img.width,                                      // source-width
              img.height,                                     // source-height
              ent.x,                                          // dest-x
              ent.y,                                          // dest-y
              ent.width,                                      // dest-width
              ent.height                                      // dest-height
          ];
          ctx.drawImage.apply(ctx, drawArgs);
        } else {
          console.warn("render what? ", obj);
          throw "Can't render unknown object type";
        }
      });
    },
    setSize: function(w,h) {
      this.canvasNode.width = w; 
      this.canvasNode.height = h;
    },
    clear: function(box){
      var node = this.canvasNode, 
          bounds = lang.createObject({
            x: 0,
            y: 0, 
            w: node.width, 
            h: node.height
          }, box);
      node.getContext("2d").clearRect( bounds.x, bounds.y, bounds.w, bounds.h );
    }
  };
  
  return renderer; 
});
