"use strict";

function Map () {
	
	var mapSizeX = 10000;
	var mapSizeY = 10000;
	
	var maps = {};
	
	var sortedX = {};
	var sortedY = {};
	
	var mapPlanet = 1000;
	
	function sortNumber(a,b) {
		return a - b;
	}
	
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
			
			
			sortedX[x] = true;
			sortedY[y] = true;
			//console.debug("created planet at "+x+" "+y);
		}
		
		sortedX = Object.keys(sortedX);
		sortedX.sort(sortNumber);
		sortedY = Object.keys(sortedY).sort(sortNumber);
		
		maps[0] = {y:"planet "+i, coordinate:{x:x, y:y} };
		
	}
	
	var getClosestValues = function(a, x) {
		var lo = 0, hi = a.length;
		while (hi - lo > 1) {
			var mid = Math.round((lo + hi)/2);
			if (a[mid] <= x) {
				lo = mid;
			} else {
				hi = mid;
			}
		}
		
		if (a[lo] == x) hi = lo;
		if (a[hi] == x) lo = hi;
		
		return [lo, hi];
	}
	
	this.executeForSubMap = function(minX, minY, maxX, maxY, callback){
		var minIDx = getClosestValues(sortedX, minX)[0];
		var maxIDx = getClosestValues(sortedX, maxX)[1];
		
		var minIDy = getClosestValues(sortedY, minY)[0];
		var maxIDy = getClosestValues(sortedY, maxY)[1];
		
		//console.debug("x stimate grezze: " +(maxX-minX) );
		//console.debug("x stimate binary: " +(maxIDx-minIDx)+" "+(maxIDx-minIDx)*(maxIDy-minIDy) );
		var x, y;
		for (var xId = minIDx; xId < maxIDx; xId++){
			x = sortedX[xId];
			
			
			for (var yId = minIDy; yId < maxIDy; yId++){
				y = sortedY[yId];
				if (maps[x][y]){
					//console.debug("found planet at "+x+" "+y);
					callback.execute( maps[x][y] );
				}
			}
		}
	};
	
	init();
};
