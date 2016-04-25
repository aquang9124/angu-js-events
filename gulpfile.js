// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('./client/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./client/dist/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(['./client/js/app.module.js', './client/js/*.js'])
        .pipe(concat('app.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('./client/dist/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('./client/js/*.js', ['scripts']);
    gulp.watch('./client/scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['sass', 'scripts', 'watch']);