import { convertMarkdownMermaidToImage } from '../src/convertMarkdownMermaidToImage';
import path from 'path';
import fs from 'fs';

describe('convertMarkdownMermaidToImage', () => {
  it('throws an error if the markdown argument is not provided', () => {
    expect(convertMarkdownMermaidToImage(null, 'output.png')).rejects.toThrowError(
      'markdown argument is required.',
    );
  });

  it('throws an error if the markdown argument is not a string', () => {
    // @ts-ignore
    expect(convertMarkdownMermaidToImage(1, 'output.png')).rejects.toThrowError(
      'Expected markdown argument to be a string.',
    );
  });

  it('throws an error if the outputImageFilepath argument is not provided', () => {
    // @ts-ignore
    expect(convertMarkdownMermaidToImage('# some markdown', null)).rejects.toThrowError(
      'outputImageFilepath argument is required.',
    );
  });

  it('throws an error if the outputImageFilepath argument is not a string', () => {
    // @ts-ignore
    expect(convertMarkdownMermaidToImage('# some markdown', 1)).rejects.toThrowError(
      'Expected outputImageFilepath argument to be a string.',
    );
  });

  it('generates image', async () => {
    const markdown = `
      \`\`\`mermaid
      graph TD;
      A-->B;
      A-->C;
      B-->D;
      C-->D;
      \`\`\`
    `;

    try {
      await convertMarkdownMermaidToImage(markdown, 'test.png');
      expect(fs.existsSync('test-1.png')).toBeTruthy();
    } finally {
      fs.rmSync('test-1.png');
    }
  }, 10000);
});
