define(function(){
	var smoke = false;
	describe("smokiness", function() {

		it("shouldnt be blue", function() {
			expect(smoke).toBeFalsy();
		});

		it("should work fine", function() {
			expect(smoke).toBeDefined();
		});
	});
});