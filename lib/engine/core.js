define(['lang', 'logger', 'event', 'timer', 'Promise', 'keyboardState'], 
function(lang, logger, event, timer, Promise, keyboardStateManager){
    var _instance = null;
    var when = Promise.when;
    var Engine = function(args){
        // mixin args into instance
        lang.mixin(this, args || {});
        // singleton: store reference to the instance
        _instance = this;
        if(this.constructor) {
            return this.constructor.apply(this, arguments);
        } 
        return this;
    };
    Engine.prototype = {
        constructor: function(args){
            logger.log("default Engine constructor");
        },
        start: function(config){
            config = this.config = config || {};
            var self = this;
            this.lastTick = +new Date;
            // create the game loop
            this.loop = new timer.Loop({
                tick: function(){
                    var now = +new Date;
                    self.emit("update", [+new Date - self.lastTick]);
                    self.emit("render");
                    self.lastTick = now;
                }
            });
            logger.log("engine start");

            keyboardStateManager.init();
            // start is considered async
            // it is completed and any callbacks called
            // when the 'loaded' event is heard
            var promise = new Promise();
            promise.then(function(){
                self.loop.start();
            });
            
            // TODO: some kind of resource list we can load
            // 
            var loadedHdl = this.listen("loaded", function(){
                loadedHdl.remove();
                promise.resolve();
            });
            return promise;
        },
        get: function(name){
            return this[name];
        },
        unLoadLevel: function(){
            if(this._level){
                logger.log('uploading level');
                this._level.unLoad();
                delete this._level;	
            }
        },
        set: function(name) {
            // look for a setter for this attribute
            var setter = this['_set'+name[0].toUpperCase() + name.substring(1) + 'Attr'];
            if(setter) {
                // pass the value(s) over to the setter and let it return
                return setter.apply(this, Array.prototype.slice.call(arguments, 1))
            } else {
                // just set the property
                this[name] = arguments[1];
                return this;
            }
        },
        getKeyboardState: function(){
            var keysDown = keyboardStateManager.getKeysDown();
            return {
                keyIsDown: function(key){
                    var i;
                    for(i = 0; i < keysDown.length; i += 1){
                        if(keysDown[i] === key){
                            return true;
                        }
                    }
                    return false;
                }
            };
        }
    }

    // extending engine class to be Evented
    lang.extend(Engine, event.Evented);
    
    return {
        getInstance: function(){
            return _instance;
        },
        Engine: Engine
    };
});
