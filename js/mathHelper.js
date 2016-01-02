"use strict";

function followTarget(hero, target, deltaT){
	
	//first of all calculate the distance to travel, and do nothing if we are enought near the target
	var distanceSquared = Math.pow(target.x-hero.x, 2) + Math.pow(target.y-hero.y, 2);
	if (distanceSquared > -100 && distanceSquared < 100){
		distanceSquared = 0;
		return; //nothing to do
	}
	var speed = distanceSquared;
	if (speed > hero.maxSpeed*deltaT){
		speed = hero.maxSpeed*deltaT;
	}
	if (speed < -hero.maxSpeed*deltaT){
		speed = -hero.maxSpeed*deltaT;
	}
	
	//now we calculate the rotation needed to get to the target
	var target_angle = Math.atan2(target.y-hero.y, target.x-hero.x) + Math.PI/2;
	var rot_correction = target_angle - hero.angle;
	if (rot_correction > Math.PI){
		rot_correction -= Math.PI*2;
	}
	if (rot_correction < -Math.PI){
		rot_correction += Math.PI*2;
	}
	
	var rot_speed = rot_correction * deltaT;
	
	if (rot_speed > -0.0001 && rot_speed < 0.0001){
		rot_speed = 0;
	}
	
	if (rot_speed != 0){
		if (rot_speed > hero.rotationSpeed*deltaT){
			rot_speed = hero.rotationSpeed*deltaT;
		}
		if (rot_speed < -hero.rotationSpeed*deltaT){
			rot_speed = -hero.rotationSpeed*deltaT;
		}
		hero.angle += rot_speed;
		while(hero.angle > Math.PI){
			hero.angle -= Math.PI*2;
		}
		while(hero.angle < -Math.PI){
			hero.angle += Math.PI*2;
		}
	}
	
	//now we want to be sure that we have time to curve and get to the targed.
	//If we are too near, we slow down the translation to give time to the rotation to catch up
	var timeToRotation = Math.abs(rot_correction*2) / hero.rotationSpeed;
	var speedForRotation = Math.sqrt(distanceSquared) / timeToRotation;
	speedForRotation *= deltaT;
	
	
	console.log("timeToRotation: "+timeToRotation+" speedForRotation: "+speedForRotation+" "+speed);
	
	if (speed > speedForRotation){
		console.log("speed was: "+speed+" limited to: "+speedForRotation);
		speed = speedForRotation;
		
	}
	
	if (speed < -speedForRotation){
		speed = -speedForRotation;
		console.log("speed 2 limited to: "+speed);
	}
	
	//execute movement
	hero.x += speed * Math.cos(hero.angle - Math.PI/2);
	hero.y += speed * Math.sin(hero.angle - Math.PI/2);
}