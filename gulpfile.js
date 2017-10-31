var gulp = require('gulp');
var browserSync = require('browser-sync').create();

// Copy vendor libraries from /node_modules into /lib
gulp.task('copy', function() {
    gulp.src([
      'node_modules/jquery.fancybox/source/**/*',
    ])
    .pipe(gulp.dest('lib/fancybox'))

    gulp.src([
      'node_modules/bootstrap/build/phaser.min.js',
      'node_modules/bootstrap/build/phaser.js',
      'node_modules/bootstrap/build/phaser.map',
    ])
    .pipe(gulp.dest('lib/phaser'))
});

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: ''
        },
    })
});

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'copy'], function() {
    // Reloads the browser whenever HTML files change
    gulp.watch('*.html', browserSync.reload);
});
