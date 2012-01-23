define(['lang', 'engine/core', 'event','levels/sprites', 'collision'], 
function(lang, engine, event, images, collision){
  var game = engine.getInstance(),
    door = {x : 500, y: 100, width: 5, height: 40},
    player = {x :10, y: 10, width: 10, height: 10, speed: 3}; // player is just a shape for now

  function checkForDoorEnter(){ 
    if(collision.rectsOverlap(player, door)){
      game.emit("level.complete");
    }
  }

  function updatePlayerPosition(){
    // arrows control the player (left right up down)
    // check if any of these are pressed.
    // and move the player accordingly
    var keyboard = game.getKeyboardState();
    if(keyboard.keyIsDown('up')){
      player.y -= player.speed;
    }
    if(keyboard.keyIsDown('down')){
      player.y += player.speed;
    }
    if(keyboard.keyIsDown('left')){
      player.x -= player.speed;
    }
    if(keyboard.keyIsDown('right')){
      player.x += player.speed;
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
      game.emit('log', "enteringn level two");
    },
    update: function(){
      updatePlayerPosition();
      checkForDoorEnter();
    },
    render: function(){
      var canvas = game.config.canvasNode,
      ctx = canvas.getContext("2d");
      ctx.fillStyle = '#000'; // black
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "12pt Arial";
      ctx.fillStyle = "#DDD";
      ctx.fillText("Level Two. Walk through the door to enter level three.", 7, 17);
      drawPlayer(ctx);
      drawDoor(ctx);
    }
  };
});
