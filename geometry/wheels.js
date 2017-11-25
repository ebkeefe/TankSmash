
function drawWheels(theta){
    //imageTexture.activate();
    //pattern.activate();
    //checkerboard.activate();
    activateTexture(gl,chainTexture);
    //gl.uniform1f(textureType,2.0);
    
    stack.multiply(scalem(2,2,2));
    stack.push();
    stack.multiply(translate(2.8,0,0));
    stack.multiply(rotateZ(-90));
    stack.multiply(rotateX(-90));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    gl.uniformMatrix4fv(uModel_view, false, flatten(flatten(stack.top()))); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, 0.0, 0.0, 1.0));  // set color to black
    drawShape(Shapes.hollowCylinder, false);
    stack.pop();
    
    stack.push();
    stack.multiply(translate(-2.8,0,0));
    stack.multiply(rotateZ(-90));
    stack.multiply(rotateX(90));
    stack.multiply(rotateZ(180));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    //pattern.activate();
    gl.uniformMatrix4fv(uModel_view, false, flatten(flatten(stack.top()))); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, 0.0, 0.0, 1.0));  // set color to black
    drawShape(Shapes.hollowCylinder, false);
    stack.pop();
    
    stack.push();
    stack.multiply(scalem(1,.15,1));
    stack.multiply(translate(0,1/.15-1/7/.15,0));
    //pattern.activate();
    gl.uniformMatrix4fv(uModel_view, false, flatten(flatten(stack.top()))); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, 0.0, 0.0, 1.0));  // set color to black
    drawShape(Shapes.cubeMove, false);
    stack.pop();
    
    stack.push();
    stack.multiply(translate(-2,0,0));
    stack.multiply(scalem(1,.15,1));
    stack.multiply(translate(0,1/.15-1/7/.15,0));
    //pattern.activate();
    gl.uniformMatrix4fv(uModel_view, false, flatten(flatten(stack.top()))); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, 0.0, 0.0, 1.0));  // set color to black
    drawShape(Shapes.cubeMove, false);
    stack.pop();
    
    stack.push();
    stack.multiply(translate(2,0,0));
    stack.multiply(scalem(1,.15,1));
    stack.multiply(translate(0,1/.15-1/7/.15,0));
    //pattern.activate();
    gl.uniformMatrix4fv(uModel_view, false, flatten(flatten(stack.top()))); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, 0.0, 0.0, 1.0));  // set color to black
    drawShape(Shapes.cubeMove, false);
    stack.pop();
    
    stack.push();
    stack.multiply(scalem(1,.15,1));
    stack.multiply(translate(0,-(1/.15-1/7/.15),0));
    stack.multiply(rotateZ(180));
    //pattern.activate();
    gl.uniformMatrix4fv(uModel_view, false, flatten(flatten(stack.top()))); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, 0.0, 0.0, 1.0));  // set color to black
    drawShape(Shapes.cubeMove, false);
    stack.pop();
    
    stack.push();
    stack.multiply(translate(-2,0,0));
    stack.multiply(scalem(1,.15,1));
    stack.multiply(translate(0,-(1/.15-1/7/.15),0));
    stack.multiply(rotateZ(180));
    //pattern.activate();
    gl.uniformMatrix4fv(uModel_view, false, flatten(flatten(stack.top()))); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, 0.0, 0.0, 1.0));  // set color to black
    drawShape(Shapes.cubeMove, false);
    stack.pop();
    
    stack.push();
    stack.multiply(translate(2,0,0));
    stack.multiply(scalem(1,.15,1));
    stack.multiply(translate(0,-(1/.15-1/7/.15),0));
    stack.multiply(rotateZ(180));
    //pattern.activate();
    gl.uniformMatrix4fv(uModel_view, false, flatten(flatten(stack.top()))); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, 0.0, 0.0, 1.0));  // set color to black
    drawShape(Shapes.cubeMove, false);
    stack.pop();
    
    
    activateTexture(gl,wheelTexture);
    var wheelRotRatio = 1.7;
    
    stack.push();//wheel
    stack.multiply(translate(2.8,0,0));
    stack.multiply(scalem(.7,.70,1));
    stack.multiply(rotateX(90));
    stack.multiply(rotateY(-theta*wheelRotRatio));
    gl.uniformMatrix4fv(uModel_view, false, flatten(flatten(stack.top()))); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, 0.0, 0.0, 1.0));  // set color to black
    drawShape(Shapes.cylinder, false);
    stack.pop();
    
    stack.push();
    stack.multiply(translate(2.8-2*.7,0,0));
    stack.multiply(scalem(.7,.70,1));
    stack.multiply(rotateX(90));
    stack.multiply(rotateY(-theta*wheelRotRatio));
    gl.uniformMatrix4fv(uModel_view, false, flatten(flatten(stack.top()))); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, 0.0, 0.0, 1.0));  // set color to black
    drawShape(Shapes.cylinder, false);
    stack.pop();
    
    stack.push();
    stack.multiply(translate(2.8-4*.7,0,0));
    stack.multiply(scalem(.7,.70,1));
    stack.multiply(rotateX(90));
    stack.multiply(rotateY(-theta*wheelRotRatio));
    gl.uniformMatrix4fv(uModel_view, false, flatten(flatten(stack.top()))); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, 0.0, 0.0, 1.0));  // set color to black
    drawShape(Shapes.cylinder, false);
    stack.pop();
    
    stack.push();
    stack.multiply(translate(2.8-6*.7,0,0));
    stack.multiply(scalem(.7,.70,1));
    stack.multiply(rotateX(90));
    stack.multiply(rotateY(-theta*wheelRotRatio));
    gl.uniformMatrix4fv(uModel_view, false, flatten(flatten(stack.top()))); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, 0.0, 0.0, 1.0));  // set color to black
    drawShape(Shapes.cylinder, false);
    stack.pop();
    
    stack.push();
    stack.multiply(translate(2.8-8*.7,0,0));
    stack.multiply(scalem(.7,.70,1));
    stack.multiply(rotateX(90));
    stack.multiply(rotateY(-theta*wheelRotRatio));
    gl.uniformMatrix4fv(uModel_view, false, flatten(flatten(stack.top()))); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, 0.0, 0.0, 1.0));  // set color to black
    drawShape(Shapes.cylinder, false);
    stack.pop();
}
