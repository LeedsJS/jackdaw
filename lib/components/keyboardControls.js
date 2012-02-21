define(['component'], function(Component){ 

  var keysDown = [], 
      unlistenHandles = {};

  // TODO: support config for wasd key mapping?
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

  function setupListeners(){
    unlistenHandles.keydown = function(){
      document.removeEventListener('keydown', onKeyDown, false);
    };
    unlistenHandles.keyup = function(){
      document.removeEventListener('keyup', onKeyUp, false);
    };
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
    
    return unlistenHandles;
  }
  
  function addKeyDown(key){
    for(i = 0; i < keysDown.length; i += 1){
      if(key === keysDown[i]){
        // do not register the key as down if it is already
        // fixes chrome problem where many keys downs happen
        return;      
      }
    }
    keysDown.push(key);
    // console.log("keysDown: " + keysDown.join(","));
  }

  function removeKeyDown(key){
    var i;
    for(i = 0; i < keysDown.length; i += 1){
      if(key === keysDown[i]){
        keysDown.splice(i,1);
      }
    }
    // console.log("keysDown: " + keysDown.join(","));
  }
  
  var keyboardControl = new Component({ 
    name: 'keyboardControl',
    init: function () {
      setupListeners();
    },
    attach: function(ent){
      // give the entity a map like {KEYNAME: true}
      ent.keysDown = {};
      console.log("Attaching keyboardControls to: " + ent.name);
    },
    detach: function(ent){
      delete ent.keysDown;
    },
    update: function(ent){},
    beforeUpdate: function(ent){
      var keys = {};
      for(var i=0; i<keysDown.length; i++){
        keys[ keysDown[i].toUpperCase() ] = true;
      }
      ent.keysDown = keys;
    },
    tearDown: function(){
      var handle;
      for(var name in unlistenHandles){
        unlistenHandles[name]();
      }
      unlistenHandles = {};
    }
  });
  
  return keyboardControl;
});
