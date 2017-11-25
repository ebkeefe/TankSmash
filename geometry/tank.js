function drawTank(theta){
    
    
    stack.multiply(rotateY(-90));
    stack.multiply(translate(0,-6,0));
    
    stack.push();
    stack.multiply(scalem(1,1,.5));
    stack.multiply(translate(0,0,8));
    drawWheels(theta);
    stack.pop();
    
    stack.push();
    stack.multiply(scalem(1,1,.5));
    stack.multiply(translate(0,0,-8));
    drawWheels(theta);
    stack.pop();
    
    activateTexture(gl,tankTexture);
    
    stack.push();
    stack.multiply(translate(0,.7,0));
    stack.multiply(scalem(7,1.85,3));
    stack.multiply(rotateX(90));
    gl.uniformMatrix4fv(uModel_view, false, flatten(flatten(stack.top()))); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, 0.0, 0.0, 1.0));  // set color to black
    drawShape(Shapes.cylinder, false);
    stack.pop();
    
    /*
     stack.push();
     stack.multiply(translate(0,3,0));
     stack.multiply(scalem(5.5,.8,5));
     gl.uniformMatrix4fv(uModel_view, false, flatten(flatten(stack.top()))); // set view transform
     gl.uniform4fv(uColor, vec4(0.0, 0.0, 0.0, 1.0));  // set color to black
     drawShape(Shapes.cube, false);
     stack.pop();
     */
    stack.push();
    stack.multiply(translate(0,2,0));
    stack.multiply(rotateX(90));
    stack.multiply(scalem(5.5,4.95,2));
    gl.uniformMatrix4fv(uModel_view, false, flatten(flatten(stack.top()))); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, 0.0, 0.0, 1.0));  // set color to black
    drawShape(Shapes.hexathing, false);
    stack.pop();
    
    stack.push();
    stack.multiply(translate(-2,3,0));
    stack.multiply(scalem(5,1.2,5));
    stack.multiply(rotateX(90));
    gl.uniformMatrix4fv(uModel_view, false, flatten(flatten(stack.top()))); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, 0.0, 0.0, 1.0));  // set color to black
    drawShape(Shapes.cylinder, false);
    stack.pop();
    
    stack.push();
    stack.multiply(translate(0,4.2,0));
    //stack.multiply(rotateX(90));
    stack.multiply(scalem(3,1.7,3));
    gl.uniformMatrix4fv(uModel_view, false, flatten(flatten(stack.top()))); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, 0.0, 0.0, 1.0));  // set color to black
    drawShape(Shapes.cylinder, false);
    stack.pop();
    
    stack.push();
    stack.multiply(translate(0,4.5,0));
    stack.multiply(rotateZ(90));
    stack.multiply(translate(0,3,0));
    stack.multiply(scalem(.5,5.5,.5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(flatten(stack.top()))); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, 0.0, 0.0, 1.0));  // set color to black
    drawShape(Shapes.cylinder, false);
    stack.pop();

    
}

//need to know a center of the tank and a radius of the tank
