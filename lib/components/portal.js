define([
  'component',
  'engine/core'
], function(Component, engine){ 
  var game = engine.getInstance();

  function playerHasKey(player, keyName){
    var i = 0;
    if(!player.inventory){
      return false;
    }
    for(i = 0; i < player.inventory.length; i += 1){
      if(player.inventory[i].name === keyName){
        return true;
      }
    }
    return false;
  }

  return new Component({
    name: "portal",
    attach: function (entity) {
      entity.collisionHandler = game.listen('collision', function (e) {
        if(e.entity.name === 'player' && e.collidable.name === entity.name){
          if(!e.collidable.keyName || playerHasKey(e.entity, e.collidable.keyName)){
            game.set('level', entity.destination);
          }
        }
      });
    },
    update: function (ent) {
    },
    detach: function (ent) {
      ent.collisionHandler.remove();
    }
  });

});
