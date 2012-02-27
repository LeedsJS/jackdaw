define([
  'component',
  'engine/core'
], function(Component, engine){ 

  var game = engine.getInstance();
  // TODO: I am sure there is a better way to do this. (maybe use splice and indexOf)
  function removeFromArray(arr,item){
    var i = 0;
    for(i = 0; i < arr.length; i += 1){
      if(arr[i].name === item.name){
        arr.splice(i,1);      
      }
    }
  }
  return new Component({
    name: "collectable",
    attach: function (collectable) {
      this.collisionListener = game.listen('collision', function (e) {
        var player;
        // if the player collides with the collectable then add the collectable to the players inventory
        if(e.entity.name === 'player' && e.collidable.name === collectable.name){
          player = e.entity;
          if(!player.inventory){
            player.inventory = [collectable];
          } else {
            player.inventory.push(collectable);
          }
          // also remove the collectable from the players collidables (you do not collide with items that you have collected)
          removeFromArray(player.collidables, collectable); 
          // remove the renderable component from the thing that was collected
          
          collectable.removeComponent('renderableRect');  

        }
      });
    },
    update: function (ent) {
    },
    detach: function (ent) {
      this.collisionListener.remove();
    }
  });

});
