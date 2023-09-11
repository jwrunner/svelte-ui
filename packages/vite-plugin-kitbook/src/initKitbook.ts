import fs from 'fs';

const TYPINGS_EXT = '.d.ts';
const PAGE_MARKDOWN = '_page.svelte';
const LAYOUT_MARKDOWN = '_layout.svelte';
const VARIANTS = 'variants.js';
const ROUTES_DIR = 'src/routes'
const KITBOOK_DIRECTORY_NAME = 'kitbook';
const DEFAULT_KITBOOK_DIRECTORY = 'src/routes/kitbook';

const green = '\x1b[32m';
const bold = '\x1b[1m';
const reset = '\x1b[0m';

export function initKitbook(isKitbookItself: boolean) {
  if (isKitbookItself) return 

  try {
    let kitbookDirectory = findKitbookDirectory(ROUTES_DIR);

    if (!kitbookDirectory) {
      fs.mkdirSync(DEFAULT_KITBOOK_DIRECTORY);
      kitbookDirectory = DEFAULT_KITBOOK_DIRECTORY;
      console.log(`${bold}${green}[Kitbook] Added Kitbook route files to ${DEFAULT_KITBOOK_DIRECTORY} which includes customization files for your Kitbook.\n${reset}`);
    } else {
      console.log(`${bold}${green}[Kitbook] Made sure files in ${kitbookDirectory} are up to date.\n${reset}`);
    }

    const src = 'node_modules/kitbook/dist/routes';
    const destination = kitbookDirectory;
    fs.cpSync(src, destination, { recursive: true, filter: excludeDocFiles });
  } catch (e) {
    console.error(e);
  }
}

function findKitbookDirectory(directory: string): string | null {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const filePath = directory + '/' + file;
    const fileStat = fs.statSync(filePath);
    if (fileStat.isDirectory()) {
      if (file === KITBOOK_DIRECTORY_NAME) {
        return filePath;
      } else {
        const subdirectory = findKitbookDirectory(filePath);
        if (subdirectory !== null) {
          return subdirectory;
        }
      }
    }
  }
  return null;
}

export function excludeDocFiles(src: string) {
  const partsOfFilesUsedJustForDevelopingKitbook = ['mock', TYPINGS_EXT, PAGE_MARKDOWN, LAYOUT_MARKDOWN, VARIANTS];
  const skip = partsOfFilesUsedJustForDevelopingKitbook.some(file => src.includes(file));
  return !skip;
}