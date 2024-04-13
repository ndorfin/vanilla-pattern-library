# Vanilla: Pattern library

A collection of front-end patterns and their documentation for Vanilla's new site

This repo is designed to consume the `vanilla-web-assets` repo, and produces the necessary documentation and examples from those assets.

## Dependencies

- Node.js (20.12.2)
   - [`@11ty/eleventy`](https://11ty.dev) - A static site generator
     - [`@11ty/eleventy-plugin-syntaxhighlight`](https://www.11ty.dev/docs/plugins/syntaxhighlight/)\
     A plugin for 11ty generating blocks of syntax-highlighted code
  - [`js-yaml`](https://github.com/nodeca/js-yaml#readme)\
  Adds YAML support to Node

## Prerequisites

Make sure you've checked out the [`vanilla-web-assets`]() repo as a sibling to this folder. i.e. you should have this repo and the `vanilla-web-assets` repo checked out, side by side:

```
../
  - vanilla-pattern-library/ [This repo]
  - vanilla-web-assets/
```

## Running the development environment locally

1. Install Node.js locally (Recommendded: Use [`asdf`'s `nodejs` plugin'](https://github.com/asdf-vm/asdf-nodejs) or [`nvm`](https://github.com/nvm-sh/nvm) to do this)
1. Make sure Node is running successfully in this repo:\
   `node -v`\
   == `20.12.2`
1. Install dependencies:\
   `npm i`
1. Create symlinks to the `vanilla-web-assets` repo, if you haven't already:\
   `sh scripts/create_symlinks.sh`
1. Run the dev server:\
   `npm start`
1. Browse to [`localhost:8080`](http://localhost:8080)

## Running a local build

Eleventy takes files in the `src` folder, and builds a website in the `public` folder. Check out this `public` folder to see the build artefacts.

```bash
npm run build
```

## Simulating a production build

If you'd like to see what Eleventy does when it runs a production build (With path fixes for GitHub Pages), you can run:

```bash
npm run build:prod
```