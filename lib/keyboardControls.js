define([], function(){ 
  var keysDown = [];

  function addKeyDown(key){
    for(i = 0; i < keysDown.length; i += 1){
      if(key === keysDown[i]){
        // do not register the key as down if it is already
        // fixes chrome problem where many keys downs happen
        return;      
      }
    }
    keysDown.push(key);
  }

  function removeKeyDown(key){
    var i, couldFindKey = true;
    for(i = 0; i < keysDown.length; i += 1){
      if(key === keysDown[i]){
        keysDown.splice(i,1);
      }
    }
  }
  
  function listenForKeyDownEvents(){
    function onKeyDown(e) {
      if(e.keyCode === 37){
        addKeyDown('left');
      }
      if(e.keyCode === 38){
        addKeyDown('up');
      }
      if(e.keyCode === 39){
        addKeyDown('right');
      }
      if(e.keyCode === 40){
        addKeyDown('down');
      }
    }
    document.addEventListener('keydown', onKeyDown, false);
  }

  function listenForKeyUpEvents(){
    function onKeyUp(e){
      if(e.keyCode === 37){
        removeKeyDown('left');
      }
      if(e.keyCode === 38){
        removeKeyDown('up');
      }
      if(e.keyCode === 39){
        removeKeyDown('right');
      }
      if(e.keyCode === 40){
        removeKeyDown('down');
      }
    }
    document.addEventListener('keyup', onKeyUp, false);
  }

  return {
    init: function() {
      listenForKeyDownEvents();
      listenForKeyUpEvents();
    },
    getKeysDown: function(){
      return keysDown;
    }
  };
});
