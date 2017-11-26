/**
 *  Event handler methods. Stores the state of the mouse.
 * @type {type}
 */

var mouseState = {
    startx: 0,  // position at the start of a mouse move
    starty: 0,
    down: false,
    x: 0,    // current position of mouse during a mouse move
    y: 0,
    delx: 0, // difference between x and startx
    dely: 0,
    
    // The mouse button being pressed
    actionChoice: {TUMBLE: 0, // left mouse button
        DOLLY: 1, // middle mouse button
        TRACK: 2, // right mouse button
        NONE: 3
    },
    
/**
 * Reset parameters when mouse is released
 * @return {undefined}
 */
    reset: function () {
        this.startx = 0;
        this.starty = 0;
        this.down = false;
        this.x = 0;
        this.y = 0;
        this.delx = 0;
        this.dely = 0;
        this.action = this.actionChoice.NONE;
    },

/** 
 * Helper funtion to display mouse state
 * @return {String|message}
 */
    displayMouseState: function () {
        message = "<b>Mouse state: </b><br>&nbsp;startx=" + mouseState.startx +
                "<br>&nbsp;starty=" + mouseState.starty +
                "<br>&nbsp;x = " + mouseState.x + 
                "<br>&nbsp;y = " + mouseState.y +
                "<br>&nbsp;delx = " + mouseState.delx + 
                "<br>&nbsp;dely = " + mouseState.dely +
                "<br>&nbsp;button = " + mouseState.action +
                "<br>&nbsp;down = " + mouseState.down;
        return message;
    }
};
mouseState.action =  mouseState.actionChoice.NONE; // current mouse button

/**
 * Mouse event handlers
 * @return {undefined}
 */
function setMouseEventHandler() {
    return; 
    canvas = document.getElementById( "gl-canvas" );
    canvas.addEventListener("mousedown", function (e) {
        mouseState.startx = e.clientX;
        mouseState.starty = e.clientY;
        mouseState.x = e.clientX;
        mouseState.y = e.clientY;
        mouseState.delx = 0;
        mouseState.dely = 0;
        mouseState.down = true;
        mouseState.action = e.button;
        document.getElementById("mouseAction").innerHTML ="<b>Action:</b> Mouse Down <br>" ;
        document.getElementById("mouseState").innerHTML = mouseState.displayMouseState();
    });
    canvas.addEventListener("mouseup", function (e) {
       // console.log("mouse up");
        mouseState.reset();
        document.getElementById("mouseAction").innerHTML ="<b>Action:</b> resetting - Mouse Up <br>" ;
        document.getElementById("mouseState").innerHTML =  mouseState.displayMouseState();
        
    });
    canvas.addEventListener("mousewheel", function (e) {
        mouseState.action = mouseState.actionChoice.DOLLY;
        mouseState.x = e.clientX;
        mouseState.y = e.clientY;
        mouseState.delx = e.wheelDelta;
        mouseState.dely = e.wheelDelta;
        camera1.motion();
        document.getElementById("mouseAction").innerHTML ="<b>Action:</b> Mouse wheel <br>";
        document.getElementById("mouseState").innerHTML = mouseState.displayMouseState();
    });
    canvas.addEventListener("mousemove", function (e) {
        if (mouseState.down) {
            mouseState.x = e.clientX;
            mouseState.y = e.clientY;
            mouseState.delx = mouseState.x - mouseState.startx;
            mouseState.dely = mouseState.y - mouseState.starty;
            camera1.motion();
        }
        document.getElementById("mouseAction").innerHTML ="<b>Action:</b> Mouse Move <br>";
        document.getElementById("mouseState").innerHTML = mouseState.displayMouseState();
    });
}

/**
 * Key press event handlers. Actions are defined in the Camera class
 * @return {undefined}
 */
function setKeyEventHandler() {
    var flags = {};
    setInterval(function () { moveCamera(flags) }, 20);
    window.onkeyup = function (e) { 
        var c= String.fromCharCode (e.keyCode); 
        if (c == 'Q'){
            camera1.fScale = 0;
        }
        if (c == 'A'){
            camera1.bScale = 0;
        }
        if (c == 'L'){
            camera2.fScale = 0;
        }
        if (c == 'K'){
            camera2.bScale = 0;
        }
        //Q camera 1 move forward
        //A camera 1 move backward
        //L camera 2 move forward
        //K camera 2 move backward
        flags[c] = false;

    }
    window.onkeydown = function (e) {
        var c = String.fromCharCode(e.keyCode);
        flags[c] = true;
        if(c == 'R'){  
            console.log("reset");
            camera1.resetAll();
            camera2.resetAll();
            render();
        }
    
        
        
        //lighting.keyAction(c);
        //document.getElementById("keypress").innerHTML = "<b>Key pressed:</b> " + c + "<br>";
        //render();
    };
}

function moveCamera(flags){
    //console.log(flags);
    var dirty = false; 
    if (flags.W == true){
        camera1.turnLeft();
        dirty = true; 
    }
    if (flags.E == true){
        camera1.turnRight();
        dirty = true; 
    }
    if (flags.Q == true){
        camera1.moveForward();
        dirty = true; 
    }
    if (flags.A == true){
        camera1.moveBackward();
        dirty = true; 
    }
    if (flags.P == true){
        camera2.turnRight();
        dirty = true; 
    }
    if (flags.O == true){
        camera2.turnLeft();
        dirty = true; 
    }
    if (flags.L == true){
        camera2.moveForward();
        dirty = true; 
    }
    if (flags.K == true){
        camera2.moveBackward();
        dirty = true; 
    }
    if (dirty) render (); 
}