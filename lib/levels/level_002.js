define([
  'lang', 
  'engine/core', 
  'event', 
  'entity', 
  'components/keyboardControls', 
  'levels/sprites', 
  'collision'
], function(lang, engine, event, Entity, keyboardControls, images, collision){
  var game = engine.getInstance(),
    door = {x: 500, y: 100, width: 5, height: 40},
    walls = [],
    player = new Entity(
      [keyboardControls.name], 
      {
        name: "theplayer",
        x: 20, y: 20, width: 10, height: 10, speed: 3
      }
    );
  
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
  function wallCollision() {
    var i = 0;
    for(i = 0; i < walls.length; i += 1){
      if(collision.rectsOverlap(player, walls[i])){
        return true;
      }
    }
    return false;
  }
  function checkForDoorEnter(){ 
    if(collision.rectsOverlap(player, door)){
      game.emit("level.complete");
    }
  }
  function movePlayer(axis, amount){
    // TODO: think about vectors
    // example values: axis 'x' amount 2
    var targetPos = player[axis] + amount;
      increment = null; 
    // the player is moved in increments so we get the closest position before wall contact
    if(targetPos > player[axis]){
      increment = 1;
    } else {
      increment = -1;
    }
    while(player[axis] !== targetPos){
      player[axis] += increment;
      if(wallCollision()){
        // player just went into a wall so move them back to where they were before
        player[axis] -= increment;
        break;
      }
    }
  }
  function updatePlayerPosition(){
    // arrows control the player (left right up down)
    // check if any of these are pressed.
    // and move the player accordingly
    var keysMap = player.keysDown;
    // var keyboard = game.getKeyboardState();
    if(keysMap.UP){
      movePlayer('y', -player.speed);
    }
    if(keysMap.DOWN){
      movePlayer('y', player.speed);
    }
    if(keysMap.LEFT){
      movePlayer('x', -player.speed);
    }
    if(keysMap.RIGHT){
      movePlayer('x', player.speed);
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
      player.init();
      createWalls();
      game.emit('log', "entering level two");
    },
    beforeUpdate: function(){
      player.beforeUpdate();
    },
    update: function(){
      player.update();
      updatePlayerPosition();
      checkForDoorEnter();
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
