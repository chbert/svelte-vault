const config = {
	useTabs: true,
	singleQuote: true,
	semi: false,
	trailingComma: 'none',
	printWidth: 100,
	plugins: ['prettier-plugin-svelte'],
	pluginSearchDirs: ['.'],
	overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
	svelteSortOrder: 'options-scripts-markup-styles'
}

module.exports = config
