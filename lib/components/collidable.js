define([
  'component',
  'engine/core'
], function(Component, engine){ 
  var game = engine.getInstance(),
    collidables = [];
   
  function getOtherEntities(allEntities, exceptThisOne){
    var i, otherEntities = [];

    for(i = 0; i < allEntities.length; i += 1){
      if(allEntities[i] !== exceptThisOne){
        otherEntities.push(allEntities[i]);      
      }
    }
    return otherEntities;
  }

  function assignCollidables(entity){
    // get list of other entities 
    var otherEntities = getOtherEntities(collidables, entity);
    // assign the other entities to the collidables property of the entity
    entity.collidables = otherEntities; 
  }

  function assignEachEntitysCollidables(){
    var i;
    // for each entity in collidable entities
    for(i = 0; i < collidables.length; i += 1){
      // assign the collidables for that entity
      assignCollidables(collidables[i]);
    } 
  }

  return new Component({
    name: "collidable",
    attach: function (entity) {
      
      // For now just give each collidable entity a reference to all the other
      // collidables as the movable component is taking care of the rest.
      // It may be a good idea to move some of the
      // collision code thats in the moveable component into
      // here, although that may require more advanced collision detection.

      collidables.push(entity);
      assignEachEntitysCollidables();
    },
    update: function (ent) {

    },
    detach: function (ent) {
    }
  });

});
