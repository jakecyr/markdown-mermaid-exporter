# Markdown Mermaid Exporter

Convert mermaid diagrams in a markdown file to images (svg, png, or pdf). An image file will be created for each diagram found in the source markdown.

## Installation

Install the package with `npm install markdown-mermaid-exporter`.

## Example Usage

Check out the [./examples](./examples/) folder for examples on how to use the package.

### Form Markdown String

```javascript
const { convertMarkdownMermaidToImage } = require('../dist/main');

const markdown = `
\`\`\`mermaid
graph TD;
  A-->B;
  A-->C;
  B-->D;
  C-->D;
\`\`\`
`;

await convertMarkdownMermaidToImage(markdown, 'diagram.png'); // will create diagram-1.png file
```

### From Markdown File

```javascript
const { convertMarkdownMermaidToImage } = require('../dist/main');
const fs = require('fs');
const path = require('path');

const markdownFilePath = path.join(__dirname, './example-markdown.md');
const markdown = fs.readFileSync(markdownFilePath).toString();

await convertMarkdownMermaidToImage(markdown, 'diagram.png');
```
