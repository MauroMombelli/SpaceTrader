var mouseClick = undefined;


addEventListener("click", function (e) {
	mouseClick = { x: e.layerX, y: e.layerY };
}, false);