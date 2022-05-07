
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer')
const minify = require('gulp-clean-css')
const concat = require('gulp-concat');
const sass = require('gulp-sass')
const jest = require('gulp-jest').default;
const browserify = require('browserify');
const source = require('vinyl-source-stream');

gulp.task('css-themes', () => gulp.src(['./src/css/theme/source/*.{sass,scss}'])
        .pipe(sass())
        .pipe(gulp.dest('./presentation/assets/css')));

gulp.task('css-core', () => gulp.src(['./src/css/reveal.scss'])
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minify({compatibility: 'ie9'}))
    .pipe(gulp.dest('./presentation/assets/css'))
);

gulp.task('css', 
    gulp.parallel('css-themes', 'css-core')
);

gulp.task('js-test', () => gulp.src('test')
    .pipe(jest({ 
        "preprocessorIgnorePatterns": [
          "<rootDir>/dist/", "<rootDir>/node_modules/"
        ],
        "automock": false
    }))
);

gulp.task('css-test',
    () => gulp.src(
            [
                './presentation/assets/**/*',
                './presentation/vendor/**/*'
            ]
        )
        .pipe(gulp.dest('./test/styling/assets'))
);

gulp.task('deploy', function() { 
    return browserify('./src/js/main.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./presentation/assets/js/'));
});

gulp.task('build', 
    gulp.series(gulp.parallel('css'), 'js-test', 'css-test')
);

gulp.task('default', 
    gulp.series(gulp.parallel('css'), 'js-test', 'css-test', 'deploy')
);
