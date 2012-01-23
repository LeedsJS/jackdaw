define(function(){
  // Promise implementation from curl.js
  // https://github.com/unscriptable/curl

  function Promise () {
    var self = this,
      thens = [];

    function then (resolved, rejected) {
      // capture calls to callbacks
      thens.push([resolved, rejected]);
    }

    function resolve (val) { complete(true, val); }

    function reject (ex) { complete(false, ex); }

    function complete (success, arg) {
      // switch over to sync then()
      then = success ?
        function (resolve, reject) { resolve && resolve(arg); } :
        function (resolve, reject) { reject && reject(arg); };
      // disallow multiple calls to resolve or reject
      resolve = reject =
        function () { throw new Error('Promise already completed.'); };
      // complete all callbacks
      var aThen, cb, i = 0;
      while ((aThen = thens[i++])) {
        cb = aThen[success ? 0 : 1];
        if (cb) cb(arg);
      }
    }

    this.then = function (resolved, rejected) {
      then(resolved, rejected);
      return self;
    };
    this.resolve = function (val) {
      self.resolved = val;
      resolve(val);
    };
    this.reject = function (ex) {
      self.rejected = ex;
      reject(ex);
    };

  }

  Promise.when = function(promiseOrValue, resolved, rejected){
    if(promiseOrValue && typeof promiseOrValue.then === "function"){
      return promiseOrValue.then(callback, errback, progressHandler);
    }
    return callback ? callback(promiseOrValue) : promiseOrValue;  // Promise
  };

  return Promise;
});
