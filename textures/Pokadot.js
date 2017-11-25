/* Create a checkerboard pattern
 */

function Pokadot()
{
    this.width = 256;    // width (# of pixels) of the texture
    this.height = 256;   // height (# of pixels) of the texture
    this.numRows = 8;   // number of checkerboard squares in a row
    this.numCols = 8;   // number of checkerboard squares in a column
    this.makePokadot();
    this.init();
}

/**
 * Create an array of uInts. Load the array with the texture pattern. 
 * Note, the 2D texture is stored in a 1D array.
 * @return {undefined}
 */
Pokadot.prototype.makePokadot = function () {
    this.texels = new Uint8Array(4 * this.width * this.height);

    for (var i = 0; i < this.width; i++)
    {
        for (var j = 0; j < this.height; j++)
        {
            var patchx = Math.floor(i / (this.width / this.numRows));
            var patchy = Math.floor(j / (this.height / this.numCols));

            var c = 0;
            if (patchx % 2 !== patchy % 2){
                var centX = patchx + 1/2;
                //console.log(centX);
                var centY = patchy + 1/2;
                //console.log(centY);
                var x = i / (this.width / this.numRows);
                //console.log(x);
                var y = j / (this.height / this.numCols);
                //console.log(y);
                var rad = 1/2;
                if (Math.sqrt(   (x-centX)*(x-centX) + (y-centY)*(y-centY)   ) < rad){
                    c = 255;   
                }
                 
                //calc center of this square
                //text how far from center this texel is by pythag
            }
           
            var k = 4 * (i * this.width + j);
            this.texels[k] = c;
            this.texels[k + 1] = c;
            this.texels[k + 2] = 100;
            this.texels[k + 3] = 255;
        }
    }
};

/**
 *  Call this to create the texture buffer and set texture parameters.
 * @return {undefined}
 */
Pokadot.prototype.init = function () {
    // Generate texture ID and bind to this ID
    this.texID = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texID);

    // loads the texture onto the GPU
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0,
            gl.RGBA, gl.UNSIGNED_BYTE, this.texels);

    // Set parameters
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
};

/**
 * Call this when you are ready to use the texture
 * @return {undefined}
 */
Pokadot.prototype.activate = function () {
    // GL provides 32 texture registers; the first of these is gl.TEXTURE0.
    gl.activeTexture(gl.TEXTURE0); // activate texture unit 0
    gl.bindTexture(gl.TEXTURE_2D, this.texID);
    gl.uniform1i(uTexture, 0);     // associate uTexture in shader with texture unit 0
};