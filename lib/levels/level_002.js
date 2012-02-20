define([
  'lang', 
  'engine/core', 
  'event', 
  'entity', 
  'components/keyboardControls', 
  'levels/sprites', 
  'moveable', 
  'collision'
], function(lang, engine, event, Entity, keyboardControls, images, moveable, collision){
  var game = engine.getInstance(),
    door = {x: 500, y: 100, width: 5, height: 40, name: 'door'},
    walls = [],
    player = null;

  function createPlayer(){ 
    player = new Entity(
      [keyboardControls.name, moveable.name], 
      {name: "player", x: 20, y: 20, width: 10, height: 10, speed: 3}
    );
    player.init();
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
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect(player.x, player.y, player.width, player.height);
  }
  function drawDoor(ctx){
    ctx.fillStyle = "rgb(0,200,0)";
    ctx.fillRect(door.x, door.y, door.width, door.height);
  }
  return {
    id: "level_002",
    enter: function(){
      game.emit('log', "entering level two");
      createPlayer();
      createWalls();
      player.collidables = [].concat(walls, [door]);
      game.listen('collision', function(e){
        // when the player collides with the door
        if((e.entity === player) && (e.collidable === door)){
          // the level is complete
          game.emit("level.complete");
        }
      });
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
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "12pt Arial";
      ctx.fillStyle = "#DDD";
      ctx.fillText("Level Two. Walk through the door to enter level three.", 15, 27);
      drawPlayer(ctx);
      drawDoor(ctx);
      drawWalls(ctx);
    }
  };
});
