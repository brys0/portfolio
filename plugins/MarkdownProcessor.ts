import type { Plugin } from 'vite';
import { parse } from 'node-html-parser';


// Ability to add more custom elements in the future maybe?
const customMarkdownElements = {
    codeblock: 'blog:codeblock'
}

// HTML escape map to escape certain char's svelte might find problematic. 
const escapeHTMLMap = {
    '{': '&#123;',
    '}': '&#125;',
    '"': '&#34;',
    '<': '&#60;',
    '>': '&#62;'
}

export function createMarkdownCodeBlockProcessor(): Plugin {
    return {
        name: 'markdown-codeblock-processor',
        // enforce: pre means this plugin runs basically before any other processing vite does, including minfication, import analysis etc.
        enforce: 'pre',

        // This is a callback function vite calls BEFORE transforming said files.
        transform: (code, id, options) => {
            // Get the file extension
            const extension = id.split('.').pop();

            // Ignore everything that isnt a markdown file
            if (extension !== 'md') return;

            // Get the DOM tree of the entire markdown file
            const tree = parse(code);

            // Find the blog:codeblock elements
            const codeblocks = tree.getElementsByTagName(customMarkdownElements.codeblock);

            // Iterate through all codeblock elements
            for (let i = 0; codeblocks.length > i; i++) {
                const block = codeblocks[i];

                // Get the special attributes of the element: language, filename
                const attributes = block.attributes as MarkdownCodeBlock;

                // Here's where things get weird.
                // We parse a new element 'Codeblock' with the following properties: language, filename, code
                // From svelte's perspective this is seen as a Svelte 'Codeblock.svelte' component
                // It is important to note you MUST import your codeblock component with the name 'Codeblock'
                // i.e import Codeblock from '$lib/components/MyCodeblockComponent.svelte'
                const newElement = parse(`<Codeblock language="${attributes.language}" filename="${attributes.filename}" code="${escapeHTML(block.innerHTML, escapeHTMLMap)}"/>`);

                // We then exchange (replace) the old blog:codeblock with our Codeblock component svelte can understand.
                tree.exchangeChild(block, newElement);
            }

            // Return this HTML to vite to continue up the transformation/build pipeline.
            return tree.innerHTML;
        }
    }
}


type MarkdownCodeBlock = {
    language?: string,
    filename?: string,
}


const escapeHTML = (html: string, charMap: Record<string, string>) => {
    let escapedHTML = html;

    for (const [key, value] of Object.entries(charMap)) {
        escapedHTML = escapedHTML.replaceAll(key, value);
    }

    return escapedHTML;
}   