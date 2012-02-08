define(['lang', 'engine/core', 'keyboardControls'], function(lang, engine, controls){
  var levelIds = ['example', 'level_002', 'level_003'],// levels are lazy-loaded
    currentLevel = null,
    game = null;
  
  function validateLevel(level){
    if(!level.id){
      throw new Error('Level does not specify an id');
    }
    if(!level.update){
      throw new Error('Level: ' + level.id + ' does not have an update method');
    }
    if(!level.render){
      throw new Error('Level: ' + level.id + ' does not have an render method');
    }
  }
  function loadLevel(levelId){
    require('levels/' + levelId, function(level){
      game.emit('log',"Loaded " + levelId);
      validateLevel(level);
      currentLevel = level;
      //can hide the loading screen here
      game.levelStartTime = new Date();
      level.enter();
      game.emit("level.enter", [{
        target: currentLevel
      }]);
    });
  }
  game = new engine.Engine({
    // setter for the game's current level
    _setLevelAttr: function(levelId) {
      if(currentLevel){
        // send level exit event
        this.emit("level.exit", [{
          target: currentLevel
        }]);
      }
      loadLevel(levelId);
    }
  });
  function getNextLevelId(){
    var currentId = currentLevel && currentLevel.id;
    var idx = currentId ? 1+levelIds.indexOf(currentId) : 0;
    return idx >= levelIds.length ? null : levelIds[idx];
  }
  function goToNextLevel(){
    var nextLevel = getNextLevelId(); 
    if(currentLevel && currentLevel.exit){
      currentLevel.exit();
    }
    if(nextLevel){
      game.emit('log',"Going to " + nextLevel);
      game.set("level", nextLevel);
    } else {
      game.emit('log', 'No more levels, game complete!');
      game.loop.stop();
    }
  }
  game.listen("startup", function(){
    controls.init();
    game.emit('log',"Setting up the keyboard controls");
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
    if(game.config.startLevel) {
      game.set('level', game.config.startLevel);
    } else {
      game.set('level', levelIds[0]);
    }
  });

  game.listen("update", function(arg){
    if(currentLevel){
      currentLevel.update(arg);
    }
  });
  game.listen("afterupdate", function(){
    if(currentLevel){
      currentLevel.render();
    }
  });
  game.listen("level.enter", function(){
    game.emit('log', currentLevel.id + ' entered');
    game.loop.start();
  }); 
  // when a level is completed go to the next level
  game.listen('level.complete',  function(){
    game.emit('log', currentLevel.id + ' completed');
    if(game.config.debugLevel) {
      game.loop.stop();
    } else {
      goToNextLevel();
    }
  });
  
  game.listen("level.exit", function(){
    game.emit('log', currentLevel.id + " exited");
    game.loop.stop();
  });
  return game;
});
