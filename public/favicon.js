/*==========================================================================
------------------------    Animated GIF Favicon   -------------------------
============================================================================*/

	let image_counter = 1; // To keep track of the current image

setInterval(function() {
    // remove current favicon
	if(document.querySelector("link[rel='icon']") !== null) {
		document.querySelector("link[rel='icon']").remove();
	}
	if(document.querySelector("link[rel='apple-touch-icon']") !== null) {
		document.querySelector("link[rel='apple-touch-icon']").remove();
	}
	if(document.querySelector("link[rel='shortcut icon']") !== null) {
		document.querySelector("link[rel='shortcut icon']").remove();
	}

    // add new favicon image
		document.querySelector("head").insertAdjacentHTML('beforeend', `<link rel="shortcut icon" href="/favicon/favicon_${image_counter}.png" type="image/png">`);
	
    // If last image then goto first image else add one to counter
		image_counter === 5 ? image_counter = 1 : image_counter++
}, 300);