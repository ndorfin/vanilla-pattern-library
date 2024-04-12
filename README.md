# Vanilla: Pattern library

A collection of front-end patterns and their documentation for Vanilla's new site

## Dependencies

- Node.js (20.12.2)
   - [`@11ty/eleventy`](https://11ty.dev) - A static site generator
     - [`@11ty/eleventy-plugin-syntaxhighlight`](https://www.11ty.dev/docs/plugins/syntaxhighlight/)\
     A plugin for 11ty generating blocks of syntax-highlighted code
  - [`js-yaml`](https://github.com/nodeca/js-yaml#readme)\
  Adds YAML support to Node

## Running the development environment locally

1. Install Node.js locally (Recommendded: Use [`asdf`'s `nodejs` plugin'](https://github.com/asdf-vm/asdf-nodejs) or [`nvm`](https://github.com/nvm-sh/nvm) to do this)
1. Make sure Node is running successfully in this repo:\
   `node -v`\
   == `20.12.2`
1. Install dependencies:\
   `npm i`
1. Run the dev server:\
   `npm start`
1. Browse to [`localhost:8080`](http://localhost:8080)
