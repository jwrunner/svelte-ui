# Contributing

Would love to have you help! Read the [[0-roadmap|Roadmap]] for good places to start. We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

[![Open in Codeflow](https://developer.stackblitz.com/img/open_in_codeflow.svg)](https:///pr.new/jacob-8/kitbook)

Or work on Kitbook locally:

- `pnpm i`
- `pnpm stub`
- `pnpm dev`

To update the Kitbook code while using it in your own app, you can change your `devDependency` to point to it instead of npm by using something like `"kitbook": "link:../../../kitbook/packages/kitbook",` then run `pnpm package:watch` in Kitbook to keep it updating on changes. 

*If you want to commit that changed package.json dependency reference without breaking CI builds, you can change your build script to `pnpm install -F site kitbook && vite build`.*

## Customization

The default Kitbook components are relatively simple. If you'd like to create your own theme please do so. If you think others will benefit from your improvements, please fork the repo and [submit a pull request](https://github.com/jacob-8/kitbook/compare).

[//begin]: # "Autogenerated link references for markdown compatibility"
[0-roadmap|Roadmap]: 0-roadmap.md "Roadmap"
[//end]: # "Autogenerated link references"