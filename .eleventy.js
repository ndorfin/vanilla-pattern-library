const { readFileSync } = require('fs');
const inspect = require('util').inspect;
const yaml = require('js-yaml');
const markdownIt = require('markdown-it');
const md = new markdownIt({html: true});
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const { EleventyHtmlBasePlugin } = require('@11ty/eleventy');

function dateWithTimeZoneOffset(date) {
	let newDate = new Date(date);
	const timeZoneOffset = newDate.getTimezoneOffset();
	newDate.setMinutes(timeZoneOffset);
	return newDate;
}

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

	/* Shortcodes */
	config.addShortcode('datetime', function(date) {
		return `<time datetime="${ dateWithTimeZoneOffset(date).toISOString() }">
			${ dateWithTimeZoneOffset(date).toUTCString() }
		</time>`;
	});

	/* Custom collections */
	config.addCollection('patternVariants', (collection) => {
		const filteredPatterns = collection.getAll()[0].data['patterns'];
		let truncatedCollection = Object.values(filteredPatterns).filter((item) => {
			// Only filter by `patterns` that have `variants` sections
			return item['variants'] && item['variants'].length > 0;
		});
		let variants = [];
		if (truncatedCollection.length) {
			truncatedCollection.forEach((pattern) => {
				pattern.variants.forEach((variant) => {
					variant.pattern_id = pattern.id;
					variants.push(variant);
				});
			});
		}
		return variants;
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