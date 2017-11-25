//Eric Keefe lab 2 
//this function creates a cylinder with base radius 1, which is orientated such that it's height is in the z plane

function Cylinder() {

    this.name = "cylinder";

    this.numTriangles = 128; 
    this.numVertices = this.numTriangles * 3;
    var discTriangles = this.numTriangles/4;
    

    this.vertices = [this.numVertices];
    this.colors = [this.numVertices];
    this.normals = [this.numVertices];
    this.vTexCoords = [this.numVertices];



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

   
    for (var i = 0; i < discTriangles; i++){
        
        // bottom triangle
        this.vertices[i*12] = vec4(0, 0, 0, 1.0);
        var angle1 = (2 * Math.PI * i)/discTriangles;

        this.vertices[i*12+1] = vec4(Math.cos(angle1), Math.sin(angle1), 0, 1.0); 
        var angle2 = angle1 + 2 * Math.PI/discTriangles;
        
        this.vertices[i*12+2] = vec4(Math.cos(angle2), Math.sin(angle2), 0, 1.0); 
        
        this.normals[i*12] = vec4(0,0,-1,0);
        this.normals[i*12+1] = vec4(0,0,-1,0);
        this.normals[i*12+2] = vec4(0,0,-1,0);
          
        // this.vTexCoords[i*12] = vec2(0, 0);
        // this.vTexCoords[i*12 + 1] = vec2(0, Math.sin(angle1));
        // this.vTexCoords[i*12 + 2] = vec2(0, Math.sin(angle2));
         this.vTexCoords[i*12] = vec2(0, 0);
        this.vTexCoords[i*12 + 1] = vec2(Math.cos(angle1)/2, Math.sin(angle1)/2);
        this.vTexCoords[i*12+2] = vec2(Math.cos(angle2)/2, Math.sin(angle2)/2);


        // side triangles
        this.vertices[i*12 + 6] = vec4(Math.cos(angle2), Math.sin(angle2), 1.0, 1.0);
        this.vertices[i*12+7] = vec4(Math.cos(angle1), Math.sin(angle1), 0, 1.0); 
        this.vertices[i*12+8] = vec4(Math.cos(angle2), Math.sin(angle2), 0, 1.0); 
        
        this.normals[i*12+6] = normalize(vec4(Math.cos(angle2), Math.sin(angle2), 0, 0), true);
        this.normals[i*12+7] = normalize(vec4(Math.cos(angle1), Math.sin(angle1), 0, 0), true); 
        this.normals[i*12+8] = normalize(vec4(Math.cos(angle2), Math.sin(angle2), 0, 0), true); 

        // this.vTexCoords[i*12 + 6] = vec2(Math.sin(angle2), 1.0);
        // this.vTexCoords[i*12 + 7] = vec2(Math.sin(angle1), 0);
        // this.vTexCoords[i*12 + 8] = vec2(Math.sin(angle2), 0);

        this.vTexCoords[i*12 + 6] = vec2(1, angle2/(2 * Math.PI));
        this.vTexCoords[i*12 + 7] = vec2(0, angle1/(2 * Math.PI));
        this.vTexCoords[i*12+8] = vec2(0, angle2/(2 * Math.PI));


        this.vertices[i*12+9] = vec4(Math.cos(angle1), Math.sin(angle1), 0, 1.0);
        this.vertices[i*12+10] = vec4(Math.cos(angle1), Math.sin(angle1), 1.0, 1.0); 
        this.vertices[i*12+11] = vec4(Math.cos(angle2), Math.sin(angle2), 1.0, 1.0); 
        
        this.normals[i*12 +9] = normalize(vec4(Math.cos(angle1), Math.sin(angle1), 0, 0), true);
        this.normals[i*12+10] = normalize(vec4(Math.cos(angle1), Math.sin(angle1), 0, 0), true); 
        this.normals[i*12+11] = normalize(vec4(Math.cos(angle2), Math.sin(angle2), 0, 0), true); 

        // this.vTexCoords[i*12 + 9] = vec2(Math.sin(angle1), 0);
        // this.vTexCoords[i*12 + 10] = vec2(Math.sin(angle1), 1.0);
        // this.vTexCoords[i*12 + 11] = vec2(Math.sin(angle2), 1.0);

        this.vTexCoords[i*12 + 9] = vec2(0, angle1/(2 * Math.PI));
        this.vTexCoords[i*12 + 10] = vec2(1, angle1/(2 * Math.PI));
        this.vTexCoords[i*12+11] = vec2(1, angle2/(2 * Math.PI));


        // top triangle
        this.vertices[i*12 + 3] = vec4(0, 0, 1.0, 1.0);
        this.vertices[i*12+4] = vec4(Math.cos(angle1), Math.sin(angle1), 1.0, 1.0); 
        this.vertices[i*12+5] = vec4(Math.cos(angle2), Math.sin(angle2), 1.0, 1.0); 
        
        this.normals[i*12+3] = vec4(0,0,1,0);
        this.normals[i*12+4] = vec4(0,0,1,0);
        this.normals[i*12+5] = vec4(0,0,1,0);

        // this.vTexCoords[i*12 + 3] = vec2(1, 0);
        // this.vTexCoords[i*12 + 4] = vec2(1,angle1/(2 * Math.PI));
        // this.vTexCoords[i*12 + 5] = vec2(1,angle2/(2 * Math.PI));

         this.vTexCoords[i*12 + 3] = vec2(0, 0);
        this.vTexCoords[i*12 + 4] = vec2(Math.cos(angle1)/2, Math.sin(angle1)/2);
        this.vTexCoords[i*12+5] = vec2(Math.cos(angle2)/2, Math.sin(angle2)/2);




    }
   

    for (var i = 0; i < this.numVertices; i++){
        //this.vertices[i] = unique_vertices[i];
        this.colors[i] = vert_colors[Math.floor((i/12))%4+2];
    }

   
}