define(['lang', 'engine/core', 'keyboardControls'], function(lang, engine, controls){

    var game = new engine.Engine(),
        levelNames = ['example', 'level_002'],
        currentLevel = null,
        currentLevelName = null;

    function getNextLevelName(){
       var i = 0;
        for(i = 0; i < levelNames.length - 1; i += 1){
            if(levelNames[i] === currentLevelName){
                return levelNames[i + 1];
            }   
        }
        game.emit('log', 'No more levels, game complete!');
    }
    function goToLevelByName(levelName){
        //can show the loading screen here while the level loads
        require('levels/' + levelName, function(level){
            currentLevelName = levelName;
            game.emit('log',"entering level : " + levelName);
            //can hide the loading screen here
            currentLevel = level;
            game.levelStartTime = new Date();
            level.enter();
        });
    }
    function goToNextLevel(){
        currentLevel = null;
        goToLevelByName(getNextLevelName());
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
      }
      
    });
    
    game.listen("levelexit", function(evt){
        if(evt.target && evt.target == level){
            game.emit('log',"example level exited");
        }
    });
    game.listen("levelenter", function(evt){
        game.emit('log',"example level entered");
    }); 
    game.listen("update", function(arg){
        if(currentLevel){
            currentLevel.update(arg);
        }
    });
    game.listen("render", function(arg){
        if(currentLevel){
            currentLevel.render(arg);
        }
    });
    // when a level is completed go to the next level
    game.listen('level.complete',  function(){
        game.emit('log', 'level complete, go to next level');
        goToNextLevel();
    });
    goToLevelByName(levelNames[0]);// go to the first level
    return game;
});
