define(['component', 'collision'], function(Component, collision){ 

  function doesCollide(ent){
    var collidables = ent.collidables || [],
      collidable = null,
      i = 0;

    for(i = 0; i < collidables.length; i += 1){
      collidable = ent.collidables[i];
      if(collision.rectsOverlap(ent, collidable)) {
        game.emit('collision', {entity: ent, collidable: collidable});
        return true;
      }
    }
    return false;
  }
  
  function moveEntity(ent, axis, amount){
    // TODO: think about vectors
    // example values: axis 'x' amount 2
    var targetPos = ent[axis] + amount,
        increment = null; 
    // the ent is moved in increments so we get the closest position before wall contact
    if(targetPos > ent[axis]){
      increment = 1;
    } else {
      increment = -1;
    }
    while(ent[axis] !== targetPos){
      ent[axis] += increment;
      if( doesCollide(ent) ) {
        ent[axis] -= increment;
        break;
      }
    }
  }
  
  var moveable = new Component({
    name: "moveable",
    update: function(ent){
      // arrows control the ent (left right up down)
      // check if any of these are pressed.
      // and move the ent accordingly
      var keysMap = ent.keysDown || {};
      if(keysMap.UP){
        moveEntity(ent, 'y', -ent.speed);
      }
      if(keysMap.DOWN){
        moveEntity(ent, 'y', ent.speed);
      }
      if(keysMap.LEFT){
        moveEntity(ent, 'x', -ent.speed);
      }
      if(keysMap.RIGHT){
        moveEntity(ent, 'x', ent.speed);
      }
    }
  });
  
  return moveable;
});
