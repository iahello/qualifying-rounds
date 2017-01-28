let gulp = require('gulp'),
   sass = require('gulp-sass'),
   babel = require('gulp-babel'),
   autoprefixer = require('gulp-autoprefixer'),
   browserSync = require('browser-sync').create();

// sass
gulp.task('sass', () => gulp.src('source/scss/main.scss')
   .pipe(sass())
   //autoprefixer
   .pipe(autoprefixer({
         browsers: ['last 2 versions'],
         cascade: false
      }))
   .pipe(gulp.dest('builds/css')));

// babel
gulp.task('babel', () => gulp.src('source/js/script.js')
    .pipe(babel())
    .pipe(gulp.dest('builds/js')));

// watch
gulp.task('watch', () => {
   gulp.watch('source/scss/*.scss', ['sass']);
   gulp.watch('source/js/*.js', ['babel']);
}); 

// browsersync
gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: ['./', './builds'],
            index: './builds/html/index.html'
        }
    });

    gulp.watch("source/scss/*.scss", ['sass']);
    gulp.watch("builds/html/index.html").on('change', browserSync.reload);
});
