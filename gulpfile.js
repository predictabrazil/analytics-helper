'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const beautify = require('gulp-beautify');
const include = require('gulp-include');
const strip = require('gulp-strip-comments');
const del = require('del');
var rename = require('gulp-rename');
var ext_replace = require('gulp-ext-replace');

//Built-In Variables
gulp.task('variables-builtin-variables', () =>
  gulp
  .src('./gtm/variables/Built-InVariables/*.txt')
  .on('error', console.log)
  .pipe(gulp.dest('./dist/gtm/variables/Built-InVariables'))
);

//Variables type Constant
gulp.task('variables-user-defined-constant', () =>
  gulp
  .src('./gtm/variables/User-DefinedVariables/Constant/*.txt')
  .on('error', console.log)
  .pipe(gulp.dest('./dist/gtm/variables/User-DefinedVariables/Constant'))
);

//Variables type Custom Javascript core
gulp.task('variables-user-defined-custom-javascript-core', () =>
  gulp
  .src('./gtm/variables/User-DefinedVariables/CustomJavascript/core/*.js')
  .on('error', console.log)
  .pipe(gulp.dest('./dist/gtm/variables/User-DefinedVariables/CustomJavascript/core'))
);

//Variables type Custom Javascript
gulp.task('variables-user-defined-custom-javascript', () =>
  gulp
  .src('./gtm/variables/User-DefinedVariables/CustomJavascript/*.txt')
  .on('error', console.log)
  .pipe(gulp.dest('./dist/gtm/variables/User-DefinedVariables/CustomJavascript'))
);

//Variables type Data Layer Variable
gulp.task('variables-user-defined-data-layer', () =>
  gulp
  .src('./gtm/variables/User-DefinedVariables/DataLayerVariable/*.txt')
  .on('error', console.log)
  .pipe(gulp.dest('./dist/gtm/variables/User-DefinedVariables/DataLayerVariable'))
);

//Variables type Google Analytics Settings
gulp.task('variables-user-defined-ga-settings', () =>
  gulp
  .src('./gtm/variables/User-DefinedVariables/GoogleAnalyticsSettings/*.txt')
  .on('error', console.log)
  .pipe(gulp.dest('./dist/gtm/variables/User-DefinedVariables/GoogleAnalyticsSettings'))
);

//Variables type Lookup Table
gulp.task('variables-user-defined-lookup-table', () =>
  gulp
  .src('./gtm/variables/User-DefinedVariables/LookupTable/*.txt')
  .on('error', console.log)
  .pipe(gulp.dest('./dist/gtm/variables/User-DefinedVariables/LookupTable'))
);

//Triggers type Custom Event
gulp.task('triggers-custom-event', () =>
  gulp
  .src('./gtm/triggers/CustomEvent/*.txt')
  .on('error', console.log)
  .pipe(gulp.dest('./dist/gtm/triggers/CustomEvent'))
);

//Triggers type Page View
gulp.task('triggers-page-view', () =>
  gulp
  .src('./gtm/triggers/PageView/*.txt')
  .on('error', console.log)
  .pipe(gulp.dest('./dist/gtm/triggers/PageView'))
);

//HTML from Custom HTML Tags
//the file name is the same as the tag file name 
gulp.task('tags-core-html', () =>
  gulp
  .src('./gtm/tags/core/html/*.html')
  .on('error', console.log)
  .pipe(gulp.dest('./dist/gtm/tags/core/html'))
);

//Tags type Custom HTML
gulp.task('tags-custom-html', () =>
  gulp
  .src('./gtm/tags/CustomHTML/*.txt')
  .on('error', console.log)
  .pipe(gulp.dest('./dist/gtm/tags/CustomHTML'))
);

//Tags Type Google analytics - Universal Analytics
gulp.task('tags-ga-universal-analytics', () =>
  gulp
  .src('./gtm/tags/GoogleAnalytics_UniversalAnalytics/*.txt')
  .on('error', console.log)
  .pipe(gulp.dest('./dist/gtm/tags/GoogleAnalytics_UniversalAnalytics'))
);

//The analytics_helper.html javascript core
gulp.task('gtm-modules', () =>
  gulp
  .src(['./libs/thirty_parts/modules/*.js', './gtm/core/modules/*js'])
  .pipe(concat('gtm-modules.js'))
  .pipe(beautify({
    indent_size: 2
  }))
  .pipe(strip())
  .on('error', console.log)
  .pipe(gulp.dest('./tmp'))
);

//The analytics_helper core
//the gulp task 'gtm-modules' will be placed insided this file
gulp.task('build-gtm', () =>
  gulp
  .src('./gtm/core/main.js')
  .pipe(include({
    includePaths: ['/tmp', '/gtm/core'].map(path => __dirname + path),
    hardFail: true
  }))
  .pipe(rename('analytics_helper.js'))
  .pipe(ext_replace('.html'))
  .on('error', console.log)
  .pipe(gulp.dest('./dist/gtm/tags/core/html'))
);

gulp.task('clean', () => del(['./tmp']));

gulp.task('default', gulp.series(['clean', 
                                  'variables-builtin-variables',
                                  'variables-user-defined-constant',
                                  'variables-user-defined-custom-javascript-core',
                                  'variables-user-defined-custom-javascript', 
                                  'variables-user-defined-data-layer',
                                  'variables-user-defined-ga-settings',
                                  'variables-user-defined-lookup-table',
                                  'triggers-page-view',
                                  'triggers-custom-event',
                                  'tags-core-html', 
                                  'tags-custom-html',
                                  'tags-ga-universal-analytics', 
                                  'gtm-modules', 
                                  'build-gtm', 
                                  'clean']));
