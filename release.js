module.exports = function(gulp, conf){
	var //gulp = require('gulp'),
		Y = require('yuidocjs'),
		fs = require('fs'),
		uglify = require('gulp-uglify'),
		git = require('gulp-git'),
		bump = require('gulp-bump'),
		fs = require('fs-extra');
	
	var jsonFiles = ['./package.json', './bower.json', './yuidoc.json'],
		tmpDir = './../tmp',
		bumpType,
		version,
		message,
		yuiOptions;
	
	var handlers = {
			bump: function(){
				bumpType = process.argv[3].replace(/^(\-+)/, '');
				
				return gulp.src(jsonFiles)
					.pipe(bump({
						type: bumpType
					}))
					.pipe(gulp.dest('./'));
			},
			
			uglify: function(){
				return gulp.src('src/*.js')
					.pipe(uglify())
					.pipe(gulp.dest('dist'));
			},
			
			commit: function(done){
		// 		var pkg = require('./package.json');
				fs.readFile('./package.json', function(err, pkg){
					version = JSON.parse(pkg).version;
					message = 'Release ' + version;
					
					return gulp.src('./')
						.pipe(git.add())
						.pipe(git.commit(message))
						.on('end', done);
				});
			},
			
			tag: function(done){
				return git.tag(version, message, done);
			},
			
			doc: function(done){
				fs.readFile('yuidoc.json', function(err, data){
					var doc = JSON.parse(data),
						Y = require('yuidocjs');
					
					yuiOptions = doc.options;
					
					yuiOptions.project = {
						theme: 'simple',
						name: doc.name,
						logo: doc.logo,
						description: doc.description,
						url: doc.url,
						version: doc.version
					};
					
					var yuiJson = (new Y.YUIDoc(yuiOptions)).run(),
						builder = new Y.DocBuilder(yuiOptions, yuiJson);
					
					builder.compile(done);
				});
			},
			
			movedoc: function(done){
				fs.removeSync(tmpDir);
				fs.move(yuiOptions.outdir, tmpDir + '/doc', {
					clobber: true
				}, done);
			},
			
			checkoutGhPages: function(done){
				git.checkout('gh-pages', {
					args: '-f'
				}, done);
			},
			
			copydoc: function(done){
				fs.removeSync(yuiOptions.outdir);
				fs.mkdirsSync(yuiOptions.outdir);
				fs.move(tmpDir + '/doc', yuiOptions.outdir, {
					clobber: true
				}, done);
			},
			
			commitdoc: function(){
				return gulp.src('./')
					.pipe(git.add())
					.pipe(git.commit('Release ' + version));
			},
			
			pushdoc: function(done){
				return git.push('origin', 'gh-pages', done);
			},
			
			checkoutMaster: function(done){
				git.checkout('master', {
					args: '-f'
				}, done);
			},
			
			push: function(done){
				return git.push('origin', 'master', {
					args: ' --tags'
				}, done);
			}
		},
		
		tasks = {
			name: 'release:bump',
			handler: handlers.bump
		};
	// Bump version
	gulp.task('release:bump', handlers.bump);
	
	// Build & commit
	gulp.task('release:scripts', ['release:bump'], handlers.uglify);
	gulp.task('release:commit', ['release:scripts'], handlers.commit);
	gulp.task('release:tag', ['release:commit'], handlers.tag);
	
	// Parse doc, checkout gh-pages & compile
	gulp.task('release:doc', ['release:tag'], handlers.doc);
	
	// <if publish to gh-pages>
	gulp.task('release:movedoc', ['release:doc'], handlers.movedoc);
	gulp.task('release:checkoutGhPages', ['release:movedoc'], handlers.checkoutGhPages);
	
	// Copy doc files
	gulp.task('release:copydoc', ['release:checkoutGhPages'], handlers.copydoc);
	
	// Commit & push docs
	gulp.task('release:commitdoc', ['release:copydoc'], handlers.commitdoc);
	gulp.task('release:pushdoc', ['release:commitdoc'], handlers.pushdoc);
	
	// Return to master & push
	gulp.task('release:checkoutMaster', ['release:pushdoc'], handlers.checkoutMaster);
	
	gulp.task('release:full-push', ['release:checkoutMaster'], handlers.push);
	gulp.task('release:full', ['release:full-push']);
	// </if publish to gh-pages>
	
	
	
	
	gulp.task('release:push', ['release:doc'], handlers.push);
	gulp.task('release:default', ['release:push']);	
};