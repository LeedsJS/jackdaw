define([], function(){ 
    var keysDown = [];    
    
    function addKeyDown(key){
        keysDown.push(key);
    }
    function removeKeyDown(key){
        var i;
        for(i = 0; i < keysDown.length; i += 1){
            if(key === keysDown[i]){
                keysDown.splice(i,1);
            }
        }
    }

    function listenForKeyDownEvents(){
        document.addEventListener('keydown', function(e){
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
        },true);
    }

    function listenForKeyUpEvents(){
        document.addEventListener('keyup', function(e){
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
        },true);

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
