module.exports = function(gulp, conf){
	var js = require('./../js')(gulp),
		doc = require('./doc')(gulp),
		version = require('./version')(gulp),
		runSequence = require('run-sequence').use(gulp);
	
	/**
	 * Build js bump version, build doc, release doc to gh-pages and push changes
	 * @task release:docs
	 */
	gulp.task('release:ghpages', function(done){
		runSequence(
			'js:build',
			'version:bumptag',
			'doc:publish',
			'version:push',
			done
		);
	});
	
	/**
	 * Build js, build doc, bump version and push changes
	 * @task release:docs
	 */
	gulp.task('release:docs', function(done){
		runSequence(
			'js:build',
			'doc:build',
			'version:full',
			done
		);
	});
	
	/**
	 * Build js, bump version and push changes
	 * @task release:default
	 */
	gulp.task('release:default', function(done){
		runSequence(
			'js:build',
			'version:full',
			done
		);
	});
};