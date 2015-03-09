(function(){
	var gulp = require('gulp');
	
	require('./version')(gulp, {
		jsonFiles: ['./package.json', './bower.json']
	});
})();