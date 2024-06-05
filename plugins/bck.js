/* eslint-disable no-console */

import {
    char,
    createRegExp,
    digit,
    exactly,
    maybe,
    oneOrMore,
    wordChar,
    global,
    multiline,
    anyOf,
  } from 'magic-regexp';
  
  const md = `# A Markdown Title
  
  This is a little proof-of-concept of a Markdown-to-Svelte preprocessor for SvelteKit. You can [read more about this here](https://stevekinney.net/writing/svelte-markdown-preprocessor).
  
  \`\`\`ts
  heleoekr
  fjref
  er
  fre
  f
  er
  ferf
  \`\`\`
  
  line 2
  \`\`\`js
  hi
  \`\`\`
  `;
  
  const lines = md.split('\n');
  
  getCodeblocks(md, lines);
  
  function findMatches(text, pattern) {
    var matchingLines = [];
    var allLines = text.split('\n');
  
    for (var i = 0; i < allLines.length; i++) {
      if (allLines[i].match(pattern)) {
        matchingLines.push(i);
      }
    }
  
    return matchingLines;
  }
  
  function getTextBetween(start, end, arr) {
    return arr.slice(start, end).join('\n');
  }
  
  function getCodeblocks(md, lines) {
    const start = createRegExp(
      exactly('```').and(maybe(oneOrMore(char).groupedAs('lang'))),
      [multiline, global]
    );
  
    const languages = md.match(start);
  
    const matches = findMatches(md, start);
    let codeblocks = [];
  
    for (let i = 0; matches.length > i; i++) {
      const currentMatch = matches[i];
      const nextMatch = matches[i + 1];
      const language = languages[i].replace('```', '');
      if (language == '') continue;
  
      codeblocks.push({
        start: currentMatch,
        end: nextMatch,
        code: getTextBetween(currentMatch + 1, nextMatch, lines),
        language,
      });
    }
  
    return codeblocks;
  }
  
  function generateCodeblockHTML() {
    
  }