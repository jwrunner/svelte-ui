import fs from 'fs';

export function initKitbook(routes: string) {
  process.env.KITBOOK_ROUTES = routes;
  ensureKitbookRoutesExist(routes);
  addSvelteConfigAugmentFunctionIfNeeded(routes);
}

function ensureKitbookRoutesExist(routes: string) {
  if (!fs.existsSync(routes)) {
    try {
      fs.mkdirSync(routes);
      const src = 'node_modules/kitbook/routes';
      const destination = routes;
      fs.cpSync(src, destination, { recursive: true, filter: (src, dest) => !src.includes('.d.ts') });
      console.log(`Copied Kitbook routes directory to ${routes} to setup your Kitbook. The Kitbook plugin will automatically update your Svelte config file to use ${routes} as the routes directory when running vite in "kitbook" mode.\n`);
    } catch (e) {
      console.error(e);
    }
  }
  // If svelte.config.js was pointed directly to node_modules/kitbook/routes the routes wouldn't need copied into their repo. Unfortunately client HRML then wouldn't work w/o turning off cache in browser devtools because of how Vite caches files in node_modules.
}

const AUGMENT_FUNCTION_TEXT = `import { augmentSvelteConfigForKitbook } from 'kitbook/plugins/vite'; 
export default augmentSvelteConfigForKitbook(config);`;

function addSvelteConfigAugmentFunctionIfNeeded(routes: string) {
  let svelteConfigPath: string;

  const possibleExtensions = ['js', 'mjs', 'cjs', 'ts', 'mts', 'cts'];
  for (const extension of possibleExtensions) {
    const pathToCheck = `svelte.config.${extension}`;
    if (fs.existsSync(pathToCheck))
      svelteConfigPath = pathToCheck;
  }

  if (svelteConfigPath) {
    const svelteConfigText = fs.readFileSync(svelteConfigPath, 'utf8');
    const isAugmented = svelteConfigText.includes('augmentSvelteConfigForKitbook');
    if (!isAugmented) {
      fs.writeFileSync(svelteConfigPath, wrapExportedConfigWithAugmentFunction(svelteConfigText, routes));
    }
  } else {
    console.log(`No svelte.config.{js|ts|mts|mjs|cts|cjs} file found. Make sure you have added the following to it to enable Kitbook: ${AUGMENT_FUNCTION_TEXT} \n`);
  }
}

function wrapExportedConfigWithAugmentFunction(svelteConfigText: string, routes: string): string {
  console.log(`Augmented your svelte.config.js file for Kitbook use. The 'augmentSvelteConfigForKitbook' function will add MDSvex support and serve routes from ${routes} when running vite in "kitbook" mode.\n`);
  return svelteConfigText.replace('export default config', AUGMENT_FUNCTION_TEXT);
}

import { DEFAULT_KITBOOK_ROUTES } from './constants.js';
if (import.meta.vitest) {
  test('wrapExportedConfigWithAugmentFunction', () => {
    expect(wrapExportedConfigWithAugmentFunction(`import {foo} from 'somewhere';\n\nconst config = {}\n\nexport default config`, DEFAULT_KITBOOK_ROUTES)).toMatchInlineSnapshot(`
      "import {foo} from 'somewhere';

      const config = {}

      import { augmentSvelteConfigForKitbook } from 'kitbook/plugins/vite'; 
      export default augmentSvelteConfigForKitbook(config);"
    `);
  });
}