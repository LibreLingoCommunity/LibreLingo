import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess({
		scss: {
			prependData: "@use './src/assets/mystyles.scss';"
		},
		includePaths: ['./']
	}),

	// Remove vite-plugin-svelte warnings about unused CSS selectors
	//onwarn: (warning, handler) => {
	//	const { code, frame } = warning;
	//	if (code === 'css-unused-selector') return;
	//	handler(warning);
	//},
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			components: 'src/components',
			types: 'src/types',
			utils: 'src/utils',
			sounds: './static/sounds',
			'course-client': 'src/course-client'
		}
	}
};

export default config;
