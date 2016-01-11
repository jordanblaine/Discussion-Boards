var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var messageSchema = new mongoose.Schema({
	_discussion: {type: Schema.ObjectId, ref: 'Discussion'},
	_user: {type: Schema.ObjectId, ref: 'User'},
	text: String,
	created_at: {type: Date, default: new Date}
})

mongoose.model('messages', messageSchema);