define(['entity', 'component', 'sprite'], function(Entity, Component, Sprite){
  
  describe("sprite", function() {
    beforeEach(function(){
      Component.emptyRegistry();
    });

    it("should extend Component", function(){
      var s = new Sprite({ name: "s1" });
      expect(s instanceof Component).toBeTruthy();
      expect(s instanceof Sprite).toBeTruthy();
    });
    it("should throw without a name property", function(){
      expect(function(){
        var c = new Sprite({});
      }).toThrow();
    });
    it("should have an attach method", function(){
      var c = new Sprite({ name: 'c1' });
      expect(typeof c.attach).toBe('function');
    });
    it("can implement key lifcycle methods", function(){
      var render = function(ent){};
      var c = new Sprite({ 
        name: 'c2',  
        render: render
      });
      expect(c.render).toBe(render);
      expect(typeof c.update).toBe('function');
    });

    it("mixes in ctor params to the instance", function(){
      var c = new Sprite({ name: "c", some: "thing", other: [1,2,3], thing:{a: "b"} });
      expect(c.some).toBe("thing");
      expect(c.other instanceof Array).toBeTruthy();
      expect(c.other[1]).toBe(2);
      expect(c.thing instanceof Object).toBeTruthy();
      expect(c.thing.a).toBe("b");
    });
    it("attaches and detaches cleanly", function(){
      // FIXME: implement Sprite-specific attach/detach test
      var c = new Sprite({ 
        name: 'attachDetach',  
        attach: function(ent){
          ent.someProperty = 10;
        },
        detach: function(ent){
          ent.someProperty = 0;
        }
      });
      var ent1 = new Entity('attachDetach').init();
      var ent2 = new Entity('attachDetach').init();

      expect(ent1.someProperty).toBe(10);
      expect(ent2.someProperty).toBe(10);
      expect(ent1.components.indexOf('attachDetach')).toBeGreaterThan(-1);
      expect(ent2.components.indexOf('attachDetach')).toBeGreaterThan(-1);

      // remove component from just the first entity
      ent1.removeComponent('attachDetach');

      expect(ent1.components.indexOf('attachDetach')).toBe(-1);
      expect(ent1.someProperty).toBe(0);
      expect(ent2.someProperty).toBe(10);
    });
  });

});