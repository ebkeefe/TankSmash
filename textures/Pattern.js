/* Create a checkerboard pattern
 */

function Pattern(glin)
{
    this.gl = glin;
    this.width = 64*4;    // width (# of pixels) of the texture
    this.height = 64*4;   // height (# of pixels) of the texture
    this.numRows = 8;   // number of checkerboard squares in a row
    this.numCols = 8;   // number of checkerboard squares in a column
    this.makePattern();
    this.init();
}

/**
 * Create an array of uInts. Load the array with the texture pattern. 
 * Note, the 2D texture is stored in a 1D array.
 * @return {undefined}
 */
Pattern.prototype.makePattern = function () {
    this.texels = new Uint8Array(4 * this.width * this.height);

    for (var i = 0; i < this.width; i++)
    {
        for (var j = 0; j < this.height; j++)
        {
            var k = 4 * (i * this.width + j);
            var c = this.colorize(i/this.width,j/this.height);
            this.texels[k] = c[0]*255;
            this.texels[k + 1] = c[1]*255;
            this.texels[k + 2] = c[2]*255;
            this.texels[k + 3] = c[4]*255;
        }
    }
};


Pattern.prototype.colorize = function (x,y) {
    var circColor = vec4(1,.5,0.5,1.0);
    for(var i = -3;i<4;i++){
        for(var j = -3;j<4;j++){
            var xc = (x-.5)*6.0+i;
            var yc = (y-.5)*6.0+j;
            //circColor = vec4(0.4,xc*xc+yc*yc,0.4,1.0);
            var circSize = .1;
            for(var ic = 1;ic>0.0;ic-=.02){
                if (xc*xc+yc*yc<ic&&xc*xc+yc*yc>(ic-.1)){
                    circColor = vec4(ic,1-ic/2,1-ic/2,1.0);
                    break;
                }
            }
        }
    }
    return circColor;
};

/**
 *  Call this to create the texture buffer and set texture parameters.
 * @return {undefined}
 */
Pattern.prototype.init = function () {
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
Pattern.prototype.activate = function () {
    // this.gl provides 32 texture registers; the first of these is this.gl.TEXTURE0.
    this.gl.activeTexture(this.gl.TEXTURE0); // activate texture unit 0
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texID);
    this.gl.uniform1i(uTexture, 0);     // associate uTexture in shader with texture unit 0
};
