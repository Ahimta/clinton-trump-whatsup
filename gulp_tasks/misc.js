const path = require('path');

const gulp = require('gulp');
const del = require('del');
const appcache = require('gulp-appcache');
const filter = require('gulp-filter');
const rename = require('gulp-rename');

const conf = require('../conf/gulp.conf');

gulp.task('appcache', generateManifest);
gulp.task('clean', clean);
gulp.task('other', other);

function clean() {
  return del([conf.paths.dist, conf.paths.tmp]);
}

function generateManifest() {
  return gulp.src(conf.path.dist('**/*'))
    .pipe(appcache({
      hash: true,
      network: ['*'],
      preferOnline: false,
      filename: 'app.manifest',
      exclude: 'app.manifest'
    }))
    .pipe(gulp.dest(conf.path.dist()));
}

function other() {
  const fileFilter = filter(file => file.stat.isFile());
  const jsonFilter = path => {
    if (path.extname === '.json') {
      path.dirname = `${conf.paths.src}/${path.dirname}`;
    }
  };

  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join(`!${conf.paths.src}`, '/**/*.{scss,tsx}')
  ])
    .pipe(fileFilter)
    .pipe(rename(jsonFilter))
    .pipe(gulp.dest(conf.paths.dist));
}
