// @ts-nocheck
const tailwindcss = require('tailwindcss')
const tailwindcssNesting = require('tailwindcss/nesting')
const autoprefixer = require('autoprefixer')
const postcssNested = require('postcss-nested')

const config = {
	plugins: [
		postcssNested,
		//Some plugins, like tailwindcss/nesting, need to run before Tailwind,
		tailwindcssNesting(),
		tailwindcss(),
		//But others, like autoprefixer, need to run after,
		autoprefixer
	]
}

module.exports = config
