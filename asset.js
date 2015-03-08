module.exports = function(gulp, conf){
	var Path = require('path'),
		fs = require('fs-extra');
	
	gulp.task('asset:copy', function(){
		gulp.src('/asset/**/*.css')
			.pipe(dest('.build/**/combine/*.css'));
	});
	
};
