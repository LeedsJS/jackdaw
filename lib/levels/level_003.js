define([
  'engine/core', 
  'entity', 
  'components/keyboardControls', 
  'components/moveable', 
  'components/portal',
  'components/renderableRect',
  'components/collidable',
  'collision',
  'canvasRenderer',
  'components/collectable'
], function(engine, Entity, keyboardControls, moveable, portal, rect, collidable, collision, renderer, collectable){

  var game = engine.getInstance(),
    entities = []; 
    
  function createPlayer(){
    var player = new Entity(
      [keyboardControls.name, collidable.name, moveable.name, rect.name], 
      {
        name: "player", 
        x: 30, y: 30, width: 10, height: 10, 
        speed: 3,
        color: {r: 200, g: 0, b: 0}
      }
    );
    player.init();
    entities.push(player);
  }

  function createDoor() {
    var door = new Entity(
      [collidable.name, portal.name],
      {
        name: 'door', 
        x : 500, y: 60, width: 5, height: 40, 
        destination: 'level_002', keyName: 'key' 
      }
    );
    door.init();
    entities.push(door);
  }

  function createKey() {
    var key = new Entity(
      [collidable.name, collectable.name],
      {
        name: 'key', 
        x: 230, y: 370, width: 5, height: 10, 
        colour: {r: 190, g: 50, b: 40}
      }
    );
    key.init();
    entities.push(key);
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
      // middle walls
      createWallEntity({x: 200, y: 190, width:10, height: 200});
      createWallEntity({x: 250, y: 190, width:10, height: 200});
  }

  return {
    id: "level_003",
    enter: function(){
      game.emit('log', "entering level three");
      createWalls();
      createPlayer();
      createKey();
      createDoor();
    },
    update: function(){
      var i = 0;
      for(i = 0; i < entities.length; i += 1){
        entities[i].update();
      }
    },
    render: function(){
      renderer.setCanvas(game.config.canvasNode);
      renderer.clear();
      renderer.renderRects();
      // ctx.font = "12pt Arial";
      // ctx.fillStyle = "#DDD";
      // ctx.fillText("Level Three. Collect the key to open the door to level two.", 15, 27);
    },
    exit: function () {
      // these arent really required.. I thought they would be though.
      player.removeComponents();
      door.removeComponents();
      key.removeComponents();
    }
  };
});

