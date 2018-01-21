'use strict';

// general gulp packages
import gulp from 'gulp';
import util from 'gulp-util';
import del from 'del';

// style packages
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import stylelint from 'gulp-stylelint';
import normalize from 'postcss-normalize';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import sourcemaps from 'gulp-sourcemaps';

// script packages
import webpack from 'webpack';
import webpackDevConfig from './webpack.dev.js';
import webpackProdConfig from './webpack.prod.js';

// environment flag
const config = {
  production: !!util.env.production
};

// set appropriate webpack env config
const webpackConfig = config.production ? webpack(webpackProdConfig) : webpack(webpackDevConfig);

// asset(s) paths
const paths = {
  images: {
    src: 'src/images/*',
    dest: 'dist/images/'
  },
  styles: {
    src: 'src/styles/main.scss',
    dest: 'dist/styles/'
  }
};

// default task: 'gulp'
gulp.task('default', ['build', 'watch']);

// build task: 'gulp build'
gulp.task('build', ['scripts', 'styles', 'images']);

// watch task: 'gulp watch'
gulp.task('watch', function(){
  gulp.watch('src/scripts/**/*', ['scripts']);
  gulp.watch('src/styles/**/*', ['styles']);
  gulp.watch('src/images/**/*', ['images']);
});

// scripts task: 'gulp scripts'
gulp.task('scripts', function(done) {
  webpackConfig.run(function(err) {
    if (err) {
      console.error('Webpack Error: ', err);
    }
    done();
  });
});

// styles task: 'gulp styles'
// * stylelint settings @ .stylelintrc.json (ref: https://stylelint.io/user-guide/rules/)
gulp.task('styles', ['clean-styles'], () => {
  return gulp.src(paths.styles.src)
    .pipe(stylelint({
      failAfterError: true,
      reporters: [{formatter: 'string', console: true}]
    }))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([normalize(), autoprefixer()]))
    .pipe(config.production ? postcss([cssnano()]) : util.noop())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest));
});

// remove dist/styles folder
gulp.task('clean-styles', () => {
  return del(['dist/styles']);
});

// styles task: 'gulp images'
gulp.task('images', ['clean-images'], () => {
  return gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest));
});

// remove dist/images folder
gulp.task('clean-images', () => {
  return del(['dist/images']);
});
