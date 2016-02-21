var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
var mongoUri = 'mongodb://jordan:Jbblaine3@ds011168.mongolab.com:11168/discussion-boards';
mongoose.connect(mongoUri);
var models_path = path.join(__dirname, './../models');
fs.readdirSync(models_path).forEach(function(file) {
	if(file.indexOf('.js') >= 0) {
		require(models_path + '/' + file);
	}
});