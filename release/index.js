module.exports = function(gulp, conf){
	var js = require('./../js')(gulp),
		doc = require('./doc')(gulp),
		version = require('./version')(gulp),
		runSequence = require('run-sequence').use(gulp);
	
	/**
	 * Build js bump version, build doc, release doc to gh-pages and push changes
	 * @task release:ghpages
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
	
	/**
	 * Publish to npm
	 * @task release:npm
	 */
	gulp.task('release:npm', function(done){
		require('child_process').spawn('npm', ['publish'], {
			stdio: 'inherit'
		})
			.on('close', done);
	});
	
	
	/**
	 * Build js bump version, build doc, release doc to gh-pages, push changes and publish to NPM
	 * @task release:ghpages:npm
	 */
	gulp.task('release:ghpages:npm', function(done){
		runSequence(
			'release:ghpages',
			'release:npm',
			done
		);
	});
	
	/**
	 * Build js, build doc, bump version, push changes and publish to NPM
	 * @task release:docs:npm
	 */
	gulp.task('release:docs:npm', function(done){
		runSequence(
			'release:docs',
			'release:npm',
			done
		);
	});
	
	/**
	 * Build js, bump version, push changes and publish to NPM
	 * @task release:default:npm
	 */
	gulp.task('release:default:npm', function(done){
		runSequence(
			'release:default',
			'release:npm',
			done
		);
	});
};