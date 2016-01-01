// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Game objects
var hero = {
	acceleration: 10,
	speedX: 0,
	speedY: 0,
	maxSpeed: 100,
	rotationSpeed: 1.57, // movement in rad per second
	x:0,
	y:0,
	angle:0,
};
var monster = {};
var monstersCaught = 0;

// Reset the game when the player catches a monster
var reset = function () {
	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

var trustUp = "W".charCodeAt(0);
var trustDown = "S".charCodeAt(0);
var rotateLeft = "A".charCodeAt(0);
var rotateRight = "D".charCodeAt(0);

console.log("w"+trustUp+" "+trustDown);

// Update game objects
var update = function (deltaT) {
	var speed = 0;
	
	if (rotateLeft in keysDown) { // Player holding q
		hero.angle -= hero.rotationSpeed * deltaT;
	}
	if (rotateRight in keysDown) { // Player holding e
		hero.angle += hero.rotationSpeed * deltaT;
	}
	if (trustUp in keysDown) { // Player holding w
		speed += hero.acceleration * deltaT;
	}
	if (trustDown in keysDown) { // Player holding s
		speed -= hero.acceleration * deltaT;
	}

	// calculate speed
	hero.speedX += speed * Math.cos(hero.angle-Math.PI/2);
	hero.speedY += speed * Math.sin(hero.angle-Math.PI/2);
	// limit speed
	var magnitudeSquared = hero.speedX*hero.speedX + hero.speedY*hero.speedY;
	if (magnitudeSquared > hero.maxSpeed*hero.maxSpeed){
		var ratio = hero.maxSpeed / Math.sqrt(magnitudeSquared);
		hero.speedX *= ratio;
		hero.speedY *= ratio;
	}
	
	// calculate position
	hero.x += hero.speedX;
	hero.y += hero.speedY;
	// limit position to canvas
	if (hero.x < 0){
		hero.x = 0;
		hero.speedX *= -1;
	}
	if (hero.x > canvas.width){
		hero.x = canvas.width;
		hero.speedX *= -1;
	}
	if (hero.y < 0){
		hero.y = 0;
		hero.speedY *= -1;
	}
	if (hero.y > canvas.height){
		hero.y = canvas.height;
		hero.speedY *= -1;
	}
	
	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		reset();
	}
};

// Draw everything
var render = function (deltaT) {
	//black background
	ctx.fillStyle="black";
	ctx.fillRect(0,0, canvas.width, canvas.height);
	
	if (heroReady) {
		drawRotatedImage(ctx, heroImage, hero.x, hero.y, hero.angle);
	}
	
	if (monsterReady) {
		drawRotatedImage(ctx, monsterImage, monster.x, monster.y, monster.angle);
	}
	
	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
	ctx.fillText("FPS: " + 1/deltaT, 32, 64);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = (now - then) / 1000;
	
	update(delta);
	render(delta);
	
	then = now;
	
	// Request to do this again ASAP
	//setTimeout(function () {
		requestAnimationFrame(main);
	//}, 20);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();