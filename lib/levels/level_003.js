define([
  'lang', 
  'engine/core', 
  'event',
  'entity', 
  'components/keyboardControls', 
  'levels/sprites', 
  'components/moveable',
  'collision',
  'components/collectable',
  'components/portal'
], function(lang, engine, event, Entity, keyboardControls, images, moveable, collision, collectable, portal){

  var game = engine.getInstance(),
    walls = [],
    door = null,
    key = null,
    player = null, 
    keyCollected = false; // TODO: create something more sophisticated e.g an inventory or player.items
    
  function createPlayer(){
    player = new Entity(
      [keyboardControls.name, moveable.name], 
      {name: "player", x: 30, y: 30, width: 10, height: 10, speed: 3}
    );
    player.init();
  }
  function createDoor() {
    door = new Entity(
      [portal.name],
      {x : 500, y: 60, width: 5, height: 40, name: 'door', destination: 'level_002', keyName: key.name}
    );
    door.init();
  }
  function createKey() {
    key = new Entity(
      [collectable.name],
      {name: 'key', x: 230, y: 370, width: 5, height: 10, colour: {r: 190, g: 50, b: 40}}
    );
    key.init();
  }
  function createWalls(){
    // populate the walls array with some walls
    // each wall is just a rectangle
    // (so we will have 4 rectangles to cover the four sides of the room)
    var leftWall = {x: 0, y: 0, width: 10, height: 400},
      rightWall = {x: 790, y: 0, width: 10, height: 400},
      topWall = {x: 10, y: 0, width: 780, height: 10},
      bottomWall = {x: 10, y: 390, width: 780, height: 10};
    walls = [leftWall, rightWall, topWall, bottomWall];
    walls.push({x: 200, y: 190, width:10, height: 200});
    walls.push({x: 250, y: 190, width:10, height: 200});
  }
  function drawWall(wall, ctx){
    ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
  }
  function drawWalls(ctx){
    // render the walls
    var i = 0;
    ctx.fillStyle = "rgb(110,110,110)";
    for(i = 0; i < walls.length; i += 1){
      drawWall(walls[i], ctx);       
    }
  }
  function drawPlayer(ctx){
    ctx.fillStyle = "rgb(200,50,50)";
    ctx.fillRect(player.x, player.y, player.width, player.height);
  }
  function drawDoor(ctx){
    ctx.fillStyle = "rgb(140,100,40)";
    ctx.fillRect(door.x, door.y, door.width, door.height);
  }
  function drawKey(ctx){
    if(!keyCollected){
      ctx.fillStyle = 'rgb(' + key.colour.r + ',' + key.colour.g + ',' + key.colour.b +  ')';
      ctx.fillRect(key.x, key.y, key.width, key.height);
    }
  }
  return {
    id: "level_003",
    enter: function(){
      game.emit('log', "entering level three");
      createWalls();
      createPlayer();
      createKey();
      createDoor();
      player.collidables = [].concat(walls, [door], key);
    },
    beforeUpdate: function(){
      player.beforeUpdate();
    },
    update: function(){
      player.update();
    },
    render: function(){
      var canvas = game.config.canvasNode,
      ctx = canvas.getContext("2d");
      ctx.fillStyle = "rgb(0,0,0)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "12pt Arial";
      ctx.fillStyle = "#DDD";
      ctx.fillText("Level Three. Collect the key to open the door to level four.", 15, 27);
      drawWalls(ctx);
      drawPlayer(ctx);
      drawDoor(ctx);
      drawKey(ctx);
    },
    exit: function () {
      player.removeComponents();
      door.removeComponents();
      key.removeComponents();
    }
  };
});
