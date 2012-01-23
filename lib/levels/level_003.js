define(['lang', 'engine/core', 'event','levels/sprites', 'collision'],
function(lang, engine, event, images, collision){
  var game = engine.getInstance(),
    door = {x : 500, y: 60, width: 5, height: 40},
    key = {x : 300, y: 30, width: 5, height: 10, colour: {r: 190, g: 50, b: 40}},
    player = {x :30, y: 30, width: 10, height: 10, speed: 3},
    keyCollected = false; // TODO: create something more sophisticated e.g an inventory or player.items

  function playerDoorCollision(){
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
  function updatePlayerPosition(){
    // arrows control the player (left right up down)
    // check if any of these are pressed.
    // and move the player accordingly
    var keyboard = game.getKeyboardState();
    player.prevX = player.x;
    player.prevY = player.y;
    if(keyboard.keyIsDown('up')){
      player.y -= player.speed;
      if(playerDoorCollision()){
        player.y += player.speed;
      }
    }
    if(keyboard.keyIsDown('down')){
      player.y += player.speed;
      if(playerDoorCollision()){
        player.y -= player.speed;
      }
    }
    if(keyboard.keyIsDown('left')){
      player.x -= player.speed;
      if(playerDoorCollision()){
        player.x += player.speed;
      }
    }
    if(keyboard.keyIsDown('right')){
      player.x += player.speed;
      if(playerDoorCollision()){
        player.x -= player.speed;
      }
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
      ctx.fillText("Level Three. Collect the key to open the door to level four.", 7, 17);
      drawPlayer(ctx);
      drawDoor(ctx);
      drawKey(ctx);
    }
  };
});
