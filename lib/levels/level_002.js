define([
    'lang', 
    'engine/core', 
    'event',
    'levels/sprites'
], function(lang, engine, event, images){
    var game = engine.getInstance(),
        door = {x : 500, y: 100, width: 5, height: 40},
        player = {x :10, y: 10, width: 10, height: 10}; // player is just a shape for now
         
    // we need to have some kind of collision detection utilities, this could go in there
    function overlapping(rect1, rect2){
        var overlappingX = true,
            overlappingY = true;
        // horizontal
        if((rect1.x + rect1.width) < rect2.x){
           overlappingX = false; // rect 1 is too far to the left 
        }
        if(rect1.x > (rect2.x + rect2.width)){
            overlappingX = false; // rect 1 is too far to the right
        }
        //vertical
        if((rect1.y + rect1.height) < rect2.y){
           overlappingY = false; // rect 1 is too high  
        }
        if(rect1.y > (rect2.y + rect2.height)){
            overlappingY = false; // rect 1 is too low
        }
        return (overlappingY && overlappingX); 
    }

    function checkForDoorEnter(){ 
        if(overlapping(player, door)){
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
        ctx.fillStyle = "rgb(200,0,0)";  
        ctx.fillRect (player.x, player.y, player.width, player.height);  
    }
    function drawDoor(ctx){
        ctx.fillStyle = "rgb(0,200,0)";  
        ctx.fillRect (door.x, door.y, door.width, door.height);  
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
            ctx.clearRect( 0, 0, canvas.width, canvas.height );
            ctx.font = "20pt Arial";
            ctx.fillText("Level Two. Walk through the door to enter level three.", 50, 50);
            drawPlayer(ctx);
            drawDoor(ctx);
        }
    };
});
