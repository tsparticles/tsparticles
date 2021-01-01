# Fresh Landing page
![](https://cssninja.io/storage/app/media/external/fresh/fresh-hero-ui8.png)

Fresh is a one page landing page starter built by [Css Ninja Studio](https://cssninja.io). Fresh is licensed under the MIT license.

You can access the demo [here](https://cssninjastudio.github.io/fresh/).

## Details

Fresh is developed with the [Bulma css framework](https://bulma.io)

**Version 4.0.0**

## Usage
Fresh is now a Bulma starter fully bundled with **npm** and **gulp**. Bulma has been upgraded to the latest version **0.9.1**. jQuery support has been dropped and replaced with [Alpine JS](https://github.com/alpinejs/alpine) and [Spruce JS](https://github.com/ryangjchandler/spruce).

* Clone or download the repo
* Run `npm install`
* Run `npm run dev`

## Changelog

**Fresh 4.0**
* Upgraded to gulp 4 and nodejs 12.13.0
* Upgraded Bulma to 0.9.1
* Added ES6 support
* Removed jQuery support and related dependencies
* Improved CSS build process
* Integrated Alpine JS
* Integrated Spruce JS

**Fresh 3.0**
* Upgraded to gulp 4 and nodejs 10.15.3
* Upgraded Bulma to 0.8.0
* Cleaned code and redesigned some of the features

**Fresh 2.1**
* Improved page responsiveness particularly on tablet for both orientations, and mobile
* Fixed small layout issues
* Added a modal login form

**Fresh 2.0**
* Everything is now handled by gulp and npm
* Bulma version upgraded to 0.7
* Bulma source sass is editable (note that the `@widescreen` variable has been set to false)
* Panel slider library has been removed. Sidebar completely rewritten without any plugin.
* Removed unused classes and refactored scss
* Added more scss partials for better code maintainability
* Introduced Panini templating engine. Learn more about Panini here: https://github.com/zurb/panini
* Fully automated build and watch process, integration with browser sync
* Navbar rework since deprecation of `.nav` element in favor of `.navbar`.
* Optimized responsive display for mobile and tablets.

## Issues

If you've found an issue or a bug, you can report it in the issues section of this repository. Please try to follow these simple guidelines to report your issue:

* Issue definition
* Expected behaviour
* Actual behaviour
* steps to reproduce
* Already tried fixes (if relevant)

## More

You liked Fresh? Find more premium bulma templates on [Css Ninja](https://cssninja.io/category/all).

Check also our premium Envato bulma themes [Css Ninja](https://cssninja.io/themes).

## About Us

Css Ninja is a web design studio. We build handcrafted and polished templates that will give some hype to your startup or to your next project.

### Note

Changes should be commited to `src/` files only.

### How to use

The template is built with Sass and Gulp build system with these features:

-	Handlebars HTML templates with Panini– Panini is a super simple flat file generator for use with Gulp. It compiles a series of HTML pages using a common layout. These pages can also include HTML partials, external Handlebars helpers, or external data as JSON.
-	Sass compilation, prefixing with Autoprefixer, and JavaScript concatenation
-	Built-in BrowserSync server - Will automatically reload your page when files are changed. It also live-injects CSS changes when you save a Sass file. This task runs continuously. Defaults to localhost.
-	For production builds - CSS compression, JavaScript compression, Image compression and more..


### Requirements

To use this template, your computer needs:

-	Node.js is used to run the build processes. https://nodejs.org/en/download/
-   Test: run ` node -v ` in the terminal
-	Npm (Node comes with npm installed so you should have a version of npm.) Used to manage development dependencies.
-   Test: run ` npm -v`  in the terminal
-	Gulp – task runner
	`npm install -g gulp`
-	Test: run `gulp -v ` in the terminal

### Installing:

- Install all node packages: `npm install`
- Run `gulp dev`
- Your site is now viewable at this URL: http://localhost:3000


### Folder Structure:

- `dist/` - compiled distribution files
- `node_modules` - front-end dependencies
- `src/` - contains all of your core, working files—static assets, pages, templates, etc
- `src/assets/` - scss files, JS files, images, and fonts are here
- `src/data/` - external data
- `src/layouts/` - HTML layouts templates
- `src/pages/` - site pages
- `src/partials/` - handlebars partials files.
- `gulpfile.js` - all task definitions
- `package.json` - handles the front-end dependencies
- `.htmllintrc` - handles the HTML lint rules
- `.sass-lint.yml` - handles the SCSS lint rules
- `reports` - txt generated file for accessibility issues

### Gulp Plugins:
- [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
- [gulp-compile-handlebars](https://www.npmjs.com/package/gulp-compile-handlebars)
- [gulp-concat](https://www.npmjs.com/package/gulp-concat)
- [gulp-html-replace](https://www.npmjs.com/package/gulp-html-replace)
- [gulp-htmllint](https://www.npmjs.com/package/gulp-htmllint)
- [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)
- [gulp-pretty-html](https://www.npmjs.com/package/gulp-pretty-html)
- [gulp-remove-code](https://www.npmjs.com/package/gulp-remove-code)
- [gulp-remove-logging](https://www.npmjs.com/package/gulp-remove-logging)
- [gulp-rename](https://www.npmjs.com/package/gulp-rename)
- [gulp-sass](https://www.npmjs.com/package/gulp-sass)
- [node-bourbon](https://www.npmjs.com/package/node-bourbon)
- [gulp-sass-lint](https://www.npmjs.com/package/gulp-sass-lint)
- [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
- [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
- [gulp-newer](https://www.npmjs.com/package/gulp-newer)
- [gulp-accessibility](https://www.npmjs.com/package/gulp-accessibility)
- [gulp-jshint](https://www.npmjs.com/package/gulp-jshint)
- [gulp-gulp-gh-pages](https://www.npmjs.com/package/gulp-gh-pages)
- [gulp-babel](https://www.npmjs.com/package/gulp-babel)
- [panini](https://www.npmjs.com/package/panini)
- [run-sequence](https://www.npmjs.com/package/run-sequence)
- [ansi-colors](https://www.npmjs.com/package/ansi-colors)
- [fancy-log](https://www.npmjs.com/package/fancy)


### Additional Resources:
- [Sass: Syntactically Awesome Style Sheets](http://sass-lang.com/)
- [Bulma](https://bulma.io/)
- [Handlebars](http://handlebarsjs.com/)
- [Panini](https://github.com/zurb/panini)
- [Gulp](https://gulpjs.org/getting-started)