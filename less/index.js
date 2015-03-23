module.exports = function(gulp, conf){
	var less = require('gulp-less'),
		autoprefixer = require('gulp-autoprefixer'),
		concat = require('gulp-concat'),
		_ = require('lodash');
	
	_.defaults(conf, {
		paths: {
			lesss: ['less/*.less'],
			csss: ['css/*.css'],
			build: 'dist',
			asset: 'dist/asset',
			cache: 'cache'
		}
	});
	
	gulp.task('less:live', function(){
		return gulp.src(conf.paths.csss)
			.pipe(less({
				paths: conf.paths.lesss
			}))
			.pipe(autoprefixer({
				browsers: ['last 4 versions'],
				cascade: false
			}))
			.pipe(gulp.dest(conf.paths.cache + '/asset'));
	});
	
	gulp.task('less:build', function(){
		return gulp.src(conf.paths.csss)
			.pipe(less({
				paths: conf.paths.lesss
			}))
			.pipe(autoprefixer({
				browsers: ['last 4 versions'],
				cascade: false
			}))
			.pipe(concat('combine.css'))
			.pipe(gulp.dest(conf.paths.build));
	});
};
