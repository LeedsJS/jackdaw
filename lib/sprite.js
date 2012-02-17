define(['lang', 'component'], function(lang, Component){ 

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
      // ent.sprite = {name: 'walkright', src: 'player.png', w: 16, h: 18, offsetx: 0, offsety: 180, interval: 30 }
      console.log(this.state);
    },
    renderSprite: function(ent){
      var sprite = ent.sprite;
      // console.log("rendering sprite: ", ent, sprite);
    },
    attach: function(ent){
      // attach the sprite for the current state of the entity
      // var renderSprite = lang.partial(this.renderSprite, ent);
      // ent.render = ent.render ? lang.after(ent.render,  renderSprite, ent) : renderSprite;
      ent.spriteFrame = 0;
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
        ent.spriteFrame = (ent.spriteFrame >= sprite.frames-1) ? 0 : ent.spriteFrame+1;
        ent._frameUpdate = now;
      }
      
      ent._lastUpdate = +new Date;
    }
  });
  
  return Sprite;
});