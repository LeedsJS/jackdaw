define([
  'lang', 
  'engine/core', 
  'event', 
  'entity', 
  'components/keyboardControls', 
  'levels/sprites', 
  'components/moveable', 
  'components/portal',
  'components/renderableRect',
  'components/collidable',
  'collision',
  'canvasRenderer'
], function(lang, engine, event, Entity, keyboardControls,
    mages, moveable, portal, rect, collidable, collision, renderer){

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
    var player = new Entity(
      [keyboardControls.name, collidable.name, moveable.name, rect.name], 
      {
        name: "player", 
        x: 20, y: 20, width: 10, height: 10, 
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
      //player.collidables = [].concat(walls, [door]);
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
      renderer.renderRects();
      //ctx.font = "12pt Arial";
      //ctx.fillStyle = "#DDD";
      //ctx.fillText("Level Two. Walk through the door to enter level three.", 15, 27);
    },
    exit: function () {
    }
  };
});
