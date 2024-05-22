import { unlinkSync } from 'node:fs';
import { appendFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

type ExtensionContent = {
  name: string;
  fullName: string;
  iconUrl?: string;
  shortDescription: string;
  version: string;
  description: string;
  eventsBasedBehaviors: Array<Behavior>;
};

type Behavior = {
  description: string;
  fullName: string;
  name: string;
};

const ignoredFiles = [
  'bun.lockb',
  'node_modules',
  'README.md',
  '.gitignore',
  'package.json',
  'tsconfig.json',
  'index.ts',
  '.git',
];

const currentDirContent = await readdir(import.meta.dir);

// 1. List all extensions directories
const extensionsDir = currentDirContent.filter((fileName) => !ignoredFiles.includes(fileName));

for (let extensionDirectory of extensionsDir) {
  // 2. For each extension, get extension content
  const extensionFilePath = resolve(
    import.meta.dir,
    `${extensionDirectory}/${extensionDirectory}.json`,
  );
  const extension = (await Bun.file(extensionFilePath).json()) as ExtensionContent;

  // 3. Write extension summary
  const readmeFilePath = resolve(import.meta.dir, `${extensionDirectory}/README.md`);
  unlinkSync(readmeFilePath); // Make sure to remove existing file before generating new content

  const extensionSummary = `
## ${extension.fullName} - v${extension.version}

> ${extension.shortDescription}

${extension.description}
  `;

  await appendFile(readmeFilePath, extensionSummary);
  await appendFile(readmeFilePath, '\n');
  await appendFile(readmeFilePath, '---');
  await appendFile(readmeFilePath, '\n');

  // 4. For each behavior inside, write description
  let behaviorsDetails = [];
  for (let behavior of extension.eventsBasedBehaviors) {
    behaviorsDetails.push(
      `
### ${behavior.fullName}

${behavior.description}
    `,
    );
  }
  await appendFile(readmeFilePath, behaviorsDetails.join('\n---\n'));
}
