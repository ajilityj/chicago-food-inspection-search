'use strict';

import gulp from 'gulp';
import babel from 'gulp-babel';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import del from 'del';
import runSequence from 'run-sequence';
import eslint from 'gulp-eslint';

const paths = {
  styles: {
    src: 'src/styles/main.scss',
    dest: 'dist/styles/'
  },
  scripts: {
    src: 'src/scripts/main.js',
    dest: 'dist/scripts/'
  }
};

gulp.task('clean', () => {
  return del(['dist']);
});

gulp.task('styles', () => {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass()
      .on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest));
});

gulp.task('lint', () => {
  return gulp.src(paths.scripts.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('scripts', () => {
  return gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('build', () => {
  runSequence(
    'clean',
    'lint',
    ['styles', 'scripts']
  );
});

gulp.task('default', ['build']);