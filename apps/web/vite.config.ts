import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { plugin as mdPlugin, Mode } from 'vite-plugin-markdown';

export default defineConfig({
	css: {
		preprocessorOptions: {
			sass: {
				quietDeps: true,
				silenceDeprecations: ['legacy-js-api'],
				api: 'modern-compiler' // or 'modern'
			},
			scss: {
				api: 'modern-compiler', // or 'modern'
				quietDeps: true,
				silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin']
			}
		}
	},
	plugins: [sveltekit(), mdPlugin({ mode: [Mode.MARKDOWN] })],
	server: {
		fs: {
			allow: [
				// search up for workspace root
				//searchForWorkspaceRoot('.'),
				// your custom rules
				'config'
			]
		}
	}
});
