import gulp from 'gulp'
import browsersync from 'browser-sync'

export default function svgs() {
  return gulp.src('src/images/**/*.svg')
    .pipe(gulp.dest('build/img'))
    .on('end', browsersync.reload)
}
