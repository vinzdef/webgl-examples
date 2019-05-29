const gulp = require('gulp')
const glob = require('globby')
const path = require('path')

glob.sync('./tasks/*.js').forEach(taskFile => {
  const name = path.basename(taskFile, '.js')
  const task = require(taskFile)
  gulp.task(name, task)
})


gulp.task('dev',
  gulp.series(
    gulp.parallel(
      'views',
      'styles',
    ),
    gulp.parallel(
      'browser-sync',
      'watch'
    )
  )
)
