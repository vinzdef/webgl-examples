const gulp = require('gulp')
const plugins = require('./utils/gulp-plugins')
const Golc = require('golc')
const L = new Golc('Build | Views')
const nunjucks = require('nunjucks')
const options = require('../config/options')
const paths = require('../config/paths')

const viewPaths = [
  './views/public/**/*.njk'
]

module.exports = function views() {
  const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(paths.src.views))

  return gulp.src(viewPaths)
    .pipe(plugins.plumber({errorHandler: function(...args) {
      L.error(...args)
    }}))
    .pipe(plugins.nunjucks.compile({}, {
      env: env
    }))
    .pipe(plugins.rename({
      extname: '.html',
    }))
    .pipe(plugins.if(options.isProduction, plugins.htmlmin({
      collapseWhitespace: true,
      removeComments: true
    })))
    .pipe(gulp.dest(paths.dist.public))
}

