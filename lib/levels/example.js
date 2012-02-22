define([
  'lang', 
  'engine/core', 
  'canvasRenderer',
  'event',
  'entity',
  'component',
  'sprite',
  'levels/sprites'
  ], function(lang, engine, renderer, event, Entity, Component, Sprite, images){
  // levels could be data driven? so ajax for ./level.txt or ./level.json 

  // thought was to use an ascii representation of the map
  // which we can easily parse and render
  
  // in this example, we've got walls, corners and a door
  // the engine will know how to parse and build this level
  var layout = ''+
    '/-E---------------\\\n'+
    '|                 |\n'+
    '| G               D\n'+
    '\\_________________/'+
  '';
  var level = {}; //probably we'll provide a class to spin instances off of
  var game = engine.getInstance();

  var eventHandles = [
    game.listen("level.exit", function(evt){
      if(evt.target && evt.target == level){
        game.emit('log',"example level exited");
      }
      // level.enter
    })
  ];
  
  var someEntity = null,
    timeLeftS = null,
    timeLimitMs = 3 * 1000;

  lang.mixin(level, {
    id: 'example',
    map: layout,
    enter: function(){
      game.emit('log', "you entered the 'example' room");
      var canvas = game.config.canvasNode;
      var levelBounds = this.bounds = { l: 0, t: 0, r: canvas.width, b: canvas.height };

      renderer.canvasNode = game.config.canvasNode;
      renderer.init();
      
      var bouncingMovement = new Component({ 
        name: 'bouncing-movement',  
        update: function(ent){
          var bounds = ent.bounds,
            xdir = ent.xdir, 
            ydir = ent.ydir; // TODO: use a heading
          var x = ent.x, y = ent.y;
          if(x < 0 || x + ent.width > bounds.r) { 
            xdir *= -1;
            ent.xdir = xdir;
          }
          if(y < 0 || y + ent.height > bounds.b) { 
            ydir *= -1;
            ent.ydir = ydir;
          }
          x += (10 * xdir);
          y += (5 * ydir);
          ent.x = x; 
          ent.y = y;
        }
      });

      var exampleSprite = new Sprite({
        name: 'example-sprite',
        state: (function(){
          var commonState = { img: images.shift(), offsetx: 0, offsety: 0, w: 50, h: 50, frames: 1, interval: 1000/60 };
          return {
            move: lang.mixin(Object.create(commonState), {
              name: 'move'
            })
          };
        })()
      });

      this.someEntity = new Entity("bouncing-movement, example-sprite", {
        bounds: levelBounds,
        x: 0, y: 0, width: 50, height: 50,
        xdir: 1, ydir: 1, 
        spriteState: 'move'
        // render: function(ctx){
        //   var ent = this, 
        //       sprite = this.sprite, 
        //       animFrame = this.spriteFrameIdx, 
        //       img = sprite.img;
        //   var drawArgs = [    
        //       img,                                            // image
        //       sprite.offsetx + (animFrame * sprite.w),        // source-x
        //       sprite.offsety,                                 // source-y
        //       img.width,                                      // source-width
        //       img.height,                                     // source-height
        //       ent.x,                                          // dest-x
        //       ent.y,                                          // dest-y
        //       ent.width,                                      // dest-width
        //       ent.height                                      // dest-height
        //   ];
        //   ctx.drawImage.apply(ctx, drawArgs);
        // }
      });
      this.someEntity.init();
    },
    exit: function(){
      game.emit('log', "you left the 'example' room");
      delete renderer.canvasNode;
    },
    update: function(){
      // update all entities. 
      // TODO: the level maybe should maintain a collection of entities which it automatically calls update on
      this.someEntity.update();
      
      // timer calculations
      var curTime = new Date().getTime();
      var timePassedMs = curTime - game.levelStartTime.getTime();
      var timeLeftMs = timeLimitMs - timePassedMs;    
      timeLeftS = parseInt(timeLeftMs / 1000,10);
      if(timeLeftS <= 0){
          game.emit("level.complete");
      }   
    },
    render: function(){
      var ent = this.someEntity;
      var scene = {
        getRenderList: function(){
          return [ent];
        }
      };
      renderer.render(scene);
    },
    
    // ----------------------------------
    // just ideas, not actually working
    //
    D: function(){
      game.emit('log', "this is the door object, checking in");
      // can store private data, state by closure
      var isOpen = false;
      // if we have a library of game objects
      // we could instantiate/extend here
      return {
        // states, rules for this object?
      };
    },
    G: function(){
      game.emit('log', "this is a Grue");
      // should instantiate/extend NPC class here
      return {
        // states, rules for this object?
      };
    },
    E: function(){
      game.emit('log', "this the exit; another Door");
      return {
        // states, rules for this object?
      };
    }
  });
  return level;
});
