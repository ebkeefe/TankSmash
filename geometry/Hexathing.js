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
function Hexathing() {
    this.wire = false;

    this.name = "hexathing";

    this.numVertices = 60/2;
    this.numTriangles = this.numVertices / 3;

    this.vertices = [this.numVertices];
    this.colors = [this.numVertices];
    this.normals = [this.numVertices];
    this.vTexCoords = [this.numVertices];

    // Local variables: unique vertices and colors.
    ////////////////////////////////////////////////////////////
    var unique_vertices = [
        vec4(1.0,1.0,0.0,1.0),
        vec4(.5,1.0,.87,1),
        vec4(-.5,1,.87,1),
        vec4(-1,1,0,1),
        vec4(-.5,1,-.87,1),
        vec4(.5,1,-.87,1),
                           vec4(1.0,-1.0,0.0,1.0),
                           vec4(.5,-1.0,.87,1),
                           vec4(-.5,-1,.87,1),
                           vec4(-1,-1,0,1),
                           vec4(-.5,-1,-.87,1),
                           vec4(.5,-1,-.87,1)
    ];

    var vert_colors = [
        vec4(0.0, 0.0, 0.0, 1.0), // black   - v0
        vec4(1.0, 0.0, 0.0, 1.0), // red     - v1
        vec4(1.0, 1.0, 0.0, 1.0), // yellow  - v2
        vec4(0.0, 1.0, 0.0, 1.0), // green   - v3
        vec4(0.0, 0.0, 1.0, 1.0), // blue    - v4
        vec4(1.0, 0.0, 1.0, 1.0), // magenta - v5
        vec4(1.0, 1.0, 1.0, 1.0), // white   - v6
        vec4(0.0, .5 , 1.0, 1.0),  // cyan    - v7
                       vec4(1.0, 0.0, 1.0, 1.0), // magenta - v8
                       vec4(0.0, 1.0, 1.0, 1.0),  // cyan    - v9
                       vec4(0.0, 0.0, 0.0, 1.0), // black   - v0
                       vec4(1.0, 0.0, 0.0, 1.0), // red     - v1
                       vec4(1.0, 1.0, 0.0, 1.0), // yellow  - v2
                       vec4(0.0, 1.0, 0.0, 1.0), // green   - v3
                       vec4(0.0, 0.0, 1.0, 1.0) // blue    - v4
    ];

    var face_normals = [
        vec4(.5, 0.0, .87, 0.0),  // front
        vec4(1.0, 0.0, 0.0, 0.0), // back
        vec4(-1, 0.0, 0.0, 0.0), // left
        //vec4(1.0, 0.0, 0.0, 0.0),  // right
        vec4(0.0, 1.0, 0.0, 0.0),  // top
        vec4(0.0, -1.0, 0.0, 0.0),  // bottom
                        vec4(-1.0, 0.0, 0.0, 0.0), // left
                        vec4(1.0, 0.0, 0.0, 0.0),  // right
                        vec4(0.0, 1.0, 0.0, 0.0),  // top
                        vec4(0.0, -1.0, 0.0, 0.0)  // bottom
    ];

/////    v6----- v7
/////   /|      /|
/////  v2------v3|              ^ y
/////  | |     | |              |
/////  | |v4---|-|v5             -->x
/////  |/      |/              /
/////  v0------v1              z
    var face_tex_coords = [
        vec2(0, 1),
        vec2(1, 1),
        vec2(0, 0),
        vec2(0, 0),
        vec2(1, 1),
        vec2(1, 0),
        vec2(1, 0),
        vec2(1, 1),
        vec2(0, 0),
        vec2(0, 0)
    ];


    // Local variable:  Indices into the above vertices and colors arrays
    
    var indices = [
                //sides
                0, 1, 6, 6, 1, 7,
                1,2,7,7,2,8,
                2,3,8,8,3,9,
                //top+bottom
                1,2,0,0,2,3,
                7,8,6,6,8,9,
                 
    ];
    


    // These are the actual vertices and colors to be placed in the vertex buffers.

    for (var i = 0; i < 5; i++) {  // 6 faces
        norm = face_normals[i];
        for (var j = 0; j < 6; j++) {   // each face has 6 vertices (2 triangles)
            var k = i * 6 + j;
            var q = indices[k];
            this.vertices[k] = unique_vertices[q];
            this.colors[k] = vert_colors[q];
            this.normals[k] = norm;
            this.vTexCoords[k] = face_tex_coords[j];
        }
    }
}
