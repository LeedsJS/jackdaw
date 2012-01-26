define([], function(){

  return {
    rectsOverlap : function (rect1, rect2){
      var overlappingX = true,
        overlappingY = true,
        overlapSize = 0;

      // horizontal
      if((rect1.x + rect1.width) < rect2.x){
        overlappingX = false; // rect 1 is too far to the left 
      }
      if(rect1.x > (rect2.x + rect2.width)){
        overlappingX = false; // rect 1 is too far to the right
      }

      //vertical
      if((rect1.y + rect1.height) < rect2.y){
        overlappingY = false; // rect 1 is too high  
      }
      if(rect1.y > (rect2.y + rect2.height)){
        overlappingY = false; // rect 1 is too low
      }
      return (overlappingY && overlappingX); 
    }
  };
});
