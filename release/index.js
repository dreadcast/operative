module.exports = function(gulp, conf){
	var js = require('./../js')(gulp),
		doc = require('./doc')(gulp),
		version = require('./version')(gulp),
		runSequence = require('run-sequence').use(gulp);
	
	gulp.task('release:ghpages', function(done){
		runSequence(
			'js:build',
			'version:bumptag',
			'doc:publish',
			'version:push',
			done
		);
	});
	gulp.task('release:docs', function(done){
		runSequence(
			'js:build',
			'doc:build',
			'version:full',
			done
		);
	});
	gulp.task('release:default', function(done){
		runSequence(
			'js:build',
			'version:full',
			done
		);
	});
};