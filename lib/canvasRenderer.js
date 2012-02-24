define(['lang'], function(lang){
  
  function toRgbExpression(color){
    var values = [Math.round(color.r || 0), Math.round(color.g || 0), Math.round(color.b || 0)], 
        str = '';
    if('a' in color && color.a < 1){
      values.push(color.a);
      str = 'rgba('+ values.join(',') + ')';
    } else {
      str = 'rgb('+ values.join(',') + ')';
    }
    return str;
  }
  
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
          // image/sprite rendering
          var sprite = obj.sprite, 
              animFrame = obj.spriteFrameIdx, 
              img = sprite.img;
          var drawArgs = [    
              img,                                            // image
              sprite.offsetx + (animFrame * sprite.w),        // source-x
              sprite.offsety,                                 // source-y
              img.width,                                      // source-width
              img.height,                                     // source-height
              obj.x,                                          // dest-x
              obj.y,                                          // dest-y
              obj.width,                                      // dest-width
              obj.height                                      // dest-height
          ];
          ctx.drawImage.apply(ctx, drawArgs);
        } else if(obj.fill && obj.color){
          // color fill rendering
          ctx.fillStyle = toRgbExpression(obj.color);
          ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
        } 
        // else if(obj.line){
        //   // color fill rendering
        //   console.warn("render what? ", obj);
        //   throw "Can't render unknown object type";
        // } 
        else {
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
