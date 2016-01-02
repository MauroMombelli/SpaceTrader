"use strict";

function followTarget(hero, target, deltaT){
	
	var distanceSquared = Math.pow(target.x-hero.x, 2) + Math.pow(target.y-hero.y, 2);
	if (distanceSquared > -100 && distanceSquared < 100){
		distanceSquared = 0;
		return; //nothing to do
	}
	//console.debug("distance correction: "+distanceSquared);
	
	if (distanceSquared > hero.maxSpeed*deltaT){
		distanceSquared = hero.maxSpeed*deltaT;
	}
	if (distanceSquared < -hero.maxSpeed*deltaT){
		distanceSquared = -hero.maxSpeed*deltaT;
	}
	
	hero.x += distanceSquared * Math.cos(hero.angle - Math.PI/2);
	hero.y += distanceSquared * Math.sin(hero.angle - Math.PI/2);
	
	var target_angle = Math.atan2(target.y-hero.y, target.x-hero.x) + Math.PI/2;
	var rot_correction = target_angle - hero.angle;
	if (rot_correction > Math.PI){
		rot_correction -= Math.PI*2;
	}
	if (rot_correction < -Math.PI){
		rot_correction += Math.PI*2;
	}
	
	rot_correction *= deltaT;
	
	if (rot_correction > -0.0001 && rot_correction < 0.0001){
		rot_correction = 0;
		rotOk = true;
	}
	
	if (rot_correction != 0){
		if (rot_correction > hero.rotationSpeed*deltaT){
			rot_correction = hero.rotationSpeed*deltaT;
		}
		if (rot_correction < -hero.rotationSpeed*deltaT){
			rot_correction = -hero.rotationSpeed*deltaT;
		}
		hero.angle += rot_correction;
		while(hero.angle > Math.PI){
			hero.angle -= Math.PI*2;
		}
		while(hero.angle < -Math.PI){
			hero.angle += Math.PI*2;
		}
	}
}