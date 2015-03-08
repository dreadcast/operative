module.exports = function(gulp, conf){
	var concat = require('gulp-concat'),
		uglify = require('gulp-uglify'),
		fs = require('fs-extra');
	
	gulp.task('js:combine', function(done){
		return gulp.src('src/*.js')
 			.pipe(concat('combine.js'))
			.pipe(uglify())
			.pipe(gulp.dest('.tmp/combine/js'));
	});
	
	gulp.task('js:build', function(){
		return gulp.src('src/*.js')
			.pipe(uglify())
			.pipe(gulp.dest('dist'));
	})
};
