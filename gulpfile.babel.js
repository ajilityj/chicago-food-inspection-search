'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import stylelint from 'gulp-stylelint';
import normalize from 'postcss-normalize';
import autoprefixer from 'autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import del from 'del';
import runSequence from 'run-sequence';

import webpack from 'webpack';
import webpackConfig from './webpack.config.js';
const webpackRun = webpack(webpackConfig);

// file paths
const paths = {
  styles: {
    src: 'src/styles/main.scss',
    dest: 'dist/styles/'
  },
  scripts: {
    src: 'src/scripts/*',
    dest: 'dist/scripts/'
  }
};

// default task: 'gulp'
//gulp.task('default', ['build', 'watch']);
gulp.task('default', ['build']);

// build tasks
gulp.task('build', () => {
  runSequence(
    'clean',
    ['styles', 'webpack']
  );
});

// remove dist folder
// TO-DO: remove styles folder on watch & remove scripts folder on watch
gulp.task('clean', () => {
  return del(['dist']);
});

// style tasks
// * stylelint settings @ .stylelintrc.json
// * ref: https://stylelint.io/user-guide/rules/
gulp.task('styles', () => {
  
  // postcss plugins
  const plugins = [
    normalize(),
    autoprefixer()
  ];

  return gulp.src(paths.styles.src)
    .pipe(stylelint({
      failAfterError: true,
      reporters: [{formatter: 'string', console: true}]
    }))
    .pipe(sourcemaps.init())
    .pipe(sass()
      .on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest));
});

// script tasks
// * eslint settings @ .eslintrc.json
// * babel settings @ .babelrc
// gulp.task('scripts', () => {
//   return gulp.src(paths.scripts.src)
//     .pipe(eslint())
//     .pipe(eslint.format())
//     .pipe(eslint.failAfterError())
//     .pipe(sourcemaps.init())
//     .pipe(babel())
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest(paths.scripts.dest));
// });

gulp.task('webpack', function(done) {
  webpackRun.run(function(err, stats) {
    if(err) {
      console.log('Error', err);
    }
    done();
  });
});

// watch for scss, js & vue changes
gulp.task('watch', ['styles', 'webpack'], function(){
  gulp.watch(paths.styles.src, ['styles']);
  gulp.watch(paths.scripts.src, ['webpack']);
  //gulp.watch('js/**/*.vue', ['webpack']);
});