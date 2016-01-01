function drawRotatedImage(context, image, x, y, angleRadians) { 
	
	// save the current co-ordinate system 
	// before we screw with it
	context.save(); 
	
	// move to the middle of where we want to draw our image
	context.translate(x, y);
	
	// rotate around that point
	context.rotate(angleRadians);
	
	// draw it up and to the left by half the width
	// and height of the image 
	context.drawImage(image, -(image.width/2), -(image.height/2));
	//context.drawImage(image, 0, 0);
	
	// and restore the co-ords to how they were when we began
	context.restore(); 
}