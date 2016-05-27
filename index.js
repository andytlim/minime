#!/usr/bin/env node

process.bin = process.title = 'minime';

/*******************************************************************************
 * Imports
 ******************************************************************************/
var UglifyJS = require('uglify-js');
var uglifycss = require('uglifycss');
var fs = require('fs');

/*******************************************************************************
 * Option Arguments
 ******************************************************************************/
var option = process.argv[2];
var options = {};
if (option == "-d")
    options = {
        output : {
            beautify : true
        },
        compress : false
    };

/*******************************************************************************
 * Load minime.json
 ******************************************************************************/
var minime;
fs.readFile('minime.json', 'utf8', function (err,data) {
    if (err) {
      return console.log('Unable to find minime.json! \n' + err);
    }
    minime = JSON.parse(data);
    
    minifyJS(minime.jsRoot, minime.jsMap, options);
    
    minifyCSS(minime.cssRoot, minime.cssMap, {
        maxLineLen : 0,
        expandVars : true
    });
});

/*******************************************************************************
 * Script Functions
 ******************************************************************************/
function minifyJS(jsRoot, jsMap, options) {
    for (var target in jsMap) {
        var input = buildJSLocation(jsRoot, jsMap[target]);
        var result = UglifyJS.minify(input, options);
        fs.writeFileSync(buildJSLocation(jsRoot, target), result.code);
        console.log(target + ' created.');
    }
}

function minifyCSS(cssRoot, cssMap, options) {
    for (var target in cssMap) {
        var css = uglifycss.processFiles(buildCSSLocation(cssRoot, cssMap[target]),
                options);
        fs.writeFileSync(buildJSLocation(cssRoot, target), css);
        console.log(target + ' created.');
    }
}

function buildCSSLocation(cssRoot, files) {
    if (files.constructor !== Array)
        return cssRoot + "/" + files;

    for (var i = 0; i < files.length; i++)
        files[i] = cssRoot + "/" + files[i];
    return files;
}

function buildJSLocation(jsRoot, files) {
    if (files.constructor !== Array)
        return jsRoot + "/" + files;

    for (var i = 0; i < files.length; i++)
        files[i] = jsRoot + "/" + files[i];
    return files;
}