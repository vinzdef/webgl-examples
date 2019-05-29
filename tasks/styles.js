const gulp = require('gulp')
const plugins = require('./utils/gulp-plugins')
const { gulpSassError } = require('gulp-sass-error')
const options = require('../config/options')
const Golc = require('golc')
const L = new Golc('Build | Styles')

const lazypipe = require('lazypipe')
const path = require('path')
const paths = require('../config/paths')
const autoprefixer = require('autoprefixer')

const { isProduction, buildHash } = options

const bs = require('browser-sync').get(buildHash)


function getOptimizePipe() {
  const destPath = path.normalize(paths.dist.styles.replace(paths.dist.public, '/var/tmp/'))

  return lazypipe()
    .pipe(() => gulp.dest(destPath))
    .pipe(plugins.cleanCss, {
      advanced: false,
      aggressiveMerging: false,
      mediaMerging: false,
      rebase: false
    })()
}

module.exports = function() {
  return gulp.src(`${paths.src.styles}/*.{sass,scss}`)
    .pipe(plugins.plumber({errorHandler: function(...args) {
      L.error(...args)
    }}))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass({
      precision: 10,
      outputStyle: 'expanded',
    }).on('error', gulpSassError(isProduction)))
    .pipe(plugins.postcss([
      autoprefixer()
    ]))
    .pipe(plugins.if(isProduction, getOptimizePipe()))
    .pipe(plugins.if(!isProduction, plugins.sourcemaps.write('.')))
    .pipe(gulp.dest(`${paths.dist.styles}/`))
    .pipe(plugins.if(!isProduction, bs.stream({ match: '**/*.css' })))
    .pipe(plugins.size({ title: 'styles' }))
}
