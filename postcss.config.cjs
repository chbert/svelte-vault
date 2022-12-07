// @ts-nocheck
const autoprefixer = require('autoprefixer')
const postcssNested = require('postcss-nested')

const config = {
	plugins: [postcssNested, autoprefixer]
}

module.exports = config
