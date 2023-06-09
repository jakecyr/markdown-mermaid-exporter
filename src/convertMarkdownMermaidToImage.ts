import { writeFile } from 'fs/promises';
import { dir as tempDir, setGracefulCleanup } from 'tmp';
import path from 'path';
import { v4 as uuid } from 'uuid';

setGracefulCleanup();

/**
 * Convert a mermaid markdown diagram to an image.
 * @param markdown The markdown string containing a mermaid diagram.
 * @param outputImageFilepath The file path to save the mermaid diagram image to.
 */
export async function convertMarkdownMermaidToImage(
  markdown: string,
  outputImageFilepath: `${string}.${'svg' | 'png' | 'pdf'}` = 'output.png',
): Promise<void> {
  if (!markdown) {
    throw new ReferenceError('markdown argument is required.');
  }

  if (!outputImageFilepath) {
    throw new ReferenceError('outputImageFilepath argument is required.');
  }

  if (typeof markdown !== 'string') {
    throw new TypeError('Expected markdown argument to be a string.');
  }

  if (typeof outputImageFilepath !== 'string') {
    throw new TypeError('Expected outputImageFilepath argument to be a string.');
  }

  return new Promise((resolve, reject): void => {
    tempDir(async (err: Error, temporaryDirectory: string) => {
      if (err) {
        return reject(`Error creating temporary directory: ${err}`);
      }

      const mermaidMarkdownFile = `./${uuid()}.md`;
      const tempFile = path.join(temporaryDirectory, mermaidMarkdownFile);

      await writeFile(tempFile, markdown);

      try {
        console.log(`Converting markdown to image ${outputImageFilepath}...`);

        const mermaid = await import('@mermaid-js/mermaid-cli');

        await mermaid.run(tempFile, outputImageFilepath, {
          puppeteerConfig: { headless: 'new' },
          quiet: true,
        });

        resolve();
      } catch (e) {
        reject(`Error converting markdown to image: ${e}`);
      }
    });
  });
}
