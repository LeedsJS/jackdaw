define([
  'component',
  'engine/core'
], function(Component, engine){ 
  var game = engine.getInstance();
  return new Component({
    name: "portal",
    attach: function (entity) {
      entity.collisionHandler = game.listen('collision', function (e) {
        if(e.entity.name === 'player' && e.collidable.name === entity.name){
          var playerCollidedWith = entity.name;
          var currentLevelId = game.get('level').id;
          game.set('level', entity.destination);
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
