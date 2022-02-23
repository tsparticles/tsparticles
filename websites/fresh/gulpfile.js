import gulp from "gulp";

import gulpSass from "gulp-sass";
import bourbon from "node-bourbon";
import concat from "gulp-concat";
import imagemin from "gulp-imagemin";
import sourcemaps from "gulp-sourcemaps";
import autoprefixer from "gulp-autoprefixer";
import panini from "panini";
import sassCompiler from "sass";
import del from "del";
import browserify from "browserify";
import babelify from "babelify";
import source from "vinyl-source-stream";
import logSymbols from "log-symbols";
import BrowserSync from "browser-sync";

import options from "./config.js";

const { src, dest, watch, series, parallel } = gulp;
const browserSync = BrowserSync.create();
const nodepath = "node_modules/";
const sass = gulpSass(sassCompiler);

//Note : Webp still not supported in major browsers including forefox
//const webp = require('gulp-webp'); //For converting images to WebP format
//const replace = require('gulp-replace'); //For Replacing img formats to webp in html

//Load Previews on Browser on dev
function livePreview(done) {
  browserSync.init({
    server: {
      baseDir: options.paths.dist.base
    },
    port: options.config.port || 5000
  });
  done();
}

//Copy latest installed Bulma
function setupBulma() {
  console.log("\n\t" + logSymbols.info, "Installing Bulma Files..\n");
  return src([nodepath + 'bulma/*.sass', nodepath + 'bulma/**/*.sass'])
    .pipe(dest('src/sass/'));
}

//Compile Scss code
function compileSCSS() {
  console.log("\n\t" + logSymbols.info, "Compiling App SCSS..\n");
  return src(['src/scss/main.scss'])
    .pipe(sass({
      outputStyle: 'compressed',
      sourceComments: 'map',
      sourceMap: 'scss',
      includePaths: bourbon.includePaths
    }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}

//Compile HTML partials with Panini
function compileHTML() {
  console.log("\n\t" + logSymbols.info, "Compiling HTML..\n");
  panini.refresh();
  return src('src/pages/**/*.html')
    .pipe(panini({
      root: 'src/pages/',
      layouts: 'src/layouts/',
      partials: 'src/partials/',
      helpers: 'src/helpers/',
      data: 'src/data/'
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

//Concat CSS Plugins
function concatCssPlugins() {
  console.log("\n\t" + logSymbols.info, "Compiling Plugin styles..\n");
  return src([
    nodepath + 'simplebar/dist/simplebar.min.css',
    nodepath + 'plyr/dist/plyr.css',
    nodepath + 'codemirror/lib/codemirror.css',
    nodepath + 'codemirror/theme/shadowfox.css',
    'src/assets/vendor/css/*',
  ])
    .pipe(sourcemaps.init())
    .pipe(concat('app.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}

//Reset Panini Cache
function resetPages(done) {
  console.log("\n\t" + logSymbols.info, "Clearing Panini Cache..\n");
  panini.refresh();
  done();
}

//Triggers Browser reload
function previewReload(done) {
  console.log("\n\t" + logSymbols.info, "Reloading Browser Preview.\n");
  browserSync.reload();
  done();
}

//Development Tasks
function devHTML() {
  return src(`${options.paths.src.base}/**/*.html`).pipe(dest(options.paths.dist.base));
}

//Optimize images
function devImages() {
  return src(`${options.paths.src.img}/**/*`).pipe(dest(options.paths.dist.img));
}

// Let's write our task in a function to keep things clean
function javascriptBuild() {
  // Start by calling browserify with our entry pointing to our main javascript file
  return (
    browserify({
      entries: [`${options.paths.src.js}/main.js`],
      // Pass babelify as a transform and set its preset to @babel/preset-env
      transform: [babelify.configure({ presets: ["@babel/preset-env"] })]
    })
      // Bundle it all up!
      .bundle()
      // Source the bundle
      .pipe(source("bundle.js"))
      // Then write the resulting files to a folder
      .pipe(dest(`dist/js`))
  );
}

//Copy data files
function copyData() {
  console.log("\n\t" + logSymbols.info, "Copying data files..\n");
  return src([
    'src/data/**/*',
  ])
    .pipe(dest('dist/data'))
    .pipe(browserSync.stream());
}

function watchFiles() {
  //watch('src/**/*.html', compileHTML);
  watch(`${options.paths.src.base}/**/*.html`, series(compileHTML, previewReload));
  watch(['src/scss/**/*', 'src/scss/*'], compileSCSS);
  watch(`${options.paths.src.js}/**/*.js`, series(javascriptBuild, previewReload));
  watch(`${options.paths.src.img}/**/*`, series(devImages, previewReload));
  console.log("\n\t" + logSymbols.info, "Watching for Changes..\n");
}

function devClean() {
  console.log("\n\t" + logSymbols.info, "Cleaning dist folder for fresh start.\n");
  return del([options.paths.dist.base]);
}

const buildTasks = [
  devClean, // Clean Dist Folder
  resetPages,
  parallel(
    copyData,
    concatCssPlugins, 
    compileSCSS, 
    javascriptBuild, 
    devImages, 
    compileHTML
  ),
]

export const build = (done) => {
  series(devClean, resetPages, parallel(...buildTasks, devImages))();
  done();
};

export default (done) => {
  series(
    devClean,
    resetPages,
    parallel(...buildTasks),
    parallel(livePreview, watchFiles)
  )();
  done();
};
