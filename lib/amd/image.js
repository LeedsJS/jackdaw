console.log("image AMD plugin loading");
/**
 * AMD image loader plugin
 *
 */

define(/*=='image',==*/ function () {

	function fetchImage (url, callback, errback) {
		var img = new Image();
		console.log("fetchImage at: ", url);
		img.onload = function (e) {
			console.log("loaded event: ", e);
			callback(img);
			// errback(new Error('fetchImage() failed. status: ' + x.statusText));
		};
		img.onerror = function(e){
			console.log("image onerror event: ", e);
			errback(e); // or return Error? 
		}
		img.src = url;
	}

	function error (ex) {
		console.log("handling error: ", ex)
		if (console) {
			console.error ? console.error(ex) : console.log(ex.message);
		}
	}

	return {
		load: function (resourceName, req, callback, config) {
			// hook up callbacks
			var cb = callback.resolve || callback,
				eb = callback.reject || error;
			// get the image
			fetchImage(req['toUrl'](resourceName), cb, eb);
		}
	};

});
console.log("/image AMD plugin loading");
