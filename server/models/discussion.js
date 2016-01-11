var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var discussionSchema = new mongoose.Schema({
	_user: {type: Schema.ObjectId, ref: 'User'},
	messages: [{type: Schema.Types.ObjectId, ref: 'Message'}],
	title: String,
	description: String,
	category: String,
	created_at: {type: Date, default: new Date}
})

mongoose.model('discussions', discussionSchema);