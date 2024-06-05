import {parse} from 'node-html-parser';
import { createRegExp, exactly, oneOrMore, char, maybe, global } from 'magic-regexp';

const svelteMarkdown = () => {
	return {
		name: 'svelte-markdown',
		/**
		 * @param {object} options
		 * @param {string} options.content
		 * @param {string} options.filename
		 */
		markup: ({ content, filename }) => {
			if (filename.endsWith('.md')) {
				console.log(content, filename)
				const reg = createRegExp(exactly('```').and(maybe(oneOrMore(char).groupedAs('lang'))));

				console.log(reg)
				let data = content.match(reg)
				console.log(`Raw md content ${content}`, `matched: ${data}`);
			}
		},
	};
};

export default svelteMarkdown;