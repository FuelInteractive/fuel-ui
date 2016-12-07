var gulp = require('gulp');

var paths = {
    source: 'src',
    dest: 'dist',
    destUmd: 'dist/umd',
    bundle: 'bundles'
};

gulp.task('css', function() {
  gulp.src(paths.source + '/styles/fuel-ui.css')
    .pipe(gulp.dest(paths.bundle))
});
