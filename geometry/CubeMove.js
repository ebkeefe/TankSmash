///// CUBE DEFINTION
/////
///// Cube is defined to be centered at the origin of the coordinate reference system. 
///// Cube size is assumed to be 2.0 x 2.0 x 2.0 .

///// Generate 12 triangles: 36 vertices and 36 colors
/////    v6----- v7
/////   /|      /|
/////  v2------v3|              ^ y
/////  | |     | |              |
/////  | |v4---|-|v5            -->x
/////  |/      |/              /
/////  v0------v1              z
///// Always use the Right Hand Rule to generate vertex sequence. We want outward facing normals.
function CubeMove(theta) {
    this.theta = theta;
    this.wire = false;
    this.name = "cube";

    this.numVertices = 36;
    this.numTriangles = this.numVertices / 3;

    this.vertices = [this.numVertices];
    this.colors = [this.numVertices];
    this.normals = [this.numVertices];
    this.vTexCoords = [this.numVertices];
    
    //console.log("cube drawn");

    // Local variables: unique vertices and colors.
    ////////////////////////////////////////////////////////////
    var unique_vertices = [
        vec4(-1.0, -1.0, 1.0, 1.0),  // v0
        vec4(1.0, -1.0, 1.0, 1.0),   // v1
        vec4(-1.0, 1.0, 1.0, 1.0),   // v2
        vec4(1.0, 1.0, 1.0, 1.0),    // v3
        vec4(-1.0, -1.0, -1.0, 1.0), // v4
        vec4(1.0, -1.0, -1.0, 1.0),  // v5
        vec4(-1.0, 1.0, -1.0, 1.0),  // v6
        vec4(1.0, 1.0, -1.0, 1.0)    // v7
    ];

    var vert_colors = [
        vec4(0.0, 0.0, 0.0, 1.0), // black   - v0
        vec4(1.0, 0.0, 0.0, 1.0), // red     - v1
        vec4(1.0, 1.0, 0.0, 1.0), // yellow  - v2
        vec4(0.0, 1.0, 0.0, 1.0), // green   - v3
        vec4(0.0, 0.0, 1.0, 1.0), // blue    - v4
        vec4(1.0, 0.0, 1.0, 1.0), // magenta - v5
        vec4(1.0, 1.0, 1.0, 1.0), // white   - v6
        vec4(0.0, 1.0, 1.0, 1.0)  // cyan    - v7
    ];

    var face_normals = [
        vec4(0.0, 0.0, 1.0, 0.0),  // front
        vec4(0.0, 0.0, -1.0, 0.0), // back
        vec4(-1.0, 0.0, 0.0, 0.0), // left
        vec4(1.0, 0.0, 0.0, 0.0),  // right
        vec4(0.0, 1.0, 0.0, 0.0),  // top
        vec4(0.0, -1.0, 0.0, 0.0)  // bottom
    ];

/////    v6----- v7
/////   /|      /|
/////  v2------v3|              ^ y
/////  | |     | |              |
/////  | |v4---|-|v5            -->x
/////  |/      |/              /
/////  v0------v1              z
    var face_tex_coords = [
        vec2(0, 1),
        vec2(1, 1),
        vec2(0, 0),
        vec2(0, 0),
        vec2(1, 1),
        vec2(1, 0)
    ];


    // Local variable:  Indices into the above vertices and colors arrays
    var indices = [
        0, 1, 2, 2, 1, 3, // front
        4, 5, 6, 6, 5, 7, // back
        4, 0, 6, 6, 0, 2, // left
        1, 5, 3, 3, 5, 7, // right
        2, 3, 6, 6, 3, 7, // top
        4, 5, 0, 0, 5, 1  // bottom
    ];


    // These are the actual vertices and colors to be placed in the vertex buffers.

    for (var i = 0; i < 6; i++) {  // 6 faces
        norm = face_normals[i];
        for (var j = 0; j < 6; j++) {   // each face has 6 vertices (2 triangles)
            var k = i * 6 + j;
            this.vertices[k] = unique_vertices[indices[k]];
            this.colors[k] = vert_colors[indices[k]];
            this.normals[k] = norm;
            this.vTexCoords[k] = this.texMove(face_tex_coords[j]);
        }
    }
}

CubeMove.prototype.texMove = function(tex){
        var xTex = tex[0]-((this.theta/2)%(20))*.06;
        //console.log(xTex);
        //if (xTex<0) {
        //    xTex+=1.0;
        //} //else if (xTex>1){
        //    xTex-=1;
        //}
        tex = vec2(xTex,tex[1]);
    return tex;
}

