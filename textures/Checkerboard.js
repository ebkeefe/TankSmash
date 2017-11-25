/* Create a checkerboard pattern
 */

function Checkerboard(glin)
{
    this.gl = glin;
    this.width = 64;    // width (# of pixels) of the texture
    this.height = 64;   // height (# of pixels) of the texture
    this.numRows = 8;   // number of checkerboard squares in a row
    this.numCols = 8;   // number of checkerboard squares in a column
    this.makeCheckerboard();
    this.init();
}

/**
 * Create an array of uInts. Load the array with the texture pattern. 
 * Note, the 2D texture is stored in a 1D array.
 * @return {undefined}
 */
Checkerboard.prototype.makeCheckerboard = function () {
    this.texels = new Uint8Array(4 * this.width * this.height);

    for (var i = 0; i < this.width; i++)
    {
        for (var j = 0; j < this.height; j++)
        {
            var patchx = Math.floor(i / (this.width / this.numRows));
            var patchy = Math.floor(j / (this.height / this.numCols));


            var c = (patchx % 2 !== patchy % 2 ? 255 : 0);
            var k = 4 * (i * this.width + j);
            this.texels[k] = c;
            this.texels[k + 1] = c;
            this.texels[k + 2] = c;
            this.texels[k + 3] = 255;
        }
    }
};

/**
 *  Call this to create the texture buffer and set texture parameters.
 * @return {undefined}
 */
Checkerboard.prototype.init = function () {
    // Generate texture ID and bind to this ID
    this.texID = this.gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texID);

    // loads the texture onto the GPU
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.width, this.height, 0,
            this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.texels);

    // Set parameters
    this.gl.generateMipmap(this.gl.TEXTURE_2D);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST_MIPMAP_LINEAR);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
};

/**
 * Call this when you are ready to use the texture
 * @return {undefined}
 */
Checkerboard.prototype.activate = function () {
    // this.gl provides 32 texture registers; the first of these is this.gl.TEXTURE0.
    this.gl.activeTexture(this.gl.TEXTURE0); // activate texture unit 0
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texID);
    this.gl.uniform1i(uTexture, 0);     // associate uTexture in shader with texture unit 0
};
