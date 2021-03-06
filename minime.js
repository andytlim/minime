#!/usr/bin/env node

process.bin = process.title = 'minime';

/*******************************************************************************
 * Imports
 ******************************************************************************/
var program = require('commander')
  , fs = require('fs')
  , mkdirp = require('mkdirp')
  , uglifyjs = require('uglify-js')
  , uglifycss = require('uglifycss')
  , winston = require('winston');

/*******************************************************************************
 * Logging Level
 ******************************************************************************/
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)()
    ]
});
logger.level = 'info';

/*******************************************************************************
 * Option Arguments
 ******************************************************************************/
program
    .usage('[options]')
    .option('-f, --file [location]', 'minime.json location (if unspecified, will use current directory)', 'minime.json')
    .option('-r, --recursive', 'create all folders in path if they do not exist')
    .option('-p, --production', 'js files will be minified (default: concat, uglify only)')
    .parse(process.argv);

/*******************************************************************************
 * Load minime.json
 ******************************************************************************/
var minime;
fs.readFile(program.file, 'utf8', function (err,data) {
    if (err) {
        return logger.info('Unable to find minime.json!\n' + err);
    }
    minime = JSON.parse(data);

    if (program.production) logger.info('Building new assets in production mode...');
    
    logger.info('----------------------');
    logger.info('*      js build      *');
    logger.info('----------------------');
    for (var i = 0; i < minime.js.length; i++) {
        logger.info('Minifying js assets in ' + minime.js[i].source + '...');
        minifyJS(minime.js[i]);
    }

    logger.info('-----------------------');
    logger.info('*      css build      *');
    logger.info('-----------------------');
    for (var i = 0; i < minime.css.length; i++) {
        logger.info('Minifying css assets in ' + minime.css[i].source + '...');
        minifyCSS(minime.css[i], {
            maxLineLen : 0,
            expandVars : true
        });
    }    
});

/*******************************************************************************
 * Script Functions
 ******************************************************************************/
function minifyJS(js) {
    for (var target in js.map) {
        var input = buildPath(js.source, js.map[target]);        
        var result;        
        
        // if production is not enabled, create a beautified version of the code
        if (!program.production) {
            result = uglifyjs.minify(input, {
                output : {
                    beautify : true
                },
                compress : false
            });            
        }
        else {
            result = uglifyjs.minify(input, {});
        }
        fs.writeFileSync(buildPath(js.target, target), result.code);
        
        logger.info(target + ' created.');
    }
    logger.info('File(s) are available in ' + js.target + '.');
}

function minifyCSS(css, options) {
    for (var target in css.map) {
        var result = uglifycss.processFiles(buildPath(css.source, css.map[target]),
                options);
        fs.writeFileSync(buildPath(css.target, target), result);
        logger.info(target + ' created.');
    }
    logger.info('File(s) are available in ' + css.target + '.');
}

function buildPath(root, files) {
    if (program.recursive)
      mkdirp.sync(root, {});
  
    if (files.constructor !== Array)
        return root + "/" + files;

    for (var i = 0; i < files.length; i++)
        files[i] = root + "/" + files[i];
    return files;
}
