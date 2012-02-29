define(['lang', 'component'], function(lang, Component){ 

  // Sprites are a component that gets attached to one or more entities
  // they provide a way to associate an image or animation with named 'spriteStates' 
  // ..changing the entity's spriteState property picks the corresponding sprite state

  function Sprite(props) {
    Component.call(this, props);
  }
  Sprite.prototype = lang.mixin(new Component(), {
    constructor: Sprite,
    init: function(){
      if('function' == typeof this.state){
        this.state = this.state();
      }
      // prepare the sprite states, so we get something like
      // ent.update => sprite.update(ent); 
      // ent.sprite = {name: 'walkright', src: 'player.png', width: 16, height: 18, offsetx: 0, offsety: 180, interval: 30 }
      console.log(this.state);
    },
    renderSprite: function(ent){
      var sprite = ent.sprite;
      // console.log("rendering sprite: ", ent, sprite);
    },
    attach: function(ent){
      // attach the sprite for the current state of the entity
      // currently, the sprite doesn't do any rendering, it just updates the properties
      // so that rendering of the right image and animation frame can happen
      ent.spriteFrameIdx = 0;
      ent._lastUpdate = ent._frameUpdate = +new Date;
    },
    update: function(ent){
      // assign .sprite based on entity state
      var now = +new Date;
      if(! (ent.spriteState && ent.spriteState in this.state)){
        throw "No such state "+ent.spriteState+" in sprite: " + this.name;
      }
      var sprite = ent.sprite = this.state[ ent.spriteState ];
      if(now - ent._frameUpdate > sprite.interval) {
        // animations support a 'interval' property which may differ from the game's tick interval
        // e.g. only advance the animation to the next frame every 120ms
        ent.spriteFrameIdx = (ent.spriteFrameIdx >= sprite.frames-1) ? 0 : ent.spriteFrameIdx+1;
        ent._frameUpdate = now;
      }
      
      ent._lastUpdate = +new Date;
    }
  });
  
  return Sprite;
});