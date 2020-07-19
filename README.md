# [Web Static Boilerplate](https://github.com/bymathias/web-static-boilerplate)

[![Github Release][github-release-img]][github-release-url]
[![dependencies][david-dm-dependencies-img]][david-dm-dependencies-url]
[![devDependencies][david-dm-devDependencies-img]][david-dm-devDependencies-url]

> Minimalist Static Website Boilerplate and build process to quickly get projects going.

## Features

**Development tools:**

- [Webpack 4]() as module bundler
- ES6 support via [Babel](https://babeljs.io/)
- Compile CSS/SASS via [PostCSS](https://postcss.org/) - [`postcss-preset-env`](https://preset-env.cssdb.org/) and [Sass](https://sass-lang.com/) - [`dart-sass`](https://www.npmjs.com/package/sass)
- Lint JS via [ESLint](https://eslint.org/) - [JavaScript Standard Style](https://standardjs.com/)
- Lint SASS via [Stylelint](https://stylelint.io/) - [Stylelint Config Standard](https://github.com/stylelint/stylelint-config-standard)
- Minimal HTML templating via [Handlebars](https://handlebarsjs.com/)
- Watch/build multi pages website via [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin) automatically
- Optimize assets via [Terser](https://terser.org/), [cssnano](https://cssnano.co/), [imagemin](https://www.npmjs.com/package/imagemin/), [htmlminifier](https://www.npmjs.com/package/html-minifier), [PurgeCSS](https://github.com/FullHuman/purgecss)
- Generate favicons via [favicons-webpack-plugin](https://www.npmjs.com/package/favicons-webpack-plugin)
- Generate sitemap via [sitemap-webpack-plugin](https://www.npmjs.com/package/sitemap-webpack-plugin)
- Gzip compression via [compression-webpack-plugin](https://www.npmjs.com/package/compression-webpack-plugin)
- Unit tests via [Jest](https://jestjs.io/)

**Frameworks/Libraries included:**

- [Bulma](https://bulma.io/)
- [Font Awesome](https://fontawesome.com/)
- [Brand Colors](https://www.npmjs.com/package/brand-colors)

## Installation

Clone the repository or download the [latest stable release][github-release-url]
```
git clone https://github.com/bymathias/web-static-boilerplate.git client
```
Make it your own
```
cd client
rm -rf .git && git init && npm init
```
Then install dependencies
```
npm install
```
## Usage

**Development:**

Watch/compile files and start development server
```
npm run dev
```
Run with debug mode on
```
npm run dev -- --debug
```
Run unit tests (Jest)
```
npm test
```
**Production:**

Build for production
```
npm run build -- --mode=production
```
Compressed versions of assets to serve them with Content-Encoding
```
npm run build -- --gzip
```
## Change Log

All notable changes to this project will be documented in the [CHANGELOG](CHANGELOG.md).

## Contributing

All types of [contributions][how-to-contribute-url] are most welcome.

- [Project issue][project-new-issue-url]: Bug reports, feature requests, and feedback.
- [Merge/Pull request][project-pull-request-url]: Bug fixes, new features and documentation.

## License

The code is available under the MIT [LICENSE](LICENSE.txt).

[github-release-url]: https://github.com/bymathias/web-static-boilerplate/releases/latest
[github-release-img]: https://img.shields.io/github/release/bymathias/web-static-boilerplate.svg?style=flat-square

[david-dm-dependencies-url]:    https://david-dm.org/bymathias/web-static-boilerplate
[david-dm-dependencies-img]:    https://img.shields.io/david/bymathias/web-static-boilerplate.svg?style=flat-square
[david-dm-devDependencies-url]: https://david-dm.org/bymathias/web-static-boilerplate?type=dev
[david-dm-devDependencies-img]: https://img.shields.io/david/dev/bymathias/web-static-boilerplate.svg?style=flat-square

[how-to-contribute-url]:      https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github
[project-new-issue-url]:      https://github.com/bymathias/web-static-boilerplate/issues/new
[project-pull-request-url]:   https://github.com/bymathias/web-static-boilerplate/compare
