var gulp = require('gulp');
var concat = require('gulp-concat');
var typescript = require("gulp-typescript");
var del = require('del');
var vinylPaths = require('vinyl-paths');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require("gulp-sourcemaps");
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var inlineNg2Template = require('gulp-inline-ng2-template');
var merge = require("merge2");
var webserver = require('gulp-webserver');

var paths = {
    source: "src",
    dest: "dist",
    bundle: "bundles"
};

var inlineTemplateConfig = {
    base: '/',
    html: true,
    css: true,
    target: 'es6',
    indent: 2
}


gulp.task("hello", function () {
    console.log("HELLO!");
});

gulp.task("cleanSass", function () {
    return gulp.src(paths.dest + "/**/*.{scss,sass}", { read: false })
			.pipe(vinylPaths(del));
});

gulp.task("cleanViews", function () {
    return gulp.src(paths.dest + "/**/*.html", { read: false })
			.pipe(vinylPaths(del));
});

gulp.task("cleanScripts", function () {
    return gulp.src(paths.dest + "/**/*.{js,map}", { read: false })
			.pipe(vinylPaths(del));
});

gulp.task("scripts", ["cleanScripts", "views", "sass"], function () {
    var tsProject = typescript.createProject("tsconfig.json");
    
    var sourceFiles = [
        paths.source + "/**/*.ts",
        "./typings/tsd.d.ts"
    ];

    var tsResult = gulp
        .src(sourceFiles)
        .pipe(inlineNg2Template(inlineTemplateConfig))
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject));

    return tsResult.js
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(paths.dest));
});

gulp.task("production", ["build"], function() {
    var tsProject = typescript.createProject("tscbundle.json");
    
    var sourceFiles = [
        paths.source + "/**/*.ts",
        "./typings/tsd.d.ts"
    ];

    var tsResult = gulp
        .src(sourceFiles)
        .pipe(inlineNg2Template(inlineTemplateConfig))
        .pipe(typescript(tsProject));
        
    return merge([
        tsResult.dts
            .pipe(concat("fuelui.d.ts"))
            .pipe(gulp.dest(paths.bundle)),
        tsResult.js
            .pipe(concat("fuelui.js"))
            .pipe(gulp.dest(paths.bundle))    
    ]);
});

gulp.task("views", ["cleanViews"], function () {
    return gulp.src(paths.source + "/**/*.html")
        .pipe(gulp.dest(paths.dest));
});

gulp.task("sass", ["cleanSass"], function () {
    return gulp.src(paths.source + "/**/*.{scss,sass}")
        //.pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true
        }).on('error', sass.logError))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dest));

});

gulp.task("serve", function(){
    gulp.src("./")
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});

gulp.task("watch", function () {
    gulp.watch(paths.source+"/**/*.html", ["views", "scripts"]);
    gulp.watch(paths.source+"/**/*.ts", ["scripts"]);
    gulp.watch(paths.source+"/**/*.{scss,sass}", ["sass", "scripts"]);
});

gulp.task("build", ["cleanSass", "cleanScripts", "cleanViews", "sass", "views", "scripts"]);

gulp.task("default", ["build", "serve", "watch"]);
