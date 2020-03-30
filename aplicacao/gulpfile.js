var gulp = require('gulp')
  , nodemon = require('gulp-nodemon')
  , jshint = require('gulp-jshint')
 
gulp.task('lint', function () {
  gulp.src('./**/*.js')
    .pipe(jshint())
})
 
gulp.task('develop', function (done) {
  var stream = nodemon({ script: 'app.js'
          , ext: 'js'
          , ignore: ['ignored.js']
          , tasks: ['lint']
          , done: done })
 
  stream
      .on('restart', function () {
        console.log('restarted!')
      })
      .on('crash', function() {
        console.error('Application has crashed!\n')
         stream.emit('restart', 2)  // restart the server in 2 seconds
      })
})