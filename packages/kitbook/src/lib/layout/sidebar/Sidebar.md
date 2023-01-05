<script>
  import Sidebar from './Sidebar.svelte';
  import { Story } from '$lib';
  import { page } from '$app/stores';
  // import { parseModulesIntoUngroupedPages } from '$lib/pages/parseModulesIntoUngroupedPages';
  // import { groupColocatedPages } from '$lib/pages/groupColocatedPages';
  // import { putPagesIntoFolders } from '$lib/pages/putPagesIntoFolders';

  const modules = {
    '/src/docs/9-privacy-policy/hello.md': () => Promise.resolve({}),
    // './+page.md': () => Promise.resolve({}),
    // './0-get-started/+page.md': () => Promise.resolve({}),
    // './0-components/0-Button/+page.svx': () => Promise.resolve({}),
    // './0-components/1-Switch/+page.svx': () => Promise.resolve({}),
    // './0-components/0-ui/0-Button/+page.svx': () => Promise.resolve({}),
    // './0-components/play-audio-section/+page.svx': () => Promise.resolve({}), // test this to remove section hyphen
    // './[reference]/+layout.svelte': () => Promise.resolve({}),
    // './a/b/c-d/e/+page.svx': () => Promise.resolve({}),
    // './a/b/c-d/f/+page.svx': () => Promise.resolve({}),
  };
</script>

<Story>
  <div class="flex h-[300px] overflow-auto">
    <!-- <Sidebar
      root="/kitbook"
      folder={putPagesIntoFolders(groupColocatedPages(parseModulesIntoUngroupedPages(modules, '/kitbook')))}
      activeURL={$page.url.pathname}
    >
      <svelte:fragment slot="header"><slot name="header" /></svelte:fragment>
      <svelte:fragment slot="index"
        ><slot name="index">
          <span class="i-ic-round-home mr-1" />Kitbook
        </slot></svelte:fragment
      >
      <svelte:fragment slot="footer"><slot name="footer" /></svelte:fragment>
    </Sidebar> -->
    <div class="h-[200vh]">
      This element is taller than the parent which mimics the way the page element will work so this
      can test the stickyness of the sidebar
    </div>
  </div>
</Story>

<!-- prettier-ignore -->
## Todo: 
- Add top level icons
- Add optional width prop