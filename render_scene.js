//Carlos Luevanos and Eric Keefe
//Lab 4: camera1 Navigation

var tankRad = 100;
var arenaLength = 210;
//the center of the tank should be at the eye of the cameras


var canvas;       // HTML 5 canvas
var gl;           // webgl graphics context
var vPosition;    // shader variable attrib location for vertices 
var vColor;       // shader variable attrib location for color
var vNormal;	  // shader variable attrib normals for vertices
var colorMode;
var vTexCoords;   //shader variable attrib texture for vertices
var uColor;       // shader uniform variable location for color
var uProjection;  //  shader uniform variable for projection matrix
var uModel_view;  //  shader uniform variable for model-view matrix
var uTexture      //shader uniform variable for the texture

var uMode; //uniform variable for color mode


var tankTexture;
var wheelTexture;
var chainTexture;

//texture variables
var checkerboard;
//var imageTexture;
var stripes;
var pokadot;

var camera1 = new Camera(); 
var camera2 = new Camera();
camera2.eye_start = vec4(0, -5, -80, 1);
camera2.VPN = scale(-1, camera2.VPN);
camera2.reset();

var stack = new MatrixStack();

var lighting = new Lighting();
var program;

window.onload = function init()
{   
    // document.getElementById("scenerotation").addEventListener("input", function(){ //loads range inputs from html
    //     thetaY = document.getElementById("scenerotation").value;
    // });
    // document.getElementById("turret").addEventListener("input", function(){
    //     turrTheta = document.getElementById("turret").value;
    // });
    // document.getElementById("wheels").addEventListener("input", function(){
    //     wheelTheta = document.getElementById("wheels").value;
    // });

    //set Event Handlers
    setKeyEventHandler();
    setMouseEventHandler();
    wheelTheta = 180;
    thetaY = 180;
    turrTheta = 0;

    
    
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    checkerboard = new Checkerboard(gl);
    stripes = new Stripes();
    pokadot = new Pokadot();
    tankTexture = loadTexture(gl, 'textures/industrial_low_resolution.png');
    wheelTexture = loadTexture(gl, 'textures/wheel_low_resolution.png');
    chainTexture = loadTexture(gl, 'textures/chain_low_resolution.png');

    
    //imageTexture = new ImageTexture("textures/test.jpg");
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor(0.309, 0.505, 0.74, 1.0);
    
    gl.enable(gl.DEPTH_TEST);
    
   
    //  Load shaders
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    lighting.setUp();

    
    
    shaderSetup();
    
    Shapes.initShapes();  // create the primitive and other shapes       
    
    render();
};

/**
 *  Load shaders, attach shaders to program, obtain handles for 
 *  the attribute and uniform variables.
 * @return {undefined}
 */
function shaderSetup() {
    //  Load shaders
    // var program = initShaders(gl, "vertex-shader", "fragment-shader");
    // gl.useProgram(program);

    // get handles for shader attribute variables. 
    // We will need these in setting up buffers.
    vPosition = gl.getAttribLocation(program, "vPosition");
    vColor = gl.getAttribLocation(program, "vColor"); // we won't use vertex here
    vNormal = gl.getAttribLocation(program, "vNormal");
    vTexCoords = gl.getAttribLocation(program, "vTexCoords");
                          // colors but we keep it in for possible use later.
   
    // get handles for shader uniform variables: 
    uColor = gl.getUniformLocation(program, "uColor");  // uniform color
    uProjection = gl.getUniformLocation(program, "uProjection"); // projection matrix
    uModel_view = gl.getUniformLocation(program, "uModel_view");  // model-view matrix
    uTexture = gl.getUniformLocation(program, "uTexture");  // uniform color
    uMode = gl.getUniformLocation(program, "uMode");  // uniform color

}

function render(){
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var projMat = camera1.calcProjectionMat(canvas.width/2, canvas.height);   // Projection matrix  
    gl.uniformMatrix4fv(uProjection, false, flatten(projMat));
    
    var viewMat = camera1.calcViewMat();   // View matrix
    gl.viewport( 0, 0, canvas.width/2, canvas.height );
    renderScene(viewMat);

    var viewMat = camera2.calcViewMat();   // View matrix
    gl.viewport( canvas.width/2, 0, canvas.width/2, canvas.height );
    renderScene(viewMat);


}

