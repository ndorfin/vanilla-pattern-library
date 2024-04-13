const { readFileSync } = require('fs');
const inspect = require('util').inspect;
const yaml = require('js-yaml');
const markdownIt = require('markdown-it');
const md = new markdownIt({html: true});
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const { EleventyHtmlBasePlugin } = require('@11ty/eleventy');

module.exports = function(config) {
	/* Add plugins */
	config.addPlugin(syntaxHighlight);
	config.addPlugin(EleventyHtmlBasePlugin);

	/* Add YAML support */
	config.addDataExtension('yml', contents => yaml.load(contents));

	/* Copy assets straight through to the `public` folder */
	config.addPassthroughCopy('src/pattern-library-assets');
	config.addPassthroughCopy('vanilla-web-assets/src');

	/* Filters */
	config.addFilter('markdown', (content) => {
		// Adds markdown support to any field
		// e.g. {{ pattern.description | markdown | safe }}
		return md.render(content);
	});
	config.addFilter('objToArray', data => {
		// When using multiple files in the `data` directory
		// 11ty appends them as key/value pairs to an object.
		// This filter is useful for turning that object into an array,
		// by ignoring the filename (key), and extracting the values.
		return Object.values(data);
	});
	config.addFilter('debug', (content) => {
		return inspect(content);
	});
	config.addFilter('getFileContents', (fileURI) => {
		let filePath = `${__dirname}/${fileURI}`;
		let file = readFileSync(filePath, (error, contents) => {
			return contents;
		});
		return file.toString('utf8');
	});

	return {
		templateFormats: ['html', 'md', 'njk'],
		htmlTemplateEngine: ['njk', 'md'],
		dir: {
			// ⚠️ These values are both relative to your input directory.
			input: 'src',
			output: 'public',
			data: '_data',
			includes: '_includes',
			layouts: '_layouts',
		}
	}
}