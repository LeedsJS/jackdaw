define([
	// use our custom image plugin to load images as resources
	'image!tests/resources/icon.png'
], function(){
	// all the images we loaded will be passed in the 'arguments' object
	// turn this into a real array
	var images = Array.prototype.slice.call(arguments);
	
	// the array is the module return value
	return images;
});