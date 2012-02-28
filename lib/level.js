define(['dollar', 'lang'], function($, lang){
  function Level(levelData) {
    // init
    this.entities = [];
    lang.mixin(this, levelData);
  }

  // * loading any components implemented by entities
  // * creating entities from the level data
  // * updating the entities on each update
  // * removing each entity and attached components correctly when the level ends
  Level.prototype.initialize = function(){
    // TODO: walk the data and instantiate entities, components etc.
  };
  Level.prototype.enter = function(){};
  Level.prototype.exit = function(){};
  Level.prototype.render = function(){};
  Level.prototype.render = function(){};
  Level.prototype.update = function(){
    this.entities.forEach(function(ent){
      ent.update();
    });
  };
  Level.prototype.getRenderList = function(){
    return this.entities;
  };

  return {
    load: function (resourceName, req, callback, config) {
      // hook up callbacks
      var cb = callback.resolve || callback,
          eb = callback.reject || error;
      // get the image
      $.ajax({
        url: resourceName, 
        dataType: 'json',
        success: function(resp) {
          var level = new Level(resp);
          callback(level);
        },
        error: function(err) {
          console.log("error loading level: " + resourceName, err);
          callback({ });
        }
      });
    }
  };
  
});
