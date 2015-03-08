module.exports = function(gulp, conf){
	var cheerio = require('gulp-cheerio'),
		fs = require('fs-extra'),
		swigExtras = require('swig-extras'),
		superswig = require('./utils/superswig'),
		swig = require('swig');
	
	swigExtras.useFilter(swig, 'markdown');		
	swigExtras.useFilter(swig, 'truncate');
	
	swig.setFilter('length', superswig.length);		
	swig.setDefaults({ cache: false });
	
	// Return to master & push
	gulp.task('swig:default', function(done){
		gulp.watch('**/*.twig')
			.pipe(cheerio(function($, file){
				
				swig.compile($.html(), {
					filename: '/absolute/path/to/mytpl.html'
				});
				
				done();
			}));
	});
};