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
    },
    detach: function(ent){

    }
  });

  // json schema example: the schema describes the properties that it expects and manipulates on the attached entitity
  // FIXME: implement schema to describe the properties of entities that are moveable 
  var jsonSchema = {
    "type": "object",
    "properties":{
      "type":{
        "type": "string",
        "description":"Type of visit",
        "unconstrained":true,
        "optional":false,
        "default":""
      },
      "csrf_token":{
        "type": "string",
        "description":"The unique token associated with this session. It must be a string",
        "unconstrained":true,
        "optional":false,
        "default":""
      },
      "session":{
        "type": "string",
        "description":"The browsing session id this visit is aassociated with",
        "unconstrained":true,
        "optional":false,
        "default":""
      },
      "uuid":{
        "type": "string",
        "description":"The uuid string for this visit",
        "unconstrained":true,
        "optional":false,
        "default":""
      },
      "id":{
        "type": "string",
        "description":"The site id",
        "unconstrained":true,
        "optional":false,
        "default":""
      }
    }
  };  
  moveable.schema = jsonSchema;
  
  return moveable;
});
