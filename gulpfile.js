const { src, dest, watch, series } = require('gulp')

// Html packages
const pug = require('gulp-pug')

// Styles packages
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')

// Scripts packages
const terser = require('gulp-terser')
const concat = require('gulp-concat')

// Global packages
const browserSync = require('browser-sync').create()
const rename = require('gulp-rename')
const ghPages = require('gulp-gh-pages')

// Compile pug into Html
function html() {
  return src('app/assets/pug/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(dest('app'))
}

// Compile sass into CSS
function styles() {
  return src('app/assets/styles/main.scss', { sourcemaps: true })
    .pipe(
      sass({
        errLogToConsole: true,
        onError: browserSync.notify,
        outputStyle: 'compressed',
      })
    )
    .pipe(autoprefixer())
    .pipe(rename('styles.css'))
    .pipe(dest('app/dist', { sourcemaps: '.' }))
    .pipe(browserSync.stream())
}

// Concat and manage scripts
function scripts() {
  const jsPath = {
    jquery: 'app/assets/scripts/libs/jquery.min.js',
    swiper: 'app/assets/scripts/libs/swiper-bundle.min.js',
    bootstrap: 'app/assets/scripts/libs/bootstrap.min.js',
    select2: 'app/assets/scripts/libs/select2.min.js',
    app: 'app/assets/scripts/app.js',
  }
  // return src([jsPath.jquery, jsPath.popper, jsPath.owl, jsPath.bootstrap, jsPath.app], { sourcemaps: true })
  return src(Object.values(jsPath), { sourcemaps: true })
    .pipe(concat('bundled.js'))
    .pipe(terser())
    .pipe(dest('app/dist', { sourcemaps: '.' }))
    .pipe(browserSync.stream())
}

// BrowserٍٍٍSync serve
function browserSyncServe(done) {
  browserSync.init({
    server: {
      baseDir: './app',
    },
    notify: {
      styles: {
        top: 'auto',
        bottom: '0',
      },
    },
  })
  done()
}

// BrowserSync reload
function browserSyncReload(done) {
  browserSync.reload()
  done()
}

// Watch files for changes
function watchFiles() {
  watch('app/assets/pug/**/*.pug', html)
  watch('app/*.html', browserSyncReload)
  watch('app/assets/styles/**/*.scss', series(styles, browserSyncReload))
  watch('app/assets/scripts/**/*.js', series(scripts, browserSyncReload))
}

// Deploy to Github pages
function deploy() {
  return src('app/**/*').pipe(ghPages())
}

exports.html = html
exports.styles = styles
exports.scripts = scripts
exports.browserSyncServe = browserSyncServe
exports.watchFiles = watchFiles
exports.deploy = deploy

// Default Gulp Task
exports.default = series(html, styles, scripts, browserSyncServe, watchFiles)
