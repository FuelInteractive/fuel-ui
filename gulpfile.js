var gulp = require('gulp');
var concat = require('gulp-concat');
var typescript = require('gulp-typescript');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var inlineNg2Template = require('gulp-inline-ng2-template');
var merge = require('merge2');
var webserver = require('gulp-webserver');
var Builder = require('systemjs-builder');
var runSequence = require('run-sequence');
var server = require('gulp-server-livereload');

var paths = {
    source: 'src',
    dest: 'bin',
    bundle: 'bundles'
};

var inlineTemplateConfig = {
    base: paths.dest,
    html: true,
    css: true,
    target: 'es5',
    indent: 2
}


gulp.task('hello', function () {
    console.log('HELLO!');
    console.log(Object.keys(gulp.tasks));
});

gulp.task('cleanSass', function () {
    return gulp.src(paths.dest + '/**/*.css', { read: false })
			.pipe(vinylPaths(del));
});

gulp.task('cleanViews', function () {
    return gulp.src(paths.dest + '/**/*.html', { read: false })
			.pipe(vinylPaths(del));
});

gulp.task('cleanScripts', function () {
    return gulp.src(paths.dest + '/**/*.{js,map,d.ts}', { read: false })
			.pipe(vinylPaths(del));
});

gulp.task('scripts', ['cleanScripts', 'views', 'sass'], function () {
    var tsProject = typescript.createProject('tsconfig.json');
    
    var sourceFiles = [
        paths.source + '/**/*.ts'
    ];

    var tsResult = gulp
        .src(sourceFiles)
        .pipe(inlineNg2Template(inlineTemplateConfig))
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject));

    return merge(
        [
            tsResult.js
                .pipe(sourcemaps.write('.'))
                .pipe(gulp.dest(paths.dest)),
            tsResult.dts
                .pipe(gulp.dest(paths.dest))
        ]);
});

gulp.task('bundle', ['scripts'], function() {    
    // optional constructor options
    // sets the baseURL and loads the configuration file
    var builder = new Builder('./', './builderConfig.js');
    
    return builder
        //.buildStatic(paths.dest+'/fuel-ui.js', 'fuel-ui.js')
        .bundle(paths.dest+'/fuel-ui.js', paths.bundle+'/fuel-ui.js')
        .then(function() {
            console.log('bundle complete');
        })
        .catch(function(err) {
            console.log('Build error');
            console.log(err);
        });
});

gulp.task('views', ['cleanViews'], function () {
    return gulp.src(paths.source + '/**/*.html')
        .pipe(gulp.dest(paths.dest));
});

gulp.task('sass', ['cleanSass'], function () {
    return gulp.src(paths.source + '/**/*.{scss,sass}')
        //.pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true
        }).on('error', sass.logError))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dest));

});

gulp.task('serve', function(){
	gulp.src('./')
		.pipe(server({
			livereload: {
				enable: true,
				filter: function(filePath, cb) {
					cb( 
						/bin\/[^\/]*\.js$/.test(filePath) &&
						!(/node_modules/.test(filePath)) &&  
						!(/.*ts$/.test(filePath)) && 
						!(/gulpfile.js$/.test(filePath))
					);
				}
			},
			defaultFile: 'index.html',
			open: true
		}));
});

gulp.task('watch', function () {
    gulp.watch(paths.source+'/**/*.html', ['views']);
    gulp.watch(paths.source+'/**/*.ts', ['scripts']);
    gulp.watch(paths.source+'/**/*.{scss,sass}', ['sass']);
});

gulp.task('build', ['cleanSass', 'cleanScripts', 'cleanViews', 'sass', 'views', 'scripts', 'bundle']);

gulp.task('default', function(){
	runSequence(
		'build',
		'serve',
		'watch'
	);
});
