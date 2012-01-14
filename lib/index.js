define(['lang', 'engine/core'], function(lang, engine){

	var game = new engine.Engine(),
			levelNames = ['example', 'levelTwo'],
			currentLevel = null,
			currentLevelName = null;

		game.listen("levelexit", function(evt){
			if(evt.target && evt.target == level){
				console.log("example level exited");
			}
		});
		game.listen("levelenter", function(evt){
			console.log("example level entered");
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
			console.log("entering level : " + levelName);
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
	// when a level is completed go to the next level
	game.listen('level.complete',  function(){
		console.log("example level complete, go to level two");
		goToNextLevel();
	});
	
	goToLevelByName(levelNames[0]);// go to the first level
	
	return game;
});
