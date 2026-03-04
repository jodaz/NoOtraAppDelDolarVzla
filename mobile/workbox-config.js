module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{html,js,css,png,jpg,svg,json}'
	],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};
