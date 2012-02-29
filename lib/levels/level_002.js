define([
  'lang', 
  'engine/core', 
  'event', 
  'entity', 
  'component', 
  'sprite',
  'components/keyboardControls', 
  'levels/sprites', 
  'components/moveable', 
  'components/portal',
  'components/renderableRect',
  'components/collidable',
  'collision',
  'canvasRenderer',
  'amd/image!../resources/charsets.png'
], function(lang, engine, event, Entity, Component, Sprite, keyboardControls,
    mages, moveable, portal, rect, collidable, collision, renderer, spriteSheet){

  var game = engine.getInstance(),
    entities = [];    

  function createDoor() {
    var door = new Entity(
      [collidable.name, portal.name, rect.name],
      {
        x: 500, y: 300, width: 5, height: 40, name: 'door', destination: 'level_003',
        color: {r: 200, g:0, b:0}
      }
    );
    door.init();
    entities.push(door);
  }

  function createPlayer () { 
    var commonState = { img: spriteSheet, width: 16, height: 18, offsetx: 0, frames: 3, interval: 120 };
    var playerSprite = Component.get('playerSprite') || new Sprite({
      name: 'playerSprite',
      state: {
        walkup: lang.mixin(Object.create(commonState), {
          name: 'walkup', 
          offsety: 180 // the offset from the top of the sprite sheet for this sequence
                        // animation frames are drawn horizontally, left to right
        }),
        walkright: lang.mixin(Object.create(commonState), {
          name: 'walkright', offsety: 198
        }),
        walkdown: lang.mixin(Object.create(commonState), {
          name: 'walkdown', offsety: 216
        }),
        walkleft: lang.mixin(Object.create(commonState), {
          name: 'walkleft', offsety: 234
        }),
        standing: lang.mixin(Object.create(commonState), {
          name: 'standing', offsety: 216, frames: 1
        })
      }
    });
    
    var walking = Component.get('walkingAnim') || new Component({
      name: 'walkingAnim',
      update: function(ent){
        // arrows control the ent (left right up down)
        // check arrows controls (maybe we should have a direction property on the entity instead)
        if(!('keyDirection' in ent)){
          return;
        }
        
        var dir = Math.max(0, Math.min(ent.keyDirection || 0, 360));
        var dirIndex = Math.round((dir/360) * 8) * 45;
        
        switch(dirIndex) {
          case 0: 
          case 45: 
          case 325: 
            ent.spriteState = 'walkup';
            break;
          case 90: 
            ent.spriteState = 'walkright';
            break;
          case 135: 
          case 180: 
          case 225: 
            ent.spriteState = 'walkdown';
            break;
          case 270: 
            ent.spriteState = 'walkleft';
            break;
        }
      }
    });
    
    var player = Entity.get('thePlayer') || new Entity(
      [keyboardControls.name, collidable.name, moveable.name, playerSprite.name, walking.name], 
      {
        id: 'thePlayer',
        spriteState: 'standing',    // the initial state. Maybe sprite-state and other states can be combined?
        name: "player", 
        x: 20, y: 20, width: 32, height: 36, // initial position/dimensions
        
        speed: 3,
        color: {r:200, g:0, b:0}
      }
    );
    player.init();
    entities.push(player);
  }

  function createWallEntity(options){
    var wall = new Entity(
      [collidable.name, rect.name], 
      {
        name: "wall", 
        x: options.x, y: options.y, width: options.width, height: options.height,
        color: {r:110, g:110, b:110}
      }
    );
    wall.init();
    entities.push(wall);
  }

  function createWalls(){
    // populate the walls array with some walls
    // each wall is just a rectangle
    // (so we will have 4 rectangles to cover the four sides of the room)
    var leftWall = {x: 0, y: 0, width: 10, height: 400},
      rightWall = {x: 790, y: 0, width: 10, height: 400},
      topWall = {x: 10, y: 0, width: 780, height: 10},
      bottomWall = {x: 10, y: 390, width: 780, height: 10};

      createWallEntity(leftWall);
      createWallEntity(rightWall);
      createWallEntity(topWall);
      createWallEntity(bottomWall);
  }
  return {
    id: "level_002",
    enter: function(){
      game.emit('log', "entering level two");
      createWalls();
      createDoor();
      createPlayer();
    },
    update: function () {
      var i = 0;
      for(i = 0; i < entities.length; i += 1){
        entities[i].update();
      }
    },
    render: function () {
      renderer.setCanvas(game.config.canvasNode);
      renderer.clear();
      renderer.render( [Entity.get('thePlayer')] );
      renderer.renderRects();
      //ctx.font = "12pt Arial";
      //ctx.fillStyle = "#DDD";
      //ctx.fillText("Level Two. Walk through the door to enter level three.", 15, 27);
    },
    exit: function () {
      var i = 0;
      for(i = 0; i < entities.length; i += 1){
        entities[i].removeComponents();
      }
    }
  };
});
