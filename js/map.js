"use strict";

function Map () {
	
	var maps = {};

	var mapSizeX = 10000;
	var mapSizeY = 10000;
	
	var mapPlanet = 1000;
	
	function init(){
		for (var i = 0; i < mapPlanet; i ++){
			var x = mapSizeX * Math.random();
			var y = mapSizeY * Math.random();
			
			x = Math.round(x);
			y = Math.round(y);
			
			if (!maps[x]){
				//console.debug("created X "+x);
				maps[x] = {};
			}
			
			if (!maps[x][y]){
				//console.debug("created Y "+y);
				maps[x][y] = {};
			}
			maps[x][y] = { name:"planet "+i, coordinate:{x:x, y:y} };
			//console.debug("created planet at "+x+" "+y);
		}
		
		maps[0] = {y:"planet "+i, coordinate:{x:x, y:y} };
		
	}
	
	this.executeForSubMap = function(minX, minY, maxX, maxY, callback){
		for (var x = minX; x < maxX; x++){
			if (maps[x]){
				for (var y = minY; y < maxY; y++){
					if (maps[x][y]){
						console.debug("found planet at "+x+" "+y);
						callback.execute( maps[x][y] );
					}
				}
			}else{
				//console.debug("not found planet at "+x);
			}
		}
	};
	
	init();
};
