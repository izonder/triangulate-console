'use strict';

var fs = require('fs'),
    triangulate = require('triangulate-image');

/**
 * Server-side CLI triangulate wrapper
 * @constructor
 */
function TriangulateConsole()
{
    this.defaults = {
        accuracy: 0.7,    // float between 0 and 1
        blur: 40,         // positive integer
        vertexCount: 700, // positive integer
        fill: true,       // boolean or string with css color (e.g '#bada55', 'red')
        stroke: true,     // boolean or string with css color (e.g '#bada55', 'red')
        strokeWidth: 0.5, // positive float
        gradients: true,  // boolean
        gradientStops: 4, // positive integer >= 2
        lineJoin: 'miter' // 'miter', 'round', or 'bevel'
    };

    this.allowedExtensions = {
        'jpg': 'toJPGStream',
        'png': 'toPNGStream',
        'svg': 'toSVGStream'
    };

    this.params = {};

    this.input = null;
    this.output = null;
}

/**
 * Run main process
 * @param params
 */
TriangulateConsole.prototype.run = function(params)
{
    this.assignParams(params);
    var format = this.resolveFormat(this.output);

    //run transformation
    var inputStream = fs.createReadStream(this.input),
        outputStream = fs.createWriteStream(this.output);

    triangulate(this.params).fromStream(inputStream)[format]().then(function(triangulateStream){
        triangulateStream.pipe(outputStream);
    });
};

/**
 * Assign the params
 * @param params
 */
TriangulateConsole.prototype.assignParams = function(params)
{
    this.params = Object.assign({}, this.defaults, params);
    this.input = this.params.in;
    this.output = this.params.out;
};

/**
 * Resolve file format by extension
 * @param path
 */
TriangulateConsole.prototype.resolveFormat = function(path)
{
    var regexResult = /\.([^.]*)$/.exec(path),
        ext = (regexResult[1] || 'svg').toLowerCase();

    return ext in this.allowedExtensions ? this.allowedExtensions[ext] : this.allowedExtensions['svg'];
};

module.exports = new TriangulateConsole();