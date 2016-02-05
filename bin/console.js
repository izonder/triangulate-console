#!/usr/bin/node

var defaults = {
        accuracy: 0.7,    // float between 0 and 1
        blur: 40,         // positive integer
        vertexCount: 700, // positive integer
        fill: true,       // boolean or string with css color (e.g '#bada55', 'red')
        stroke: true,     // boolean or string with css color (e.g '#bada55', 'red')
        strokeWidth: 0.5, // positive float
        gradients: true,  // boolean
        gradientStops: 4, // positive integer >= 2
        lineJoin: 'miter' // 'miter', 'round', or 'bevel'
    },
    description = {
        accuracy: 'float between 0 and 1',
        blur: 'positive integer',
        vertexCount: 'positive integer',
        fill: 'boolean or string with css color (e.g \'#bada55\', \'red\')',
        stroke: 'boolean or string with css color (e.g \'#bada55\', \'red\')',
        strokeWidth: 'positive float',
        gradients: 'boolean',
        gradientStops: 'positive integer >= 2',
        lineJoin: '\'miter\', \'round\', or \'bevel\'',
        in: 'input file path',
        out: 'output file path',
        help: 'show this text'
    },
    optimist = require('optimist')
        .default(defaults)
        .demand(['in', 'out'])
        .describe(description),
    argv = optimist.argv;

if(argv.help) optimist.showHelp();
else require('./../src/index').run(argv);