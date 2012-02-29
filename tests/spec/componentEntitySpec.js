define(['entity', 'component'], function(Entity, Component){

  
  describe("component registry", function() {
    beforeEach(function(){
      Component.emptyRegistry();
    });
    
    it("should allow a component to be registered", function() {
      var registerException = null;
      // registry is (currently) just a plain dictionary object
      try {
        Component.register({ name: 'testComponent' });
      } catch(e) {
        registerException = e;
      }

      expect(registerException).toBe(null);
    });

    it("should return a registered component given its name", function() {
      Component.register({ name: 't2' });
      var comp = Component.get('t2'); 
      
      expect(comp).toBeTruthy();
      expect(comp.name).toBe('t2');
      
    });

    it("should empty itself cleanly", function() {
      Component
        .register({ name: 'r1'})
        .register({ name: 'r2'}); 
      
      expect(Component.get('r1')).toBeTruthy();
      expect(Component.get('r2')).toBeTruthy();
      
      Component.emptyRegistry();
      
      expect(Component.get('r1')).toBeFalsy();
      expect(Component.get('r2')).toBeFalsy();
    });
  });

  describe("entity is a class", function() {
    beforeEach(function(){
      Component.emptyRegistry();
    });

    it("should be a function", function() {
      expect(typeof Entity).toBe('function');
    });

    it("should create instances", function() {
      var ent = new Entity();
      expect(ent instanceof Entity).toBeTruthy();
    });

    it("should accept a list of components", function() {
      var ent = new Entity('c1, c2');
      expect(ent.components.length).toBe(2);
    });

    it("should throw on bogus or unregistered components", function() {
      var ent = new Entity('c1, c2');
      expect(function () { ent.init(); }).toThrow();
    });

  });

  describe("component", function() {
    beforeEach(function(){
      Component.emptyRegistry();
    });

    it("should throw without a name property", function(){
      expect(function(){
        var c = new Component({});
      }).toThrow();
      // expect(function(){
      //   var c = new Component();
      // }).toThrow();
    });
    it("should have an attach method", function(){
      var c = new Component({ name: 'c1' });
      expect(typeof c.attach).toBe('function');
    });
    it("can implement key lifcycle methods", function(){
      var render = function(ent){};
      var c = new Component({ 
        name: 'c2',  
        render: render
      });
      expect(c.render).toBe(render);
      expect(typeof c.update).toBe('function');
    });

    it("attaches and detaches cleanly", function(){
      var c = new Component({ 
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
  
  describe("entity init", function() {
    beforeEach(function(){
      Component.emptyRegistry();
      var c1 = new Component({
        name: 'c1',
        attach: function(ent) {
          ent.c1_init = true;
        }
      }); 
      var c2 = new Component({
        name: 'c2',
        attach: function(ent) {
          ent.c2_init = true;
        }
      }); 
    });
    
    it("should call all components with the instance", function(){
      var ent = new Entity("c1, c2");
      ent.init();
      expect(ent.c1_init).toBeTruthy();
      expect(ent.c2_init).toBeTruthy();
    });

  });

  describe("entity lifecyle method", function() {
    beforeEach(function(){
      Component.emptyRegistry();
      var c1 = new Component({
        increment: 2,
        name: 'c1',
        attach: function(ent) {
          ent.count = 0;
        },
        update: function(ent){
          ent.count += this.increment;
        }
      }); 
      var c2 = new Component({
        name: 'c2',
        attach: function(ent) {
          ent.description = "Some words";
        },
        update: function(ent){
          ent.description = "Next words";
        }
      }); 
    });
    
    it("should call attached component methods", function(){
      var ent = new Entity("c1, c2");
      ent.init();
      expect(ent.count).toBe(0);
      expect(ent.description).toBe("Some words");

      ent.update();
      expect(ent.count).toBe(2);
      expect(ent.description).toBe("Next words");

    });

  });

  
});