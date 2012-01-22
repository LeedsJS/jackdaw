define(['lang', 'engine/core', 'event','levels/sprites', 'collision'],
function(lang, engine, event, images, collision){
  // The player must collect the key to open the door to level four.
  var game = engine.getInstance(),
    door = {x : 500, y: 60, width: 5, height: 40},
    key = {x : 300, y: 30, width: 5, height: 10, colour: { r: 190, g: 50, b: 40}},
    player = {x :30, y: 30, width: 10, height: 10};

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
      player.y -= 1;
    }
    if(keyboard.keyIsDown('down')){
      player.y += 1;
    }
    if(keyboard.keyIsDown('left')){
      player.x -= 1;
    }
    if(keyboard.keyIsDown('right')){
      player.x += 1;
    }
  }

  function drawPlayer(ctx){
    ctx.fillStyle = "rgb(200,50,50)";
    ctx.fillRect (player.x, player.y, player.width, player.height);
  }
  function drawDoor(ctx){
    ctx.fillStyle = "rgb(140,100,40)";
    ctx.fillRect (door.x, door.y, door.width, door.height);
  }
  function drawKey(ctx){
    ctx.fillStyle = 'rgb(' + key.colour.r + ',' + key.colour.g + ',' + key.colour.b +  ')';
    ctx.fillRect (key.x, key.y, key.width, key.height);
  }

  return {
    id: "level_003",
    enter: function(){
      game.emit('log', "entering level three");
    },
    update: function(){
      updatePlayerPosition();
      checkForDoorEnter();
    },
    render: function(){
      var canvas = game.config.canvasNode,
      ctx = canvas.getContext("2d");
      ctx.clearRect( 0, 0, canvas.width, canvas.height );
      ctx.font = "12pt Arial";
      ctx.fillStyle = "rgb(0,0,0)";
      ctx.fillText("Level Three. Collect the key to open the door to level four.", 15, 15);
      drawPlayer(ctx);
      drawDoor(ctx);
      drawKey(ctx);
    }
  };
});
