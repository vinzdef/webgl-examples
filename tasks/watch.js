const gulp = require('gulp')
const paths = require('../config/paths')

module.exports = function watch() {
  return new Promise(resolve => {
    gulp.watch(`${paths.src.styles}/**/*.scss`,
      gulp.series(
        'styles'
      )
    )

    gulp.watch(`${paths.src.views}/**/*.njk`,
      gulp.series(
        'views',
        'reload-browser'
      )
    )

    resolve()
  })
}
