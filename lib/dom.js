define(['dollar', 'lang'], function($, lang){
  lang.mixin($, {
    byId: function(stringOrNode){
      return (stringOrNode && "string" == typeof stringOrNode) ?
        document.getElementById(stringOrNode) : stringOrNode;
    }
  });
  return $;
});
