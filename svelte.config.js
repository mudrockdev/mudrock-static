import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.svx', '.md']
		})
	],
	kit: { adapter: adapter() },
	extensions: ['.svelte', '.svx', '.md'],
	onwarn: (warning, handler) => {
		// Disable warnings for markdown files in src/docs
		if (
			warning.filename &&
			(warning.filename.includes('/src/docs/') || warning.filename.includes('\\src\\docs\\'))
		) {
			return;
		}
		// Also disable specific warning types for markdown files
		if (
			warning.code === 'element_implicitly_closed' &&
			warning.filename &&
			warning.filename.endsWith('.md')
		) {
			return;
		}
		handler(warning);
	}
};

export default config;
