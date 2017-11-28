///// CUBE DEFINTION
/////
///// Cube is defined to be centered at the origin of the coordinate reference system. 
///// Cube size is assumed to be 2.0 x 2.0 x 2.0 .

///// Generate 12 triangles: 36 vertices and 36 colors
/////    v6----- v7
/////   /|      /|
/////  v2------v3|              ^ y
/////  | |     | |              |
/////  | |v4---|-|v5             -->x
/////  |/      |/              /
/////  v0------v1              z
///// Always use the Right Hand Rule to generate vertex sequence. We want outward facing normals.
function Sphere() {
    n=250
    this.wire = false;

    this.name = "sphere";

    
    this.numVertices = n*n*6;
    this.numTriangles = this.numVertices / 3;

    this.vertices = [this.numVertices];
    this.colors = [this.numVertices];
    this.normals = [this.numVertices];
    this.texCoords = [this.numVertices];

    


    // These are the actual vertices and colors to be placed in the vertex buffers.

    
    
    /*
    this.vertices[0] = vec4(0.0,0.0,1.0,1.0);
    
    
    this.vertices[1] = vec4(0,1,0,1);
             this.vertices[2] = vec4(.2,.8,0,1);
    for (var j = 0; j < 3; j++) {
            this.colors[j] = vec4(0.0, 0.0, 1.0, 1.0);
            this.normals[j] = vec4(1.0, 1.0, 1.0, 0.0);
            this.texCoords[j] = vec2(1, 0);
        }
     */
    
    for(var y = 0; y <n; y++){
    
    for(var i = 0; i <n; i++){
        
        var matr = vertMatrixSphereUp(i,n,y);
        for (var j = 0; j < 3; j++) {
            var q = y*n*6+i*3+j;
            this.vertices[q] = matr[j];
            this.colors[q] = vec4(Math.cos((i/(n))*Math.PI*2), Math.sin((i/(n))*Math.PI*2), -Math.cos((i/(n))*Math.PI*2), 1.0);
            this.normals[q] = vec4(1.0, 1.0, 1.0, 0.0);
            this.texCoords[q] = vec2(1, 0);
        }
    }
    
    for(var i = 0; i <n; i++){
        
        var matr = vertMatrixSphereDown(i,n,y);
        for (var j = 0; j < 3; j++) {
            var q = y*n*6+(n+i)*3+j;
            this.vertices[q] = matr[j];
            this.colors[q] = vec4(Math.cos((i/(n))*Math.PI*2), Math.sin((i/(n))*Math.PI*2), -Math.cos((i/(n))*Math.PI*2), 1.0);
            this.normals[q] = vec4(1.0, 1.0, 1.0, 0.0);
            this.texCoords[q] = vec2(1, 0);
        }
    }
    
    }
    /*
     
    for(var i = 0; i <n; i++){
        
        var matr = vertMatrixCylendarCaps(i,n,-1);
        for (var j = 0; j < 3; j++) {
            var q = (1*n+i)*3+j;
            this.vertices[q] = matr[j];
            this.colors[q] = vec4(Math.cos((i/(n))*Math.PI*2), Math.sin((i/(n))*Math.PI*2), -Math.cos((i/(n))*Math.PI*2), 1.0);
            this.normals[q] = vec4(1.0, 1.0, 1.0, 0.0);
            this.texCoords[q] = vec2(1, 0);
        }
    }
    for(var i = 0; i <n; i++){
        
        var matr = vertMatrixCylendarCaps(i,n,1);
        for (var j = 0; j < 3; j++) {
            var q = (2*n+i)*3+j;
            this.vertices[q] = matr[j];
            this.colors[q] = vec4(Math.cos((i/(n))*Math.PI*2), Math.sin((i/(n))*Math.PI*2), -Math.cos((i/(n))*Math.PI*2), 1.0);
            this.normals[q] = vec4(1.0, 1.0, 1.0, 0.0);
            this.texCoords[q] = vec2(1, 0);
        }
    }
     
     */
    
}


function vertMatrixSphereUp(j,n,y){
    return [vec4(-2/n+Math.cos((j/(n))*Math.PI*2)*Math.sin((y/(n))*Math.PI*2),-2/n+Math.cos((y/(n))*Math.PI*2)*Math.cos((j/(n))*Math.PI*2),-2/n+Math.sin((j/(n))*Math.PI*2),1.0),
            vec4(2/n+Math.cos((j/(n))*Math.PI*2)*Math.sin((y/(n))*Math.PI*2),2/n+Math.cos((y/(n))*Math.PI*2)*Math.cos((j/(n))*Math.PI*2),2/n+Math.sin((j/(n))*Math.PI*2),1.0),
            vec4(2/n+Math.cos(((j+1)/(n))*Math.PI*2)*Math.sin((y/(n))*Math.PI*2),2/n+Math.cos((y/(n))*Math.PI*2)*Math.cos((j/(n))*Math.PI*2),2/n+Math.sin(((j+1)/(n))*Math.PI*2),1.0)];
}

function vertMatrixSphereDown(j,n,y){
    return [vec4(-2/n+Math.cos((j/(n))*Math.PI*2)*Math.sin((y/(n))*Math.PI*2),-2/n+Math.cos((y/(n))*Math.PI*2)*Math.cos((j/(n))*Math.PI*2),2/n+Math.sin((j/(n))*Math.PI*2),1.0),
            vec4(2/n+Math.cos(((j+1)/(n))*Math.PI*2)*Math.sin((y/(n))*Math.PI*2),2/n+Math.cos((y/(n))*Math.PI*2)*Math.cos((j/(n))*Math.PI*2),-2/n+Math.sin(((j+1)/(n))*Math.PI*2),1.0),
            vec4(-2/n+Math.cos(((j+1)/(n))*Math.PI*2)*Math.sin((y/(n))*Math.PI*2),-2/n+Math.cos((y/(n))*Math.PI*2)*Math.cos((j/(n))*Math.PI*2),2/n+Math.sin(((j+1)/(n))*Math.PI*2),1.0)];
}

/*

function vertMatrixSphereUp(j,n){
    return [vec4(Math.cos((j/(n))*Math.PI*2),Math.sin((j/(n))*Math.PI*2+Math.PI),Math.sin((j/(n))*Math.PI*2),1.0),
            vec4(Math.cos((j/(n))*Math.PI*2),Math.sin((j/(n+1))*Math.PI*2+Math.PI),Math.sin((j/(n))*Math.PI*2),1.0),
            vec4(Math.cos(((j+1)/(n))*Math.PI*2),Math.sin(((j+1)/(n))*Math.PI*2+Math.PI),Math.sin(((j+1)/(n))*Math.PI*2),1.0)];
}


function vertMatrixSphereDown(j,n){
    return [vec4(Math.cos((j/(n))*Math.PI*2)+2,1,Math.sin((j/(n))*Math.PI*2),1.0),
            vec4(Math.cos(((j+1)/(n))*Math.PI*2)+2,-1,Math.sin(((j+1)/(n))*Math.PI*2),1.0),
            vec4(Math.cos(((j+1)/(n))*Math.PI*2)+2,1,Math.sin(((j+1)/(n))*Math.PI*2),1.0)];
}
*/
/*

function vertMatrixSphereCaps(j,n,yVal){
    return [vec4(0.0,yVal,0.0,1.0),
            vec4(Math.cos((j/(n))*Math.PI*2),yVal,Math.sin((j/(n))*Math.PI*2),1.0),
            vec4(Math.cos(((j+1)/(n))*Math.PI*2),yVal,Math.sin(((j+1)/(n))*Math.PI*2),1.0)];
}

 */
