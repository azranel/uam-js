var jshint = require('gulp-jshint');
var gulp   = require('gulp');
var concat = require('gulp-concat');

gulp.task('lint', function() {
  return gulp.src('./lib/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('default', function() {
  return gulp.src(['first_file.txt', 'second_file.txt'])
    .pipe(concat('result.txt'))
    .pipe(gulp.dest('build'));
});
