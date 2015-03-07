module.exports = function(gulp, conf){
	var fs = require('fs'),
		git = require('gulp-git'),
		bump = require('gulp-bump'),
		runSequence = require('run-sequence').use(gulp);
	
	var jsonFiles = ['./package.json', './bower.json', './yuidoc.json'],
		bumpType,
		version,
		message;
	
	gulp.task('version:bump', function(){
		bumpType = process.argv[3].replace(/^(\-+)/, '');
		
		return gulp.src(jsonFiles)
			.pipe(bump({
				type: bumpType
			}))
			.pipe(gulp.dest('./'));
	});
	
	gulp.task('version:commit', function(done){
		fs.readFile('./package.json', function(err, pkg){
			version = JSON.parse(pkg).version;
			message = 'Release ' + version;
			
			return gulp.src('./')
				.pipe(git.add())
				.pipe(git.commit(message))
				.on('end', done);
		});
	});

	gulp.task('version:tag', function(done){
		return git.tag(version, message, done);
	});

	gulp.task('version:bumptag', function(done){
		return runSequence(
			'version:bump',
			'version:commit',
			'version:tag',
			done
		);
	});

	gulp.task('version:push', function(done){
		return git.push('origin', 'master', {
			args: ' --tags'
		}, done);
	});

	gulp.task('version:full', function(done){
		runSequence(
			'version:bumptag',
			'version:push',
			done
		);
	});
};