// TODO - wiredep ---> Use to pull in and inject CSS/JS/etc... into HTML?

var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var del = require('del');

var $ = require('gulp-load-plugins')({lazy:true}); // TODO - lazy loads any needed plugins

gulp.task('vet', function () {
    log('Analyzing source..');
    	return gulp
        .src(config.alljs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});

// Makes clean-styles a dependency
//gulp.task('styles', ['clean-styles'], function () {
gulp.task('styles', function () {
   	 log('Compiling LESS --> CSS');

    	return gulp
        .src(config.less)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.plumber()) // graceful way to print out relevant compilation error information
        .pipe($.less())
        .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']})) // TODO - Dictate our browser support here
        .pipe(gulp.dest(config.outputDirectory));
});

gulp.task('clean-styles', function(done) {
    	var files = config.outputDirectory + '**/*.css';
    	clean(files, done);
});

gulp.task('less-watcher', function() {
   	 gulp.watch([config.less], ['styles']);
});

///////////////////////////////////

// 'done' - Callback function to call when done
function clean(path, done) {
    	log('Cleaning: ' + $.util.colors.blue(path));
    	del(path, done);
}

function errorLogger(error) {
    	log('*** Start of Error ***');
    	log(error);
    	log('*** End of Error ***');
    	this.emit('end');
}

// TODO - figure out why this isn't logging anything
function log(message) {
    	if (typeof(message) === 'object') {
        	for (var item in message) {
            	if (message.hasOwnProperty(item)) {
                	console.log($.util.colors.blue(message[item]));
            }
        }
    }
    	else {
        	$.util.log($.util.colors.blue(message));
    }
}