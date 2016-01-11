var mongoose = require("mongoose");
var Users = mongoose.model("users");
var Discussions = mongoose.model("discussions");
var Messages = mongoose.model("messages");

module.exports = {
	create: function(req,res){
		var discussion = new Discussions(req.body);
		Users.findById({_id: req.body._user}, function(err,response){
			if(response){
				response.discussion = discussion._id;
				discussion.save(function(err){
					response.save(function(err){
						if(err){
							res.send("Error. Could not create new discussion.");
						} else {
							res.json(discussion);
						}
					});
				});
			} else {
				res.send("Error. User must be signed in to create a new discussion.");
			}
		});
	},
	addMessage: function(req,res){
		var message = new Messages(req.body.message);
		Discussions.findOne({_id: req.body.discussion}, function(err,Discussion){
			if(Discussion){
				Users.findById({_id: req.body.user}, function(err,User){
					if(User){
						message._discussion = Discussion._id;
						message._user = User._id;
						Discussion.messages.push(message.text);
						User.messages.push(message._id);
						message.save(function(err){
							Discussion.save(function(err){
								User.save(function(err){
									if(err){
										res.send("Error. Could not add the message to the discussion");
									} else {
										res.redirect("/discussions/category/"+discussion.category+"/"+discussion._id);
									}
								})
							})
						})
					}
				})
			}
		});
	},
	get_category: function(req,res){
		Discussions.find({category: req.params.category}, function(err,results){
			if(err) {
				console.log(err);
			} else {
				res.json(results);
			}
		});
	},
	get_discussion: function(req,res){						
		Discussions.find({_id: req.params.id}, function(err,results){
			if(err){
				console.log(err);
			} else {
				console.log(results);
				res.json(results);
			}
		});
	}
}