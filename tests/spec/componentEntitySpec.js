define(['components', 'entity', 'component'], function(componentRegistry, Entity, Component){

  describe("component registry", function() {
    var registerException = null;
    // registry is (currently) just a plain dictionary object
    try {
      componentRegistry['testComponent'] = { name: 'testComponent' };
    } catch(e) {
      registerException = e;
    }
    
    it("should allow a component to be registered", function() {
      expect(registerException).toBe(null);
    });

    it("should return a registered component given its name", function() {
      var comp = componentRegistry['testComponent']; 
      
      expect(comp).toBeTruthy();
      expect(comp.name).toBe('testComponent');
      
    });

  });

  describe("entity is a class", function() {

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

  describe("entity init", function() {

    it("should call all components with the instance", function(){
      
    });

  });

  describe("component", function() {
    it("should throw without a name property", function(){
      expect(function(){
        var c = new Component({});
      }).toThrow();
      expect(function(){
        var c = new Component();
      }).toThrow();
    });
    it("should have an init method", function(){
      var c = new Component({ name: 'c1' });
      expect(typeof c.init).toBe('function');
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
  });
});