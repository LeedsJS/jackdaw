define(['lang', 'engine/core', 'event','levels/sprites', 'collision'],
function(lang, engine, event, images, collision){
  var game = engine.getInstance(),
    walls = [],
    door = {x : 500, y: 60, width: 5, height: 40},
    key = {x : 230, y: 370, width: 5, height: 10, colour: {r: 190, g: 50, b: 40}},
    player = {x :30, y: 30, width: 10, height: 10, speed: 3},
    keyCollected = false; // TODO: create something more sophisticated e.g an inventory or player.items
  
    
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
  function wallCollision() {
    var i = 0;
    for(i = 0; i < walls.length; i += 1){
      if(collision.rectsOverlap(player, walls[i])){
        return true;
      }
    }
  }


  function doorCollision(){
    var colide = collision.rectsOverlap(player, door);
    if(colide){
      // The player must collect the key to open the door to level four.
      if(keyCollected){ 
        game.emit("level.complete");
      }
      return true;
    }
  }
  function checkForKeyPickup(){
    if(collision.rectsOverlap(player, key)){
      keyCollected = true;
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
      if(wallCollision() || doorCollision()){
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
    var keyboard = game.getKeyboardState();
    if(keyboard.keyIsDown('up')){
      movePlayer('y', -player.speed)
    }
    if(keyboard.keyIsDown('down')){
      movePlayer('y', player.speed)
    }
    if(keyboard.keyIsDown('left')){
      movePlayer('x', -player.speed)
    }
    if(keyboard.keyIsDown('right')){
      movePlayer('x', player.speed)
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
    },
    update: function(){
      updatePlayerPosition();
      checkForKeyPickup();
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
    }
  };
});
