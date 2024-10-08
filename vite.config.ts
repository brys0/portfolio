import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite';
import {createMarkdownCodeBlockProcessor} from './plugins/MarkdownProcessor';

export default defineConfig({
	plugins: [createMarkdownCodeBlockProcessor(), UnoCSS(), sveltekit(),],
});
