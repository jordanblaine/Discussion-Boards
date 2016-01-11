var Discussions = require("../controllers/discussions.js");
var authenticate = require('./auth.js');

module.exports = function(app, flash, passport){

	app.get('/users/current', isLoggedIn, function(req,res){
		console.log(req.user);
		res.json(req.user);
	});

	app.post("/users/create", passport.authenticate('sign-up', 
		{
		failureRedirect: '/',
		failureFlash: true
		}),
		function(req,res){
			res.send(req.user);	
		}
	);

	app.post("/users/login", passport.authenticate('login',
		{
		failureRedirect: '/',
		failureFlash: true
		}),
		function(req,res){
			res.send(req.user);	
		}
	);

	app.post("/users/logout", function(req,res){
		req.session.destroy();
		res.send({redirect: '/'});
	});

	app.post("/discussions/create", function(req,res){
		Discussions.create(req,res);
	});

	app.get("/discussions/:id", function(req,res){
		Discussions.get_discussion(req,res);
	});

	app.get("/discussions/category/:category", function(req,res){
		Discussions.get_category(req,res);
	});

}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    } else {
    	res.redirect('/');
    }
}
