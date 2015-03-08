module.exports = function(gulp, conf){
	var gulp = require('gulp'),
		Path = require('path'),
		less = require('gulp-less'),
		autoprefixer = require('gulp-autoprefixer'),
		concat = require('gulp-concat'),
		fs = require('fs-extra');
	
	gulp.task('less:live', function(){
		return gulp.watch('asset/css/*.css')
			.pipe(less({
				paths: [ Path.join(__dirname, 'less', 'includes') ]
			}))
			.pipe(autoprefixer({
				browsers: ['last 4 versions'],
				cascade: false
			}))
			.pipe(dest('.dev'));
	});
	
	gulp.task('less:build', function(){
		return gulp.src('**/combine/*.css')
			.pipe(less({
				paths: [ Path.join(__dirname, 'less', 'includes') ]
			}))
			.pipe(autoprefixer({
				browsers: ['last 4 versions'],
				cascade: false
			}))
			.pipe(concat())
			.pipe(dest('.build/**/combine/*.css'));
	});
};
