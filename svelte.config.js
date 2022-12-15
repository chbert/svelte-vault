import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/kit/vite'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess()],
	kit: {
		adapter: adapter({ edge: true }),
		alias: {
			$components: './src/lib/components',
			$api: './src/lib/api',
			$db: './src/lib/db',
			$stores: './src/lib/stores',
			$utils: './src/lib/utils'
		}
	},
	vitePlugin: {
		experimental: {
			inspector: true
		}
	}
}

export default config
