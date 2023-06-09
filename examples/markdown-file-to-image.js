const { convertMarkdownMermaidToImage } = require('../dist/main');
const fs = require('fs');
const path = require('path');

const markdownFilePath = path.join(__dirname, './example-markdown.md');
const markdown = fs.readFileSync(markdownFilePath).toString();

convertMarkdownMermaidToImage(markdown, 'diagram.png')
  .then(() => {
    console.log('Exported one diagram to diagram-1.png');
  })
  .catch((e) => {
    console.error(`Error converting markdown to image: ${e}`);
  });
