define(['event'], function(event){
  event.listen("log", function(msg1, msg2, msg3){
    try{
      if(console && console.log){
        console.log("LOG: " + msg1, msg2, msg3);
      }
    } catch(e){}
  });
  return {
    log: function(msg1, msg2, msg3) {
      event.emit('log', msg1, msg2, msg3);
    }
  };
});
