#!/usr/bin/env node

process.bin = process.title = 'minime';

/*******************************************************************************
 * Imports
 ******************************************************************************/
const fs = require('fs');

const program = require('commander');
const mkdirp = require('mkdirp');
const uglifyes = require('uglify-es');
const uglifycss = require('uglifycss');

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
const configFile = program.file.endsWith('.json') ? program.file : program.file + '/minime.json';
console.info(`Looking for ${configFile}`);

fs.readFile(configFile, 'utf8', function (err, data) {
	if (err)
		console.info('Unable to find minime.json!\n' + err);
	else {
		const minime = JSON.parse(data);

		if (program.production) console.info('Building new assets in production mode...');

		console.info('----------------------');
		console.info('*      js build      *');
		console.info('----------------------');
		if (minime.js.length !== undefined)
			for (const jsSet of minime.js) {
				console.info(`Minifying js assets in ${jsSet.source}...`);
				minifyJS(jsSet);
			}
		else
			console.info('Unabled to minify js, please make sure {js: []} exists');

		console.info('-----------------------');
		console.info('*      css build      *');
		console.info('-----------------------');
		if (minime.js.length !== undefined)
			for (const cssSet of minime.css) {
				console.info(`Minifying css assets in ${cssSet.source}...`);
				minifyCSS(cssSet, {
					maxLineLen: 0,
					expandVars: true
				});
			}
		else
			console.info('Unabled to minify css, please make sure {css: []} exists');
	}
});

/*******************************************************************************
 * Script Functions
 ******************************************************************************/
function minifyJS(jsSet) {
	for (let target of Object.keys(jsSet.map)) {
		let input = buildPath(jsSet.source, jsSet.map[target]);
		let result;

		// if production is not enabled, create a beautified version of the code
		if (!program.production)
			result = uglifyes.minify(input, {
				output: {
					beautify: true
				},
				compress: false,
				mangle: false
			});
		else
			result = uglifyes.minify(input, {});

		fs.writeFileSync(buildPath(jsSet.target, target), result.code);

		console.info(target + ' created.');
	}
	console.info('File(s) are available in ' + jsSet.target + '.');
}

function minifyCSS(cssSet, options) {
	for (let target of Object.keys(cssSet.map)) {
		let result = uglifycss.processFiles(buildPath(cssSet.source, cssSet.map[target]), options);
		fs.writeFileSync(buildPath(cssSet.target, target), result);
		console.info(target + ' created.');
	}
	console.info('File(s) are available in ' + cssSet.target + '.');
}

function buildPath(root, files) {
	if (program.recursive)
		mkdirp.sync(root, {});

	if (typeof files === 'string')
		return root + '/' + files;

	return files.map(file => `${root}/${file}`);
}
