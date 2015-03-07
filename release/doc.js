module.exports = function(gulp, conf){
	var Y = require('yuidocjs'),
		fs = require('fs'),
		git = require('gulp-git'),
		fs = require('fs-extra'),
		runSequence = require('run-sequence').use(gulp);
	
	var jsonFiles = ['./package.json', './bower.json', './yuidoc.json'],
		tmpDir = './../tmp',
		bumpType,
		version,
		message,
		yuiOptions;
	
	
	// Parse doc
	gulp.task('doc:build', function(done){
		fs.readFile('yuidoc.json', function(err, data){
			var doc = JSON.parse(data),
				Y = require('yuidocjs');
			
			yuiOptions = doc.options;
			version = doc.version;
			
			yuiOptions.project = {
				theme: 'simple',
				name: doc.name,
				logo: doc.logo,
				description: doc.description,
				url: doc.url,
				version: version
			};
			
			var yuiJson = (new Y.YUIDoc(yuiOptions)).run(),
				builder = new Y.DocBuilder(yuiOptions, yuiJson);
			
			builder.compile(done);
		});
	});
	
	// <if publish to gh-pages>
		// Checkout gh-pages & compile
		gulp.task('doc:move', function(done){
			fs.removeSync(tmpDir);
			fs.move(yuiOptions.outdir, tmpDir + '/doc', {
				clobber: true
			}, done);
		});
		gulp.task('doc:checkoutGhPages', function(done){
			return git.checkout('gh-pages', {
				args: '-f'
			}, done);
		});
		
		// Copy doc files
		gulp.task('doc:copy', function(done){
			fs.removeSync(yuiOptions.outdir);
			fs.mkdirsSync(yuiOptions.outdir);
			fs.move(tmpDir + '/doc', yuiOptions.outdir, {
				clobber: true
			}, done);
		});
		
		// Commit & push docs
		gulp.task('doc:commit', function(){
			return gulp.src('./')
				.pipe(git.add())
				.pipe(git.commit('Release ' + version));
		});
		
		gulp.task('doc:push', function(done){
			return git.push('origin', 'gh-pages', done);
		});
		
		// Return to master
		gulp.task('doc:checkoutMaster', function(done){
			return git.checkout('master', {
				args: '-f'
			}, done);
		});
	// </if publish to gh-pages>

	gulp.task('doc:publish', function(done){
		runSequence(
			'doc:build',
			'doc:move',
			'doc:checkoutGhPages',
			'doc:copy',
			'doc:commit',
			'doc:push',
			'doc:checkoutMaster',
			done
		);
	});

};