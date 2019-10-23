const gulp = require('gulp')
const paths = require('../config/paths')

module.exports = function copyAssets() {
  return gulp.src(`${paths.src.assets}/**/*`)
    .pipe(gulp.dest(paths.dist.assets))
}
