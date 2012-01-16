define([
    'lang', 
    'engine/core', 
    'event',
    'levels/sprites'
    ], function(lang, engine, event, images){
    var someEntity = null,
        timeLeftS = null,
        game = engine.getInstance();
    return {
        enter: function(){
            game.emit('log', "you entered the 'example' room");
            someEntity = {
                image: images.shift(),
                x: 0, y: 0, width: 50, height: 50,
                xdir: 1, ydir: 1
            };
        },
        exit: function(){
            game.emit('log', "you left the 'example' room");
        },
        update: function(){
            var canvas = game.config.canvasNode, 
                ent = someEntity, 
                xdir = ent.xdir, 
                ydir = ent.ydir; // TODO: use a heading
            var x = ent.x, y = ent.y;
            if(x < 0 || x + ent.width > canvas.width) { 
                xdir *= -1;
                ent.xdir = xdir;
            }
            if(y < 0 || y + ent.height > canvas.height) { 
                ydir *= -1 
                ent.ydir = ydir;
            }
            x += (10 * xdir);
            y += (5 * ydir);
            ent.x = x; 
            ent.y = y;
            // timer calculations
            var timeLimitMs = 9 * 1000;
            var curTime = new Date().getTime();
            var timePassedMs = curTime - game.levelStartTime.getTime();
            var timeLeftMs = timeLimitMs - timePassedMs;    
            timeLeftS = parseInt(timeLeftMs / 1000,10);
            if(timeLeftS <= 0){
                game.emit("level.complete");
            }   
        },
        render: function(){
            var canvas = game.config.canvasNode,
                ctx = canvas.getContext("2d");
                ctx.clearRect( 0, 0, canvas.width, canvas.height );
            var ent = someEntity;
            ctx.drawImage(ent.image, ent.x, ent.y, ent.width, ent.height);
            ctx.font = "20pt Arial";
            ctx.fillText("Level complete in " + timeLeftS + " seconds", 50, 50);
        },
        unLoad: function(){
            // this is called before a level is deleted, unload assets here and clean up (if needed)
        }
    };
});
