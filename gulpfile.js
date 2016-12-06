var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');

var paths = {
    source: 'src',
    dest: 'dist',
    bundle: 'bundles'
};

function webpackCallBack(taskName, gulpDone) {
  return function(err, stats) {
    if (err) throw new gutil.PluginError(taskName, err);
    gutil.log(`[${taskName}]`, stats.toString());
    gulpDone();
  }
}

gulp.task('umd', function(cb) {
  function ngExternal(ns) {
    var ng2Ns = `@angular/${ns}`;
    return {root: ['ng', ns], commonjs: ng2Ns, commonjs2: ng2Ns, amd: ng2Ns};
  }

  function rxjsExternal(context, request, cb) {
    if (/^rxjs\/add\/observable\//.test(request)) {
      return cb(null, {root: ['Rx', 'Observable'], commonjs: request, commonjs2: request, amd: request});
    } else if (/^rxjs\/add\/operator\//.test(request)) {
      return cb(null, {root: ['Rx', 'Observable', 'prototype'], commonjs: request, commonjs2: request, amd: request});
    } else if (/^rxjs\//.test(request)) {
      return cb(null, {root: ['Rx'], commonjs: request, commonjs2: request, amd: request});
    }
    cb();
  }

  webpack(
      {
        entry: './dist/index.js',
        output: {filename: paths.bundle + '/fuel-ui.umd.js', library: 'ngb', libraryTarget: 'umd'},
        devtool: 'source-map',
        externals: [
          {
            '@angular/core': ngExternal('core'),
            '@angular/common': ngExternal('common'),
            '@angular/forms': ngExternal('forms')
          },
          rxjsExternal
        ]
      },
      webpackCallBack('webpack', cb));
});

gulp.task('css', function() {
  gulp.src(paths.source + '/styles/fuel-ui.css')
    .pipe(gulp.dest(paths.bundle))
});
