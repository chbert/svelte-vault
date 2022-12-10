import { vitePreprocess } from '@sveltejs/kit/vite'
import adapter from '@sveltejs/adapter-auto'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$components: './src/lib/components',
			$api: './src/lib/api',
			$db: './src/lib/db',
			$stores: './src/lib/stores',
			$utils: './src/lib/utils'
		}
	},
	preprocess: [vitePreprocess()]
}

export default config
