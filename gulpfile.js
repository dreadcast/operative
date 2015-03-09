(function(){
	var gulp = require('gulp');
	
	require('./release/version')(gulp, {
		jsonFiles: ['./package.json', './bower.json']
	});
})();