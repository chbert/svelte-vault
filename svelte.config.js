import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$components: './src/lib/components',
			$db: './src/lib/db',
			$utils: './src/lib/utils'
		}
	},
	preprocess: [vitePreprocess()]
}

export default config
