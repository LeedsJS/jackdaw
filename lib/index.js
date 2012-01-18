define(['lang', 'engine/core', 'keyboardControls'], function(lang, engine, controls){

    var levelIds = ['example', 'level_002'], // levels are lazy-loaded
        currentLevel = null;

    var game = new engine.Engine({
      // setter for the game's current level
      _setLevelAttr: function(levelId) {
          if(currentLevel){
            // send level exit event
            this.emit("level.exit", [{
              target: currentLevel
            }]);
          }
          require('levels/' + levelId, function(level){
              console.log("loaded level:", levelId, level);
              currentLevel = level;
              game.emit('log',"entering level : " + levelId);
              //can hide the loading screen here
              game.levelStartTime = new Date();

              level.enter();

              game.emit("level.enter", [{
                target: currentLevel
              }]);
          });
      }
    });
    

    function getNextLevelId(){
      var currentId = currentLevel && currentLevel.id; 
      var idx = currentId ? 1+levelIds.indexOf(currentId) : 0;
      return idx >= levelIds.length ? null : levelIds[idx];
    }
    
    function goToNextLevel(){
        if(currentLevel){
          currentLevel.exit();
        }
        var nextLevel = getNextLevelId(); 
        if(nextLevel){
          console.log("next level: ", nextLevel);
          game.set("level", nextLevel);
        } else {
          game.emit('log', 'No more levels, game complete!');
          game.loop.stop();
        }
    }
    
    game.listen("startup", function(){
      controls.init();
      console.log("Setting up the keyboard controls");
      game.getKeyboardState = function(){
          var keysDown = controls.getKeysDown();
          return {
              keyIsDown: function(key){
                  var i;
                  for(i = 0; i < keysDown.length; i += 1){
                      if(keysDown[i] === key){
                          return true;
                      }
                  }
                  return false;
              }
          };
      };
      goToNextLevel();// go to the first level
    });
    
    game.listen("level.enter", function(evt){
      console.log("level entered, evt: ", evt);
    });
    game.listen("update", function(arg){
      if(currentLevel){
          currentLevel.update(arg);
      }
    });
    game.listen("afterupdate", function(arg){
      if(currentLevel){
        currentLevel.render(arg);
      }
    });

    game.listen("level.exit", function(evt){
        game.loop.stop();
        if(evt.target && evt.target == level){
            game.emit('log',"example level exited");
        }
    });
    game.listen("level.enter", function(evt){
        game.emit('log',"example level entered");
        game.loop.start();
    }); 

    // when a level is completed go to the next level
    game.listen('level.complete',  function(){
        game.emit('log', 'level complete, go to next level');
        goToNextLevel();
    });
    
    return game;
});
