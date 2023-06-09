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

convertMarkdownMermaidToImage(markdown, 'diagram.png')
  .then(() => {
    console.log('Exported one diagram to diagram-1.png.');
  })
  .catch((e) => {
    console.error(`Error converting markdown to image: ${e}`);
  });
