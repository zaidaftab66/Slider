var gulp         = require('gulp');
const sass = require('gulp-sass')(require('sass'));
var rename       = require('gulp-rename');
var cleanCSS     = require('gulp-clean-css');

var paths = {
    style: {
        src: 'sass/*.{scss,sass}',
        dest: 'html/assets/css/'
    }
};

function style() {
    return gulp.src(paths.style.src)
        .pipe(sass())
        .pipe(cleanCSS())
        // pass in options to the stream
        .pipe(rename({
            basename: 'custom',
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.style.dest));
}

function watch() {
    gulp.watch(paths.style.src, style);
}

/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
exports.style = style;
exports.watch = watch;

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
var build = gulp.series(gulp.parallel(watch, style));

/*
 * You can still use `gulp.task` to expose tasks
 */
gulp.task('build', build);

/*
 * Define default task that can be called by just running `gulp` from cli
 */
gulp.task('default', build);