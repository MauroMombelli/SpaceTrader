"use strict";

// Handle keyboard controls
var keysDown = {};

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
	console.debug("keydown: "+e.keyCode);
}, false);