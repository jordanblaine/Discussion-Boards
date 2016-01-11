var mongoose = require("mongoose");
var Users = mongoose.model("users");
var Discussions = mongoose.model("discussions");
var Messages = mongoose.model("messages");
var sess;

module.exports = {

	create: function(req,res){
		var user = new Users(req.body);
		console.log(user);

		Users.findOne({email: user.email}, function(err, response){
			if(!response){
				user.password = user.generateHash(user.password);
				user.save(function(err, result){
					if(err){
						res.send({error: "Error. User could not be added to the database."});
					} else {
						sess = req.session;
						sess.user.name = user.name;
						sess.user.email = user.email;
						res.json(sess);
					}
				});
			} else {
				res.send({error: "Email is taken. Try another email."});
			}
		});

	},
	login: function(req,res){

		var user = req.body;
		console.log(user);

		Users.findOne({email: user.email}, function(err, User){
			if(User){
				if(!User.validPassword(user.password)){
					res.send({error: "Error. Invalid password."});
				} else {
					sess = req.session;
					sess.user.name = User.name;
					sess.user.email = User.email;
					res.json(sess);
				}
			} else {
				res.send({error: "Error. Email has not been registered."})
			}
		});
		
	},
	logout: function(req,res){
		req.session.destroy(function(err){
			if(err){
				console.log(err);
			} else {
				res.redirect('/');
			}
		});
	}

};