function renderScene(viewMat)
{
   
    
    
    checkCollision();

     //drawing a square representing the tank
    stack.clear();

    stack.push();
    checkerboard.activate(); 
    stack.multiply(translate(0,-3,-5)); 
    stack.push();
    stack.multiply (viewMat); 
    stack.multiply (inverse (camera1.calcViewMat ()));
    gl.uniform4fv(uColor, vec4(1.0, 0.0, 0.0, 1.0)); 
    gl.uniform1i(uMode, 2);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));

    drawTank(camera1.theta);
    stack.pop();

    stack.push();

    stack.multiply (viewMat); 
    stack.multiply (inverse (camera2.calcViewMat ())); 

    gl.uniform4fv(uColor, vec4(1.0, 0.0, 0.0, 1.0)); 
    gl.uniform1i(uMode, 2);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    
    
    drawTank(camera2.theta);
    //stack.multiply(scalem(200, 200, 200));
    //Shapes.drawPrimitive(Shapes.cylinder);
    stack.pop();

    stack.pop();

    stack.multiply(viewMat);
    
    
    // Setting the light position
    var newLight = mult(viewMat, lighting.light_position); 
    gl.uniform4fv(uLight_position, newLight);
    
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.axis.draw();
   
   
    
    //drawing another square that should be fixed in place
    stack.push();
    stack.multiply(translate(10, 0, 10));
    stripes.activate();
    gl.uniform4fv(uColor, vec4(1.0, 0.0, 0.0, 1.0)); 
    gl.uniform1i(uMode, 1);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

    //drawing the floor
    stack.push();
    stack.multiply(scalem(200, 1, 200));
    stack.multiply(translate(0, -10, 0));
    pokadot.activate();
    gl.uniform4fv(uColor, vec4(1.0, 0.0, 0.0, 1.0)); 
    gl.uniform1i(uMode, 2);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

    //drawing the arena sides
    stack.push();
    stack.multiply(scalem(1, 200, -arenaLength));
    stack.multiply(translate(150, 0, 0));
    pokadot.activate();
    gl.uniform4fv(uColor, vec4(1.0, 0.0, 0.0, 1.0)); 
    gl.uniform1i(uMode, 2);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

    //drawing the arena sides
    stack.push();
    stack.multiply(scalem(1, 200, arenaLength));
    stack.multiply(translate(-150, 0, 0));
    pokadot.activate();
    gl.uniform4fv(uColor, vec4(1.0, 0.0, 0.0, 1.0)); 
    gl.uniform1i(uMode, 2);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

    //drawing the front and back of the arena
    stack.push();
    stack.multiply(scalem(arenaLength, 200, 1));
    stack.multiply(translate(0, 0, -200));
    pokadot.activate();
    gl.uniform4fv(uColor, vec4(1.0, 0.0, 0.0, 1.0)); 
    gl.uniform1i(uMode, 2);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

    //drawing the front and back of the arena
    stack.push();
    stack.multiply(scalem(-arenaLength, 200, 1));
    stack.multiply(translate(0, 0, 200));
    pokadot.activate();
    gl.uniform4fv(uColor, vec4(1.0, 0.0, 0.0, 1.0)); 
    gl.uniform1i(uMode, 2);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

    //drawing the light   
    stack.push();
    stack.multiply(translate(lighting.light_position[0], lighting.light_position[1], lighting.light_position[2]));
    stripes.activate();
    gl.uniform4fv(uColor, vec4(0.0, 1.0, 0.0, 1.0)); 
    gl.uniform1i(uMode, 2);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cube);

    stack.pop(); 

    //calculate the center of the tank
   
}

function drawShape(shape,wireBool){
    //shape.wire = wireBool;
    Shapes.drawPrimitive(shape);
}

function checkCollision(){
    //check for tank1 leaving the boundary of the game
    if (camera1.eye[0] + tankRad >= arenaLength || camera1.eye[0] - tankRad <= -arenaLength || camera1.eye[2] + tankRad >= arenaLength ||
        camera1.eye[2] - tankRad <= -arenaLength){
        camera1.resetAll();
    }
    
    if (camera2.eye[0] + tankRad >= arenaLength || camera2.eye[0] - tankRad <= -arenaLength || camera2.eye[2] + tankRad >= arenaLength ||
        camera2.eye[2] - tankRad <= -arenaLength){
        camera2.resetAll();
    }

    

    //check for tank2 leaving the boundary of the game

    //check tank1 colliding with tank 2

}
